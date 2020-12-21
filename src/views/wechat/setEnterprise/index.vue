<template>
  <div class="app-container">
    <!-- <el-card class="box-card">
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
    </el-card> -->

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
        v-loading="loading"
      >
        <el-form-item prop="corpId">
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
            v-model="ruleForm.corpId"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="providerSecret"
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
            v-model="ruleForm.providerSecret"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="contactsSecret"
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
            v-model="ruleForm.contactsSecret"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="conversationSecret"
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
            v-model="ruleForm.conversationSecret"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="公钥版本"
          prop="publicKeyVersion"
        >
          <el-input
            v-model="ruleForm.publicKeyVersion"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="私钥"
          prop="privateKey"
        >
          <el-input
            v-model="ruleForm.privateKey"
            type="textarea"
            rows="4"
            placeholder="请配置"
          />
        </el-form-item>

        <el-form-item
          label=""
          prop="chatAppId"
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
            v-model="ruleForm.chatAppId"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="charAppSecret"
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
            v-model="ruleForm.charAppSecret"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="小程序应用ID"
          prop="appId"
        >
          <el-input
            v-model="ruleForm.appId"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="小程序应用密钥"
          prop="appSecret"
        >
          <el-input
            v-model="ruleForm.appSecret"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="企微扫码应用ID"
          prop="wxCodeAppId"
        >
          <el-input
            v-model="ruleForm.wxCodeAppId"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="企微扫码登录url"
          prop="wxCodeAppUrl"
        >
          <el-input
            v-model="ruleForm.wxCodeAppUrl"
            placeholder="请配置"
          />
        </el-form-item>
        <el-form-item
          label="通讯录secret"
          prop="mailListSecret"
        >
          <el-input
            v-model="ruleForm.mailListSecret"
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
import { selectOne, saveEnterpriseInfo } from "@/api/wechat";

export default {
  name: "Wechatset",
  components: {},
  data() {
    return {
      wechat: {
        openFlag: true
      },
      ruleForm: {
        corpId: "",
        providerSecret: "",
        contactsSecret: "",
        conversationSecret: "",
        publicKeyVersion: "",
        privateKey: "",
        chatAppId: "",
        charAppSecret: "",
        appId: "",
        appSecret: "",
        wxCodeAppId: "",
        wxCodeAppUrl: "",
        mailListSecret: ""
      },
      rules: {
        corpId: [{ required: true, message: "请输入企业ID", trigger: "blur" }],
        providerSecret: [
          { required: true, message: "请输入通讯密钥", trigger: "blur" }
        ],
        contactsSecret: [
          { required: true, message: "请输入外部联系人密钥", trigger: "blur" }
        ]
      },
      loading: true
    };
  },
  computed: {
    getUserId() {
      return this.$store.state.user.userId;
    }
  },
  created() {
    this.selectOne();
  },
  methods: {
    selectOne() {
      var that = this;
      that.loading = true;
      // var data = {
      //   userid:this.getUserId
      // }
      var data = {
        userid: "LinJie"
      };
      selectOne(data)
        .then(response => {
          console.log(response);
          that.ruleForm = response.data;
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
        });
    },
    saveEnterpriseInfo() {
      var that = this;
      that.loading = true;
      saveEnterpriseInfo(that.ruleForm)
        .then(response => {
          console.log(response);
          that.$message({
            type: "success",
            message: "设置成功"
          });
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveEnterpriseInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
