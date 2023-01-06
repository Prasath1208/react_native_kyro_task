import moment from 'moment';

export function changeTimeToUTC(time) {
  var local = moment(time, 'YYYY-MM-DD hh:mm A').format(); // local time zone
  var utc = moment(local).utc().format(); //utc
  // console.log(local, utc, moment.utc(utc).local().format('hh:mm A'));
  return utc;
}
