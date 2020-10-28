<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-edit" @click="handleAdd('add')">
      添加菜单
    </el-button>
    <el-table v-loading="listLoading" :data="menus" row-key="menuId" border :tree-props="{children: 'children'}" style="width: 100%;margin-top:30px;">
      <el-table-column prop="menuName" label="名称" />
      <el-table-column prop="isCatalog" label="类型">
        <template slot-scope="scope">
          <template v-if="scope.row.isCatalog == '10'">
            <el-tag>目录</el-tag>
          </template>
          <template v-else-if="scope.row.isCatalog == '20'">
            <el-tag type="success">菜单</el-tag>
          </template>
          <template v-else-if="scope.row.isCatalog == '30'">
            <el-tag type="info">按钮</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="menuPath" label="路由" />
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isCatalog!=30" type="info" size="small" @click="handleSubmenu(scope.row)">添加子菜单</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <myDialog ref="myDialog" :title="dialogTitle" :visible.sync="visible" :type="dialogType" :options-data="menusTree" @getMenus="getMenus($event)" />
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, getTree, deleteMenu, deleteApi } from '@/api/menu'
import MyDialog from './components/dialog'
export default {
  name: 'Menu',
  components: { MyDialog },
  data() {
    return {
      dialogTitle: '添加菜单',
      dialogType: '',
      listLoading: true,
      menus: [],
      menusTree: [],
      visible: false,
      searchText: '',
      catalogType: '0', // 0 新增  1 编辑目录  2 编辑菜单  3 编辑按钮 4 不起作用
      menuType: '0', // 0 新增全部  1 新增菜单  2 新增按钮 3 不作用
      menu: {
        isCatalog: 10,
        menuName: '',
        menuPath: '',
        description: '',
        pid: ''
      },
      defaultProps: { // 配置项（必选）
        value: 'menuId',
        label: 'menuName',
        children: 'children'
      }
    }
  },
  computed: {

  },
  created() {
    this.getMenus()
  },
  methods: {
    handleAdd() {
      var that = this
      that.dialogTitle = '添加菜单'
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData()
      })
      that.visible = true
    },
    handleSubmenu(row) {
      var that = this
      that.dialogTitle = '添加子菜单'
      var obj = {}
      obj.submenuId = row.menuId
      obj.isCatalog = row.isCatalog
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData(obj)
      })
      that.visible = true
    },
    handleEdit(row) {
      var that = this
      that.dialogTitle = '编辑菜单'
      var obj = deepClone(row)
      that.$nextTick(() => {
        that.$refs.myDialog.fetchData(obj)
      })
      that.visible = true
    },
    getMenus: function(event) {
      var that = this
      that.listLoading = true
      // var sid = util.cookies.get('sessionId')
      // console.log('sessionid==' + sid)
      getList(1).then(response => {
        that.menus = response.data.children
        that.listLoading = false
      }).catch(() => {
        that.listLoading = false
      })
      this.getTree()
    },
    getTree: function(event) {
      var that = this
      getTree({}).then(response => {
        that.menusTree = response.data.children
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
          console.log(row)
          if (row.isCatalog === 30) {
            deleteApi({ apiId: row.menuId }).then(response => {
              if (response) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                that.getMenus()
              }
            })
          } else {
            deleteMenu({ menuId: row.menuId }).then(response => {
              if (response) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                that.getMenus()
              }
            })
          }
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
