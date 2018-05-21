
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

class Style {
	static applyToSyblings(children, style, parent) {
		let nextLine = 0;
		let nextColumn = 0;
		let newMatrix = [[]];
		children.forEach((child) => {
			const childMatrix = child.render(parent);
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
			}

			if (child.props.style.display === 'block') {
				const firstLine = (newMatrix.length === 1 && nextColumn === 0);
				const nextBlockLine = firstLine ? 0 : newMatrix.length;
				newMatrix = mergeMatrix(newMatrix, childMatrix, nextBlockLine, 0);
				nextColumn = 0;
				nextLine = newMatrix.length;
			}
		});

		newMatrix = completeBlockBasedOnFirstLine(newMatrix);

		return newMatrix;
	}

	static apply(matrix, style, parent) {
		const { width } = parent;
		let matrixStyled = matrix;
		if (style.display === 'block') {
			matrixStyled = breakLines(matrixStyled, style.width || width, style.wordWrap === 'break-all');

			if (style.textAlign === 'center') {
				matrixStyled = matrixStyled.map((line) => {
					const rest = width - line.length;
					const halfSpace = rest / 2;
					const floatingPoint = (halfSpace % 1 === 0.5);
					const roundHalf = floatingPoint ? halfSpace - 0.5 : halfSpace;

					return Array(roundHalf + (floatingPoint && 1))
						.fill(' ')
						.concat(line)
						.concat(Array(roundHalf).fill(' '));
				});
			} else if (style.textAlign === 'left') {
				matrixStyled = matrixStyled.map((line) => {
					const rest = width - line.length;
					return line.concat(Array(rest).fill(' '));
				});
			} else if (style.textAlign === 'right') {
				matrixStyled = matrixStyled.map((line) => {
					const rest = width - line.length;
					return Array(rest).fill(' ').concat(line);
				});
			} else {
				throw new Error(`Text align value "${style.textAlign}" not supported.`);
			}
		} else if (style.display === 'inline-block') {
			matrixStyled = breakLines(matrixStyled, style.width || width, style.wordWrap === 'break-all');

			matrixStyled = matrixStyled.map((line) => {
				const rest = style.width - line.length;
				return line.concat(Array(rest).fill(' '));
			});
		}
		return matrixStyled;
	}
}

module.exports = Style;
