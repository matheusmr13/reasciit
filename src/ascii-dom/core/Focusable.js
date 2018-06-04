import Element from 'ascii-dom/core/Element';

class Focusable extends Element {
	setFocus() {
		this.hasFocus = true;
	}
	blur() {
		this.hasFocus = false;
	}

	sendEvent(event) {
	}


}

export default Focusable;
