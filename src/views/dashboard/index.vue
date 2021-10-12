<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">role: {{ role }}</div>
    <Employee v-if="role==='employee'" />
    <Employer v-if="role==='employer'" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Employee from '@/views/dashboard/Employee'
import Employer from '@/views/dashboard/Employer'
export default {
  name: 'Dashboard',
  components: {
    Employee,
    Employer
  },
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
  },
  mounted() {
    if (this.role === 'employer') {
      // this.$router.push('/employer_home')
    }
    if (this.role === 'employee') {
      // this.$router.push('/employee_home')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
