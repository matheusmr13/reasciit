const Reasciit = require('../../').default;
const App = require('../App');

jest.setTimeout(1000000);
it('should render application', (done) => {
	// setTimeout(() => {
		console.info(<App />);
		console.info(Reasciit.createApp(<App />));
		// done();
	// }, 10000);
});
