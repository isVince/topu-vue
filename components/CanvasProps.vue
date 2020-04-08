<template>
  <div>
    <!-- 选中为空 -->
    <div v-if="!props.node && !props.line && !props.multi">
      <!--<div class="title">属性</div>
      <div class="group">
     
      </div>
      <div class="title">属性1</div>
      <div class="group">

      </div>-->
      <div class="bottom">
        <div class="title">操作Tips</div>
        <ul class="group">
          <li>方向键：控制节点移动5个像素</li>
          <li>Ctrl + 方向键：控制节点移动1个像素</li>
          <li>Ctrl + 鼠标移动：移动整个画布</li>
          <li>Ctrl + 鼠标滚轮：缩放</li>
          <!--<li>添加或选中节点，右侧属性支持上传各种图片哦</li>-->
        </ul>
      </div>
    </div>
    <!-- 选中节点 -->
    <div v-if="props.node">
      <div class="title">行为</div>
      <div class="items">
        <div class="flex grid">
          <div>锁定</div>
        </div>
        <div class="flex grid">
          <el-radio-group v-model="radio">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="title">基本</div>
      <div class="items">
        <div class="flex grid">
          厂站名缩写：
          <el-input size="mini" v-model="input1"></el-input>
        </div>
        <div class="flex grid">
          电压等级：
          <el-input size="mini" v-model="input1"></el-input>
        </div>
        <div class="flex grid">
          上级单元：
          <el-input size="mini" v-model="input1"></el-input>
        </div>
        <div class="flex grid">
          设备简称：
          <el-input size="mini" v-model="input1"></el-input>
        </div>
        <div class="flex grid">
          设备说明：
          <el-input size="mini" v-model="input1"></el-input>
        </div>
      </div>
      <!--<div class="title">设备标签</div>
      <div class="items">
        <div class="flex grid">
          标签颜色
        </div>
      </div>-->
        <div class="title">数据</div>
        <div class="items">
          <div class="flex grid">
            当前状态：
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="title">位置和大小</div>
        <div class="items">
          <div class="flex grid">
            <div>X（px）</div>
            <div class="ml5">Y（px）</div>
          </div>
          <div class="flex grid">
            <div>
              <el-input-number v-model="props.node.rect.x"
                               controls-position="right"
                               @change="onChange"></el-input-number>
            </div>
            <div class="ml5">
              <el-input-number v-model="props.node.rect.y"
                               controls-position="right"
                               @change="onChange"></el-input-number>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="flex grid">
            <div>宽（px）</div>
            <div class="ml5">高（px）</div>
          </div>
          <div class="flex grid">
            <div>
              <el-input-number v-model="props.node.rect.width"
                               controls-position="right"
                               @change="onChange"></el-input-number>
            </div>
            <div class="ml5">
              <el-input-number v-model="props.node.rect.height"
                               controls-position="right"
                               @change="onChange"></el-input-number>
            </div>
          </div>
        </div>
        <div class="title">杂项</div>
        <div class="items">
          <div class="flex grid">
            变量名：
            <el-input size="mini" v-model="input1"></el-input>
          </div>
          <div class="flex grid">
            参与拓扑：
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex grid">
            是否投运：
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex grid">
            引用：
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex grid">
            子类型：
            <el-input size="mini" v-model="input1"></el-input>
          </div>
        </div>
      </div>
    </div>
</template>

<script >
export default {
  data() {
    return {
      radio: 1,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      input1: "",
        value:''
    }
  },
  props: {
    props: {
      type: Object,
      require: true
    }
  },
  methods: {
    onChange(value) {
      console.log(this.props);
      this.$emit('change', this.props.node)
    }
  }
}
</script>

<style lang="scss">
.star {
  display: block;
  color: #f60 !important;
  text-decoration: underline;
  margin-bottom: 0.1rem;
}

.title {
  color: #0d1a26;
  font-weight: 600;
  padding: 0.05rem 0.15rem;
  border-bottom: 1px solid #ccc;
}

.group {
  margin: 0.1rem 0 0.2rem 0.3rem;
  padding: 0;

  a,
  li {
    line-height: 2;
  }

  li {
    list-style: initial;
  }
}

.bottom {
  position: absolute;
  bottom: 0.1rem;
}

.items {
  padding: 0.05rem 0.15rem;

  .el-input-number {
    width: initial;
    line-height: 0.32rem;

    .el-input__inner {
      padding-left: 0;
      height: 0.34rem;
      line-height: 0.34rem;
    }

    .el-input-number__increase {
      line-height: 0.16rem;
    }
  }
}

.formItem {
  margin-bottom: 0.1rem;
}
</style>
