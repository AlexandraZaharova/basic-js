const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let result = '';
  let addition = '';
  if (typeof(str) === Object) {
    result = `${str}`
  } else result = String(str);
  if (typeof(options.addition) === Object) {
    addition = `${str}`
  } else addition = String(options.addition);
  let strAddition = '';
  let end = '';
  if ("addition" in options) {
    if ("additionRepeatTimes" in options) {
      if ("additionSeparator" in options) {
        strAddition = addition + options.additionSeparator;
      } else strAddition = addition + '|';
      strAddition = strAddition.repeat(options.additionRepeatTimes-1) + addition;
    } else strAddition = addition;
  }
  if ("repeatTimes" in options) {
    if ("separator" in options) {
      end = result + strAddition;
      result = result + strAddition + options.separator;
    } else {
      end = result + strAddition;
      result = (result + strAddition + '+');
    }
    result = result.repeat(options.repeatTimes-1) + end;
  } else result = result + strAddition;
  return result;
}

module.exports = {
  repeater
};
