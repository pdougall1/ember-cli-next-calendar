import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | calendar', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /calendar', function(assert) {
  visit('/calendar');

  andThen(function() {
    assert.equal(currentURL(), '/calendar');
  });

  andThen(function() {
    assert.equal(find('#next-calendar h1.human-date').text(), 'January 1, 2015');
  });

  // andThen(function() {
  //   var expectedDaysText = [1, 2, 3, 4, 5, 26, 27, 28, 29, 30, 31];
  //   var dayElemets = find('#next-calendar div.day');
  //   assert.equal(dayElemets.length > 0, true);
  //   dayElemets.each(function (dayElement) {
  //     assert.equal(expectedDaysText.indexOf(parseInt(dayElement.text())), -1);
  //   });
  // });
});
