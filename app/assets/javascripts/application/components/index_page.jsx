class IndexPage extends React.Component {
    static get propTypes() {
        return {
            events: React.PropTypes.array.isRequired,
            pager: React.PropTypes.object.isRequired
        };
    }
    render() {
        return (
            <div>
                <h3>イベント一覧</h3>
                <EventList events={this.props.events}/>
                <Pager pager={this.props.pager}/>
            </div>
        );
    }
}
