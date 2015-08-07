import Ember from 'ember';

export default Ember.Object.extend({

  monthKeyFormat: 'YYYY-MM',
  dayKeyFormat: 'YYYY-MM-DD',

  init: function () {
    this.set('date', moment(this.get('date')));
  },

  forMonth: Ember.computed('date', function () {
    return this.get('date').format(this.get('monthKeyFormat'));
  }),

  forDay: Ember.computed('date', function () {
    return this.get('date').format(this.get('dayKeyFormat'));
  })
});
