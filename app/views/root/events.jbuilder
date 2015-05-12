json.array!(@events) do |event|
  json.id event.eid
  json.title event.summary
  json.start_at event.start.to_i
  json.description [event.calendar.unitname, event.description].join("\n\n")
  json.url event.html_link
end
