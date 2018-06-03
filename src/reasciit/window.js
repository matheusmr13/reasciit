const CLEAR_CHAR = '\x1B[2J';
class Reasciit {
	constructor(app) {
		this.app = app;
	}

	clear() {
		process.stdout.write(CLEAR_CHAR);
	}

	draw() {
		this.clear();
		process.stdout.write();
	}
}
