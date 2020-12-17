<template>
  <div class="app-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>企业微信</span>
      </div>

      <el-form
        ref="form"
        :model="wechat"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="开启状态">
          <el-radio-group v-model="wechat.openFlag">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>企业信息配置</span>
      </div>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <span slot="label">
            <span class="span-box">
              <span>企业ID</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="输入企业ID"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name"
            placeholder="请配置"
            disabled="true"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="name2"
        >
          <span slot="label">
            <span class="span-box">
              <span>通讯密钥</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="通讯密钥"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name2"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="name3"
        >
          <span slot="label">
            <span class="span-box">
              <span>外部联系人密钥</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="外部联系人密钥"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name3"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="name4"
        >
          <span slot="label">
            <span class="span-box">
              <span>会话密钥</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="会话密钥"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name4"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="公钥版本"
          prop="name5"
        >
          <el-input
            v-model="ruleForm.name5"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="私钥"
          prop="name6"
        >
          <el-input
            v-model="ruleForm.name6"
            type="textarea"
            rows="4"
            placeholder="请配置"
          />
        </el-form-item>

        <el-form-item
          label=""
          prop="name7"
        >
          <span slot="label">
            <span class="span-box">
              <span>聊天工具栏应用ID</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="聊天工具栏应用ID"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name7"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="name8"
        >
          <span slot="label">
            <span class="span-box">
              <span>聊天工具栏应用密钥</span>

              <el-tooltip
                class="item"
                effect="dark"
                content="聊天工具栏应用密钥"
                placement="top-start"
              >
                <i class="el-icon-warning-outline ico-pre" />
              </el-tooltip>

            </span>
          </span>
          <el-input
            v-model="ruleForm.name8"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="小程序应用ID"
          prop="name9"
        >
          <el-input
            v-model="ruleForm.name9"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="小程序应用密钥"
          prop="name10"
        >
          <el-input
            v-model="ruleForm.name10"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="企微扫码应用ID"
          prop="name11"
        >
          <el-input
            v-model="ruleForm.name11"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="企微扫码登录url"
          prop="name12"
        >
          <el-input
            v-model="ruleForm.name12"
            placeholder="请配置"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >立即设置</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Wechatset',
  components: {},
  data() {
    return {
      wechat: {
        openFlag: true
      },
      ruleForm: {
        name: '111',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',
        name10: '',
        name11: '',
        name12: ''
      },
      rules: {
        name: [{ required: true, message: '请输入企业ID', trigger: 'blur' }],
        name2: [{ required: true, message: '请输入通讯秘钥', trigger: 'blur' }],
        name3: [
          { required: true, message: '请输入外部联系人秘钥', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.demo-ruleForm {
  max-width: 800px;
}

.ico-pre {
  margin-left: 4px;
}
</style>
