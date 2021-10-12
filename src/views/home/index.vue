<template>
  <div class="index">
    Home
  </div>
</template>

<script>
import { listAll } from '@/api/property'

export default {
  name: 'Home',
  data() {
    return {
      searchData: {
        'dataNum': 0,
        'keyword': 'string',
        'northeast': 'string',
        'page': 0,
        'pid': 0,
        'property': {
          'address': 'string',
          'brand': 'string',
          'buyer': 0,
          'category': 'string',
          'conditions': 'string',
          'createTime': '2021-10-12T09:56:31.590Z',
          'description': 'string',
          'latitude': 0,
          'longitude': 0,
          'owner': 0,
          'picUrl': [
            'string'
          ],
          'pid': 0,
          'price': 0,
          'status': 0,
          'subclass': 'string',
          'tags': 'string',
          'title': 'string',
          'updateTime': '2021-10-12T09:56:31.590Z'
        },
        'southwest': 'string',
        'uid': 0
      }
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    getAllData() {
      listAll(this.searchData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
