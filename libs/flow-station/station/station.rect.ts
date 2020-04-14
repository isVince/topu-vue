import { Node } from 'topology-core/models/node';
import { Rect } from 'topology-core/models/rect';

export function flowStationIconRect(node: Node) {
    node.iconRect = new Rect(node.rect.x, node.rect.y + 10, node.rect.width, (node.rect.height * 2) / 3 - 20);
    node.fullIconRect = node.rect;
}

export function flowStationTextRect(node: Node) {
    node.textRect = new Rect(
        node.rect.x + 10,
        node.rect.y + (node.rect.height * 2) / 3,
        node.rect.width - 20,
        node.rect.height / 3 - 5
    );
    node.fullTextRect = node.rect;
}
