import Element from 'ascii-dom/core/Element';

class Focusable extends Element {
	setFocus() {
		this.hasFocus = true;
		const { onFocus } = this.props;
		if (onFocus) {
			onFocus();
		}
	}
	blur() {
		this.hasFocus = false;
		const { onBlur } = this.props;
		if (onBlur) {
			onBlur();
		}
	}

	sendEvent(event) {
	}
}

export default Focusable;
