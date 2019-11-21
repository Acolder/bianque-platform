<template>
  <div id="platform_home">
    <!-- 主页（首页）显示内容 -->
    <div>
    <!-- <div v-if="platform === 'home'"> -->
      <div class="home" v-if="isShow === 'homePage'">
        <!-- 首页顶部 -->
        <div class="home_top">
          <div class="banner">
            <h2>扁鹊健管开放平台</h2>
            <hr />
            <button @click="applayAccess">申请接入 <em> →</em></button>
          </div>
        </div>
        <!-- 首页内容 -->
        <div class="home_contain">
          <ul >
            <li class="contain_title">
              <div class="image"><img :src="listData[0].img" alt="平台介绍"></div>
              <div class="text">
                <h2>{{listData[0].title}}</h2>
                <span>{{listData[0].englishTitle}}</span>
                <p>{{listData[0].text}}</p>
              </div>
            </li>
            <li class="contain_title">
              <div class="text health_manage">
                <h2>{{listData[1].title}}</h2>
                <span>{{listData[1].englishTitle}}</span>
                <p>{{listData[1].text}}</p>
              </div>
              <div class="image"><img :src="listData[1].img" alt="健康管理"></div>
            </li>
            <li class="contain_title">
              <div class="image"><img :src="listData[2].img" alt="平台介绍"></div>
              <div class="text">
                <h2>{{listData[2].title}}</h2>
                <span>{{listData[2].englishTitle}}</span>
                <p>{{listData[2].text}}</p>
              </div>
            </li>
            <!--
            <li class="contain_title">
              <div class="image"><img src="../../../static/img/home/ptjs.png" alt="健康管理"></div>
              <div class="text">
                <h2>平台介绍</h2>
                <span>PLATFORM INTRODUCE</span>
                <p> 扁鹊健康管理平台是一个健康管理领域的综合性开放平台，平台提供
                    多样化的健康指标采集用，户记录日常健康数据，通过扁鹊智能大脑
                    引擎，进行科学精准的健康数据分析，提供给用户专业权威的健康指
                    导意见、干预方案。扁鹊健管平台通过普及健康相关知识，科学运用
                    中医、营养、运动等手段，帮助人们养成健康的的生活习惯，让健康
                    者保持健康，让亚健康者恢复健康，让疾病人群加速康复。
                </p>
              </div>
            </li>
            <li class="contain_title">
              <div class="text health_manage">
                <h2>健康管理</h2>
                <span>HEALTH MANAGEMENT</span>
                <p> 健康管理适宜预防和控制疾病发生于发展，降低医疗费用，提高生命
                    质量为目的，针对个体及群体进行健康教育，提高自我管理意识和水
                    平，并对其生活方式相关的健康危险因素，通过健康信息采集、健康
                    监测、健康评估、个性化监看管理方案，健康干预等手段持续加以改
                    善的过程和方法。
                </p>
              </div>
              <div class="image"><img src="../../../static/img/home/jkgl.png" alt="健康管理"></div>
            </li>
            <li class="contain_title">
              <div class="image"><img src="../../../static/img/home/kmsm.png" alt="康美使命"></div>
              <div class="text">
                <h2>康美使命</h2>
                <span>KANGMEI MISSION</span>
                <p> 快速发展的物联网、互联网、大数据、人工智能等新技术给健康行业
                    带来了全新的机遇，康美药业以中药饮品为核心业务，秉承传播弘扬
                    中医药文化的使命，通过中医养生中医调理以期“治未病”，通过先
                    进的健康管理手段，结合康美的中医药优势资源，让人们乐享健康生
                    活。
                </p>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <!-- 申请接入组件 -->
      <applayAccess v-if="isShow === 'applayPage'" v-on:childByValue="childByValue"></applayAccess>
    </div>
    <!-- 控制台显示内容 -->
    <!-- <div v-else-if="platform === 'console'">
      <div class="homepage_right">
        <div class="homepage_notice_title">
          公告
        </div>
        <ul class="homepage_notice_list">
          <li class="notice_item">暂无</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>
<script>
import getlistData from './index.js';
import applayAccess from '../home/applayAccess.vue';
import {
  getToken,
// removeToken
} from '@/utils/auth';

export default {
  props: ['platform'], // layout页面（父组件）传的值（控制首页在主页和控制台显示的内容）
  data() {
    return {
      listData: [],
      isShow: 'homePage', // 控制页面显示首页或者申请接入页
    };
  },
  components: { applayAccess },
  methods: {
    applayAccess() {
      let token = getToken();
      if (!token) {
        this.$router.push({
          name: 'applayAccess',
          params: { showSlider: 'console' }
        });
      } else {
        this.isShow = 'applayPage';
      }
    },
    childByValue: function (childValue) {
      // childValue为接入申请组件传过来的值
      this.isShow = childValue;
    }
  },
  created() {
    this.listData = getlistData;  // 获取页面数据
  }
};
</script>

<style lang="less" scoped>
#platform_home，.home{
  width: 100%;
  height: 100%;
}

.home_top{
  width: 100%;
  height: 500px;
  background: url('../../../static/img/home/banner.png');
  background-size: cover;

  .banner{
    position: relative;
    text-align: center;
    color:#fff;

    h2{
      letter-spacing: 3px;
      position: absolute;
      left: 270px;
      top: 213px;
      font-size: 30px;
    }

    hr{
      position: absolute;
      left: 270px;
      top: 275px;
      display: inline-block;
      color:#fff;
      width: 260px;
    }
    button{
      width: 110px;
      height: 30px;
      position: absolute;
      left: 270px;
      top: 337px;
      line-height: 25px;
      border: 1px solid #fff;
      color:#fff;
      cursor: pointer;
      em{
        font-size: 22px;
      }
    }
  }
}

.home_contain{
  width: 100%;
  padding: 0 200px 0 200px;
  margin-bottom: 200px;

  ul{
    width: 100%;
    li{
      box-sizing: border-box;
      width: 100%;
      height: 40%;
      margin-top: 30px;
      box-shadow: 2px 3px 5px 5px #f5f5f5;
      .image{
        display: inline-block;
        float: left;
        width: 50%;
        height: 40%;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        width: 50%;
        float: right;
        padding: 30px 35px 10px 40px;
        height: 40%;
        h2{
          color:deepskyblue;
          letter-spacing: 3px;
          margin-bottom: 20px;
          font-size: 30px;
        }
        span{
          color: #ccc;
          // font-size: 17px;
          font-size: 18px;
        }
        p{
          margin-top: 20px;
          color: #333;
          font-size: 16px;
          line-height: 22px;
        }
      }
      .health_manage{
        float: left;
      }
    }
    li:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    li{zoom:1}
  }
}

// 控制台显示内容
.homepage_right {
    float: left;
    width: 30%;

    .homepage_notice_title {
      margin: 10px 0;
    }

    .homepage_notice_list {
      border: 1px solid #ccc;
      width: 100%;
      height: 400px;
      padding: 14px;
    }
  }
</style>

