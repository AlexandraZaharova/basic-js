const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (date === undefined) {
    return 'Unable to determine the time of year!';
  } else {
    if (typeof(date) != 'object' || Object.getOwnPropertyNames(date).length > 0) {
      throw new Error("Invalid date!");
    } else {
      if (typeof(date.getTime()) == "number") {
        let season = ['spring', 'summer', 'autumn', 'winter'];
        let month = date.getMonth();
        if (month > 1 && month < 5) {
          return season[0];
        } else if (month > 4 && month < 8) {
          return season[1];
        } else if (month > 7 && month < 11) {
          return season[2];
        } else return season[3];
      } else return 'Error';
    }
  }
}

module.exports = {
  getSeason
};
