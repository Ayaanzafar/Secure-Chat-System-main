const moment = require('moment');
function formatMessage (username, text) {
  console.log(text)
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
function botMessage (username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage
module.exports = botMessage
