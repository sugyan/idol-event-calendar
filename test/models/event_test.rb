# coding: utf-8
require 'test_helper'

class EventTest < ActiveSupport::TestCase
  params = {"kind"=>"calendar#event", "etag"=>"\"2852950210552000\"", "id"=>"khl68k5kvnglji0nmpdm2bmkrg", "status"=>"confirmed", "htmlLink"=>"https://www.google.com/calendar/event?eid=a2hsNjhrNWt2bmdsamkwbm1wZG0yYm1rcmcgcm9qbWVmdGZiYjFrbWdvNDgzczhsMzhncTBAZw", "created"=>"2015-03-16T03:05:05.000Z", "updated"=>"2015-03-16T03:05:05.276Z", "summary"=>"仮スケジュール", "creator"=>{"email"=>"anna.and.yuna@gmail.com", "displayName"=>"西田プロジェクト"}, "organizer"=>{"email"=>"rojmeftfbb1kmgo483s8l38gq0@group.calendar.google.com", "displayName"=>"ANNA☆S", "self"=>true}, "start"=>{"date"=>"2015-06-26"}, "end"=>{"date"=>"2015-06-27"}, "transparency"=>"transparent", "iCalUID"=>"khl68k5kvnglji0nmpdm2bmkrg@google.com", "sequence"=>0, "reminders"=>{"useDefault"=>true}}

  test "create or update from hash" do
    calendar = Calendar.find(1)
    event = Event.create_or_update(params, calendar)
    assert event
    assert_equal event.summary, '仮スケジュール'
    assert_equal event.start.to_datetime, DateTime.new(2015, 6, 26, 0, 0, 0, '+9')
    assert_equal event.end.to_datetime,   DateTime.new(2015, 6, 27, 0, 0, 0, '+9')
    assert_equal Event.count, 3

    params["summary"] = '決定スケジュール'
    event = Event.create_or_update(params, calendar)
    assert event
    assert_equal event.summary, '決定スケジュール'
    assert_equal Event.count, 3
  end
end
