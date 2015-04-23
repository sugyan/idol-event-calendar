# coding: utf-8
require 'test_helper'

class CalendarTest < ActiveSupport::TestCase
  test "should save calendar with valid parameters" do
    calendar = Calendar.new({ cid: 'hoge', unitname: 'ほげ', unitname_kana: 'ふが' })
    assert calendar.save
  end

  test "should not save calendar without cid, unitname, unitname_kana" do
    calendar = Calendar.new
    assert_not calendar.save

    calendar = Calendar.new({ cid: 'hoge' })
    assert_not calendar.save
  end

  test "should not save calendar with invalid unitname_kana" do
    calendar = Calendar.new({ cid: 'hoge', unitname: 'ほげ' })

    calendar.unitname_kana = 'fuga'
    assert_not calendar.save

    calendar.unitname_kana = 'fugaふが'
    assert_not calendar.save
  end
end
