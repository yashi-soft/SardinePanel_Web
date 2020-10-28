<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" :model="menu" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="类型" prop="isCatalog">
        <el-radio-group v-model="menu.isCatalog" @change="changeType">
          <el-radio v-if="menuType == '0'" :label="10">目录</el-radio>
          <el-radio v-if="menuType == '0' || menuType == '1'" :label="20">菜单</el-radio>
          <el-radio v-if="menuType == '0' || menuType == '1'|| menuType == '2'" :label="30">功能按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="menu.isCatalog=='10'">
        <el-form-item label="目录名称">
          <el-input v-model="menu.menuName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="菜单路由">
          <el-input v-model="menu.menuPath" auto-complete="off" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="menu.sort" :step="1" :min="0" :max="1000000" controls-position="right" />
        </el-form-item>
      </template>
      <template v-if="menu.isCatalog=='20'">
        <el-form-item label="菜单名称">
          <el-input v-model="menu.menuName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" prop="menuPid">
          <!-- <el-input v-model="menu.parentName" auto-complete="off" readonly="readonly" @click.native="showMenuTree" /> -->
          <SelectTree
            :props="defaultProps"
            :options="optionsData"
            :clearable="true"
            :accordion="true"
            :value="menuPid"
            :disabled="disabled"
            @getSelectTreeValue="getSelectTreeValue($event)"
            @getSelectTreetData="getSelectTreetData($event)"
          />
        </el-form-item>
        <el-form-item label="菜单路由">
          <el-input v-model="menu.menuPath" auto-complete="off" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="menu.sort" :step="1" :min="0" :max="1000000" controls-position="right" />
        </el-form-item>
      </template>
      <template v-if="menu.isCatalog=='30'">
        <el-form-item label="功能名称">
          <el-input v-model="api.apiName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属菜单" prop="apiPid">
          <SelectTree
            :props="defaultProps"
            :options="optionsData"
            :clearable="true"
            :accordion="true"
            :value="apiPid"
            :disabled="disabled"
            @getSelectTreeValue="getSelectTreeValue2($event)"
            @getSelectTreetData="getSelectTreetData2($event)"
          />
        </el-form-item>
        <el-form-item label="请求接口">
          <el-input v-model="api.apiUrl" auto-complete="off" />
        </el-form-item>
        <el-form-item label="传参类型">
          <el-select v-model="api.apiMethod">
            <el-option label="POST" value="POST" />
            <el-option label="DELETE" value="DELETE" />
            <el-option label="PUT" value="PUT" />
            <el-option label="GET" value="GET" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="api.sort" :step="1" :min="0" :max="1000000" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否配置">
          <el-select v-model="api.ifUsual">
            <el-option label="常用" value="1" />
            <el-option label="非常用" value="0" />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button type="primary" @click="commitEvent">立即提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addMenu, editMenu, addApi, editApi, getApi } from '@/api/menu'
import SelectTree from '@/components/SelectTree'
export default {
  name: 'MyDialog',
  components: { SelectTree },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    optionsData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchText: '',
      menuPid: '',
      apiPid: '',
      disabled: false,
      dialogType: '',
      menuType: '0',
      menu: {
        menuId: '',
        isCatalog: 10,
        menuName: '',
        menuPath: '',
        description: '',
        pid: ''
      },
      api: {
        isCatalog: 30,
        apiId: '',
        apiName: '',
        apiUrl: '',
        apiMethod: '',
        pid: '',
        sort: '',
        description: '',
        menuId: '',
        ifUsual: ''
      },
      rules: {
        // menuName: [
        //   { required: true, message: '请选择行政区域', trigger: 'change' }
        // ],
        // menuPath: [
        //   { required: true, message: '请输入住户编号', trigger: 'blur' }
        // ]
      },
      defaultProps: { // 配置项（必选）
        value: 'menuId',
        label: 'menuName',
        children: 'children'
      },
      menuTreeDialog: false,
      currentNode: {}
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val) // dialogVisible改变的时候通知父组件
      }
    }
  },
  mounted() {
  },
  methods: {
    fetchData(row) {
      console.log(row)
      if (row) {
        if (row.submenuId) { // 新增子菜单
          this.disabled = true
          this.dialogType = 'add'
          this.menuPid = row.submenuId
          this.apiPid = row.submenuId
          this.menu.isCatalog = row.isCatalog + 10
          if (row.isCatalog === 10) {
            this.menuType = '1' // 新增目录下的菜单和按钮
          } else if (row.isCatalog === 20) {
            this.menuType = '2' // 新增按钮
          } else {
            this.menuType = '0'
          }
        } else {
          this.dialogType = 'edit'
          if (row.isCatalog === 30) { // 编辑按钮
            getApi(row.menuId).then(response => {
              this.menu.isCatalog = 30
              this.api = response.data
              this.apiPid = response.data.pid
            })
          } else { // 编辑目录或者菜单
            this.menu = row
            this.menuPid = row.pid
          }
        }
      } else {
        this.dialogType = 'add'
      }
    },
    addApi: function(event) {
      var that = this
      that.api.menuId = that.apiPid
      that.api.pid = that.apiPid
      addApi(that.api).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: response.msg
          })
          that.$emit('getMenus')
          that.closeDialog()
        }
      })
    },
    editApi: function(event) {
      var that = this
      that.api.menuId = that.apiPid
      editApi(that.api).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: response.msg
          })
          that.$emit('getMenus')
          that.closeDialog()
        }
      })
    },
    addMenu: function(event) {
      var that = this
      if (that.dialogType === 'add') {
        if (that.isCatalog === 10) { // 新增目录
          that.menu.pid = '-1'
        } else { // 新增菜单
          that.menu.pid = that.menuPid
        }
      }
      addMenu(that.menu).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: response.msg
          })
          that.$emit('getMenus')
          that.closeDialog()
        }
      })
    },
    editMenu: function(event) {
      var that = this
      editMenu(that.menu).then(response => {
        if (response) {
          that.$emit('getMenus')
          that.closeDialog()
          that.$message({
            type: 'success',
            message: response.msg
          })
        }
      })
    },
    commitEvent: function(event) {
      var that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          if (that.dialogType === 'add') {
            if (this.menu.isCatalog === 30) { // 新增按钮
              that.addApi()
            } else { // 新增目录或者菜单
              that.addMenu()
            }
          } else {
            if (that.menu.isCatalog === 30) { // 编辑按钮
              that.editApi()
            } else { // 编辑目录或者菜单
              that.editMenu()
            }
          }
        }
      })
    },
    getSelectTreeValue(value) {
      this.menuPid = value
    },
    getSelectTreetData(data) {},
    getSelectTreeValue2(value) {
      this.apiPid = value
    },
    getSelectTreetData2(data) {},
    changeType() {
      console.log(this.menu.type)
    },
    closeDialog() {
      this.menuPid = ''
      this.apiPid = ''
      this.disabled = false
      this.menuType = '0'
      this.menu = {
        menuId: '',
        isCatalog: 10,
        menuName: '',
        menuPath: '',
        description: '',
        pid: ''
      }
      this.api = {
        isCatalog: 30,
        apiId: '',
        apiName: '',
        apiUrl: '',
        apiMethod: '',
        pid: '',
        sort: '',
        description: '',
        menuId: '',
        ifUsual: ''
      }
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.myRadioGroup .el-radio {
  margin-right: 10px;
}
</style>
