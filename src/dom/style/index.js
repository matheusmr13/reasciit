
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

				if (isLastChar || shouldBreakCauseNextIsSpace) {
					lastSpaceIndex = index + 1;
					ignoreNextSpace = true;
					newMatrix.push(line.slice(lastLineBegining, lastSpaceIndex));
					lastLineBegining = lastSpaceIndex + 1;
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

const renderBorders = (matrix, width, style) => {
	let result = [...matrix];
	if (style.borderTop) {
		result = Array(style.borderTop).fill(Array(width).fill('-')).concat(result);
	}
	if (style.borderBottom) {
		result = result.concat(Array(style.borderTop).fill(Array(width).fill('-')));
	}
	return result;
};

const renderPadding = (matrix, width, style) => {
	let result = [...matrix];
	if (style.paddingTop) {
		result = Array(style.paddingTop).fill(Array(width).fill(' ')).concat(result);
	}
	if (style.paddingBottom) {
		result = result.concat(Array(style.paddingBottom).fill(Array(width).fill(' ')));
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
		const { width } = parent;
		const elementWidth = style.width || width;

		let matrixStyled = matrix;
		if (style.display === 'block') {
			matrixStyled = breakLines(matrixStyled, elementWidth, style.wordWrap === 'break-all');
			matrixStyled = renderPadding(matrixStyled, elementWidth, style);
			matrixStyled = renderBorders(matrixStyled, elementWidth, style);
			matrixStyled = alignText(matrixStyled, style, width);
		} else if (style.display === 'inline-block') {
			matrixStyled = breakLines(matrixStyled, elementWidth, style.wordWrap === 'break-all');
			matrixStyled = alignText(matrixStyled, style, elementWidth);
		} else if (style.display === 'inline') {
			return matrixStyled;
		}

		return matrixStyled;
	}
}

module.exports = Style;
