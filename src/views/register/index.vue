<template>
  <div class="login-container">
    <el-form ref="regForm" :model="regForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Register</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="regForm.userName"
          placeholder="Username"
          name="userName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          v-model="regForm.nickName"
          placeholder="Nick Name"
          type="text"
          tabindex="2"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="el-icon-phone" />
        </span>
        <el-input
          v-model="regForm.phone"
          placeholder="Phone Number"
          type="text"
          tabindex="3"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message" />
        </span>
        <el-input
          v-model="regForm.email"
          placeholder="Mail"
          type="text"
          tabindex="4"
        />
      </el-form-item>
      <el-form-item prop="intro">
        <span class="svg-container">
          <i class="el-icon-message" />
        </span>
        <el-input
          v-model="regForm.intro"
          placeholder="Introduce"
          type="text"
          tabindex="5"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="regForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="6"
          auto-complete="on"
          @keyup.enter.native="handleReg"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="rptPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="regForm.rptPassword"
          :type="passwordType"
          placeholder="Repeat Password"
          name="password"
          tabindex="7"
          auto-complete="on"
          @keyup.enter.native="handleReg"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleReg">Register</el-button>
      <div style="display: flex;justify-content: flex-end"><el-button type="text" style="margin-bottom:30px;padding-right:20px;text-align: right;" @click.native.prevent="gotoLogin">Login</el-button></div>
    </el-form>
  </div>
</template>

<script>
import { register, regAdmin, regEmployee, regEmployer } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const rptPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again!'))
      } else if (value !== this.regForm.password) {
        callback(new Error('Password not same!'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      regData: '',
      regForm: {
        'email': '',
        'intro': '',
        'nickName': '',
        'password': '',
        'rptPassword': '',
        'phone': '',
        'userName': ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        nickName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rptPassword: [{ required: true, trigger: 'blur', validator: rptPasswordValidator }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push('/login')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleReg() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.regForm).then(res => {
            this.regData = res
            // this.step = 2
            this.$message({
              message: 'Register successful!',
              type: 'success'
            })
            this.$router.push('/login')
            this.loading = false
          }).catch(() => {
            this.$message({
              message: 'Register failed!',
              type: 'danger'
            })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    confirmReg() {
      let method
      switch (this.regForm2.role) {
        case 'Admin':
          method = regAdmin
          break
        case 'Employee':
          method = regEmployee
          break
        case 'Employer':
          method = regEmployer
          break
      }
      if (method) {
        method({
          'user_id': this.regData.user_id,
          'name': this.regForm2.email,
          'sex': 'string',
          'years': 'string',
          'description': 'string',
          'needs_post': [],
          'skills': [],
          'websites': 'string',
          'phone': this.regForm2.phone,
          'email': this.regForm2.email,
          'status': this.regForm2.status
        }).then(res => {
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
