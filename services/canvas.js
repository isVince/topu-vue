import { registerNode } from 'topology-core/middles'
import { flowStation, flowStationAnchors, flowStationIconRect, flowStationTextRect} from '@/libs/flow-station' 
export function canvasRegister() {
    registerNode(
        'flowStation',
        flowStation,
        flowStationAnchors,
        flowStationIconRect,
        flowStationTextRect
  )
}

export const Tools = [
    {
        group: '元件 ',
        children: [
            {
                name: '电闸',
                icon: 'icon-ebrake',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue609',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '变压器',
                icon: 'icon-transiformer',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue60a',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '开关',
                icon: 'icon-onoff',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue610',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '电池a',
                icon: 'icon-cell-a',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue60e',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '电池b',
                icon: 'icon-cell-b',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue604',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
        ]
    },
    {
      group: '设备 ',
        children: [
            {
                name: '储能站',
                icon: 'icon-station',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue605',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '电网',
                icon: 'icon-enet',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue60d',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: 'EMS',
                icon: 'icon-ems',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue611',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: '充电桩',
                icon: 'icon-echaring',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue602',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: 'PCS',
                icon: 'icon-pcs',
                data: {
                    text: '',
                    stationName: 'Test储能站',
                    rect: {
                        width: 80,
                        height: 70
                    },
                    name: 'flowStation',
                    icon: '\ue607',
                    iconFamily: 'iconfont',
                    iconColor: '#2f54eb'
                }
            },
        ]
    }
]
