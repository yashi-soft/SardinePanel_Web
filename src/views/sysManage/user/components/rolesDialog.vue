<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" label-width="100px" size="mini" :rules="rules" :model="role">
      <el-form-item label="角色" prop="roleIds">
        <el-select
          v-model="role.roleIds"
          style="width:100%;"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择角色"
          @change="rolesSelectChange"
        >
          <el-option
            v-for="item in optionsData"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="btnLoading" @click="commitEvent">立即提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { setRoles } from '@/api/user'

export default {
  name: 'RolesDialog',
  components: {},
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
      btnLoading: false,
      role: {
        userId: '',
        roleIds: ''
      },
      rules: {
        roleIds: [
          { required: true, message: '请输入选择角色', trigger: 'blur' }
        ]
      },
      // 数据列表
      options: []
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
  watch: {
  },
  methods: {
    fetchData(row) {
      if (row.roleIds) {
        row.roleIds = row.roleIds.split(',')
        this.role = row
      } else {
        this.role.userId = row.userId
      }
    },
    rolesSelectChange: function(val) {
      console.log('rolesSelectChange...', val)
      this.role.roleIds = val
      // console.log('user.roles...', this.user.roles)
    },
    commitEvent: function() {
      var that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.setRoles()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setRoles: function(event) {
      var that = this
      const rolesList = []
      that.role.roleIds.map(item => {
        rolesList.push(item)
      })
      that.role.roleIds = rolesList.join(',')
      setRoles(that.role).then(response => {
        if (response) {
          that.$emit('getUsers')
          that.closeDialog()
          that.$message({
            message: '操作成功！',
            type: 'success'
          })
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
