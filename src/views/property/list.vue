<template>
  <div class="list" />

</template>

<script>
import { myProperty, myBought, myFavorite } from '@/api/property'
export default {
  name: 'PropertyList',
  props: {
    type: {
      required: true,
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    getData() {
      let method
      switch (this.type) {
        case 'post':
          method = myProperty
          break
        case 'bought':
          method = myBought
          break
        case 'favorite':
          method = myFavorite
          break
      }
      method().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {

}
</style>
