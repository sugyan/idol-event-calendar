require 'google/api_client'

namespace :calendars do
  desc "Crawl calendars"
  task crawl: :environment do
    logger = Logger.new(STDOUT)
    client = Google::APIClient.new(
      :application_name => 'idol-calendar',
      :application_version => '1.0.0'
    )
    client.authorization = Signet::OAuth2::Client.new(
      :token_credential_uri => 'https://accounts.google.com/o/oauth2/token',
      :audience => 'https://accounts.google.com/o/oauth2/token',
      :scope => 'https://www.googleapis.com/auth/calendar.readonly',
      :issuer => ENV['GOOGLE_OAUTH_CLIENT_ID'],
      :signing_key => OpenSSL::PKey::RSA.new(ENV['GOOGLE_OAUTH_PRIVATE_KEY']),
    )
    client.authorization.fetch_access_token!
    api = client.discovered_api('calendar', 'v3')

    # Get calendars
    updated = []
    calendars = Calendar.order(:id).to_a
    while calendars.length > 0 do
      batch = Google::APIClient::BatchRequest.new
      calendars.slice!(0, 50).each do |calendar|
        batch.add(
          api_method: api.calendars.get,
          parameters: { 'calendarId' => calendar.cid },
        ) do |result|
          if result.success?
            logger.info(result.data.to_hash)
            calendar.touch
            calendar.update(
              summary: result.data.summary,
              description: result.data.description,
            )
            updated << calendar
          else
            logger.error(result.error_message)
          end
        end
      end
      client.execute(batch)
    end

    # Get events
    while updated.length > 0 do
      batch = Google::APIClient::BatchRequest.new
      updated.slice!(0, 50).each do |calendar|
        batch.add(
          api_method: api.events.list,
          parameters: {
            'calendarId' => calendar.cid,
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => Date.today.to_datetime,
            'timeMax' => Date.today.to_datetime >> 3,
          }
        ) do |result|
          if result.success?
            result.data.items.to_a.each do |e|
              logger.info(e.to_hash)
              event = Event.create_or_update(e.to_hash, calendar)
              event.touch
              logger.info(event)
            end
          else
            logger.error(result.error_message)
          end
        end
      end
      client.execute(batch)
    end
  end
end
