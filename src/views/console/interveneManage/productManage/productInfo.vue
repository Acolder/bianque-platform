<template>
  <div id="box-wrap">
    <el-form ref="formData" :model="form" :rules="rules" label-width="100px" id="dataWrap">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品ID" prop="pro_id">
            <el-input class="el-input" v-model="form.pro_id" placeholder="请输入商品ID" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="pro_name">
            <el-input class="el-input" v-model="form.pro_name" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品价格" prop="pro_price">
            <el-input class="el-input" v-model="form.pro_price" placeholder="请输入大于0的项目价格（最多保留两位小数）" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="imgupload" style="width:83%" >
            <el-form-item label="商品图片" :prop="'pro_pic'" :rules="{ required: true, message: '请选择图片', trigger: 'change'}">
              <uploadImg :imgUrl="form.pro_pic" :fileName="'1'" @uploadSuccess="uploadImg" @removeImg="removetImg" class="upImg" ></uploadImg>
              <el-input class="left" type="hidden" v-model="form.pro_pic"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品分类" prop="pro_category">
            <el-input class="el-input" v-model="form.pro_category" placeholder="请输入商品分类" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品规格" prop="pro_size">
            <el-input class="el-input" v-model="form.pro_size" placeholder="请输入商品规格" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品销量" prop="pro_sale">
            <el-input class="el-input" v-model="form.pro_sale" placeholder="请输入商品销量" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品厂商" prop="pro_factory">
            <el-input class="el-input" v-model="form.pro_factory" placeholder="请输入商品厂商" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品排序" prop="pro_sort">
            <el-input class="el-input" v-model="form.pro_sort" placeholder="请输入商品排序" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品SKU" prop="pro_sku">
            <el-input class="el-input" v-model="form.pro_sku" placeholder="请输入商品sku" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商品描述" prop="pro_describe">
            <el-input type="textarea" :rows="6" v-model="form.pro_describe" placeholder="请输入商品描述" style="width:90%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="form-wrapper">
          <el-button @click="resetForm" icon="el-icon-circle-close-outline" size="small">重置</el-button>
          <el-button @click="submitForm" type="primary" icon="el-icon-check" size="small">提交</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import uploadImg from '@/components/upload/uploadImg';
import ajax from '@/utils/ajax';
// import { formatDate } from '@/utils/date.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    // 排序
    let validateSort = (rule, value, callback) => {
      if (value) {
        const reg = /^[0-9]\d{0,9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入10位数以内的正整数'));
        }
      } else {
        // callback();
        return callback(new Error('请输入10位数以内的正整数'));
      }
    };
    // 价格
    let validatePrice = (rule, value, callback) => {
      if (value) {
        const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确格式的价格'));
        }
      } else {
        return callback(new Error('请输入正确格式的价格'));
      }
    };
    return {
      form: {
        pro_id: '',
        pro_name: '',
        pro_category: '',
        pro_pic: '',
        pro_price: '',
        pro_size: '',
        pro_sku: '',
        pro_describe: '',
        pro_factory: '',
        pro_sale: 0,
        // pro_sale: Math.floor(Math.random(1, 100) * 500),
        pro_sort: Number(this.$route.query.maxNum) + 1,
      },
      rules: {
        pro_id: [{ required: true, message: '请输入商品ID', trigger: 'blur' }],
        pro_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        pro_category: [{ required: false, message: '请输入分类名称', trigger: 'blur' }],
        pro_price: [{ required: true, validator: validatePrice, trigger: 'blur' }],
        pro_size: [{ required: false, message: '请输入商品规格', trigger: 'blur' }],
        pro_sku: [{ required: false, message: '请输入商品SKU', trigger: 'blur' }],
        pro_describe: [{ required: false, message: '请输入商品描述', trigger: 'blur' }],
        pro_factory: [{ required: false, message: '请输入生产工厂', trigger: 'blur' }],
        pro_sale: [{ required: false, message: '请输入商品销量', trigger: 'blur' }],
        // pro_sale: [{ required: false, validator: validateSort, trigger: 'blur' }],
        pro_sort: [{ required: false, validator: validateSort, trigger: 'blur' }],
      },
    };
  },
  components: {
    'uploadImg': uploadImg,
  },
  computed: {
    ...mapGetters([
      'visitedViews',
    ]),
  },
  props: {
    add: Boolean,
  },
  methods: {
    // 上传图片
    uploadImg(data, imgUrl) {
      this.form.pro_pic = imgUrl;
    },
    // 删除图片
    removetImg(url) {
      this.form.pro_pic = url;
    },
    // 提交表单
    submitForm() {
      let _self = this;
      let param = _self.form;
      // if (!param.pro_price) {
      //   param.pro_price = 0;
      // }
      if (!param.pro_sale) {
        param.pro_sale = 0;
      }
      if (!param.pro_sort) {
        param.pro_sort = 0;
      }
      _self.$refs['formData'].validate((valid) => {
        if (valid) {
          let url;
          if (this.add) {
            url = '/api/intervene/AddProduct';
          } else {
            url = '/api/intervene/UpdateProduct';
          }
          ajax.post(url, param).then(res => {
            if (res.status === 200 && res.data.code === 0) {
              _self.$message({
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
              _self.resetForm();
              // 关闭当前也并跳转新增方案页面
              let currentName = _self.$route.name;
              let currentTab = _self.visitedViews.find((x) => x.name === currentName);
              _self.$store.dispatch('delVisitedViews', currentTab).then((res) => {
                let query = _self.$route.query;
                query.from = _self.$route.name;
                if (query.id) {
                  delete query.id;
                }
                _self.$router.push({
                  path: '/interveneManage/productManage/productList',
                  // query: {
                  //   pageIndex: _self.returnPageIndex,
                  //   pageSize: _self.$route.query.pageSize,
                  //   Title: _self.$route.query.Title,
                  //   statusflag: _self.$route.query.statusflag,
                  //   category_id: _self.$route.query.category_id,
                  // },
                });
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 获取详情
    getDetail() {
      let id = this.$route.query.id;
      ajax.get(`/api/intervene/GetProductByID/` + id).then(res => {
        // console.log(res);
        if (res.status === 200 & res.data.code === 0) {
          this.form = res.data.data;
        }
      });
    },
    resetForm() {
      this.$refs['formData'].resetFields();
    },
  },
  created() {
    if (!this.add) {
      this.getDetail();
    }
  }
};
</script>

<style lang="less" scoped>
.el-input{
  width:75%;
}
.form-wrapper{
  text-align: center;
  margin-left: -78px;
}
</style>
