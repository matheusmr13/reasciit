const Terminom = require('terminom');

const StaticApp = () => (
	<div style={{ textAlign: 'center' }}>
		<div style={{ border: 2, padding: 5, width: 70 }}>
			<div style={{ width: 50 }}>My text</div>
			<div>my other text</div>
		</div>
	</div>
);

console.info(StaticApp());

module.exports = StaticApp;
