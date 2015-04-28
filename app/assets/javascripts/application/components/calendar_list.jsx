class CalendarList extends React.Component {
    render() {
        var calendars = this.props.calendars.map((e) => <CalendarListElement key={e.cid} {...e}/>);
        return <ul>{calendars}</ul>;
    }
}
CalendarList.propTypes = {
    calendars: React.PropTypes.array.isRequired
}

class CalendarListElement extends React.Component {
    render() {
        return (
            <li>
                {this.props.unitname} (<a href={"https://calendar.google.com/embed?src=" + this.props.cid} target="_blank">{this.props.summary}</a>)
            </li>
        );
    }
}
CalendarListElement.propTypes = {
    cid: React.PropTypes.string.isRequired,
    unitname: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string
}
