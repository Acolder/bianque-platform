<template>
  <div id="archives_box">
    <el-form ref="detailData" id="addNews">
        <p class="p-title">
          用户信息
        </p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">用户ID：</span><i class="title">{{detailData.id}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">用户昵称：</span>{{detailData.nickname}}</div></el-col>
        </el-row>
        <p class="p-title">
          档案信息
          <span class="common_color time">最近更新时间：{{detailData.create_time}}</span>
          <span class="common_color history" @click="daxx_Data">查看历史数据 ></span>
          </p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">性别：</span><i class="title">{{detailData.gender}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">身高：</span>{{detailData.height}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">年龄：</span><i class="title">{{detailData.age}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">体重：</span>{{detailData.weight}}</div></el-col>
        </el-row>
        <p class="p-title">
          基础指标
          <span class="common_color time">最近更新时间：{{detailData.create_time}}</span>
          <span class="common_color history" @click="jczb_Data">查看历史数据 ></span>
          </p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">BMI：</span><i class="title">{{detailData.bmi}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">心率：</span>{{detailData.heart_rate}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">血糖：</span><i class="title">{{detailData.blood_sugar}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">血压：</span>{{detailData.blood_pressure}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">体温：</span><i class="title">{{detailData.temperature}}</i></div></el-col>
        </el-row>
        <p class="p-title">
          体质问卷
          <span class="common_color time">最近更新时间：{{detailData.create_time}}</span>
          <span class="common_color history" @click="tzwj_Data">查看历史数据 ></span>
          </p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">体质结果：</span><i class="title">{{detailData.constitution}}</i></div></el-col>
        </el-row>
        <el-row>
        <el-form-item class="form-wrapper">
          <el-button @click="close" type="primary" size="middle">关闭</el-button>
        </el-form-item>
      </el-row>
      </el-form>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      detailData: '',
      id: this.$route.query.id,
    };
  },
  methods: {
    // 关闭页面返回列表
    close() {
      this.$router.push(`/archivesManage/archivesList`);
    },
    getDetail() {
      let id = this.id;
      ajax.get(`/api/admin/GetUserHealthyListInfoByid/` + id).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.detailData = res.data.data;
          if (this.detailData.gender === 1) {
            this.detailData.gender = '男';
          } else if (this.detailData.gender === 0) {
            this.detailData.gender = '女';
          } else {
            this.detailData.gender = '用户暂未输入性别';
          }
        }
      });
    },
    // 基础指标
    jczb_Data() {
      let id = this.id;
      this.$router.push(`/archivesManage/jczb_List?id=` + id);
    },
    // 档案信息
    daxx_Data() {
      let id = this.id;
      this.$router.push(`/archivesManage/daxx_List?id=` + id);
    },
    // 体质问卷
    tzwj_Data() {
      let id = this.id;
      this.$router.push(`/archivesManage/tzcp_List?id=` + id);
    },
  },
  created() {
    if (this.$route.query.id) {
      this.getDetail();
    }
  }
};
</script>

<style lang="less" scoped>
#archives_box{
  padding: 20px 50px 0;
  box-sizing: border-box;
}
.p-title{
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
  position: relative;
}
.bg-purple{
  line-height: 30px;
}
.common{
  margin-left: 70px;
}
.common_color{
  color: #169bd5;
  font-weight: normal;
  font-size: 14px;
}
.time{
  margin-left: 40px;
}
.history{
  position: absolute;
  right: 20px;
  cursor: pointer;
  // top: 5px;
}
.form-wrapper{
  text-align: center;
  margin: 50px 0 0 -20px;
}
</style>
