class AdminCalendars extends React.Component {
    constructor() {
        this.state = {
            notice: null,
            noticeShown: true
        };
    }
    updateNotice(message, shown) {
        this.setState({
            notice: message,
            noticeShown: shown
        });
    }
    componentWillReceiveProps(props) {
        if (this.state.noticeShown) {
            this.setState({ notice: null });
        } else {
            this.setState({ noticeShown: true });
        }
    }
    handleClickCloseAlert(e) {
        this.setState({ notice: null });
    }
    render() {
        var notice;
        if (this.state.notice) {
            notice = (
                <div className="alert alert-success alert-dismissible">
                    <button className="close" type="button" aria-label="Close"><span aria-hidden="true" onClick={this.handleClickCloseAlert.bind(this)}>×</span></button>
                    {this.state.notice}
                </div>
            );
        }
        return (
            <div>
                {notice}
                <ReactRouter.RouteHandler updateNotice={this.updateNotice.bind(this)}/>
            </div>
        );
    }
}

$(() => {
    var routes = (
        <ReactRouter.Route path="/admin/calendars/?" handler={AdminCalendars}>
            <ReactRouter.Route name="new" handler={NewCalendar}/>
            <ReactRouter.Route name="show" path="/admin/calendars/:id" handler={ShowCalendar}/>
            <ReactRouter.Route name="edit" path="/admin/calendars/:id/edit" handler={EditCalendar}/>
            <ReactRouter.DefaultRoute name="index" handler={CalendarsIndex}/>
        </ReactRouter.Route>
    );
    ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler) => {
        React.render(<Handler/>, document.getElementById('main'));
    });
});
