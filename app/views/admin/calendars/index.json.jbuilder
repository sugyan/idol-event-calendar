columns = [:id, :cid, :unitname, :unitname_kana, :created_at, :updated_at]
json.calendars do
  json.cols columns.map{|c|
    [c, Calendar.human_attribute_name(c)]
  }
  json.rows do
    json.array!(@calendars) do |calendar|
      values = columns.map do |c|
        next calendar.created_at.localtime.to_s(:db) if c == :created_at
        next calendar.updated_at.localtime.to_s(:db) if c == :updated_at
        calendar[c]
      end
      json.id calendar.id
      json.values values
      json.url admin_calendar_url calendar, :format => :json
    end
  end
end
json.page do
  json.prev @calendars.prev_page
  json.next @calendars.next_page
  json.current @calendars.current_page
  json.total @calendars.total_pages
  json.total_count @calendars.total_count
  json.offset_value @calendars.offset_value
end
