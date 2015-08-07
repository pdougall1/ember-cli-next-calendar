import Ember from 'ember';
import Month from './month';
import Key from './key';
import DaysOfMonth from './days-of-month';

// Calendar is the canon.
// Weeks and Months just point to the day that hangs off of Calendar.
// This allows for there to just be one Day to manage, while still providing for quick lookup of both Months and Weeks

export default Ember.Object.extend({

  selectedDate: null,

  setSelectedDate: function (selectedDate) {
    let date = moment(selectedDate);
    this.set('selectedDate', date);
    if (this.findOrCreateMonth(date)) {
      return date;
    } else {
      throw Error('could not create the months');
    }
  },

  // TODO: date here could be a key object?
  findMonth: function (date) {
    return this.findOrCreateMonth(date);
  },


  // PRIVATE

  findOrCreateMonth: function (date) {
    this.ensureDaysInMonthExist(date);
    var monthKey = this.getMonthKey(date);
    return this.get('months.' + monthKey);
  },

  ensureDaysInMonthExist: function (date) {
    var firstOfMonth = moment(date).startOf('month');
    var months = this.get('months') || Ember.Object.create();
    this.set('months', months);

    var monthKey = this.getMonthKey(moment(firstOfMonth));
    if (!months.get(monthKey)) {
      this.buildMonth(firstOfMonth);
    }

    // needed to fill in ghost days
    var firstOfPreviousMonth = moment(firstOfMonth).subtract(1, 'month');
    var previousMonthKey = this.getMonthKey(moment(firstOfPreviousMonth));
    if (!months.get(previousMonthKey)) {
      this.buildMonth(firstOfPreviousMonth);
    }

    // needed to fill in ghost days
    var firstOfNextMonth = moment(firstOfMonth).add(1, 'month');
    var nextMonthKey = this.getMonthKey(moment(firstOfNextMonth));
    if (!months.get(nextMonthKey)) {
      this.buildMonth(firstOfNextMonth);
    }
  },

  buildMonth: function (firstOfMonth) {
    var dateKey = Key.create({ date: firstOfMonth });
    var daysOfMonth = DaysOfMonth.create({ key: dateKey });
    var days = daysOfMonth.getDays();
    var month = Month.create({ date: firstOfMonth, calendar: this, days: days });

    // TODO: build weeks also
    this.set('months.' + dateKey.get('forMonth'), month);
    this.includeInDays(days);
    // TODO: set week on weeks
  },

  includeInDays: function (days) {
    var allDays = this.get('days') || Ember.Object.create();

    Object.keys(days).forEach( function (dayKey) {
      allDays.set(dayKey, days[dayKey]);
    });
    this.set('days', allDays);
  },

  // TODO: move this out to a key object
  dayFormatString: 'YYYY-MM-DD',
  monthFormatString: 'YYYY-MM',

  getDayKey: function (date) {
    return moment(date).format(this.get('dayFormatString'));
  },

  getMonthKey: function (date) {
    return moment(date).format(this.get('monthFormatString'));
  }
});
