import Ember from 'ember';
import Calendar from '../models/calendar';

export default Ember.Component.extend({

  init: function () {
    var calendar = Calendar.create();
    calendar.setSelectedDay(this.get('selectedDay'));
    this.set('calendar', calendar);
    this._super();
  },

  selectedDayObj: Ember.computed(function () {
    return this.get('calendar.selectedDay');
  }),

  selectedDayHumanReadable: Ember.computed('selectedDayObj', function () {
    return moment(this.get('selectedDayObj')).format('MMMM D, YYYY');
  })
});
