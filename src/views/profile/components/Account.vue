<template>
  <el-form ref="regForm" :model="regForm" :rules="loginRules" class="login-form" auto-complete="on">
    <el-form-item label="Nick Name" prop="nickName">
      <el-input v-model.trim="regForm.nickName" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model.trim="regForm.email" />
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input v-model.trim="regForm.phone" />
    </el-form-item>
    <el-form-item label="Introduce" prop="intro">
      <el-input v-model.trim="regForm.intro" />
    </el-form-item>
    <el-form-item label="New Password" prop="password">
      <el-input v-model.trim="regForm.password" />
    </el-form-item>
    <el-form-item label="Repeat Password" prop="rptPassword">
      <el-input v-model.trim="regForm.rptPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setInfo } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
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
      regForm: {
        'email': '',
        'intro': '',
        'nickName': this.name,
        'password': '',
        'rptPassword': '',
        'phone': ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur' }],
        nickName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rptPassword: [{ required: true, trigger: 'blur', validator: rptPasswordValidator }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    submit() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          const obj = JSON.parse(JSON.stringify(this.regForm))
          delete obj.rptPassword
          setInfo(this.token, { user: obj }).then(res => {
            console.log(res)
            this.$message({
              message: 'User information has been updated successfully',
              type: 'success',
              duration: 5 * 1000
            })
          }).catch(err => {
            console.log(err)
            this.$message({
              message: 'User information has been updated failed!',
              type: 'danger',
              duration: 5 * 1000
            })
          })
        }
      })
    }
  }
}
</script>
