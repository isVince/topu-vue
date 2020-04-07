<template>
  <div class="page">
    <div class="tools">
      <div v-for="(item, index) in tools" :key="index">
        <div class="title">{{ item.group }}</div>
        <div class="buttons">
          <a
            v-for="(btn, i) in item.children"
            :key="i"
            :title="btn.name"
            :draggable="btn.data"
            @dragstart="onDrag($event, btn)"
          >
            <i :class="`iconfont ${btn.icon}`"></i>
          </a>
        </div>
      </div>
    </div>
    <div id="topology-canvas" class="full" @contextmenu="onContextMenu($event)"></div>
    <div class="props">
      <CanvasProps :props.sync="props" @change="onUpdateProps"></CanvasProps>
    </div>
    <div class="context-menu" v-if="contextmenu.left" :style="this.contextmenu">
      <CanvasContextMenu :canvas="canvas" :props.sync="props"></CanvasContextMenu>
    </div>
  </div>
</template>

<script>
import { Topology } from 'topology-core'
import { Node } from 'topology-core/models/node'
import { Line } from 'topology-core/models/line'
import * as FileSaver from 'file-saver'

import { Tools, canvasRegister } from '~/services/canvas'

import CanvasProps from '~/components/CanvasProps'
import CanvasContextMenu from '~/components/CanvasContextMenu'

export default {
  data() {
    return {
      tools: Tools,
      canvas: {},
      canvasOptions: {
        rotateCursor: '/img/rotate.cur'
      },
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      }
    }
  },
  components: {
    CanvasProps,
    CanvasContextMenu
  },
  computed: {
    event() {
      return this.$store.state.event.event
    }
  },
  watch: {
    event(curVal) {
      if (this['handle_' + curVal.name]) {
        this['handle_' + curVal.name](curVal.data)
      }
    },
    $route(val) {
      this.open()
    }
  },
  created() {
    canvasRegister()
    if (process.client) {
      document.onclick = event => {
        this.contextmenu = {
          left: null,
          top: null,
          bottom: null
        }
      }
    }
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
    this.open()
  },
  methods: {
    async open() {
      if (!this.$route.query.id) {
        return
      }
      const data = await this.$axios.$get(
        '/api/topology/' + this.$route.query.id
      )
      if (data && data.id) {
        this.canvas.open(data.data)
      }
    },

    onDrag(event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    },

    onMessage(event, data) {
      // console.log('onMessage:', event, data)
      switch (event) {
        case 'node':
        case 'addNode':
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          break
        case 'line':
        case 'addLine':
          this.props = {
            node: null,
            line: data,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          break
        case 'multi':
          this.props = {
            node: null,
            line: null,
            multi: true,
            nodes: data.nodes.length > 1 ? data.nodes : null,
            locked: this.getLocked(data)
          }
          break
        case 'space':
          this.props = {
            node: null,
            line: null,
            multi: false,
            nodes: null,
            locked: false
          }
          break
        case 'moveOut':
          break
        case 'moveNodes':
        case 'resizeNodes':
          if (data.length > 1) {
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data,
              locked: this.getLocked({ nodes: data })
            }
          } else {
            this.props = {
              node: data[0],
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
          }
          break
        case 'resize':
        case 'scale':
        case 'locked':
          if (this.canvas && this.canvas.data) {
            this.$store.commit('canvas/data', {
              scale: this.canvas.data.scale || 1,
              lineName: this.canvas.data.lineName,
              fromArrowType: this.canvas.data.fromArrowType,
              toArrowType: this.canvas.data.toArrowType,
              fromArrowlockedType: this.canvas.data.locked
            })
          }
          break
      }
    },

    getLocked(data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }

      return locked
    },

    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    },

    handle_new(data) {
      this.canvas.open({ nodes: [], lines: [] })
    },

    handle_open(data) {
      this.handle_replace(data)
    },

    handle_replace(data) {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = event => {
        const elem = event.srcElement || event.target
        if (elem.files && elem.files[0]) {
          const name = elem.files[0].name.replace('.json', '')
          const reader = new FileReader()
          reader.onload = e => {
            const text = e.target.result + ''
            try {
              const data = JSON.parse(text)
              if (
                data &&
                Array.isArray(data.nodes) &&
                Array.isArray(data.lines)
              ) {
                this.canvas.open(data)
              }
            } catch (e) {
              return false
            }
          }
          reader.readAsText(elem.files[0])
        }
      }
      input.click()
    },

    handle_save(data) {
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        `le5le.topology.json`
      )
    },

    handle_savePng(data) {
      this.canvas.saveAsImage('le5le.topology.png')
    },

    handle_saveSvg(data) {
      const ctx = new C2S(
        this.canvas.canvas.width + 200,
        this.canvas.canvas.height + 200
      )
      for (const item of this.canvas.data.nodes) {
        item.render(ctx)
      }

      for (const item of this.canvas.data.lines) {
        item.render(ctx)
      }

      let mySerializedSVG = ctx.getSerializedSvg()
      mySerializedSVG = mySerializedSVG.replace(
        '<defs/>',
        `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
      )

      mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x')

      const urlObject = window.URL || window
      const export_blob = new Blob([mySerializedSVG])
      const url = urlObject.createObjectURL(export_blob)

      const a = document.createElement('a')
      a.setAttribute('download', 'le5le.topology.svg')
      a.setAttribute('href', url)
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      a.dispatchEvent(evt)
    },

    handle_undo(data) {
      this.canvas.undo()
    },

    handle_redo(data) {
      this.canvas.redo()
    },

    handle_copy(data) {
      this.canvas.copy()
    },

    handle_cut(data) {
      this.canvas.cut()
    },

    handle_parse(data) {
      this.canvas.parse()
    },

    handle_state(data) {
      this.canvas.data[data.key] = data.value
      this.$store.commit('canvas/data', {
        scale: this.canvas.data.scale || 1,
        lineName: this.canvas.data.lineName,
        fromArrowType: this.canvas.data.fromArrowType,
        toArrowType: this.canvas.data.toArrowType,
        fromArrowlockedType: this.canvas.data.locked
      })
    },

    onContextMenu(event) {
      event.preventDefault()
      event.stopPropagation()

      if (event.clientY + 360 < document.body.clientHeight) {
        this.contextmenu = {
          left: event.clientX + 'px',
          top: event.clientY + 'px'
        }
      } else {
        this.contextmenu = {
          left: event.clientX + 'px',
          bottom: document.body.clientHeight - event.clientY + 'px'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  width: 100%;
  height: 100%;

  .tools {
    flex-shrink: 0;
    width: 1.75rem;
    background-color: #f8f8f8;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;

    .title {
      color: #0d1a26;
      font-weight: 600;
      font-size: 0.12rem;
      line-height: 1;
      padding: 0.05rem 0.1rem;
      margin-top: 0.08rem;
      border-bottom: 1px solid #ddd;

      &:first-child {
        border-top: none;
      }
    }

    .buttons {
      padding: 0.1rem 0;
      a {
        display: inline-block;
        color: #314659;
        line-height: 1;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        text-decoration: none !important;

        .iconfont {
          font-size: 0.24rem;
        }
      }
    }
  }

  .full {
    flex: 1;
    width: initial;
    position: relative;
    overflow: auto;
    background: #fff;
  }

  .props {
    flex-shrink: 0;
    width: 2.4rem;
    padding: 0.1rem 0;
    background-color: #f8f8f8;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    position: relative;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}
</style>
