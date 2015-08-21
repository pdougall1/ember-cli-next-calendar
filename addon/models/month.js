import Ember from 'ember';

export default Ember.Object.extend({

  // create with an object like this inside of a Calendar instance:
  // { date: firstOfMonth, allDays: calendar.get('days'), days: days }
  init: function () {
    this.set('date', moment(this.get('date')));
  },

  findDay: function (date) {
    var dayKey = this.getDayKey(date);
    return this.get('days.' + dayKey);
  },

  dayFormatString: 'YYYY-MM-DD',
  getDayKey: function (date) {
    return moment(date).format(this.get('dayFormatString'));
  },
});
