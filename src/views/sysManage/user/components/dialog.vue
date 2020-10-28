<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" label-width="100px" size="mini" :rules="rules" :model="user">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="user.userName" placeholder="请输入账号" auto-complete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="user.nickName" placeholder="请输入姓名" auto-complete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="user.phone" placeholder="请输入手机号" auto-complete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="mailBox">
        <el-input v-model="user.mailBox" type="email" placeholder="请输入邮箱" auto-complete="off" />
      </el-form-item>
      <el-form-item v-if="passWordType" label="登录密码" prop="passWord">
        <el-input v-model="user.passWord" placeholder="请输入登录密码" uto-complete="off" />
      </el-form-item>
      <el-form-item label="备注：" prop="description">
        <el-input v-model="user.description" type="textarea" maxlength="250" show-word-limit placeholder="请输入备注信息" :autosize="{ minRows: 4, maxRows: 8}" />
      </el-form-item>
      <el-form-item label="是否立即启用">
        <el-switch v-model="stateBoolean" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="btnLoading" @click="commitEvent('')">立即提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'
import { addUser, editUser } from '@/api/user'

export default {
  name: 'MyDialog',
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
    }
  },
  data() {
    return {
      btnLoading: false,
      passWordType: true,
      user: {
        userId: '',
        userName: '',
        nickName: '',
        passWord: '',
        mailBox: '',
        phone: '',
        state: '',
        description: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入行政编号', trigger: 'blur' }
        ],
        mailBox: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入备注信息', trigger: 'blur' }
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
    },
    stateBoolean: {
      get() {
        return this.user.state === '1'
      },
      set(val) {
        this.user.state = val ? '1' : '0'
      }
    }
  },
  watch: {
    type(val) {
      if (val === 'edit') {
        this.passWordType = false
      } else {
        this.passWordType = true
      }
    }
  },
  methods: {
    statusChange() {
      this.user.state = '0'
    },
    fetchData(row) {
      console.log('row', row)
      if (row) {
        this.dialogType = 'edit'
        this.user = row
      } else {
        this.dialogType = 'add'
      }
    },
    commitEvent: function() {
      var that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          if (that.dialogType === 'add') {
            that.addUser()
          } else {
            delete that.user.password
            delete that.user.roleList
            delete that.user.registerTime
            delete that.user.loginTime
            that.editUser()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addUser: function(event) {
      var that = this
      const postData = deepClone(that.user)
      addUser(postData).then(response => {
        if (response) {
          that.$emit('getUsers')
          that.closeDialog()
          that.$message({
            type: 'success',
            message: response.msg
          })
        }
      })
    },
    editUser: function(event) {
      var that = this
      const postData = deepClone(that.user)
      console.log(postData)
      editUser(postData).then(response => {
        if (response) {
          that.$emit('getUsers')
          that.closeDialog()
          that.$message({
            type: 'success',
            message: response.msg
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
