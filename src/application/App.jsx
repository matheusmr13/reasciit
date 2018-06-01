import Reasciit from 'reasciit';

const Component = require('reasciit/Component');

class App extends Component {
	constructor() {
		super();
		this.state = {
			initial: new Date(),
			time: new Date()
		};
		this.startTimer();
	}

	startTimer() {
		const UPDATE_RATE = 2000;
		setInterval(() => {
			this.setState({
				time: new Date()
			});
		}, UPDATE_RATE);
	}

	_render() {
		const { time, initial } = this.state;
		return (
			<div style={{ textAlign: 'center' }}>
				<div style={{ border: 2, padding: 5, width: 70 }}>
					<div style={{ width: 50 }}>{time}</div>
					<div>Uptime {(time.getTime() - initial.getTime()) / 1000}s</div>
				</div>
			</div>
		);
	}
}

module.exports = App;
