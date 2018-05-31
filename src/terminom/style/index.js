
const breakLines = (matrix, width, breakAll) => {
	let newMatrix = [];

	if (breakAll) {
		matrix.forEach((line) => {
			const parts = Math.ceil(line.length / width);
			const newLines = Array(parts)
				.fill('')
				.map((item, index) => line.slice(index * width, (index + 1) * width));
			newMatrix = newMatrix.concat(newLines);
		});
	} else {
		matrix.forEach((line) => {
			let lastSpaceIndex = 0;
			let lastLineBegining = 0;
			let charCountPerLine = 0;
			let ignoreNextSpace = false;
			line.forEach((char, index) => {
				if (ignoreNextSpace) {
					ignoreNextSpace = false;
					return;
				}

				charCountPerLine = index - lastLineBegining;

				if (char === ' ') {
					lastSpaceIndex = index;
				}

				const isLastChar = index === (line.length - 1);
				const shouldBreak = charCountPerLine && charCountPerLine === (width - 1);
				const shouldBreakCauseNextIsSpace = (shouldBreak && line[index + 1] === ' ');
				const wordIsTooBigToLine = shouldBreak && (lastLineBegining === (lastSpaceIndex + 1));

				if (isLastChar || shouldBreakCauseNextIsSpace) {
					lastSpaceIndex = index + 1;
					ignoreNextSpace = true;
					newMatrix.push(line.slice(lastLineBegining, lastSpaceIndex));
					lastLineBegining = lastSpaceIndex + 1;
				} else if (wordIsTooBigToLine) {
					newMatrix.push(line.slice(lastLineBegining, index + 1));
					lastSpaceIndex = index;
					lastLineBegining = index + 1;
				} else if (shouldBreak) {
					newMatrix.push(line.slice(lastLineBegining, lastSpaceIndex));
					lastLineBegining = lastSpaceIndex + 1;
				}
			});
		});
	}
	return newMatrix;
};

const mergeMatrix = (dest, origin, x, y) => {
	const result = [...dest];
	for (let i = x, xOrigin = 0; xOrigin < origin.length; i += 1, xOrigin += 1) {
		for (let j = y, yOrigin = 0; yOrigin < origin[0].length; j += 1, yOrigin += 1) {
			result[i] = result[i] || [];
			result[i][j] = origin[xOrigin][yOrigin];
		}
	}
	return result;
};

const completeBlock = (matrix, x, y, xL, yL) => {
	const result = [...matrix];
	for (let i = x; i < xL; i += 1) {
		for (let j = y; j < yL; j += 1) {
			result[i][j] = ' ';
		}
	}
	return result;
};

const completeBlockBasedOnFirstLine = (matrix) => {
	const result = [...matrix];
	for (let i = 0; i < result.length; i += 1) {
		for (let j = 0; j < result[0].length; j += 1) {
			result[i][j] = result[i][j] || ' ';
		}
	}
	return result;
};

const desmemberSpacialProp = (obj, prop) => {
	const newObj = { ...obj };
	const spacialSufixes = ['Top', 'Bottom', 'Left', 'Right'];

	const masterProp = newObj[prop] || 0;
	spacialSufixes.forEach((sufix) => {
		const spacialProp = `${prop}${sufix}`;
		if (typeof newObj[spacialProp] === 'undefined' && masterProp) {
			newObj[`${prop}${sufix}`] = masterProp;
		}
	});

	delete newObj[prop];
	return newObj;
};

const desmemberStyle = (style) => {
	let dismemberedStyle = { ...style };
	const spacialProps = ['padding', 'border', 'margin'];
	spacialProps.forEach((prop) => {
		dismemberedStyle = desmemberSpacialProp(dismemberedStyle, prop);
	});
	return dismemberedStyle;
};

const borderAllSides = (matrix, top, right, bottom, left) => {
	let result = [...matrix];

	if (top > 0) {
		result = Array(1).fill(Array(matrix[0].length).fill('-')).concat(result);
	}
	if (bottom > 0) {
		result = result.concat(Array(1).fill(Array(matrix[0].length).fill('-')));
	}
	if (left > 0) {
		result = result.map((line, i) => {
			if ((!i && top > 0) || (i === (result.length - 1) && bottom > 0)) {
				return Array(1).fill('+').concat(line);
			}
			return Array(1).fill('|').concat(line);
		});
	}
	if (right > 0) {
		result = result.map((line, i) => {
			if ((!i && top > 0) || (i === (result.length - 1) && bottom > 0)) {
				return line.concat(Array(1).fill('+'));
			}
			return line.concat(Array(1).fill('|'));
		});
	}
	return result;
};


const renderBorders = (matrix, width, style) => {
	let result = [...matrix];
	const {
		borderTop = 0,
		borderBottom = 0,
		borderLeft = 0,
		borderRight = 0
	} = style;

	const maxValue = Math.max(borderTop, borderBottom, borderLeft, borderRight);
	Array(maxValue).fill(0).forEach((v, index) => {
		result = borderAllSides(
			result,
			borderTop - index,
			borderRight - index,
			borderBottom - index,
			borderLeft - index,
		);
	});
	return result;
};

