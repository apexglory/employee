<template>
  <div class="detail">
    <el-form ref="propertyForm" :model="propertyForm" :rules="propertyRules" class="login-form" auto-complete="on">
      <el-form-item label="Title" prop="title">
        <el-input v-model.trim="propertyForm.title" :disabled="owner" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model.number="propertyForm.price" :disabled="owner" />
      </el-form-item>
      <el-form-item label="Category" prop="category">
        <el-input v-model.trim="propertyForm.category" :disabled="owner" />
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model.trim="propertyForm.address" :disabled="owner" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model.trim="propertyForm.description" type="textarea" :disabled="owner" />
      </el-form-item>
      <el-form-item label="Image" prop="image">
        <img src="" alt="">
        <el-upload
          class="avatar-uploader"
          :action="`http://34.96.173.9:8080/upload-property-photo/${pid}`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="control-bar">
      <el-button type="success" @click="buyNow">Buy now!</el-button>
      <el-button @click="$router.back(-1)">Cancel</el-button>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PropertyDetail',
  data() {
    return {
      pid: '',
      imageUrl: '',
      propertyForm: {
        'address': '',
        'description': '',
        'price': '',
        'title': '',
        'category': ''
      },
      propertyRules: {
        address: [{ required: true, trigger: 'blur' }],
        price: [{ required: true, trigger: 'blur', type: 'number' }],
        title: [{ required: true, trigger: 'blur' }],
        category: [{ required: true, trigger: 'blur' }]
      }
    }
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    isOwner() {
      return this.$route.params.owner === this.userInfo.uid
    }
  },
  mounted() {
    console.log('router params', this.$route.params, this.userInfo)
  },
  methods: {
    buyNow() {

    },
    getData(id) {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 70%;
  margin: 20px auto;
  .control-bar{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  margin-left: 40px;
  border: 2px solid #b7b7b7;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
