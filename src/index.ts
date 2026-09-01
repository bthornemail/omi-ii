import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
// Text modules are available behind the
// import 'data:text/javascript,console.log("hello!");';
// import _ from 'data:application/json,"world!"' with { type: 'json' };
import fooData from './foo.json' with { type: 'json' };
import { spawn } from 'node:child_process';
import { execPath } from 'node:process';
// const { default: barData } = await import('./bar.json', { with: { type: 'json' } });
import bind from './commands/bind';
import apply from './commands/apply';
import clause from './commands/clause';
import notation from './commands/notation';
import unfold from './commands/unfold';
import closure from './commands/closure';
import coordinate from './commands/coordinate';
import combinator from './commands/combinator';

function boundry(principles: PRINCIPLE[]) { }
function constraint(ideals: IDEAL[]) { }
function rule(ideal, principle, boundry: string[], constraint: string[]) { };
function fact(idea, rules: [], logic: [], matrix: [][]) { };

async function construct() { };
function configuration() { };
function diagram() { };
export { apply, bind, rule, fact, clause, notation, construct, closure, combinator, configuration, coordinate, diagram, fold, unfold, presentation };