import { module, test } from 'qunit';
import Calendar from 'ember-next-calendar/models/calendar';

var calendar;

module('Unit | calendar', {
  beforeEach: function() {
    calendar = Calendar.create();
  }
});

test("selectedDate is null", function(assert){
  assert.equal(calendar.get('selectedDate'), null);
});

test("can set selectedDate with a sting", function(assert) {
  calendar.setSelectedDate('2015-01-01');
  var selectedDayFormatted = calendar.get('selectedDate').format('YYYY-MM-DD');
  assert.equal(selectedDayFormatted, '2015-01-01');
});

test("can set selectedDate with a Date object", function(assert) {
  calendar.setSelectedDate(Date.parse('01/01/2015'));
  var selectedDateFormatted = calendar.get('selectedDate').format('YYYY-MM-DD');
  assert.equal(selectedDateFormatted, '2015-01-01');
});

test('setting selected date will create surrounding days', function (assert) {
  calendar.setSelectedDate('2015-01-01');
  var dayKeys = Object.keys(calendar.get('days'));
  assert.equal(dayKeys.length, 31);
});

test('setting selected date will create surrounding months', function (assert) {
  calendar.setSelectedDate('2015-01-01');
  var dayKeys = Object.keys(calendar.months);
  assert.equal(dayKeys.length, 1);
});

test('month is pointing to the same day instance as days', function (assert) {
  calendar.setSelectedDate('2015-01-01');
  var keyFromDays = '2015-01-01';
  var keyFromMonths = '2015-01.days.2015-01-01';
  assert.equal(calendar.get('days.' + keyFromDays), calendar.get('months.' + keyFromMonths));
});

test('each month will have only the days in that month', function (assert) {
  calendar.setSelectedDate('2015-01-01');
  var numberOfDays = Object.keys(calendar.findMonth('2015-01-01').get('days')).length;
  assert.equal(numberOfDays, 31);
});

test('can find a month', function (assert) {
  calendar.setSelectedDate('2015-01-01');
  assert.equal(calendar.findMonth('2015-01-01').get('date').format('YYYY-MM-DD'), '2015-01-01');
});
