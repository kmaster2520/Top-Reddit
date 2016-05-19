var scoreRegex = /\\d*,(?= "approved_by")/g;

var Display = React.createClass({
    getInitialState: function() {
        return {result: '-'};
    },
    getResult: function(query) {
        $.ajax({
            url: query.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var score = data.data.children[0].data.score;
                this.setState({result: score});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({result: '-'});
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <Form onSubmit={this.getResult}/>
                <p className="text-center">Top Post Score</p>
                <h2 className="text-center"> {this.state.result}</h2>
            </div>
        );
    }
});

var Form = React.createClass ({
    getInitialState: function() {
        return {query: ''};
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.state.query.trim();
        if (!text) {
            return;
        }
        var url = 'https://www.reddit.com/r/' + text + '/top/.json?limit=1';
        this.props.onSubmit({url: url});
    },
    textChanged: function(e) {
        this.setState({query: e.target.value});
    },
    render: function() {
        return (
            <form className="queryForm container center-block" onSubmit={this.handleSubmit}>
                <input className="col-xs-offset-4 col-xs-3" type="text" placeholder="Enter subreddit" value={this.state.query} onChange={this.textChanged} />
                <input className="col-xs-1" type="submit" value="Search" />
            </form>
        );
    }
});

ReactDOM.render(
    <Display />,
    document.getElementById('content')
);