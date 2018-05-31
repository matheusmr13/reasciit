const Reasciit = require('reasciit');
const App = require('./App');

Reasciit.createApp(<App />).then(() => {
	process.exit(1);
});
