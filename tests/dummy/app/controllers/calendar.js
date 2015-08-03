import Ember from 'ember';

export default Ember.Controller.extend({

  selectedDate: Ember.computed(function () {
    return moment('2015-01-01');
  })

});
