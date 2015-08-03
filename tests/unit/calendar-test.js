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
