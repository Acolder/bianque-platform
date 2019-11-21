<template>
  <div id="loginWrap">
    <div class="login_mc">
     <div class="login_contain">
        <div class="title"><h2 class="title_text">扁鹊健康管理开放平台</h2></div>
        <div class="login_content">
          <h3></h3>
          <el-form :model="user" :rules="rules2" ref="ruleForm2" class="login-container">
            <el-form-item prop="Mobile">
              <el-input type="text" v-model="user.Mobile" auto-complete="off" placeholder="请输入手机账号" @keyup.native="changeCSS" :class="{'inputPassword': isNullAccount, 'noinputPassword': !isNullAccount}"></el-input>
            </el-form-item>
            <el-form-item prop="Password">
              <el-input type="password" v-model="user.Password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleSubmit2"  @keyup.native="changeCSS" :class="{'inputPassword1': isNullPassword, 'noinputPassword1': !isNullPassword}"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="verifyCode">
              <el-input type="text" v-model="user.verifyCode" auto-complete="off" placeholder="图形验证码" class="verifyCodeText"></el-input>
              <img :src="codeUrl" alt=""  @click="refreshImg" class="verifyCodeImg">
            </el-form-item> -->
            <el-form-item>
              <span class="forgetPassword" @click="forgetPassword">忘记密码？</span>
              <span class="register" @click="register">注册账户>></span>
            </el-form-item>
            <el-form-item style="width:100%; height: 30px;" class="btn">
              <el-button type="success" class="loginBtn" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
     </div>
    </div>
  </div>
</template>

<script>
// import { javaLogin } from '@/api/user';
// import { setToken } from '@/utils/auth';
export default {
  data() {
    return {
      logining: false,
      user: {
        Mobile: '',
        Password: '',
      },
      isNullAccount: false,
      isNullPassword: false,
      rules2: {
        Mobile: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          // { required: true, validator: validateTel, trigger: 'blur' },
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { required: true, validator: validatePass, trigger: 'blur' },
        ],
        // verifyCode: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      },
      // checked: true,
      // codeUrl: `${process.env.MALL_BASE_HOST}/mall_manage/back/login/authCode`
    };
  },
  watch: { // 监听账号和密码值变化
    'user.Moblie': function (newVal, oldVal) {
    },
    'user.Password': function (newVal, oldVal) {
    }
  },
  methods: {
    // 改变账号和密码图标
    changeCSS() {
      if (this.user.Mobile) {
        this.isNullAccount = true;
      } else {
        this.isNullAccount = false;
      }
      if (this.user.Password) {
        this.isNullPassword = true;
      } else {
        this.isNullPassword = false;
      }
    },
    // 忘记密码
    forgetPassword() {
      this.$router.push({
        path: '/password/findPassword',
        query: {
          title: '找回密码'
        }
      });
    },
    // 注册账号
    register() {
      this.$router.push({
        path: '/register',
      });
    },
    // 重置
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    // 登录
    async handleSubmit2(ev) {
      let _self = this;

      _self.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          if (_self.user.Password) {
            /*
            javaLogin(_self.user.Mobile, _self.user.Password, _self.user.verifyCode).then((res) => {
              if (res.status === 200 && res.data.resultCode === '0') {
                let userToken = res.data.resultData.usertoken;
                if (userToken) {
                  setToken(userToken);
                }
                // 保存userid
                let userid = res.data.resultData.userId;
                if (userid) {
                  sessionStorage.setItem('userid', userid);
                }
                // 保存锁定名字
                let nickname = res.data.resultData.Mobile;
                if (nickname) {
                  sessionStorage.setItem('nickname', nickname);
                }
                _self.$store.dispatch('setNavs', []);
                _self.$store.dispatch('setPermission', []);
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                let value = reg.test(_self.user.Password);
                if (!reg.test(value)) {
                  // console.log(value);
                  if (value === true) {
                    _self.pageRedirect();
                  } else {
                    _self.$router.push({
                      path: '/modifyPassword',
                      query: {
                        id: sessionStorage.getItem('userid'),
                        tip: 1,
                      }
                    });
                  }
                }
              }
            });
            */
            this.$store.dispatch('Login', this.user).then(() => {
              this.logining = true;
              this.$router.push({ path: '/home/index' });
            }).catch(err => {
              this.logining = false;
              this.$message.error(err);
            });
          } else {
            return false;
          }
        }
      });
    },
    // 页面重定向
    pageRedirect() {
      this.$router.push('/home/index');
      // let returnUrl = sessionStorage.getItem('returnUrl');
      // if (returnUrl) {
      //   sessionStorage.removeItem('returnUrl');
      //   location.href = returnUrl;
      // } else {
      //   this.$router.push('/home/index');
      //   // let url = `${process.env.WEB_HOST}/home/index`;
      //   // location.href = url;
      // }
    },
    // 刷新验证码
    refreshImg() {
      let random = this.getRandom(8);
      this.codeUrl = `${process.env.MALL_BASE_HOST}/mall_manage/back/login/authCode?v=${random}`;
    },
    // 获取随机数
    getRandom(n) {
      let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let res = '';
      for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    }
  }
};

