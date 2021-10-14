<template>
  <div class="detail">
    <el-form ref="propertyForm" :hide-required-asterisk="true" :model="propertyForm" :rules="propertyRules" class="login-form" auto-complete="on">
      <el-form-item label="Title" prop="title">
        <el-input v-model.trim="propertyForm.title" :disabled="!isOwner" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model.number="propertyForm.price" :disabled="!isOwner" />
      </el-form-item>
      <el-form-item label="Category" prop="category">
        <el-input v-model.trim="propertyForm.category" :disabled="!isOwner" />
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model.trim="propertyForm.address" :disabled="!isOwner" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model.trim="propertyForm.description" type="textarea" :disabled="!isOwner" />
      </el-form-item>
      <el-form-item label="Image" prop="image">
        <img src="" alt="">
        <el-upload
          :disabled="!isOwner"
          class="avatar-uploader"
          :headers="uploadHeaders"
          list-type="picture-card"
          :action="`http://34.96.173.9:8080/upload-property-photo/${propertyForm.pid}`"
          :file-list="fileList"
          :limit="3"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i v-if="isOwner" class="el-icon-plus avatar-uploader-icon" />
          <i v-else class="el-icon-circle-close avatar-uploader-icon-disable" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="control-bar">
      <el-button v-if="isOwner" type="primary" @click="updateInfo">Update Info!</el-button>
      <el-button v-else type="success" @click="buyNow">Buy now!</el-button>
      <el-button @click="$router.back(-1)">Cancel</el-button>
      <el-button v-if="isOwner" type="danger" @click="deleteProperty">Delete</el-button>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getPropertyById, editProperty, buyProperty, deleteProperty } from '@/api/property'

export default {
  name: 'PropertyDetail',
  data() {
    return {
      pid: '',
      imageUrl: '',
      fileList: [],
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
      },
      uploadHeaders: {
        'Authorization': getToken()
      }
    }
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    isOwner() {
      return this.propertyForm.owner === this.userInfo.uid
    }
  },
  mounted() {
    console.log('router params', this.$route.params, this.userInfo)
    // this.propertyForm = this.$route.params
    if (!this.$route.params.pid) {
      this.$message({
        message: 'Getting property Error!',
        type: 'warning'
      })
      this.$router.push('/home')
    }
    this.getData(this.$route.params.pid)
  },
  methods: {
    buyNow() {
      buyProperty({ pid: this.propertyForm.pid }).then((res) => {
        this.$router.push('/profile/index')
        this.$message({
          message: 'Order success!',
          type: 'success',
          duration: 5 * 1000
        })
      })
    },
    deleteProperty() {
      this.$confirm('Property will be delete!').then(
        () => {
          deleteProperty({ pid: this.propertyForm.pid }).then((res) => {
            this.$router.push('/profile/index')
            this.$message({
              message: 'Delete success!',
              type: 'success',
              duration: 5 * 1000
            })
          })
        }
      )
    },
    updateInfo() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          editProperty({ property: this.propertyForm }).then(res => {
            console.log(res)
            this.getData()
            this.$message({
              message: 'Property information has been updated successfully',
              type: 'success',
              duration: 5 * 1000
            })
          }).catch(err => {
            console.log(err)
            this.$message({
              message: 'Property information has been updated failed!',
              type: 'danger',
              duration: 5 * 1000
            })
          })
        }
      })
    },
    getData() {
      const id = this.$route.params.pid || this.propertyForm.pid
      console.log(id)
      getPropertyById({ pid: id }).then(res => {
        this.propertyForm = res[0]
        this.fileList = this.propertyForm && this.propertyForm.picUrl && this.propertyForm.picUrl.map((e, i) => ({ url: `http://34.96.173.9:8080${e}`, name: `Image-${i + 1}` }))
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message({
        message: 'Upload successful!',
        type: 'success'
      })
      this.imageUrl = URL.createObjectURL(file.raw)
      this.getData()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Only jpg or png images allowed!')
      }
      if (!isLt2M) {
        this.$message.error('Max limit 2Mb!')
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
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar-uploader-icon-disable::after{
  content: '';
  width: 200px;
  z-index: 11;
  height: 200px;
  background: rgb(232,239,249);
  position: absolute;
  left: -10px;
  top: -10px;
  cursor: auto;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
