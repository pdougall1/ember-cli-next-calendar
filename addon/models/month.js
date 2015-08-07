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

  prepareForTemplate: function () {
    var weeks = this.splitIntoWeeks(this.get('days'));
    return this.fillInGhostDays(weeks);
  },


  // PRIVATE
  splitIntoWeeks: function (days) {
    var weeks    = [];
    var week     = [];
    var daysKeys = Object.keys(days);

    daysKeys.forEach( function (dayKey, index) {
      var day = days[dayKey];

      if (moment(day.get('date')).day() === 0 && (week.length > 0)) {
        weeks.push(week);
        week = [];
      } else if (index === (daysKeys.length - 1)) {
        weeks.push(week);
      }

      week.push(day);
    });

    return this.fillInGhostDays(weeks);
  },

  fillInGhostDays: function (weeks) {
    var _this = this;

    weeks.map( function (week) {
      var startOfWeek = moment(week[0].get('date')).startOf('week');
      var existingDaysOfWeek = week.map( function (day) {
        return day.get('date').day();
      });

      for(var i=0; i < 7; i++){
        if (existingDaysOfWeek.indexOf(i) < 0) {
          var date = moment(startOfWeek).add(i, 'days');
          var day = _this.get('calendar.days.' + date.format('YYYY-MM-DD'));
          week.splice(i, 0, day);
        }
      }

      return week;
    });

    return weeks;
  },

  dayFormatString: 'YYYY-MM-DD',
  getDayKey: function (date) {
    return moment(date).format(this.get('dayFormatString'));
  }
});
