<template>
  <div class="index">
    <div class="search">
      <el-input v-model="searchData.keyword" placeholder="Search..." class="search-input" />
      <i class="el-icon-search" @click="getAllData" />
      <i class="el-icon-plus" @click="postDialogVisible=true" />
    </div>
    <div class="main" />
    <el-dialog
      title="Create property"
      :visible.sync="postDialogVisible"
      width="60%"
      class="property-dialog"
    >
      <el-form ref="propertyForm" :model="propertyForm" :rules="propertyRules" class="login-form" auto-complete="on">
        <el-form-item label="Title" prop="title">
          <el-input v-model.trim="propertyForm.title" />
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input v-model.number="propertyForm.price" />
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-input v-model.trim="propertyForm.category" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model.trim="propertyForm.address" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model.trim="propertyForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createProperty">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listAll, addProperty } from '@/api/property'
import { setInfo } from '@/api/user'

export default {
  name: 'Home',
  data() {
    return {
      searchData: {
        'dataNum': 20,
        'keyword': '',
        'northeast': 'string',
        'page': 1,
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
      },
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
      postDialogVisible: false
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    getAllData() {
      const obj = this.searchData.keyword ? { keyword: this.searchData.keyword } : {}
      obj.dataNum = this.searchData.dataNum
      obj.page = this.searchData.page
      listAll(obj).then(res => {
        console.log(res)
      })
    },
    createProperty() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          const obj = JSON.parse(JSON.stringify(this.propertyForm))
          addProperty({ property: obj }).then(res => {
            this.$router.push('/propertyDetail', res.pid)
            this.$message({
              message: 'Create Successful',
              type: 'success',
              duration: 5 * 1000
            })
          }).catch(err => {
            console.log(err)
            this.$message({
              message: 'Create failed!',
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

<style lang="scss" scoped>
.index{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search{
    width: 100%;
    height: 64px;
    margin-top: 20px;
    border-radius: 20px;
    position: relative;
    .search-input{
      width: 92%;
      height: 40px;
      border-radius: 40px;
      overflow: hidden;
    }
    .el-icon-search{
      position: absolute;
      right: calc(10% + 20px);
      top: 12px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .el-icon-plus{
      position: absolute;
      right: 0;
      border-radius: 40px;
      width: 40px;
      background: #fff;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .main{
    width: 100%;
    height: 100%;
    max-width: 720px;
    min-height: 100vh;
    background: #fff;
    margin-top: 20px;
    border-radius: 20px;
  }
}
.search-input :focus{
  border:none
}
.property-dialog{

  .el-dialog{
    border-radius: 20px!important;
  }
}
</style>
