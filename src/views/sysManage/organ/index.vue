<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-edit" @click="handleAdd('add')">
      添加机构
    </el-button>
    <el-table v-loading="listLoading" :data="organs" row-key="orgId" border :tree-props="{children: 'children'}" style="width: 100%;margin-top:30px;">
      <el-table-column prop="orgName" label="名称" />
      <el-table-column prop="sort1" label="上级部门" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="handleSubOrgan(scope.row)">添加子部门</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <myDialog ref="myDialog" :title="dialogTitle" :visible.sync="visible" @getOrgan="getOrgan($event)" />
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getOrgList, deleteOrgan } from '@/api/organ'
import MyDialog from './components/dialog'
export default {
  name: 'Organ',
  components: { MyDialog },
  data() {
    return {
      dialogTitle: '添加机构',
      listLoading: true,
      organs: [],
      organsTree: [],
      visible: false,
      searchText: ''
    }
  },
  computed: {
    organsData() {
      return this.organsTree
    }
  },
  created() {
    this.getOrgan()
  },
  methods: {
    handleAdd() {
      var that = this
      that.dialogTitle = '添加机构'
      that.visible = true
    },
    handleSubOrgan(row) {
      var that = this
      that.dialogTitle = '添加子部门'
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData(deepClone(row))
      })
      that.visible = true
    },
    handleEdit(row) {
      var that = this
      that.dialogTitle = '编辑机构'
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData(deepClone(row))
      })
      that.visible = true
    },
    getOrgan: function(event) {
      var that = this
      that.listLoading = true
      getOrgList({}).then(response => {
        that.organs = response.data.children
        that.listLoading = false
      }).catch(() => {
        that.listLoading = false
      })
    },
    handleDelete(row) {
      var that = this
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrgan({ orgId: row.orgId }).then(response => {
            if (response) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
              that.getOrgan()
            }
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
  .tree-ctrl i {
    font-size: 20px;
    margin-left: 10px;
  }
</style>