const renderMargin = (matrix, width, style) => {
	let result = [...matrix];
	const {
		marginTop,
		marginBottom,
		marginLeft,
		marginRight
	} = style;
	if (marginTop) {
		result = Array(marginTop).fill(Array(matrix[0].length).fill(' ')).concat(result);
	}
	if (marginBottom) {
		result = result.concat(Array(marginBottom).fill(Array(matrix[0].length).fill(' ')));
	}
	if (marginLeft) {
		result = result.map(line => Array(marginLeft).fill(' ').concat(line));
	}
	if (marginRight) {
		result = result.map(line => line.concat(Array(marginLeft).fill(' ')));
	}
	return result;
};
const renderPadding = (matrix, width, style) => {
	let result = [...matrix];
	const {
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight
	} = style;
	if (paddingTop) {
		result = Array(paddingTop).fill(Array(width).fill(' ')).concat(result);
	}
	if (paddingBottom) {
		result = result.concat(Array(paddingBottom).fill(Array(width).fill(' ')));
	}
	if (paddingLeft) {
		result = result.map(line => Array(paddingLeft).fill(' ').concat(line));
	}
	if (paddingRight) {
		result = result.map(line => line.concat(Array(paddingLeft).fill(' ')));
	}
	return result;
};

const alignText = (matrix, style, width) => {
	if (style.textAlign === 'center') {
		return matrix.map((line) => {
			const rest = width - line.length;
			const halfSpace = rest / 2;
			const floatingPoint = (halfSpace % 1 === 0.5);
			const roundHalf = floatingPoint ? halfSpace - 0.5 : halfSpace;

			return Array(roundHalf + (floatingPoint && 1))
				.fill(' ')
				.concat(line)
				.concat(Array(roundHalf).fill(' '));
		});
	}
	if (style.textAlign === 'left') {
		return matrix.map((line) => {
			const rest = width - line.length;
			return line.concat(Array(rest).fill(' '));
		});
	}
	if (style.textAlign === 'right') {
		return matrix.map((line) => {
			const rest = width - line.length;
			return Array(rest).fill(' ').concat(line);
		});
	}
	throw new Error(`Text align value "${style.textAlign}" not supported.`);
};

class Style {
	static applyToSyblings(children, style, window, parent) {
		let nextLine = 0;
		let nextColumn = 0;
		let newMatrix = [[]];

		if (children.filter(child => typeof child === 'string').length === children.length) {
			const reducedString = [children.join('').split('')];
			return Style.apply(reducedString, style, parent);
		}

		children.forEach((child) => {
			const childMatrix = child.render(window, parent);
			if (child.props.style.display === 'inline-block') {
				const hasChildBrokedBounds = childMatrix[0].length > (parent.width - newMatrix[0].length);
				if (hasChildBrokedBounds) {
					newMatrix = completeBlock(
						newMatrix,
						nextLine,
						nextColumn,
						newMatrix.length,
						parent.width
					);
					nextLine = newMatrix.length;
					nextColumn = 0;
				}
				newMatrix = mergeMatrix(newMatrix, childMatrix, nextLine, nextColumn);
				nextColumn += childMatrix[0].length;
			} else if (child.props.style.display === 'block') {
				const firstLine = (newMatrix.length === 1 && nextColumn === 0 && newMatrix[0].length);
				const nextBlockLine = firstLine ? 0 : newMatrix.length;
				newMatrix = mergeMatrix(newMatrix, childMatrix, nextBlockLine, 0);
				nextColumn = 0;
				nextLine = newMatrix.length;
			} else if (child.props.style.display === 'inline') {
				// newMatrix = renderInline(newMatrix, childMatrix, nextLine, nextColumn);
			}
		});
		newMatrix = completeBlockBasedOnFirstLine(newMatrix);

		return Style.apply(newMatrix, style, parent);
	}

	static apply(matrix, style, parent) {
		const verboseStyle = desmemberStyle(style);
		const { width } = parent;
		const elementWidth = style.width || width;

		let matrixStyled = matrix;
		if (style.display === 'block') {
			const contentWidth = elementWidth -
				['borderLeft', 'borderRight', 'paddingLeft', 'paddingRight', 'marginLeft', 'marginRight']
					.map(prop => verboseStyle[prop] || 0)
					.reduce((occupiedWidth, prop) => occupiedWidth + prop, 0);

			matrixStyled = breakLines(matrixStyled, contentWidth, style.wordWrap === 'break-all');
			matrixStyled = alignText(matrixStyled, verboseStyle, contentWidth);
			matrixStyled = renderPadding(matrixStyled, contentWidth, verboseStyle);
			matrixStyled = renderBorders(matrixStyled, contentWidth, verboseStyle);
			matrixStyled = renderMargin(matrixStyled, contentWidth, verboseStyle);
		} else if (verboseStyle.display === 'inline-block') {
			matrixStyled = breakLines(matrixStyled, elementWidth, verboseStyle.wordWrap === 'break-all');
			matrixStyled = alignText(matrixStyled, verboseStyle, elementWidth);
		} else if (verboseStyle.display === 'inline') {
			return matrixStyled;
		}

		return matrixStyled;
	}
}

module.exports = Style;
