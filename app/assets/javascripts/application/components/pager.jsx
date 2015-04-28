class Pager extends React.Component {
    static get propTypes() {
        return {
            pager: React.PropTypes.object.isRequired
        };
    }
    render() {
        return (
            <nav>
                <ul className="pager">
                    <PrevPage link={this.props.pager.prev_page}/>
                    <NextPage link={this.props.pager.next_page}/>
                </ul>
            </nav>
        )
    }
}

class PrevPage extends React.Component {
    static get propTypes() {
        return {
            link: React.PropTypes.string
        };
    }
    render() {
        var link = this.props.link && <a href={this.props.link}><span aria-hidden="true">&larr;</span> 前</a>;
        return <li className="previous">{link}</li>;
    }
}

class NextPage extends React.Component {
    static get propTypes() {
        return {
            link: React.PropTypes.string
        };
    }
    render() {
        var link = this.props.link && <a href={this.props.link}>次 <span aria-hidden="true">&rarr;</span></a>;
        return <li className="next">{link}</li>;
    }
}
