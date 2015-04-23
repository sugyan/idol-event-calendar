class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :eid
      t.references :calendar, index: true, foreign_key: true
      t.string :location
      t.text :summary
      t.text :description
      t.string :html_link
      t.datetime :start
      t.datetime :end
      t.datetime :event_created_at
      t.datetime :event_updated_at

      t.timestamps null: false
    end
    add_index :events, :eid, unique: true
  end
end
