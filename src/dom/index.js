const fs = require('fs');

class Document {
  constructor(columns) {
    this.columns = columns;
  }

  toString() {
    const reduceTillElement = matrix => matrix.reduce((array, element) => [
      ...array,
      ...(Array.isArray(element) ? reduceTillElement(element) : [element])
    ], []);

    const elements = this.render().filter(element => !!element);
    const reduced = reduceTillElement(elements);

    const mappedToString = reduced.map(element => element.render({
      width: this.columns
    }));

    return mappedToString.join('\n');
  }

  save(file) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, this.toString(), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = Document;
