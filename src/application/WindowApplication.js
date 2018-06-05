import Window from 'ascii-dom/core/Window';

const Reasciit = require('reasciit');

const window = new Window(process.stdout, process.stdin, {
	openDevTools: true
});
const events = [];

const onChange = (value) => {
	events.push(`Change: ${value}`);
};

const onFocus = (value) => {
	events.push(`Focus: ${value}`);
};

const app = (
	<div>
		<div style={{ border: 1, marginBottom: 2 }}>
			<div>Eventos</div>
			{
				events.map(event => (
					<div>
						{event}
					</div>
				))
			}
		</div>
		<input
			onChange={onChange}
			onFocus={onFocus}
		/>
		<input
			onChange={onChange}
			onFocus={onFocus}
		/>
		<input
			onChange={onChange}
			onFocus={onFocus}
		/>
	</div>
);

window.render(app);
