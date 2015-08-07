import Ember from 'ember';
import Day from './day';
import Key from './key';

export default Ember.Object.extend({

  init: function () {
    var days = this.buildDays();
    this.set('days', days);
  },

  getDays: function () {
    return this.get('days');
  },

  // PRIVATE
  buildDays: function () {
    var day, i, dayKey, dateWithDay;
    var days = Ember.Object.create();
    var dateKey = this.get('key');
    var dateArr = dateKey.get('forMonth').split('-');
    var date = moment()
      .year(parseInt(dateArr[0]))
      .month(parseInt(dateArr[1] - 1));

    var lastDayOfMonth = moment(dateKey.get('date')).endOf('month').date();
    for (i = 1; i <= lastDayOfMonth; i++) {
      dateWithDay = moment(date).date(i);
      day = Day.create({ date: dateWithDay });
      dayKey = Key.create({ date: dateWithDay });
      days.set(dayKey.get('forDay'), day);
    }

    return days;
  }
});
