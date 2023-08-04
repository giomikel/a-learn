class Edge {
    constructor(index, ch) {
      this.index = index;
      this.ch = ch;
    }

	equals(other) {
		return this.index === other.index && this.ch === other.ch;
	}
}

export default Edge;
