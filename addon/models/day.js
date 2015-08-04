import Ember from 'ember';

export default Ember.Object.extend({

  ofMonth: Ember.computed( function () {
    return moment(this.get('date')).date();
  })
});
