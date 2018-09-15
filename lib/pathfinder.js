
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
