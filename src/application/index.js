const Reasciit = require('./../dom');
const App = require('./App');

Reasciit.createApp(<App />).then(() => {
	process.exit(1);
});
