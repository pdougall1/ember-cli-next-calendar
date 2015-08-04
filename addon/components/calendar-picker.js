import Ember from 'ember';
import Calendar from '../models/calendar';

export default Ember.Component.extend({

  init: function () {
    var calendar = Calendar.create();
    calendar.setSelectedDate(this.get('selectedDate'));
    this.set('calendar', calendar);
    this._super();
  },

  selectedDateObj: Ember.computed('selectedDate', function () {
    return this.get('calendar.selectedDate');
  }),

  currentMonthHumanReadable: Ember.computed('currentMonthValue', function () {
    return moment(this.get('currentMonthValue')).format('MMMM, YYYY');
  }),

  // the month is changed by changing the currentMonthValue
  // it makes sense for this to be changed one month at a time
  currentMonthValue: Ember.computed(function () {
    return moment(this.get('selectedDateObj')).startOf('month');
  }),

  currentMonth: Ember.computed('currentMonthValue', function () {
    return this.get('calendar').findMonth(this.get('currentMonthValue')).prepareForTemplate();
  }),

  actions: {
    nextMonth: function () {
      var nextMonth = moment(this.get('currentMonthValue')).add(1, 'month');
      this.set('currentMonthValue', nextMonth);
    }
  }
});
