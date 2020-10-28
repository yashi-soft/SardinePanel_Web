<template>
  <el-select ref="selectTreeWarp" :value="valueTitle" :clearable="clearable" :placeholder="placeholderText" :style="myStyle" :disabled="disabled" @clear="clearHandle">
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="optionsInside"
        :props="props"
        :lazy="lazy"
        highlight-current
        :node-key="props.value"
        :load="loadNode"
        :expand-on-click-node="expandOnClickNode"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>

import { fetchChidList } from '@/api/administrativeManage'
import { fetchwgList } from '@/api/gridManage'
export default {
  name: 'ElTreeSelect',
  props: {
    // 配置项
    props: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        value: 'id', // ID字段名
        label: 'title', // 显示名称
        children: 'children' // 子级字段名
      }
    },
    onlyChildChoice: { type: Boolean, default: false },
    placeholderText: { type: String, default: '请选择' },
    myStyle: { type: String, default: 'width:300px;' },
    // 选项列表数据(树形结构的对象数组)
    // eslint-disable-next-line vue/require-valid-default-prop
    options: { type: Array, default: [] },

    // 初始值
    value: { type: String, default: '' },
    type: { type: String, default: '' },

    // 可清空选项
    clearable: { type: Boolean, default: true },

    // 自动收起
    accordion: { type: Boolean, default: false },
    // 懒加载
    lazy: { type: Boolean, default: false },
    // 禁止编辑
    disabled: { type: Boolean, default: false },
    expandOnClickNode: { type: Boolean, default: true },
    // 懒加载需传中文
    fggText: { type: String, default: '' }
  },
  data() {
    return {
      valueId: null,
      valueTitle: '',
      optionsInside: [],
      defaultExpandedKey: []
    }
  },
  watch: {
    // value() {
    //   console.log('watch', this.value)
    //   this.valueId = this.value
    //   this.initHandle()
    // },
    value: { // 深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        const that = this
        console.log('watch-tree-oldVal:', oldVal)
        console.log('watch-tree-val:', val)
        that.valueId = val
        setTimeout(function() {
          that.initHandle()
        }, 1)
      },
      deep: true, // true 深度监听
      immediate: true // 开启首次监听赋值（不开启首次监听不到）
    },
    options() {
      this.optionsInside = this.options
    }
  },
  mounted() {
    // console.log('mounted', this.value)
    // this.valueId = this.value // 初始值
    // this.initHandle()
    // console.log('mounted')
  },
  created() {
    new Promise(resolve => { // 未知bug必须异步才能加载树
      resolve()
    }).then(val => {
      this.optionsInside = this.options
    })
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        const fggNode = this.$refs.selectTree.getNode(this.valueId)
        console.log('fggNode', fggNode)
        if (!fggNode) {
          // this.clearHandle()
          if (this.fggText) {
            this.valueTitle = this.fggText
          }
        } else {
          let useFggNode = fggNode
          let valueTitle = useFggNode.data[this.props.label]
          for (let i = 1; i < fggNode.level; i++) {
            useFggNode = useFggNode.parent
            valueTitle = useFggNode.data[this.props.label] + '-' + valueTitle
          }
          this.valueTitle = valueTitle // 初始化显示
          // this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label] // 初始化显示
          this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
          this.defaultExpandedKey = [this.valueId] // 设置默认展开
        }
      } else {
        this.clearHandle()
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        // eslint-disable-next-line no-return-assign
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },
    // 切换选项
    handleNodeClick(data, node) {
      // this.valueTitle = data[this.props.label]
      console.log('----tree------')
      console.log(data)
      if (this.type === 'yx') {
        if (this.onlyChildChoice && data.gridType !== 4) {
          const valueId = this.valueId ? this.valueId : null
          this.$refs.selectTree.setCurrentKey(valueId) // 设置选中
          return
        } else {
          this.$refs.selectTreeWarp.blur()
        }
        this.valueId = data[this.props.value]
        this.$emit('getSelectTreeValue', this.valueId)
        this.$emit('getSelectTreetData', data)
      } else {
        if (this.onlyChildChoice && data.adminType !== 3) {
          const valueId = this.valueId ? this.valueId : null
          this.$refs.selectTree.setCurrentKey(valueId) // 设置选中
          return
        } else {
          this.$refs.selectTreeWarp.blur()
        }
        this.valueId = data[this.props.value]
        this.$emit('getSelectTreeValue', this.valueId)
        this.$emit('getSelectTreetData', data)
      // this.defaultExpandedKey = []
      }
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      if (this.$refs.selectTree) {
        this.$refs.selectTree.setCurrentKey(null)
      }
      this.$emit('getSelectTreeValue', null)
      this.$emit('getSelectTreetData', null)
    },
    loadNode(node, resolve) {
      if (this.type && this.type === 'wg') {
        if (node.data && node.data.id) {
          if (node.isLeafByUser) {
            resolve([])
          } else {
            const postData = { 'pid': node.data.id }
            fetchwgList(postData).then(response => {
              let arr = []
              if (response && response.length) { // 过滤id相同的元素
                arr = response.filter((element, index, self) => {
                  return self.findIndex(el => el.id === element.id) === index
                })
              }
              resolve(arr)
            }).catch(() => {
            })
          }
        }
      } else {
        if (node.data && node.data.id) {
          if (node.isLeafByUser) {
            resolve([])
          } else {
            const postData = { 'id': node.data.id, 'memberType': this.$store.getters.token.memberType }
            fetchChidList(postData).then(response => {
              resolve(response)
            }).catch(() => {
            })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
