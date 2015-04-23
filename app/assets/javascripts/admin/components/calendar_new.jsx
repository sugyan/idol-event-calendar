class NewCalendar extends React.Component {
    render() {
        var form = {
            action: this.context.router.makePath('index'),
            method: 'POST',
            submit: '登録する'
        };
        return (
            <div>
                <h1>New Calendar</h1>
                <CalendarForm {...this.props} form={form}/>
                <ReactRouter.Link to="index" className="btn btn-link">Back</ReactRouter.Link>
            </div>
        );
    }
}
NewCalendar.contextTypes = { router: React.PropTypes.func };
NewCalendar.propTypes = {
    updateNotice: React.PropTypes.func.isRequired
};
