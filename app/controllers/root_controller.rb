# coding: utf-8
class RootController < ApplicationController
  def index
    events = Event.eager_load(:calendar).where('start >= ?', Date.today).order(:start).page(1).per(50)
    @json = Jbuilder.encode do |json|
      json.events(events) do |event|
        json.extract! event, :id, :eid, :summary, :location
        if event.start.strftime('%H%M%S') == '000000'
          json.start I18n.l(event.start, format: '%-m/%-d(%a)')
        else
          json.start I18n.l(event.start, format: '%-m/%-d(%a) %H:%M')
        end
        json.calendar do
          json.unitname event.calendar.unitname
        end
      end
    end
  end

  def show
    event = Event.find_by eid: params[:eid]
    @json = Jbuilder.encode do |json|
      json.extract! event, :summary, :location, :description, :html_link
      json.start I18n.l(event.start, format: '%-m月%-d日(%a) %H:%M')
      json.end I18n.l(event.end, format: '%-m月%-d日(%a) %H:%M')
      json.event_created_at event.event_created_at.strftime('%Y-%m-%d %H:%M:%S')
      json.event_updated_at event.event_updated_at.strftime('%Y-%m-%d %H:%M:%S')
      json.calendar do
          json.cid event.calendar.cid
          json.unitname event.calendar.unitname
      end
    end
  end

  def calendars
    calendars = Calendar.order(:unitname_kana)
    @json = Jbuilder.encode do |json|
      json.calendars(calendars) do |calendar|
        json.extract! calendar, :cid, :unitname, :summary
      end
    end
  end

  def about
  end
end
