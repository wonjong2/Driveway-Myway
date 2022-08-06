// Load 'day.js' package 
const dayjs = require('dayjs');

// Getter for createdAt property in thoughtSchema and reactionSchema
function timeStamp(date) {
    // e.g.) Aug 16, 2018 8:02 PM
    return dayjs(date).format('MMMM D, YYYY');
}

module.exports = { timeStamp };