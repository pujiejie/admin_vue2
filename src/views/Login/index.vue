<template>
  <div class="login">
    <div class="custom-form">
      <h2 class="title">系统登陆</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-s-custom" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="caixukun">
          <el-input v-model="ruleForm.code" maxlength="4" prefix-icon="el-icon-smoking"></el-input>
          <img @click="changeSrc" class="code" :src="code_src" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      let reg = /^[^0-9]\w{5,12}$/;
      if (!reg.test(value)) {
        callback(new Error("账号输入有误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[^0-9]\w{5,12}$/.test(value)) {
        callback(new Error("密码格式错误!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      },
      code_src: "",
      uuid: "",
      timeer: 0
    };
  },
  created() {
    this.reRenderCode();
    this.timmer = setInterval(() => {
      this.reRenderCode();
    }, 1000 * 60);
  },
  beforeDestroy() {
    clearInterval(this.timmer);
  },
  methods: {
    reRenderCode() {
      let uuid = uuidv4();
      this.uuid = uuid;
      this.code_src = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${uuid}`;
    },
    changeSrc() {
      this.reRenderCode();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 去发送登录请求
          this.$http({
            url: "api/supersignin",
            method: "POST",
            data: `username=${this.ruleForm.username}&password=${this.ruleForm.password}&uuid=${this.uuid}&text=${this.ruleForm.code}`
          })
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push('/')
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login .el-form-item__content {
  margin: 0 !important;
}
.login .el-input input {
  border: none;
  background-color: transparent;
  height: 47px;
  color: #fff;
}
.login .caixukun .el-form-item__content {
  display: flex;
}
</style>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #2d3a4b;
}
.custom-form {
  width: 500px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 26px;
  color: #eee;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
}
.login .el-input {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
}
.login .code {
  display: block;
  height: 47px;
  cursor: pointer;
}
</style>