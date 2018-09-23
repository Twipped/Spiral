
import { intersect, shape }  from 'svg-intersections';

export default function pathfinder (x, y, nodes) {
  var match = false;
  nodes.forEach((node) => {
    var arc = shape(node.nodeType, node); // 35º arch
    var line = shape('line', { x1: x, y1: y, x2: x, y2: 1000 }); // Diagonal right-down
    var result = intersect(arc, line);
    if (result.points.length % 2) match = node;
  });
  return match;
}

export function artToSVG (node) {
  var args = [ ...node ];
  var pull = (length) => (length ? args.splice(0, length) : []);

  var directions = {
    /* MOVE_TO  */ 0: () => [ 'M', pull(2) ],
    /* CLOSE    */ 1: () => [ 'Z', pull(0) ],
    /* LINE_TO  */ 2: () => [ 'L', pull(2) ],
    /* CURVE_TO */ 3: () => [ 'T', pull(6) ],
    /* ARC      */ 4: () => [ 'A', pull(6) ],
  };

  var result = [];
  while (args.length) {
    const type = args.splice(0, 1);
    const dir = directions[type];
    if (!dir) { break; }
    const [ instruction, points ] = dir();
    result.push(
      instruction + points.join(',')
    );
  }

  return result.join(' ');
}
