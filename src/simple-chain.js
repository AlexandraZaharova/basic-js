const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (arguments.length == 0) value = '';
    this.chain.push(value);
    return this;
  },
  removeLink(position) {
    position = position - 1;
    if (position >= 0 && position < this.chain.length) {
      this.chain.splice(position, 1);
      return this;
    }
    this.chain = [];
    throw new Error("You can't remove incorrect link!");
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let string = '';
    let pattern = ' )~~( ';
    if (this.chain.length == 1) {
      string = '( ' + this.chain[0] + ' )';
    } else {
      for (let i = 0; i < this.chain.length; i++) {
        if (i == 0) {
          string += '( ' + this.chain[i];
        } else if (i == this.chain.length - 1) {
          string += pattern + this.chain[i] + ' )';
        } else {
          string += pattern + this.chain[i];
        }
      }
    }
    this.chain = [];
    return string;
  }
};

module.exports = {
  chainMaker
};
