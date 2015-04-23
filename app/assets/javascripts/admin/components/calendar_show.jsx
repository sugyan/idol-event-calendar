class ShowCalendar extends React.Component {
    constructor() {
        this.state = {
            calendar: []
        };
    }
    componentDidMount() {
        $.get(this.context.router.getCurrentPathname() + ".json", (result) => {
            this.setState({
                calendar: result.calendar
            });
        });
    }
    render() {
        var attributes = Object.keys(this.state.calendar).map((e, i) => {
            return (
                <div key={i}>
                    <dt>{e}</dt>
                    <dd>{this.state.calendar[e]}</dd>
                </div>
            );
        });
        return (
            <div>
                <h1>Calendar</h1>
                <dl className="dl-horizontal">{attributes}</dl>
                <ReactRouter.Link to="edit" params={{id: this.context.router.getCurrentParams().id}} className="btn btn-link">Edit</ReactRouter.Link>
                <ReactRouter.Link to="index" className="btn btn-link">Back</ReactRouter.Link>
            </div>
        );
    }
}
ShowCalendar.contextTypes = { router: React.PropTypes.func };
