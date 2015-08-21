import { module, test } from 'qunit';
import Ember from 'ember';
import Weeks from 'ember-next-calendar/models/weeks';
import Key from 'ember-next-calendar/models/key';
import DaysOfMonth from 'ember-next-calendar/models/days-of-month';

module('Unit | week', {
  beforeEach: function() {
    console.log('dougs');
  }
});

test('can prepare for the template', function (assert) {
  var allDays = Ember.Object.create();
  var allMonths = Ember.Object.create();
  var date = moment();
  var year = 1998;
  var setDays = function (allDays, days) {
    Object.keys(days).forEach( function (dayKey) {
      allDays.set(dayKey, days.get(dayKey));
    });
  };

  while (year < 2003) {
    date.year(year);
    var month = 0;
    while (month < 12) {
      date.month(month);
      var key = Key.create({ date: date });
      var daysOfMonth = DaysOfMonth.create({ key: key });
      var days = daysOfMonth.getDays();
      setDays(allDays, days);
      allMonths.set(key.get('forMonth'), days);
      month ++;
    }
    year ++;
  }

  Object.keys(allMonths).forEach( function (monthKey) {
    var days = allMonths.get(monthKey);
    var weeks = Weeks.create({ allDays: allDays, days: days });
    // weeks[0][0]
    weeks.forEach( function (week) {
      debugger
    //   assert.equal(week.length, 7);
    //   week.map( function (day) {
    //     return day;
    //   });
    });
  });
});
