<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item prop="userName">
          <el-input v-model="searchForm.userName" type="text" placeholder="账号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm('searchForm')">查询</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handleAdd('add')">添加人员</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="listLoading" :data="users" row-key="userId" border style="width: 100%">
        <el-table-column prop="userName" label="账号" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="mailBox" label="邮箱" />
        <el-table-column prop="roleList" label="角色" />
        <el-table-column prop="registerTime" label="创建时间" :formatter="formatDate" />
        <el-table-column prop="loginTime" label="最后登录时间" :formatter="formatDate" />
        <el-table-column align="header-center" label="启用状态">
          <template slot-scope="scope">
            <el-switch :value="scope.row.state === '1'" @change="statusChange($event, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="420">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="handleRoles('roles', scope.$index, scope.row)">分配角色</el-button>
            <el-button type="info" size="small" @click="handleOrgan('organ', scope.$index, scope.row)">分配机构</el-button>
            <el-button type="primary" size="small" @click="handleEdit('edit', scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div align="right">
        <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getUsers" />
      </div>
    </div>
    <myDialog ref="myDialog" :title="dialogTitle" :visible.sync="visible" :type="dialogType" @getUsers="getUsers($event)" />
    <rolesDialog ref="rolesDialog" :title="dialogTitle" :visible.sync="rolesVisible" :type="dialogType" :options-data="rolesList" @getUsers="getUsers($event)" />
    <organDialog ref="organDialog" :title="dialogTitle" :visible.sync="organVisible" :type="dialogType" :options-data="organList" @getUsers="getUsers($event)" />
  </div>
</template>

<script>
// import util from '@/libs/util.js'
// import { getToken } from '@/utils/auth'
import { deepClone } from '@/utils'
import { fetchList, deleteUser, resetPassword, getRoles, getOrgan, editUser } from '@/api/user'
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'
import RolesDialog from './components/rolesDialog'
import OrganDialog from './components/organDialog'
export default {
  name: 'User',
  components: { Pagination, MyDialog, RolesDialog, OrganDialog },
  data() {
    return {
      dialogTitle: '',
      listLoading: true,
      visible: false,
      rolesVisible: false,
      organVisible: false,
      dialogType: '',
      users: [],
      rolesList: [],
      organList: [],
      total: 0,
      searchText: '',
      searchForm: {
        userName: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    // 方法区
    formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data === null) {
        return null
      }
      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.searchForm.pageNum = 1
          this.getUsers()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    getUsers() {
      var that = this
      that.listLoading = true
      fetchList((that.searchForm)).then(response => {
        that.users = response.data.list
        that.total = response.data.total
        that.listLoading = false
      }).catch(() => {
        that.listLoading = false
      })
      that.getRoles()
      that.getOrgan()
    },
    statusChange($event, row) {
      delete row.password
      delete row.roleList
      delete row.registerTime
      delete row.loginTime
      const postData = deepClone(row)
      postData.state = $event ? '1' : '0'
      editUser(postData).then(res => {
        this.getUsers()
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(() => {})
    },
    handleDelete: function(index, row) {
      var that = this
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log({ userId: row.id }, 'delete 111111111')
          deleteUser({ userId: row.id }).then(response => {
            if (response) {
              that.$message({
                type: 'success',
                message: '执行成功'
              })
              that.search()
            }
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleRoles(e, index, row) {
      var that = this
      that.dialogType = e
      that.dialogTitle = '分配角色'
      that.rolesVisible = true
      that.$nextTick(() => {
        that.$refs.rolesDialog.fetchData(deepClone(row))
      })
    },
    handleOrgan(e, index, row) {
      var that = this
      that.dialogType = e
      that.dialogTitle = '分配机构'
      that.organVisible = true
      that.$nextTick(() => {
        that.$refs.organDialog.fetchData(deepClone(row))
      })
    },
    handleAdd(e, row) {
      var that = this
      that.dialogType = e
      that.dialogTitle = '添加用户'
      that.visible = true
      this.$nextTick(() => {
        this.$refs.myDialog.fetchData()
      })
    },
    handleEdit: function(e, index, row) {
      var that = this
      that.dialogType = e
      that.dialogTitle = '编辑用户'
      that.visible = true
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData(deepClone(row))
      })
    },
    resetPassword: function(index, row) {
      var that = this
      this.$confirm('重置该用户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetPassword({ userId: row.userId }).then(response => {
            if (response.status === 200) {
              that.$message({
                type: 'success',
                message: '执行成功'
              })
            } else {
              that.$message({
                type: 'error',
                message: '执行失败'
              })
            }
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已经取消'
          })
        })
    },
    getRoles: function(event) {
      var that = this
      getRoles({}).then(response => {
        that.rolesList = response.data
      })
    },
    getOrgan: function(event) {
      var that = this
      getOrgan({}).then(response => {
        that.organList = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>

