class Admin::CalendarsController < AdminController
  http_basic_authenticate_with name: 'admin', password: ENV['ADMIN_PASSWORD']
  before_action do
    if request.format.html?
      respond_to do |format|
        format.html { render :index }
      end
    end
  end
  before_action :set_calendar, only: [:show, :update, :destroy]
  layout Proc.new { false if params[:format] == "json" }

  # GET /admin/calendars
  def index
    q = params.permit(:sort, :order, :page)
    @calendars = Calendar
                 .page(q.fetch(:page, 1)).per(10)
                 .order(q.fetch(:sort, :id) => q.fetch(:order, :desc))
  end

  # GET /admin/calendars/1
  def show
  end

  # GET /admin/calendars/new
  def new
    respond_to do |format|
      format.html
    end
  end

  # GET /admin/calendars/1/edit
  def edit
    respond_to do |format|
      format.html
    end
  end

  # POST /admin/calendars
  def create
    @calendar = Calendar.new(calendar_params)
    if @calendar.save
      render json: { notice: 'Calendar was successfully created.' }, status: :created
    else
      render json: { errors: @calendar.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin/calendars/1
  def update
    if @calendar.update(calendar_params)
      render json: { notice: 'Calendar was successfully updated.' }, status: :ok
    else
      render json: { errors: @calendar.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /admin/calendar/1
  def destroy
    @calendar.destroy
    render json: { notice: 'Calendar was successfully destroyed.' }
  end

  private
  def set_calendar
    @calendar = Calendar.find(params[:id])
  end

  def calendar_params
    params.require(:calendar).permit(:cid, :unitname, :unitname_kana)
  end
end
