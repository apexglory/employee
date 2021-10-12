<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
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
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    submit() {
      setInfo(this.token, {
        name: this.user.name,
        email: this.user.email
      }).then(res => {
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
  }
}
</script>
