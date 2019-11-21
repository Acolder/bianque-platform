<template>
  <div class="userCenter">
    <div class="user_contain">
      <h2>用户中心</h2>
      <ul class="account_info">
        <h3>账号信息</h3>
        <li>账号： <span>{{userData.account_name}}</span></li>
        <li>手机号：<span>{{userData.mobile}}</span></li>
        <li>企业名称： <span>{{userData.company_name}}</span></li>
        <li>对接人： <span>{{userData.company_header}}</span></li>
        <li>对接电话： <span>{{userData.company_mobile}}</span></li>
      </ul>
      <ul class="account_info">
        <h3>对接信息</h3>
        <li v-if="userData.status === 0">申请对接状态： <span>正常</span></li>
        <li v-if="userData.status === 1">申请对接状态： <span>审核通过</span></li>
        <li v-if="userData.status === -1">申请对接状态： <span>审核不通过</span></li>
        <li v-if="userData.status === 1">应用key： <span>{{userData.app_key}}</span></li>
        <li v-if="userData.status === 1">接口密钥： <span>{{userData.app_secret}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { getUserData } from '@/utils/auth';
import axois from '@/utils/ajax';

export default {
  data() {
    return {
      id: this.$route.query.id,
      // id: '',
      userData: [],
    };
  },
  methods: {
    getUserCenterData(id) {
      axois.get('/api/user/GetUserInfoByid?id=' + id).then((res) => {
        if ((res.data.code === 0) && (res.status === 200)) {
          this.userData = res.data.data;
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      });
    },
  },
  mounted() {
    // let userData = getUserData(); // 获取用户数据
    // this.id = userData.id;
    this.getUserCenterData(this.id);
  },
};
</script>

<style lang="less" scoped>

.user_contain {
  padding: 30px 0 0 20px;

  .account_info {
    padding: 20px 0 0 30px;
    h3{
      font-weight: 800;
    }
    li {
      font-size: 18px;
      line-height: 45px;

      span{
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}

</style>

