class CreateCalendars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.string :cid
      t.string :unitname
      t.string :unitname_kana
      t.text :summary
      t.text :description

      t.timestamps null: false
    end
  end
end
