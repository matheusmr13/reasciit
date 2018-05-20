const Element = require('./Element');
const Span = require('./Span');
const Line = require('./Line');

class Table extends Element {
	constructor(definition, data) {
		super();
		this.definition = definition;
		const totalOccupiedWidth = Object.keys(definition)
			.map(key => this.definition[key])
			.reduce((totalWidth, column) => {
				if (!column.width && this.columnWithoutWidth) {
					throw new Error('More then one column without width');
				} else if (!column.width) {
					this.columnWithoutWidth = column;
				}
				return totalWidth + (column.width || 0);
			}, 0);

		if (!this.columnWithoutWidth) {
			throw new Error('One column must not have width specified to adequate to all resolutions');
		}
		this.totalOccupiedWidth = totalOccupiedWidth;
		this.data = data;
	}

	render(parentStyle) {
		this.columnWithoutWidth.width = parentStyle.width - this.totalOccupiedWidth;

		const columnTitles = Object.keys(this.definition)
			.map(key => this.definition[key])
			.map(column => new Span(column.title, column.width));

		const renderLine = item => new Line()
			.children(Object.keys(this.definition)
				.map(key => this.definition[key])
				.map(column => new Span(column.render(item), column.width)));

		const lines = this.data.map(line => renderLine(line).render());

		return [
			new Line().children(columnTitles).render(),
			lines
		];
	}
}

module.exports = Table;
