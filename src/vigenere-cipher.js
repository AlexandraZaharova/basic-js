const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(typeMachine) {
    if (typeof typeMachine == 'undefined') {
      this.typeMachine = true;
    } else {
      this.typeMachine = typeMachine;
    }
  }
  encrypt(message, key) {
    if (typeof message == 'undefined' || typeof key == 'undefined') {
      throw new Error('Incorrect arguments!');
    }
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let m = message.toUpperCase().split('');
    let k = key.toUpperCase();
    let result = [];
    let a = 0;
    let b = 0;
    let sum = 0;
    for (let i=0; i<m.length; i++) {
      if (str.includes(m[i])) {
        a = str.indexOf(m[i]);
        if (i>=k.length) {
          b = str.indexOf(k[i%k.length]);
        } else b = str.indexOf(k[i]);
        sum = a+b;
        if (sum >= str.length) {
          sum = sum - str.length;
        }
        result.push(str[sum]);
      } else {
        result.push(m[i]);
        m.splice(i, 1);
        i--;
      }
    }
    if (this.typeMachine) {
      return result.join('');
    } else {
      return result.reverse().join('');
    }
  }
  decrypt(message, key) {
    if (typeof message == 'undefined' || typeof key == 'undefined') {
      throw new Error('Incorrect arguments!');
    }
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let m = message.toUpperCase().split('');
    let k = key.toUpperCase();
    let result = [];
    let a = 0;
    let b = 0;
    let sum = 0;
    for (let i=0; i<m.length; i++) {
      if (str.includes(m[i])) {
        a = str.indexOf(m[i]);
        if (i>=k.length) {
          b = str.indexOf(k[i%k.length]);
        } else b = str.indexOf(k[i]);
        sum = a-b;
        if (sum >= str.length) {
          sum = sum - str.length;
        }
        if (sum<0) {
          result.push(str[str.length+sum])
        } else result.push(str[sum]);
      } else {
        result.push(m[i]);
        m.splice(i, 1);
        i--;
      }
    }
    if (this.typeMachine) {
      return result.join('');
    } else {
      return result.reverse().join('');
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
