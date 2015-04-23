class EventList extends React.Component {
    render() {
        var events = this.props.events.map((e) => <EventListItem key={e.id} {...e}/>);
        return <ul className="list-unstyled">{events}</ul>;
    }
}
EventList.propTypes = {
    events: React.PropTypes.array.isRequired
};

class EventListItem extends React.Component {
    render() {
        return (
            <li style={{padding:"0.15em 0"}}>
                <strong className="text-nowrap">{this.props.start}</strong>
                <span className="label label-success" style={{margin:"0.4em"}}>{this.props.calendar.unitname}</span>
                <a href={"/event/" + this.props.eid}>{this.props.summary}</a>
                <small className="text-muted" style={{margin:"0.4em"}}>{this.props.location}</small>
            </li>
        );
    }
}
EventListItem.propTypes = {
    calendar: React.PropTypes.object.isRequired,
    start: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
    location: React.PropTypes.string
};
