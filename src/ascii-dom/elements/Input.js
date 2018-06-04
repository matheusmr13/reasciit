import Focusable from 'ascii-dom/core/Focusable';
import Style from 'ascii-dom/style';

class Input extends Focusable {
	static defaultStyle = {
		border: 1
	}

	constructor(props) {
		super(props);

		this.value = 'a';
	}

	sendEvent(event) {
		if (event.type === 'key') {
			this.value = `${this.value}${event.key}`;
		}
		this.window.redraw();
	}

	render(window, parent) {
		this.window = window;
		this.width = this.props.style.width || parent.width;
		const { value, hasFocus } = this;
		return Style.apply([((hasFocus ? '>' : '') + value).split('')], this.props.style, parent);
	}
}

export default Input;
