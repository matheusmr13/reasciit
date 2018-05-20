
const prepend = (str, qtt, char = ' ') => `${Array(qtt).fill(char).join('')}${str}`;
const pospend = (str, qtt, char = ' ') => `${str}${Array(qtt).fill(char).join('')}`;

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

      // if (lastLineBegining !== line.length) {
      //   newMatrix.push(line.slice(lastLineBegining, line.length));
      // }
    });
  }
  return newMatrix;
};

const mergeMatrix = (dest, origin, x, y) => {
  for(let i = x, xOrigin = 0; xOrigin < origin.length; i++, xOrigin++) {
    for(let j = y, yOrigin = 0; yOrigin < origin[0].length; j++, yOrigin++) {
      dest[i] = dest[i] || [];
      dest[i][j] = origin[xOrigin][yOrigin];
    }
  }
}

const completeBlock = (matrix, x, y, xL, yL) => {
  for(let i = x; i < xL; i++) {
    for(let j = y; j < yL; j++) {
      matrix[i][j] = ' ';
    }
  }
}

const completeBlockBasedOnFirstLine = (matrix) => {
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = matrix[i][j] || ' ';
    }
  }
}

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
          completeBlock(newMatrix, nextLine, nextColumn, newMatrix.length, parent.width);
          nextLine = newMatrix.length;
          nextColumn = 0;
        }
        mergeMatrix(newMatrix, childMatrix, nextLine, nextColumn);
        nextColumn += childMatrix[0].length;
      }
    });

    completeBlockBasedOnFirstLine(newMatrix);

    return newMatrix;
  }

  static apply(matrix, style, parent) {
    const { width } = parent;
    let matrixStyled = matrix;
    if (style.display === 'block') {
      matrixStyled = breakLines(matrixStyled, style.width || width, style.wordWrap === 'break-all');

      if (style.textAlign === 'center') {
        matrixStyled = matrixStyled.map(line => {
          const rest = width - line.length;
          const halfSpace = rest / 2;
          const floatingPoint = (halfSpace % 1 === 0.5);
          const roundHalf = floatingPoint ? halfSpace - 0.5 : halfSpace;

          return Array(roundHalf + (floatingPoint && 1))
            .fill(' ')
            .concat(line)
            .concat(Array(roundHalf).fill(' '))
          });
      } else {
        matrixStyled = matrixStyled.map(line => {
          const rest = width - line.length;
          return line.concat(Array(rest).fill(' '))
        });
      }
    } else if (style.display === 'inline-block') {
      matrixStyled = breakLines(matrixStyled, style.width || width, style.wordWrap === 'break-all');

      matrixStyled = matrixStyled.map(line => {
        const rest = style.width - line.length;
        return line.concat(Array(rest).fill(' '))
      });
    }
    return matrixStyled;
  }
}

module.exports = Style;
