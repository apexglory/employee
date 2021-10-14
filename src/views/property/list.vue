<template>
  <div class="list">
    <el-card v-for="item in propertyList" :key="item.pid" :body-style="bodyStyle" class="property-list">

      <img v-if="item.picUrl" :src="item.picUrl[0]" alt="">
      <i v-else class="el-icon-picture-outline" />
      <div class="content">
        <div class="title">Title:{{ item.title }}</div>
        <div class="price">Price <span style="color:red;font-weight: bold">{{ item.price }}</span></div>
        <div class="desc">Description{{ item.description }}</div>
      </div>
      <el-button class="viewBtn" type="text" @click="gotoDetail(item)">View Detail →</el-button>
    </el-card>
  </div>

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
    return {
      propertyList: [],
      bodyStyle: {
        display: 'flex',
        position: 'relative'
      }
    }
  },
  mounted() {
    this.getData()
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
        this.propertyList = res
      })
    },
    gotoDetail(item) {
      this.$router.push({ name: 'PropertyDetail', params: item })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
.property-list{
  margin-bottom: 30px;

  img{
    border-radius: 20px;
  }
  .el-icon-picture-outline{
    font-size: 100px;
  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
  }
  .viewBtn{
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
}
}
</style>
