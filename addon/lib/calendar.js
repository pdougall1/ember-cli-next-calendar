import Ember from 'ember';

export default Ember.Object.extend({

  selectedDay: null,

  setSelectedDay: function (selectedDay) {
    this.set('selectedDay', moment(selectedDay));
  }
});
