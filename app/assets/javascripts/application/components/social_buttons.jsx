class SocialButtons extends React.Component {
    componentDidMount() {
        if (typeof twttr === 'undefined') {
            ((d,s,id) => {
                var js,fjs=d.getElementsByTagName(s)[0];
                if(!d.getElementById(id)){js=d.createElement(s);
                    js.id=id;
                    js.src="//platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js,fjs);
                }
            })(document,"script","twitter-wjs");
        } else {
            twttr.widgets.load();
        }
    }
    render() {
        return (
            <div style={{ margin: '10px 0' }}>
                <div className="pull-right" style={{ marginLeft: 10 }}>
                    <a href="http://b.hatena.ne.jp/entry/s/idol-event-calendar.herokuapp.com/" className="hatena-bookmark-button" data-hatena-bookmark-title="アイドルイベントカレンダー" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加">
                        <img src="//b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style={{border: "none"}}/>
                    </a>
                </div>
                <div className="pull-right" style={{ marginLeft: 10 }}>
                    <a href="https://twitter.com/share" className="twitter-share-button" data-url="https://idol-event-calendar.herokuapp.com/" data-lang="ja">ツイート</a>
                </div>
            </div>
        );
    }
}
