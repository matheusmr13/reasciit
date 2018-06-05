import Window from 'ascii-dom/core/Window';

const Reasciit = require('reasciit');

const window = new Window(process.stdout, process.stdin, {
	openDevTools: true
});

let eventsDiv;
const events = [];

const updateDiv = () => {
	eventsDiv.props.children = events.map(event => (
		<div style={{ width: 20 }}>
			{event}
		</div>
	));
};

const onChange = (event) => {
	console.info(event);
	events.push(`Change: ${event.target.props.name}`);
	updateDiv();
};

const onFocus = (event) => {
	console.info(event);
	events.push(`Focus: ${event.target.props.name}`);
	updateDiv();
};

const app = (
	<div>
		<div style={{ border: 1, marginBottom: 2 }}>
			<div>Eventos</div>
			<div ref={(div) => { eventsDiv = div; }} />
		</div>
		<input
			name="first"
			onChange={onChange}
			onFocus={onFocus}
		/>
		<input
			name="second"
			onChange={onChange}
			onFocus={onFocus}
		/>
		<input
			name="third"
			onChange={onChange}
			onFocus={onFocus}
		/>
	</div>
);

window.render(app);
