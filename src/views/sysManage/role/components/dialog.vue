<template>
  <el-dialog :visible.sync="dialogVisible" :title="title" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" :model="role" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="role.roleName" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="所属组织" prop="orgId">
        <SelectTree
          :props="treeProps"
          :options="treeData"
          :clearable="true"
          :accordion="true"
          :value="selectValue"
          @getSelectTreeValue="getSelectTreeValue($event)"
          @getSelectTreetData="getSelectTreetData($event)"
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="role.description"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          placeholder="描述"
        />
      </el-form-item>
      <el-form-item label="是否立即启用">
        <el-switch v-model="stateBoolean" />
      </el-form-item>
      <el-form-item label="权限设置" prop="selectIds">
        <el-tree
          ref="elTree"
          class="permission-tree"
          :default-checked-keys="role.selectIds"
          :check-strictly="false"
          node-key="menuId"
          :data="routesData"
          :props="defaultProps"
          show-checkbox
          @check="treeCheck"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmRole">立即提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import path from 'path'
import { deepClone } from '@/utils'
import { getMenu, addRole, updateRole, getOrgList } from '@/api/role'
import SelectTree from '@/components/SelectTree'
export default {
  name: 'MyDialog',
  components: { SelectTree },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogType: '',
      menus: [],
      menusAndapis: [],
      searchText: '',
      selectValue: '',
      role: {
        selectIds: [],
        state: '0'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择所属组织', trigger: 'blur' }
        ]
      },
      treeData: [],
      treeProps: {
        value: 'orgId',
        label: 'orgName',
        children: 'children'
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      menuTreeDialog: false,
      currentNode: {},
      routesData: []
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
    },
    stateBoolean: {
      get() {
        return this.role.state === '1'
      },
      set(val) {
        this.role.state = val ? '1' : '0'
      }
    }
  },
  mounted() {
    this.getMenuList()
    this.getOrgList()
  },
  methods: {
    fetchData(row) {
      console.log('row', row)
      if (row) {
        this.dialogType = 'edit'
        this.selectValue = row.orgId
        row.selectIds = row.selectIds && row.selectIds.split(',')
        row.apis = row.apis && row.apis.split(',')
        row.menus = row.menus && row.menus.split(',')
        this.role = row
      } else {
        this.dialogType = 'add'
      }
    },
    getSelectTreeValue(value) {
      console.log(value)
      this.selectValue = value
      this.role.orgId = value
    },
    getSelectTreetData(data) {},
    treeCheck(e, data) {
      console.log(e)
      console.log(data)
      const menus = []
      const apis = []
      data.checkedNodes.map(item => { // 选中节点
        if (item.isCatalog === 30) {
          apis.push(item.menuId)
        } else {
          menus.push(item.menuId)
        }
      })
      data.halfCheckedNodes.map(item => { // 半选节点
        if (item.isCatalog === 30) {
          apis.push(item.menuId)
        } else {
          menus.push(item.menuId)
        }
      })
      // this.menusAndapis = data.checkedKeys
      this.role.selectIds = data.checkedKeys // 回显时使用
      this.role.menus = menus
      this.role.apis = apis
    },
    getMenuList() {
      getMenu(1).then(res => {
        this.routesData = res.data.children
      }).catch(() => {})
    },
    getOrgList() {
      getOrgList().then(res => {
        this.treeData = res.data.children
      }).catch(() => {})
    },
    confirmRole(e) {
      const that = this
      const postData = deepClone(that.role)
      console.log(postData)
      postData.selectIds = postData.selectIds ? postData.selectIds.join(',') : ''
      postData.apis = postData.apis ? postData.apis.join(',') : ''
      postData.menus = postData.menus ? postData.menus.join(',') : ''
      that.$refs.form.validate((valid) => {
        if (valid) {
          if (that.dialogType === 'add') {
            addRole(postData).then(res => {
              that.$message({
                type: 'success',
                message: res.msg
              })
              that.$emit('getRoles')
              that.closeDialog()
            }).catch(() => {})
          } else {
            updateRole(postData).then(res => {
              that.$message({
                type: 'success',
                message: res.msg
              })
              that.$emit('getRoles')
              that.closeDialog()
            }).catch(() => {})
          }
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.selectValue = ''
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
