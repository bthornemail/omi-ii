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
