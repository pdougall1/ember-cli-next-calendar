import Ember from 'ember';

export default Ember.Controller.extend({

  selectedDay: Ember.computed(function () {
    return moment('2015-01-01');
  })
});
