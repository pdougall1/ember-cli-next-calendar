import { module, test } from 'qunit';
import Month from 'ember-next-calendar/models/month';

var month;

module('Unit | month', {
  beforeEach: function() {
    month = Month.create();
  }
});

test("month exists", function(assert){
  assert.notEqual(month, null);
});

