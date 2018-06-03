import Reasciit from 'reasciit';

const funcToRender = require(`./../../${process.argv[2]}`).default;

process.stdout.write(Reasciit.renderToString(funcToRender(), new Reasciit(100)));
