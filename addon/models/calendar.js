import Ember from 'ember';
import Month from './month';

export default Ember.Object.extend({

  selectedDate: null,
  months: Ember.Object.create(),

  setSelectedDate: function (selectedDate) {
    let date = moment(selectedDate);
    this.set('selectedDate', date);
    if (this.findOrCreate(date)) {
      return date;
    } else {
      throw Error('could not create the month');
    }
  },

  // PRIVATE
  findOrCreate: function (date) {
    var monthKey = this.getMonthKey(date);
    var months = this.get('months');
    var month = months.get(monthKey);
    if (!month) {
      month = this.createMonthForDay(date);
      months.set(monthKey, month);
    }
    // what should be returned here?
    return date;
  },

  dayFormatString: 'YYYY-MM-DD',
  monthFormatString: 'YYYY-MM',

  getDayKey: function (date) {
    return moment(date).format(this.get('dayFormatString'));
  },

  getMonthKey: function (date) {
    return moment(date).format(this.get('monthFormatString'));
  },

  createMonthForDay: function (date) {
    // month creation should also create all included weeks
    // week creation should also create all included days
    return Month.create({ date: date });
  }
});
