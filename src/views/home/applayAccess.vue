<template>
  <div class="accessApplay">
    <h2>申请接入</h2>
    <el-form :model="accessInfo" :rules="rules2" ref="ruleForm2" label-position="left" label-width="100px" class="accessInfo">
      <el-form-item prop="company_name" label="企业名称">
      <el-input type="text" v-model="accessInfo.company_name" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item prop="company_header" label="对接人">
        <el-input type="text" v-model="accessInfo.company_header" placeholder="请输入对接人"></el-input>
      </el-form-item>
      <el-form-item prop="company_mobile" label="对接电话">
        <el-input type="text" v-model="accessInfo.company_mobile" placeholder="请输入对接电话"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button @click="back" class="back_home" style="width: 150px;">返回首页</el-button>
      <el-button @click="sumit" class="sumit_applay" style="width: 150px;">提交申请</el-button>
    </div>
  </div>
</template>

<script>
import { getUserData } from '@/utils/auth';
import axois from '@/utils/ajax';

export default {
  data() {
    // 手机号码校验
    let validateTel = (rule, value, callback) => {
      if (value) {
        const reg = /^1(3|4|5|7|8)\d{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确格式对接电话'));
        }
      } else {
        return callback(new Error('请输入正确格式对接电话'));
      }
    };
    return {
      accessInfo: {
        id: '',
        mobile: '',
        company_name: '',
        company_header: '',
        company_mobile: '',
      },
      isShow: 'homePage', // 传给首页的值
      rules2: {
        company_name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        company_header: [
          { required: true, message: '请输入对接人', trigger: 'blur' },
        ],
        company_mobile: [
          { required: true, validator: validateTel, trigger: 'blur' },
        ]
      },
    };
  },
  methods: {
    // 返回首页
    back() {
      this.$emit('childByValue', this.isShow);
    },
    // 提交申请
    sumit() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          axois.post('/api/user/ApplicationAccess', this.accessInfo).then((res) => {
            if ((res.data.code === 0) && (res.status === 200)) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              // this.$router.push({
              //   path: '/home/index',
              // });
              this.$emit('childByValue', this.isShow);
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    let userData = getUserData(); // 获取用户数据
    this.accessInfo.mobile = userData.mobile;
    this.accessInfo.id = userData.id;
  }
};
</script>

<style lang="less" scoped>

.accessApplay{
  margin-left: 30px;
}

 h2{
   font-weight: normal;
   color: #111;
   display: inline-block;
   margin-top: 20px;
 }

 .accessInfo{
    margin: 20px 0 0 40px;
    width: 460px;
 }

 .btn {
   margin: 77px 0 0 400px;
   .sumit_applay{
      background: rgba(22, 155, 213, 1);
      color: #fff;
    }
    .back_home{
      background: #fff;
      color: #333;
    }
 }

</style>

