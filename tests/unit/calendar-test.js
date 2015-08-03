import { module, test } from 'qunit';
import Calendar from 'ember-next-calendar/models/calendar';

var calendar;

module('Unit | calendar', {
  beforeEach: function() {
    calendar = Calendar.create();
  }
});

test("selectedDay is null", function(assert){
  assert.equal(calendar.get('selectedDay'), null);
});

test("can set selectedDay with a sting", function(assert) {
  calendar.setSelectedDay('2015-01-01');
  var selectedDayFormatted = calendar.get('selectedDay').format('YYYY-MM-DD');
  assert.equal(selectedDayFormatted, '2015-01-01');
});

test("can set selectedDay with a Date object", function(assert) {
  calendar.setSelectedDay(Date.parse('01/01/2015'));
  var selectedDayFormatted = calendar.get('selectedDay').format('YYYY-MM-DD');
  assert.equal(selectedDayFormatted, '2015-01-01');
});

