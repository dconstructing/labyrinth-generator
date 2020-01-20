import * as generator from './generator.js';

let m = generator.maze(6,6);
let d = generator.display(m);
console.log(d);