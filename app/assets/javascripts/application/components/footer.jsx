class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <SocialButtons/>
                </div>
                <div className="container">
                    <div className="text-right">
                        <p className="credit">created by <a href="https://twitter.com/sugyan">@sugyan</a></p>
                    </div>
                </div>
                <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charSet="utf-8" async="async"></script>
            </footer>
        );
    }
}
