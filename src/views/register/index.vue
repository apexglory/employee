<template>
  <div class="login-container">
    <el-form v-show="step===1" ref="regForm" :model="regForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Register</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="regForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
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
          tabindex="2"
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
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleReg"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleReg">Next</el-button>
      <el-button type="text" style="width:100%;margin-bottom:30px;padding-right:20px;text-align: right;" @click.native.prevent="gotoLogin">Login</el-button>
    </el-form>
    <el-form v-show="step===2" ref="regForm2" :model="regForm2" :rules="loginRules2" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Detail</h3>
      </div>

      <el-form-item prop="role">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-radio-group v-model="regForm2.role" style="margin-left: 20px">
          <el-radio label="Admin">Admin</el-radio>
          <el-radio label="Employee">Employee</el-radio>
          <el-radio label="Employer">Employer</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="role">
        <span class="svg-container">
          <i class="el-icon-s-help" />
        </span>
        <el-radio-group v-model="regForm2.status" style="margin-left: 20px">
          <el-radio label="Finding">Finding</el-radio>
          <el-radio label="Waiting">Waiting</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="el-icon-phone" />
        </span>
        <el-input
          v-model="regForm2.phone"
          placeholder="Phone number"
          tabindex="5"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message" />
        </span>
        <el-input
          v-model="regForm2.email"
          placeholder="Email"
          tabindex="5"
        />
      </el-form-item>
      <el-form-item prop="address">
        <span class="svg-container">
          <i class="el-icon-location" />
        </span>
        <el-input
          v-model="regForm2.address"
          placeholder="Address"
          tabindex="6"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="confirmReg">Register !</el-button>
      <el-button type="text" style="width:100%;margin-bottom:30px;padding-right:20px;text-align: right;" @click.native.prevent="gotoLogin">Login</el-button>
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
        username: '',
        password: '',
        rptPassword: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rptPassword: [{ required: true, trigger: 'blur', validator: rptPasswordValidator }]
      },
      regForm2: {
        role: '',
        phone: '',
        name: '',
        email: '',
        address: '',
        size: '',
        sex: '',
        website: '',
        description: '',
        years: '',
        skills: [],
        status: ''

      },
      loginRules2: {
        username: [{ required: true, trigger: 'blur' }],
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
            this.step = 2
            this.loading = false
          }).catch(() => {
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
    padding: 160px 35px 0;
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
