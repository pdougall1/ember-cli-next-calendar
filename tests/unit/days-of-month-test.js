import { module, test } from 'qunit';
import Key from 'ember-next-calendar/models/key';
import DaysOfMonth from 'ember-next-calendar/models/days-of-month';

var daysOfMonth, key;

module('Unit | daysOfMonth', {
  beforeEach: function() {
    key = Key.create({ date: '2015-01-01' });
    daysOfMonth = DaysOfMonth.create({ key: key });
  }
});

test('it must have a key', function (assert) {
  assert.equal(daysOfMonth.get('key'), key);
});

test('it provides the days of the month', function (assert) {
  var days = daysOfMonth.getDays();
  var keys = Object.keys(days);
  assert.deepEqual(keys, ["2015-01-01","2015-01-02","2015-01-03","2015-01-04","2015-01-05","2015-01-06","2015-01-07","2015-01-08","2015-01-09","2015-01-10","2015-01-11","2015-01-12","2015-01-13","2015-01-14","2015-01-15","2015-01-16","2015-01-17","2015-01-18","2015-01-19","2015-01-20","2015-01-21","2015-01-22","2015-01-23","2015-01-24","2015-01-25","2015-01-26","2015-01-27","2015-01-28","2015-01-29","2015-01-30","2015-01-31"]);
  keys.forEach( function (key) {
    assert.equal(key, days[key].get('date').format('YYYY-MM-DD'));
  });
});

test('for all months in 5 years', function (assert) {
  var date = moment();
  var year = 1998;
  while (year < 2003) {
    date.year(year);
    var month = 0;
    while (month < 12) {
      date.month(month);
      key = Key.create({ date: date });
      daysOfMonth = DaysOfMonth.create({ key: key });
      var dayKeys = Object.keys(daysOfMonth.getDays());
      var lastDay = moment(date).endOf('month').date();
      assert.equal(dayKeys.length, lastDay);
      assert.equal(dayKeys[0].split('-')[2], '01');
      assert.equal(dayKeys[dayKeys.length -1].split('-')[2], lastDay);
      month ++;
    }
    year ++;
  }
});
