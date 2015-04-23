json.calendar do
  json.extract! @calendar, :id, :cid, :unitname, :unitname_kana, :summary, :description, :created_at, :updated_at
end
