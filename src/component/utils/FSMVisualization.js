import { React, useEffect, useRef } from 'react';
import * as d3 from 'd3';

function FSMVisualization({ fsm }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector('.nfa-visualization-scroll-container');

    const centerScroll = () => {
      const div = document.getElementById('nfa-visualization-scroll-container');

      const scrollLeft = 2500 - div.offsetWidth / 2;
      const scrollTop = 2000 - div.offsetHeight / 2;
      scrollContainer.scrollLeft = scrollLeft;
      scrollContainer.scrollTop = scrollTop;
    };

    centerScroll();
    window.addEventListener('resize', centerScroll);

    return () => {
      window.removeEventListener('resize', centerScroll);
    };
  }, []);


  useEffect(() => {
    const width = 5000;
    const height = 4000;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const links = fsm.transitions.map(transition => ({
      source: transition.fromState,
      target: transition.toState,
      type: transition.symbol,
      symbol: transition.symbol,
    }));

    if (links.length === 0) return;

    links.sort(function (a, b) {
      if (a.source > b.source) return 1;
      else if (a.source < b.source) return -1;
      else {
        if (a.target > b.target) return 1;
        if (a.target < b.target) return -1;
        else return 0;
      }
    });


    for (let i = 0; i < links.length; i++) {
      if (
        i !== 0 &&
        links[i].source === links[i - 1].source &&
        links[i].target === links[i - 1].target
      ) {
        links[i].linknum = links[i - 1].linknum + 1;
      } else {
        links[i].linknum = 1;
      }
    }

    const nodes = {};

    links.forEach(function (link) {
      link.source = nodes[link.source] || (nodes[link.source] = { name: 'q' + link.source });
      link.target = nodes[link.target] || (nodes[link.target] = { name: 'q' + link.target });
    });

    const symbols = new Set();
    fsm.transitions.forEach((element) => {
      symbols.add(element.symbol);
    });

    const w = 5000,
      h = 4000;

    d3
      .forceSimulation()
      .nodes(d3.values(nodes))
      .force('link', d3.forceLink(links).id(function (d) { return d.name; }).distance(60))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(w / 2, h / 2))
      .on('tick', tick)
      .restart();

    svg
      .append('defs')
      .selectAll('marker')
      .data(Array.from(symbols))
      .enter()
      .append('marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

    const linkGroup = svg
      .selectAll('.link-group')
      .data(links)
      .enter()
      .append('g')
      .attr('class', 'link-group');

    linkGroup
      .append('path')
      .attr('class', function (d) { return 'link ' + d.type; })
      .attr('marker-end', function (d) { return 'url(#' + d.type + ')'; });

    linkGroup
      .append('text')
      .attr('class', 'edge-label')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(function (d) { return d.symbol; });

    const circle = svg
      .selectAll('.node')
      .data(d3.values(nodes))
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 6);

    const triangleMarkers = svg
      .selectAll('.triangle-marker')
      .data([0])
      .enter()
      .append('path')
      .attr('class', 'triangle-marker')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('transform', function (d) {
        const node = nodes[d];
        return 'translate(' + node.x + ',' + node.y + ')';
      })
      .attr('marker-end', 'url(#triangle-marker)');

    const textGroup = svg
      .selectAll('.text-group')
      .data(d3.values(nodes))
      .enter()
      .append('g')
      .attr('class', 'text-group');

    textGroup
      .append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .attr('class', 'shadow')
      .text(function (d) { return d.name; });

    textGroup
      .append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .text(function (d) { return d.name; });

    function tick() {
      let selfEdgeRadiusMap = new Map();
      linkGroup.selectAll('.link').attr('d', function (d) {
        if (d.source === d.target) {
          const r = selfEdgeRadiusMap.has(d.source) ? selfEdgeRadiusMap.get(d.source) : 20;
          selfEdgeRadiusMap.set(d.source, r + 5);
          return `M ${d.source.x},${d.source.y - 6}
                    A ${r},${r} 0 1,1 ${d.source.x + 6},${d.source.y}`;
        }

        const dr = 75 / d.linknum;
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          'A' +
          dr +
          ',' +
          dr +
          ' 0 0,1 ' +
          d.target.x +
          ',' +
          d.target.y
        );

      });

      linkGroup.selectAll('.edge-label').attr('transform', function (d) {
        const textPositionFraction = 0.5;
        const path = d3.select(this.parentNode).select('.link').node();
        const pathLength = path.getTotalLength();
        const start = pathLength * textPositionFraction;
        const { x, y } = path.getPointAtLength(start);
        return `translate(${x}, ${y})`;
      })
        .attr('text-anchor', 'middle')
        .attr('dy', 0)
        .attr('stroke', 'blue')
        .style('fill', 'white');

      circle.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
        .style('fill', function (d) {
          return fsm.acceptStates.includes(parseInt(d.name.substring(1))) ? 'green' : 'gray';
        });

      triangleMarkers.attr('transform', function (d) {
        const node = nodes[d];
        let y = node.y + 8;
        return 'translate(' + node.x + ',' + y + ')';
      });

      textGroup.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    }

  }, [fsm.alphabet, fsm.transitions, fsm.acceptStates]);

  return (
    <svg ref={svgRef} className="fsm-container">
    </svg>
  );
}

export default FSMVisualization;
