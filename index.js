import util from 'util';
import * as generator from './generator.js';

let m = generator.maze(3,3);
console.log(util.inspect(m, {depth: null}));
let d = generator.display(m);
console.log(d);