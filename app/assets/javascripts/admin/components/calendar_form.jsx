class CalendarForm extends React.Component {
    constructor() {
        this.state = {
            alerts: [],
            values: {
                cid: "",
                unitname: "",
                unitname_kana: ""
            }
        };
    }
    handleSubmit(e) {
        e.preventDefault();

        $.ajax({
            url: this.props.form.action,
            method: this.props.form.method,
            data: { calendar: this.state.values },
            success: (result) => {
                this.props.updateNotice(result.notice);
                this.context.router.transitionTo('index');
            },
            error: (jqXHR) => {
                this.setState({
                    alerts: jqXHR.responseJSON.errors
                });
            }
        });
    }
    handleChange(name, e) {
        var values = this.state.values;
        values[name] = e.target.value;
        this.setState({ values: values });
    }
    componentWillMount() {
        if (this.props.calendar) {
            var values = {};
            ['cid', 'unitname', 'unitname_kana'].forEach((e) => { values[e] = this.props.calendar[e] });
            this.setState({ values: values });
        }
    }
    render() {
        var alert;
        if (this.state.alerts.length > 0) {
            var messages = this.state.alerts.map((e, i) => <li key={i}>{e}</li>);
            alert = <div className="alert alert-danger">{messages}</div>;
        }
        var id = this.props.calendar && (
            <div className="form-group">
                <label className="col-sm-2 control-label">ID</label>
                <div className="col-sm-10">
                    <input className="form-control" value={this.props.calendar.id} readOnly/>
                </div>
            </div>
        );
        return (
            <div>
                {alert}
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    {id}
                    <div className="form-group">
                        <label className="col-sm-2 control-label">cid</label>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.values.cid} onChange={this.handleChange.bind(this, "cid")}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">ユニット名</label>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.values.unitname} onChange={this.handleChange.bind(this, "unitname")}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">ユニット名 (かな)</label>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.values.unitname_kana} onChange={this.handleChange.bind(this, "unitname_kana")}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <input type="submit" className="btn btn-primary" value={this.props.form.submit}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
CalendarForm.contextTypes = { router: React.PropTypes.func };
CalendarForm.propTypes = {
    form: React.PropTypes.object.isRequired,
    updateNotice: React.PropTypes.func.isRequired
};
