module.exports = {
  // return hh:mm:ss
  format_time: (date) => {
    return date.toLocaleTimeString();
  },

  // returns MM/DD/YYYY
  format_date: (date) => {
    return `${new Date(date).getMonth()+ 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};
