class EventShow extends React.Component {
    render() {
        return (
            <dl className="dl-horizontal">
                <dt>カレンダー</dt>
                <dd><a href={`https://www.google.com/calendar/embed?src=${this.props.calendar.cid}`} target="_blank">{this.props.calendar.unitname}</a></dd>
                <dt>イベント名</dt>
                <dd>{this.props.summary}</dd>
                <dt>日時</dt>
                <dd>{this.props.start} 〜 {this.props.end}</dd>
                <dt>場所</dt>
                <dd>{this.props.location}</dd>
                <dt>詳細</dt>
                <dd><pre>{this.props.description}</pre></dd>
                <dt>作成日時</dt>
                <dd>{this.props.event_created_at}</dd>
                <dt>更新日時</dt>
                <dd>{this.props.event_updated_at}</dd>
                <dt>GoogleカレンダーURL</dt>
                <dd><a href={this.props.html_link} target="_blank">{this.props.html_link}</a></dd>
            </dl>
        );
    }
}
EventShow.propTypes = {
    calendar: React.PropTypes.object.isRequired,
    summary: React.PropTypes.string.isRequired,
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    description: React.PropTypes.string,
    event_created_at: React.PropTypes.string.isRequired,
    event_updated_at: React.PropTypes.string.isRequired,
    html_link: React.PropTypes.string.isRequired
};
