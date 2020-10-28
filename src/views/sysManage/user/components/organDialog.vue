<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" label-width="100px" size="mini" :rules="rules" :model="org">
      <el-form-item label="机构范围" prop="orgIds">
        <el-select
          v-model="org.orgIds"
          style="width:100%;"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择机构"
          @change="rolesSelectChange"
        >
          <el-option
            v-for="item in optionsData"
            :key="item.orgId"
            :label="item.orgName"
            :value="item.orgId"
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
import { setOrgs } from '@/api/user'

export default {
  name: 'OrganDialog',
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
      org: {
        userId: '',
        orgIds: ''
      },
      rules: {
        orgIds: [
          { required: true, message: '请输入选择机构', trigger: 'blur' }
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
      if (row.organizationIds) {
        row.orgIds = row.organizationIds.split(',')
        this.org = row
      } else {
        this.org.userId = row.userId
      }
    },
    rolesSelectChange: function(val) {
      console.log('rolesSelectChange...', val)
      this.org.orgIds = val
      // console.log('user.roles...', this.user.roles)
    },
    commitEvent: function() {
      var that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.setOrgs()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setOrgs: function(event) {
      var that = this
      const rolesList = []
      that.org.orgIds.map(item => {
        rolesList.push(item)
      })
      that.org.orgIds = rolesList.join(',')
      setOrgs(that.org).then(response => {
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
