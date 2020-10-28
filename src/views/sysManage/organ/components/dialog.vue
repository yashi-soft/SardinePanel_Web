<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-form ref="form" :model="organ" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="部门名称" prop="orgName">
        <el-input v-model="organ.orgName" auto-complete="off" />
      </el-form-item>
      <el-form-item label="上级部门" prop="pid">
        <SelectTree
          :props="defaultProps"
          :options="organsData"
          :clearable="true"
          :accordion="true"
          :value="organ.pid"
          :disabled="disabled"
          @getSelectTreeValue="getSelectTreeValue($event)"
          @getSelectTreetData="getSelectTreetData($event)"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="organ.sort" auto-complete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="commitEvent">立即提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'
import { getOrgList, addOrgan, editOrgan } from '@/api/organ'
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
    }
  },
  data() {
    return {
      dialogType: '',
      searchText: '',
      disabled: false,
      organ: {
        orgId: '',
        orgName: '',
        pid: '',
        sort: ''
      },
      rules: {
        orgName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      defaultProps: { // 配置项（必选）
        value: 'orgId',
        label: 'orgName',
        children: 'children'
      },
      menuTreeDialog: false,
      currentNode: {},
      organsData: []
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
    this.getOrgList()
  },
  methods: {
    fetchData(row) {
      console.log('row', row)
      if (row) {
        if (this.title === '添加子部门') {
          this.organ.pid = row.orgId
          this.disabled = true
          this.dialogType = 'add'
          console.log(this.organ)
        } else {
          this.dialogType = 'edit'
          delete row.createTime
          delete row.updateTime
          this.organ = row
        }
      } else {
        this.dialogType = 'add'
        this.organ = {}
      }
    },
    getOrgList: function(event) {
      var that = this
      getOrgList({}).then(response => {
        that.organsData = response.data.children
      })
    },
    addOrgan: function(event) {
      var that = this
      const postData = deepClone(that.organ)
      addOrgan(postData).then(response => {
        if (response) {
          that.closeDialog()
          that.$message({
            type: 'success',
            message: response.msg
          })
          that.$emit('getOrgan')
          that.closeDialog()
        }
      })
    },
    editOrgan: function(event) {
      var that = this
      const postData = deepClone(that.organ)
      editOrgan(postData).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: response.msg
          })
          that.$emit('getOrgan')
          that.closeDialog()
        }
      })
    },
    commitEvent: function(event) {
      const that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          if (that.dialogType === 'edit') {
            this.editOrgan()
          } else {
            this.addOrgan()
          }
        }
      })
    },
    getSelectTreeValue(value) {
      this.organ.pid = value
    },
    getSelectTreetData(data) {},
    closeDialog() {
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
