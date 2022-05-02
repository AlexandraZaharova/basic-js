const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (Array.isArray(arr)) {
    let result = arr.concat();
    for (let index = 0; index<result.length; index++) {
      if (result[index] == '--discard-next') {
        result.splice(index, 2);
        index--;
        if (result[index+1] == '--discard-prev' || result[index+1] == '--double-prev') {
          result.splice(index+1, 1);
        }
      } else if (result[index] == '--discard-prev') {
        if (index == 0) {
          result.splice(index, 1);
          index --;
        } else {
          result.splice(index-1, 2);
          index -= 2;
        }
      } else if (result[index] == '--double-next') {
        if (index == result.length-1) {
          result.splice(index, 1);
        } else result.splice(index, 1, result[index+1]);
      } else if (result[index] == '--double-prev') {
        if (index == 0) {
          result.splice(index, 1);
        } else result.splice(index, 1, result[index-1]);
      }
    }
    return result;
  } else throw new Error("'arr' parameter must be an instance of the Array!");
}

module.exports = {
  transform
};
