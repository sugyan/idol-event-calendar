class EventList extends React.Component {
    static get propTypes() {
        return {
            events: React.PropTypes.array.isRequired
        };
    }
    render() {
        var events = this.props.events.map(e => <EventListItem key={e.id} {...e}/>);
        return <ul className="list-unstyled">{events}</ul>;
    }
}

class EventListItem extends React.Component {
    static get propTypes() {
        return {
            calendar: React.PropTypes.object.isRequired,
            start: React.PropTypes.string.isRequired,
            summary: React.PropTypes.string.isRequired,
            location: React.PropTypes.string
        };
    }
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
