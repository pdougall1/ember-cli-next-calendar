import Ember from 'ember';
import Calendar from '../models/calendar';

export default Ember.Component.extend({

  init: function () {
    var calendar = Calendar.create();
    calendar.setSelectedDate(this.get('selectedDate'));
    this.set('calendar', calendar);
    this._super();
  },

  selectedDateObj: Ember.computed(function () {
    return this.get('calendar.selectedDate');
  }),

  selectedDateHumanReadable: Ember.computed('selectedDateObj', function () {
    return moment(this.get('selectedDateObj')).format('MMMM D, YYYY');
  })
});
