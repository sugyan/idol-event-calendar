class EditCalendar extends React.Component {
    constructor() {
        this.state = {};
    }
    componentDidMount() {
        $.get(this.context.router.makePath('show', { id: this.context.router.getCurrentParams().id }) + ".json", (result) => {
            this.setState({
                calendar: result.calendar
            });
        });
    }
    render() {
        var form = {
            action: this.context.router.makePath('show', { id: this.context.router.getCurrentParams().id }),
            method: 'PATCH',
            submit: '更新する'
        };
        var calendar = this.state.calendar && <CalendarForm {...this.props} form={form} calendar={this.state.calendar}/>;
        return (
            <div>
                <h1>Editing calendar</h1>
                {calendar}
                <ReactRouter.Link to="show" params={{id: this.context.router.getCurrentParams().id}} className="btn btn-link">Show</ReactRouter.Link>
                <ReactRouter.Link to="index" className="btn btn-link">Back</ReactRouter.Link>
            </div>
        );
    }
}
EditCalendar.contextTypes = { router: React.PropTypes.func };
EditCalendar.propTypes = {
    updateNotice: React.PropTypes.func.isRequired
};
