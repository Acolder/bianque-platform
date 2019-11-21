<template>
  <div id="registerWrap">
    <div class="register_mc">
      <div class="register_contain">
        <div class="title"><h2 class="title_text">扁鹊健管开放平台账号注册</h2></div>
        <div class="register_content">
          <el-form :model="user" :rules="rules2" ref="ruleForm2" label-width="120px" status-icon class="register-container">
            <el-form-item prop="account_name" label="账号名">
              <el-input type="text" v-model="user.account_name" placeholder="请输入账号" class="inputPassword"></el-input>
            </el-form-item>
            <el-form-item prop="Password" label="密码">
              <el-input type="password" v-model="user.Password" auto-complete="off" placeholder="请输入密码" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword" label="密码确认">
              <el-input type="password" v-model="user.rePassword" auto-complete="off" placeholder="请再次输入密码" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item prop="Mobile" label="手机号">
              <el-input type="text" v-model="user.Mobile" auto-complete="off" placeholder="请输入手机号" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item prop="VerifyCode" label="手机验证码">
              <el-input type="text" v-model="user.VerifyCode" auto-complete="off" placeholder="请输入验证码" class="verifyCodeText"></el-input>
              <!-- <img :src="code" alt="" class="verifyCodeImg"> -->
              <el-button class="verifyCodeImg" @click="getVerifyCode()">{{sendcode_msg}}</el-button>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input type="text" v-model="user.email" auto-complete="off" placeholder="请输入邮箱" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item style="width:100%; height: 30px;" class="btn" label-width="40px">
              <el-button type="success" class="registerBtn" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">注 册</el-button>
            </el-form-item>
            <span class="register" @click="login">已注册，请登录>>></span>
          </el-form>
        </div>
        <!-- 获取图形验证码弹窗 -->
        <el-dialog title="图形验证码" :visible.sync="imgcodeDialog" width="30%" center>
          <el-input type="text" v-model="imgcode" auto-complete="off" placeholder="请输入图形验证码" class="imgCodeText"></el-input>
          <img :src="codeUrl" alt=""  @click="refreshImg" class="verifyCodeImg1">
          <div slot="footer" class="dialog-footer">
            <el-button @click="clear">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth';
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
          return callback(new Error('请输入正确的手机号码'));
        }
      } else {
        return callback(new Error('请输入正确的手机号码'));
      }
    };
    // 邮箱校验
    let validateEmail = (rule, value, callback) => {
      if (value) {
        const reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的邮箱'));
        }
      } else {
        // callback();
        return callback(new Error('请输入正确的邮箱'));
      }
    };
    // 密码校验
    let validatePass = (rule, value, callback) => {
      if (value) {
        const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,16}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入包括数字和字母、长度8到16位的密码组合'));
        }
      } else {
        return callback(new Error('请输入包括数字和字母、长度8到16位的密码组合'));
      }
    };
    // 确认密码校验
    let validateRePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入包括数字和字母、长度8到16位的密码组合'));
      } else if (value === this.user.Password) {
        callback();
      }
      else {
        return callback(new Error('两次密码不一致'));
      }
    };
    return {
      logining: false,
      imgcodeDialog: false, // 图形验证码弹窗
      user: {
        account_name: '',
        Password: '',
        Mobile: '',
        email: '',
        VerifyCode: '',
        rePassword: '',
      },
      toPhone: '',  // 获取手机验证码参数
      code: '',     // 同上
      imgcode: '',  // 图形验证码值
      sendcode_msg: '获取验证码',
      rules2: {
        account_name: [
          { required: true, message: '请输入账号名', trigger: 'blur' },
        ],
        Password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        rePassword: [
          { required: true, validator: validateRePass, trigger: 'blur' },
        ],
        Mobile: [
          { required: true, validator: validateTel, trigger: 'blur' },
        ],
        imgcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        VerifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' },
        ],
      },
      codeUrl: '', // 图形验证码图片地址
    };
  },
  methods: {
    // 登录
    login() {
      this.$router.push({
        path: '/login',
      });
    },
    // 点击显示图形验证码弹窗并获取图形验证码
    getVerifyCode() {
      this.refreshImg();
    },
    clear() {
      this.imgcodeDialog = false;
      this.imgcode = '';
    },
    // 获取手机验证码
    confirm() {
      this.toPhone = this.user.Mobile;
      let valid = 1;
      if (this.imgcode) {
        this.code = this.imgcode;
        axois.get('/api/system/SendVerifyCode/' + this.toPhone + '/' + valid + '/' + this.code).then((res) => {
          if (res.data.code === 0) {
            let duration = 120;
            this.sendcode_msg = duration + 's';
            let timer = setInterval(() => {
              duration--;
              this.sendcode_msg = duration + 's';
              if (duration === 0) {
                this.sendcode_msg = '重新发送';
                clearInterval(timer);
              }
            }, 1000);
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
          this.imgcodeDialog = false;
          this.imgcode = '';
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '发送失败'
          });
        });
      }
    },
    // 获取图形验证码
    refreshImg() {
      let random = this.getRandom(8);
      if (this.user.Mobile) {
        this.imgcodeDialog = true;
        this.codeUrl = `${process.env.BASE_HOST}/api/system/getImageVerify/${this.user.Mobile}?v=${random}`;
      } else {
        this.$message({
          type: 'error',
          message: '请先输入手机号'
        });
      }
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
    },
    // 注册
    handleSubmit2() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          axois.post('/api/user/register', this.user).then((res) => {
            if ((res.data.code === 0) && (res.status === 200)) {
              setToken(res.data.token);
              this.$router.push({
                path: '/login',
              });
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '注册失败'
            });
          });
        } else {
          return false;
        }
      });
    },
  },
};

</script>

<style lang="less" scoped>
#registerWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../../static/img/admin/bj.jpg');
  background-size: 100% 100%;

  .register_mc{
    width: 100%;
    height: 100%;
    padding-top: 7%;

    .register_contain {
      margin: auto;
      width: 962px;
      height: 550px;

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

    .register_content{
        border-radius: 8px;
        background: #fff;
        width: 50%;
        height: 100%;
        float: right;
        padding-top: 50px;
        border-bottom-right-radius:8px;
        border-top-right-radius: 8px;

        .register-container {
          margin-left: 20px;
          width: 430px;
          height: 40px;

          .inputPassword,.inputPassword1 {
            /deep/ .el-input__inner {
              height: 38px;
              border-color: #e7ecee;
              padding-left: 20px;
            }
          }

          .verifyCodeText {
            width: calc(100% - 100px);

            /deep/ .el-input__inner {
              width: 106%;
              height: 46px;
              border-color: #e7ecee;
              vertical-align: middle;
            }
          }

          .verifyCodeImg {
            width: 85px;
            height: 46px;
            float: right;
            vertical-align: middle;
            border: 1px solid #e7ecee;
            border-radius: 8px;
            padding: 0px;
          }

          .register{
            float: right;
            margin-bottom: 20px;
            display: inline-block;
            color: rgba(24, 144, 255, 1);
            cursor: pointer;
          }
        }

        .registerBtn {
          border: 0;
          color: #fff;
          font-size: 18px;
          background:  rgba(24, 144, 255, 1);
          margin-top: 10px 0;
        }
      }
    }
  }
}
.imgCodeText{
  width: calc(100% - 100px);

      /deep/ .el-input__inner {
        width: 98%;
        height: 46px;
        border-color: #e7ecee;
        vertical-align: middle;
      }
}
.verifyCodeImg1 {
      display: inline-block;
      width: 100px;
      height: 46px;
      float: right;
      vertical-align: middle;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 8px;
  }

</style>
