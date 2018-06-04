import Window from 'ascii-dom/core/Window';

const Reasciit = require('reasciit');

const onChange = (value) => {
	console.info(`Change: ${value}`);
};

const onFocus = (value) => {
	console.info(`Focus: ${value}`);
};

const app = (
	<div>
		<div style={{ border: 1, marginBottom: 2 }}>Teste de input</div>
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

const window = new Window(process.stdout, process.stdin);
window.render(app).then(() => {
});
