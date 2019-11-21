<template>
  <div id="passwordWrap">
     <div class="password_mc">
      <div class="password_contain">
          <h2 class="title">{{title}}</h2>
          <el-form :model="user" :rules="rules2" ref="ruleForm2" status-icon label-width="115px" class="password-container" @submit.native.prevent>
            <el-form-item prop="Mobile" label="手机号" style="color: #fff;">
              <el-input type="text" v-model="user.Mobile" auto-complete="off" placeholder="请输入手机号" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item prop="VerifyCode" label="手机验证码">
              <el-input type="text" v-model="user.VerifyCode" auto-complete="off" placeholder="请输入验证码" class="verifyCodeText"></el-input>
              <el-button class="verifyCodeImg" @click="getVerifyCode()">{{sendcode_msg}}</el-button>
            </el-form-item>
            <el-form-item prop="NewPassword" label="新密码">
              <el-input type="password" v-model="user.NewPassword" auto-complete="off" placeholder="请输入密码" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item prop="reNewPassword" label="密码确认">
              <el-input type="password" v-model="user.reNewPassword" auto-complete="off" placeholder="请再次输入密码" class="inputPassword1"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;" class="btn" label-width="40px">
              <el-button type="success" class="registerBtn" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">完 成</el-button>
            </el-form-item>
          </el-form>
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
    // 新密码校验
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
    // 确认新密码校验
    let validateRePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入包括数字和字母、长度8到16位的密码组合'));
      } else if (value === this.user.NewPassword) {
        callback();
      }
      else {
        return callback(new Error('两次密码不一致'));
      }
    };
    return {
      title: '修改密码',
      logining: false,
      imgcodeDialog: false,
      user: {
        NewPassword: '',
        Mobile: '',
        VerifyCode: '',
        reNewPassword: '',
      },
      toPhone: '',
      valid: '',
      code: '',
      imgcode: '',
      sendcode_msg: '获取验证码',
      rules2: {
        Mobile: [
          { required: true, validator: validateTel, trigger: 'blur' },
        ],
        NewPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        reNewPassword: [
          { required: true, validator: validateRePass, trigger: 'blur' },
        ],
        VerifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeUrl: '',
    };
  },
  props: {
    isAdd: Boolean
  },
  methods: {
    // 获取图形验证码
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
      if (this.imgcode) {
        this.valid = 2; // 忘记/找回密码
        this.code = this.imgcode;
        axois.get('/api/system/SendVerifyCode/' + this.toPhone + '/' + this.valid + '/' + this.code).then((res) => {
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
            this.$message({ // 验证码发送失败
              type: 'error',
              message: res.data.message
            });
          }
          this.imgcodeDialog = false;
          this.imgcode = '';
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
    // 完成
    handleSubmit2() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          axois.post('/api/user/forgetpassword', this.user).then((res) => {
            if ((res.data.code === 0) && (res.status === 200)) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.$router.push({
                path: '/login',
              });
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
    if (!this.isAdd) {
      this.title = '找回密码';
    }
  }
};
</script>

<style lang="less" scoped>
#passwordWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../../static/img/admin/bj.jpg');
  background-size: 100% 100%;

  .password_mc{
    width: 100%;
    height: 100%;
    padding-top: 10%;

    .password_contain {
      width: 480px;
      height: 530px;
      margin: auto;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      padding-top: 70px;
      box-shadow: 5px 5px 50px 10px #aaa;

      .title {
        margin: 0px auto 60px auto;
        text-align: center;
        color: #505458;
        font-size: 35px;
      }

      .password-container {
        margin: auto;
        width: 380px;
        height: 50px;

        .inputPassword {
          /deep/ .el-input__inner {
            height: 46px;
            border-color: #e7ecee;
          }
        }

        .inputPassword1 {
          /deep/ .el-input__inner {
            height: 46px;
            border-color: #e7ecee;
          }
        }

        /deep/ .el-form-item__label{
          font-size: 18px;
          text-align: right;
        }

        .forgetPassword,.register{
          float: right;
          color: rgba(24, 144, 255, 1);
        }

        .verifyCodeText {
          width: calc(100% - 100px);

          /deep/ .el-input__inner {
            width: 107%;
            height: 46px;
            border-color: #e7ecee;
            vertical-align: middle;
          }
        }

        .verifyCodeImg {
          display: inline-block;
          width: 85px;
          height: 46px;
          float: right;
          vertical-align: middle;
          border-radius: 8px;
          padding: 0px;
        }
      }

      .registerBtn {
        border: 0;
        color: #fff;
        font-size: 18px;
        background:  rgba(24, 144, 255, 1);
        margin-top: 15px;
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
