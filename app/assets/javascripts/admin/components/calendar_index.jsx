class CalendarsIndex extends React.Component {
    constructor() {
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {
        this.reload();
    }
    componentDidMount() {
        this.reload();
    }
    reload() {
        $.ajax({
            url: this.context.router.getCurrentPathname().replace(/\/$/, '') + ".json",
            data: this.context.router.getCurrentQuery(),
            success: (result) => {
                this.setState(result);
            }
        });
    }
    render() {
        return (
            <div>
                <h1>Calendars</h1>
                {this.state.page && <p>全{this.state.page.total_count}件中 {this.state.page.offset_value + 1}〜{this.state.page.offset_value + this.state.calendars.rows.length}件目</p>}
                <CalendarsTable {...this.state.calendars} reload={this.reload.bind(this)} updateNotice={this.props.updateNotice}/>
                {this.state.page && <Pagination {...this.state.page}/>}
                <ReactRouter.Link to="new" className="btn btn-default">New</ReactRouter.Link>
            </div>
        );
    }
}
CalendarsIndex.contextTypes = { router: React.PropTypes.func };
CalendarsIndex.propTypes = {
    updateNotice: React.PropTypes.func.isRequired
};

class CalendarsTable extends React.Component {
    updateOrder(e) {
        e.preventDefault();
        var query = {
            sort: e.currentTarget.dataset.column
        };
        if (query.sort === this.context.router.getCurrentQuery().sort && ! this.context.router.getCurrentQuery().order) {
            query.order = "asc";
        }
        this.context.router.transitionTo('index', null, query);
    }
    render() {
        var cols = (this.props.cols || []).map((e, i) => {
            var chevron;
            if (e[0] === this.context.router.getCurrentQuery().sort) {
                chevron = <span className={"glyphicon glyphicon-chevron-" + (this.context.router.getCurrentQuery().order ? "up" : "down")}/>
            }
            return (
                <th className="text-nowrap" key={i}>
                    <a href="" data-column={e[0]} onClick={this.updateOrder.bind(this)}>
                        {e[1]} {chevron}
                    </a>
                </th>
            );
        });
        var rows = (this.props.rows || []).map((e, i) => <CalendarRow key={i} {...e} reload={this.props.reload} updateNotice={this.props.updateNotice}/>);
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        {cols}
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
CalendarsTable.contextTypes = { router: React.PropTypes.func };
CalendarsTable.propTypes = {
    cols: React.PropTypes.array,
    rows: React.PropTypes.array,
    reload: React.PropTypes.func.isRequired,
    updateNotice: React.PropTypes.func.isRequired
};

class CalendarRow extends React.Component {
    handleClickDelete(e) {
        e.preventDefault();

        if (! confirm('Are you sure?')) {
            return;
        }
        $.ajax({
            url: this.props.url,
            method: 'DELETE',
            success: (result) => {
                this.props.updateNotice(result.notice, true);
                this.props.reload();
            }
        });
    }
    render() {
        var cols = this.props.values.map((e, i) => <td key={i}>{e}</td>);
        cols.push([
            <td><ReactRouter.Link to="show" params={{id: this.props.id}}>Show</ReactRouter.Link></td>,
            <td><ReactRouter.Link to="edit" params={{id: this.props.id}}>Edit</ReactRouter.Link></td>,
            <td><a href="" onClick={this.handleClickDelete.bind(this)}>Delete</a></td>,
        ]);
        return <tr>{cols}</tr>;
    }
}
CalendarRow.propTypes = {
    id: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
    reload: React.PropTypes.func.isRequired,
    updateNotice: React.PropTypes.func.isRequired
};
