import Ember from 'ember';

export default Ember.ArrayProxy.extend({

  // { allDays: allDays, days: days }
  init: function () {
    this._super();
    this.set('content', this.splitIntoWeeks());
  },

  // PRIVATE
  splitIntoWeeks: function () {
    var days = this.get('days');
    var weeks    = Ember.A();
    var week     = Ember.A();
    var daysKeys = Object.keys(days);

    daysKeys.forEach( function (dayKey, index) {
      var day = days[dayKey];

      if (moment(day.get('date')).day() === 0 && (week.length > 0)) {
        weeks.pushObject(week);
        week = Ember.A();
      } else if (index === (daysKeys.length - 1)) {
        weeks.pushObject(week);
      }

      week.pushObject(day);
    });
    return this.fillInGhostDays(weeks);
  },

  fillInGhostDays: function (weeks) {
    var allDays = this.get('allDays');

    return weeks.map( function (week) {
      var startOfWeek = moment(week[0].get('date')).startOf('week');
      var existingDaysOfWeek = week.map( function (day) {
        return day.get('date').day();
      });

      for(var i=0; i < 7; i++){
        if (existingDaysOfWeek.indexOf(i) < 0) {
          var date = moment(startOfWeek).add(i, 'days');
          var day = allDays.get(date.format('YYYY-MM-DD'));
          week.splice(i, 0, day);
        }
      }
      return week;
    });
  }

});
