import { registerNode } from 'topology-core/middles';
import { flowStation, flowStationAnchors, flowStationIconRect, flowStationTextRect } from './station';

export function register() {
    registerNode('flowStation', flowStation, flowStationAnchors, flowStationIconRect, flowStationTextRect);
}
