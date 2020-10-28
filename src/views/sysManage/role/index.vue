<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item prop="roleName">
          <el-input v-model="searchForm.roleName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm('searchForm')">查询</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handleAddRole('add')">
            添加角色
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="listLoading" :data="rolesList" node-key="id" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="是否启用">
        <template slot-scope="scope">
          <el-switch :value="scope.row.state === '1'" @change="statusChange($event, scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getRoles" />
    </div>
    <myDialog ref="myDialog" :title="dialogTitle" :visible.sync="visible" @getRoles="getRoles($event)" />
  </div>
</template>

<script>
// import path from 'path'
import { deepClone } from '@/utils'
import { getRoles, deleteRole, updateRole } from '@/api/role'
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'

export default {
  name: 'Role',
  components: { Pagination, MyDialog },
  data() {
    return {
      dialogTitle: '',
      visible: false,
      total: 0,
      searchForm: {
        roleName: '',
        pageNum: 1,
        pageSize: 10
      },
      routes: [],
      rolesList: [],
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      this.listLoading = true
      getRoles(this.searchForm).then(response => {
        this.rolesList = response.data.list
        // this.rolesList.map(item => {
        //   item.isopen = item.state === '1'
        // })
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.searchForm.pageNum = 1
          this.getRoles()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAddRole() {
      this.dialogTitle = '新增'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.myDialog.fetchData()
      })
    },
    handleEdit(scope) {
      this.dialogTitle = '编辑'
      this.visible = true
      const row = deepClone(scope.row)
      this.$nextTick(() => {
        this.$refs.myDialog.fetchData(row)
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除角色?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.roleId)
          this.getRoles()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => { console.log(err) })
    },
    statusChange($event, row) {
      console.log($event)
      console.log(row)
      const postData = deepClone(row)
      postData.state = $event ? '1' : '0'
      updateRole(postData).then(res => {
        this.getRoles()
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
