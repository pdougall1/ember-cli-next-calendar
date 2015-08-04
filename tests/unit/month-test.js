import { module, test } from 'qunit';
import Month from 'ember-next-calendar/models/month';
import Day from 'ember-next-calendar/models/day';

var month;

module('Unit | month', {
  beforeEach: function() {
    month = Month.create({ date: '2015-01-01' });
  }
});

test('can add a day', function (assert) {
  var dateString = '2015-01-01';
  var day = Day.create({ date: dateString });
  month.addDay(day);
  assert.equal(month.get('days.' + dateString), day);
});

test('can find a day', function (assert) {
  var dateString = '2015-01-01';
  var day = Day.create({ date: dateString });

  month.addDay(day);
  assert.equal(month.findDay(dateString), day);
});
