import Element from 'ascii-dom/core/Element';

class Focusable extends Element {
	setFocus() {
		this.hasFocus = true;
		const { onFocus } = this.props;
		if (onFocus) {
			onFocus({
				target: this
			});
		}
	}
	blur() {
		this.hasFocus = false;
		const { onBlur } = this.props;
		if (onBlur) {
			onBlur({
				target: this
			});
		}
	}

	sendEvent(event) {
	}
}

export default Focusable;
