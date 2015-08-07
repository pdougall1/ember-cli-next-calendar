import { module, test } from 'qunit';
import Key from 'ember-next-calendar/models/key';

var key;
var dateString = '2015-01-01';

module('Unit | key', {
  beforeEach: function() {
    key = Key.create({ date: dateString });
  }
});

test('it must have a date', function (assert) {
  assert.equal(key.date.format('YYYY-MM-DD'), dateString);
});

test('it provides the month key', function (assert) {
  assert.equal(key.get('forMonth'), '2015-01');
});

test('it provides the day key', function (assert) {
  assert.equal(key.get('forDay'), '2015-01-01');
});
