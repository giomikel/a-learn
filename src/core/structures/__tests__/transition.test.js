const fsm_transition = require('../../structures/fsm_transition');

function testTransition() {
    const transition = new fsm_transition.Transition(0, '0', 1);
    if (transition.fromState !== 0 ||
        transition.symbol !== '0' ||
        transition.toState !== 1
    ) {
        console.error('Transition initialization failed');
    } else {
        console.log('Transition initialization passed');
    }
}

testTransition();