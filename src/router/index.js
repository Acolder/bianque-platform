import Vue from 'vue';
import Router from 'vue-router';
import layout from '../views/layout/layout2.vue';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router);

// 公用路由(iframe中的路由、component!=layout的一级路由)
export const constantRouterMap = [
  // 通用页面
  // 登录
  { path: '/login', component: _import('login/login') },
  // 注册
  { path: '/register', component: _import('register/register') },
  // 修改密码
  { path: '/password/modifyPassword', component: _import('password/modifyPassword') },
  // 找回密码
  { path: '/password/findPassword', component: _import('password/findPassword') },
  // 首页
  {
    path: '/home',
    name: 'home',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          iconfont: 'icon-warehouse-delivery',
          title: '首页'
        },
        component: _import('home/index')
      },
      {
        path: '/applayAccess',
        name: 'applayAccess',
        meta: {
          title: '申请接入'
        },
        component: _import('home/applayAccess')
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        meta: {
          title: '用户中心'
        },
        component: _import('home/userCenter')
      },
    ]
  },
  {
    path: '/',
    name: 'default-name',
    redirect: '/home/index'
  },
  { path: '/401', component: _import('errorPage/401') },
  { path: '/404', component: _import('errorPage/404') },
  // 体质指标组件
  {
    path: '/incrementService/PhysicalResultList',
    component: _import('console/incrementService/PhysicalResultList'),
    name: 'PhysicalResultList',
    meta: {
      title: '体质列表',
      show: false
    }
  },
  // 选择资讯列表(单个)
  {
    path: '/interveneManage/newsManage/newsComponent',
    component: _import('console/interveneManage/newsManage/newsComponent'),
    name: 'newsComponent',
    meta: {
      title: '外部资讯列表',
      show: false
    }
  },
  // 选择商品列表(单个)
  {
    path: '/interveneManage/productOne',
    component: _import('console/interveneManage/productOne'),
    name: 'productOne',
    meta: {
      title: '外部商品列表',
      show: false
    }
  },
];
// 控制台
export const consoleRouterMap = [
  // 档案管理
  {
    path: '/archivesManage',
    // redirect: 'noredirect',
    component: layout,
    name: 'archivesManage',
    meta: {
      title: '档案管理',
      show: true,
      icon: 'icon-bussinesscard',
    },
    children: [
      {
        path: '/archivesManage/archivesList',
        component: _import('console/archivesManage/archivesList'),
        name: 'archivesList',
        meta: {
          title: '用户健康档案',
          show: true,
          icon: 'icon-my'
        }
      },
      {
        path: '/archivesManage/lookArchives',
        component: _import('console/archivesManage/lookArchives'),
        name: 'lookArchives',
        meta: {
          title: '查看健康指标',
          show: false
        }
      },
      {
        path: '/archivesManage/daxx_List',
        component: _import('console/archivesManage/daxx_List'),
        name: 'daxx_List',
        meta: {
          title: '档案信息数据列表',
          show: false
        }
      },
      {
        path: '/archivesManage/jczb_List',
        component: _import('console/archivesManage/jczb_List'),
        name: 'jczb_List',
        meta: {
          title: '基础指标数据列表',
          show: false
        }
      },
      {
        path: '/archivesManage/tzcp_List',
        component: _import('console/archivesManage/tzcp_List'),
        name: 'tzcp_List',
        meta: {
          title: '体质测评数据列表',
          show: false
        }
      },
    ]
  },
  // 干预内容管理
  {
    path: '/interveneManage',
    component: layout,
    // redirect: 'noredirect',
    name: 'interveneManage',
    meta: {
      title: '干预内容管理',
      show: true,
      icon: 'icon-home',
    },
    children: [
      {
        path: '/interveneManage/newsManage/newsList',
        component: _import('console/interveneManage/newsManage/newsList'),
        name: 'newsList',
        meta: {
          title: '资讯管理',
          show: true,
          icon: 'icon-imagetext',
        }
      },
      {
        path: '/interveneManage/newsManage/addNews',
        component: _import('console/interveneManage/newsManage/addNews'),
        name: 'addNews',
        meta: {
          title: '新增资讯',
          show: false,
        }
      },
      {
        path: '/interveneManage/newsManage/editNews',
        component: _import('console/interveneManage/newsManage/editNews'),
        name: 'editNews',
        meta: {
          title: '修改资讯',
          show: false
        }
      },
      {
        path: '/interveneManage/productManage/productList',
        component: _import('console/interveneManage/productManage/productList'),
        name: 'productList',
        meta: {
          title: '商品管理',
          show: true,
          icon: 'icon-similarproduct',
        }
      },
      {
        path: '/interveneManage/productManage/addProduct',
        component: _import('console/interveneManage/productManage/addProduct'),
        name: 'addProduct',
        meta: {
          title: '添加商品',
          show: false
        }
      },
      {
        path: '/interveneManage/productManage/editProduct',
        component: _import('console/interveneManage/productManage/editProduct'),
        name: 'editProduct',
        meta: {
          title: '修改商品',
          show: false
        }
      },
      {
        path: '/interveneManage/bodyInterveneList',
        component: _import('console/interveneManage/bodyInterveneList'),
        name: 'bodyInterveneList',
        meta: {
          title: '体质问卷干预',
          show: true,
          icon: 'icon-templatedefault',
        }
      },
      {
        path: '/interveneManage/BMIInterveneList',
        component: _import('console/interveneManage/BMIInterveneList'),
        name: 'BMIInterveneList',
        meta: {
          title: 'BMI结果干预',
          show: true,
          icon: 'icon-templatedefault',
        }
      },
      {
        path: '/interveneManage/pressureInterveneList',
        component: _import('console/interveneManage/pressureInterveneList'),
        name: 'pressureInterveneList',
        meta: {
          title: '血压结果干预',
          show: true,
          icon: 'icon-templatedefault',
        }
      },
      {
        path: '/interveneManage/sugarInterveneList',
        component: _import('console/interveneManage/sugarInterveneList'),
        name: 'sugarInterveneList',
        meta: {
          title: '血糖结果干预',
          show: true,
          icon: 'icon-templatedefault',
        }
      },
      {
        path: '/interveneManage/DNAInterveneList',
        component: _import('console/interveneManage/DNAInterveneList'),
        name: 'DNAInterveneList',
        meta: {
          title: '解码DNA评估干预',
          show: true,
          icon: 'icon-templatedefault',
        }
      },
      {
        path: '/interveneManage/addIntervene',
        component: _import('console/interveneManage/addIntervene'),
        name: 'addIntervene',
        meta: {
          title: '新增干预方案',
          show: false
        }
      },
      {
        path: '/interveneManage/editIntervene',
        component: _import('console/interveneManage/editIntervene'),
        name: 'editIntervene',
        meta: {
          title: '修改干预方案',
          show: false
        }
      },
    ]
  },
  // 增值服务管理
  {
    path: '/incrementService',
    component: layout,
    // redirect: 'noredirect',
    name: 'incrementService',
    meta: {
      title: '增值服务管理',
      show: true,
      icon: 'icon-store',
    },
    children: [
      // 理疗门店
      {
        path: '/incrementService/physiotherapyList',
        component: _import('console/incrementService/physiotherapyList'),
        name: 'physiotherapyList',
        meta: {
          title: '理疗门店',
          show: true,
          icon: 'icon-store',
        }
      },
      {
        path: '/incrementService/store_info/addStore',
        component: _import('console/incrementService/store_info/addStore'),
        name: 'addStore',
        meta: {
          title: '新增门店信息',
          show: false
        }
      },
      {
        path: '/incrementService/store_info/editStore',
        component: _import('console/incrementService/store_info/editStore'),
        name: 'editStore',
        meta: {
          title: '编辑门店信息',
          show: false
        }
      },
      // 门店理疗方案
      {
        path: '/incrementService/manageProgramme',
        component: _import('console/incrementService/manageProgramme'),
        name: 'manageProgramme',
        meta: {
          title: '门店理疗方案',
          show: false,
        }
      },
      // 新增理疗方案
      {
        path: '/incrementService/programme_info/addProgramme',
        component: _import('console/incrementService/programme_info/addProgramme'),
        name: 'addProgramme',
        meta: {
          title: '新增理疗方案',
          show: false
        }
      },
      // 编辑理疗方案
      {
        path: '/incrementService/programme_info/editProgramme',
        component: _import('console/incrementService/programme_info/editProgramme'),
        name: 'editProgramme',
        meta: {
          title: '编辑理疗方案',
          show: false
        }
      },
    ]
  },
  // 开放平台申请管理(放在中控)
  {
    path: '/openPlatformManage',
    redirect: 'noredirect',
    component: layout,
    name: 'openPlatformManage',
    meta: {
      title: '开放平台申请管理',
      show: false,
      icon: 'icon-check-circle',
    },
    children: [
      {
        path: '/openPlatformManage/applayUser',
        component: _import('console/openPlatformManage/applayUser'),
        name: 'applayUser',
        meta: {
          title: '申请用户管理',
          show: false,
          icon: 'icon-survey'
        }
      }
    ]
  },
];

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
