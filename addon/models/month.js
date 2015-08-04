import Ember from 'ember';

export default Ember.Object.extend({

  init: function () {
    this.set('date', moment(this.get('date')));
  },

  addDay: function (day) {
    var dayKey = this.getDayKey(day.get('date'));
    var days = this.get('days') || Ember.Object.create();
    days[dayKey] = day;
    this.set('days', days);
  },

  findDay: function (date) {
    var dayKey = this.getDayKey(date);
    return this.get('days.' + dayKey);
  },


  // PRIVATE
  prepareForTemplate: function () {
    var weeks    = [];
    var week     = [];
    var days     = this.get('days');
    var daysKeys = Object.keys(days);

    daysKeys.forEach( function (dayKey, index) {
      var day = days[dayKey];
      if (moment(day.get('date')).day() === 1) {
        weeks.push(week);
        week = [];
      } else if (index === (daysKeys.length - 1)) {
        weeks.push(week);
      }

      week.push(day);
    });

    return weeks;
  },
  dayFormatString: 'YYYY-MM-DD',
  getDayKey: function (date) {
    return moment(date).format(this.get('dayFormatString'));
  }
});
