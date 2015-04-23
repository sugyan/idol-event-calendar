class Event < ActiveRecord::Base
  belongs_to :calendar

  def self.create_or_update(params, calendar)
    event = Event.find_or_initialize_by(eid: params['id'])
    event.update(
      calendar: calendar,
      html_link:  params['htmlLink'],
      event_created_at: params['created'],
      event_updated_at: params['updated'],
      summary: params['summary'],
      description: params['description'],
      location: params['location'],
      start: params['start']['dateTime'] || params['start']['date'],
      end: params['end']['dateTime'] || params['end']['date'],
    )
    event
  end
end