</script>

<style lang="less" scoped>
#loginWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../../static/img/admin/bj.jpg');
  background-size: 100% 100%;

  .login_mc{
    width: 100%;
    height: 100%;
    padding-top: 10%;

    .login_contain {
      margin: auto;
      width: 783px;
      height: 490px;

      .title{
        width: 50%;
        height: 100%;
        display: inline-block;
        float: left;
        padding-top: 100px;
        background: url('../../../static/img/admin/login.png');
        background-size: 100% 100%;
        border-bottom-left-radius:8px;/*左下角圆角*/
        border-top-left-radius: 8px;/*左上角圆角*/

        .title_text {
          margin: 0 auto 60px auto;
          text-align: center;
          color: #fff;
          font-size: 30px;
          word-spacing: 50px;
        }
      }

      .login_content{
        background: #fff;
        width: 50%;
        height: 100%;
        float: right;
        padding-top: 100px;
        text-align: center;
        border-bottom-right-radius:8px;
        border-top-right-radius: 8px;

        h3{
          margin: auto;
          width: 150px;
          height: 36px;
          background: url('../../../static/img/admin/login_03.png')
        }
        .login-container {
          margin: auto;
          width: 300px;
          height: 50px;
          margin-top: 61px;

          .inputPassword,.inputPassword1,.noinputPassword,.noinputPassword1 {
            /deep/ .el-input__inner {
              height: 38px;
              border-color: #e7ecee;
              padding-left: 45px;
            }
          }

          .noinputPassword {
            /deep/ .el-input__inner {
              background: url('../../../static/img/admin/def_yonhu.png') no-repeat 15px center;
            }
          }

          .inputPassword {
            /deep/ .el-input__inner {
              background: url('../../../static/img/admin/sel_yonhu.png') no-repeat 15px center;
            }
          }

          .noinputPassword1 {
            /deep/ .el-input__inner {
              background: url('../../../static/img/admin/def_mima.png') no-repeat 15px center;
            }
          }

          .inputPassword1 {
            /deep/ .el-input__inner {
              background: url('../../../static/img/admin/sel_mima.png') no-repeat 15px center;
            }
          }

          /deep/ .el-form-item__label{
            font-size: 18px;
          }

          .forgetPassword{
            float: left;
            cursor: pointer;
            color: #aaa;
          }
        }

        .register{
            float: right;
            cursor: pointer;
            color: #aaa;

        }

        .el-form-item__content{
          line-height: 13px;
        }
        .loginBtn {
          border: 0;
          color: #fff;
          font-size: 18px;
          background:  rgba(24, 144, 255, 1);
        }
      }
    }

  }
}

</style>
