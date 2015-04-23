# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150423154131) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calendars", force: :cascade do |t|
    t.string   "cid"
    t.string   "unitname"
    t.string   "unitname_kana"
    t.text     "summary"
    t.text     "description"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "events", force: :cascade do |t|
    t.string   "eid"
    t.integer  "calendar_id"
    t.string   "location"
    t.text     "summary"
    t.text     "description"
    t.string   "html_link"
    t.datetime "start"
    t.datetime "end"
    t.datetime "event_created_at"
    t.datetime "event_updated_at"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "events", ["calendar_id"], name: "index_events_on_calendar_id", using: :btree
  add_index "events", ["eid"], name: "index_events_on_eid", unique: true, using: :btree

  add_foreign_key "events", "calendars"
end
