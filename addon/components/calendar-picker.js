import Ember from 'ember';

export default Ember.Component.extend({

  currentDay: Ember.computed(function () {
    return moment(this.get('selectedDate'));
  }),

  currentDayHumanReadable: Ember.computed('currentDay', function () {
    return moment(this.get('currentDay')).format('MMMM D, YYYY');
  })
});
