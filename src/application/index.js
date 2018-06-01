const Reasciit = require('reasciit');
const App = require('./App');

Reasciit.render(<App />).then(() => {
	process.exit(1);
});
