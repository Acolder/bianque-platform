import store from '@/store';
import router, { consoleRouterMap } from '@/router';
import layout from '../views/layout/layout2.vue';

const _import = require('./_import_' + process.env.NODE_ENV);

export function createRoute(data) {
  data.forEach((item) => {
    if (item.path) {
      if (item.component) {
        if (item.component.indexOf('layout') >= 0) {
          item.component = layout;
        } else {
          let componentPath = item.component.replace('.vue', '');
          item.component = _import(componentPath);
        }
      } else {
        item.component = layout;
      }
      item.meta = {};
      if (item.title) {
        item.meta.title = item.title;
      }
      if (item.show !== '0') {
        item.meta.show = true;
      } else {
        item.meta.show = false;
      }
      item.children = item.child;
      if (item.children) {
        createRoute(item.children);
      }
    }
  });
  return data;
}

function getAdminRoute() {
  let permissions = [];
  permissions.push({
    name: 'console',
    routers: consoleRouterMap
  });
  return permissions;
}

function getAdminNavs() {
  let navs = [
    // {
    //   name: 'home',
    //   title: '首页',
    //   icon: '',
    //   url: '',
    //   children: []
    // },
    {
      name: 'console',
      title: '控制台',
      icon: '',
      url: '',
      children: []
    },
  ];
  return navs;
}

function appendRoute(permissions) {
  // console.log('initRoute');
  for (let index = 0; index < permissions.length; index++) {
    let item = permissions[index];
    try {
      router.addRoutes(item.routers);
    } catch (error) {
      console.error(error);
    }
  }
}

export function initRoute(registerRouteFresh) {
  // let username = store.getters.name;
  let menuList = store.getters.menuList;
  if (process.env.NODE_ENV === 'development') {
    let navs = getAdminNavs();
    store.dispatch('setNavs', navs);
    let permissions = getAdminRoute();
    if (registerRouteFresh) {
      appendRoute(permissions);
    }
    store.dispatch('setPermission', permissions).then(() => {});
  } else {
    if (menuList && menuList.length > 0) {
      let navs = [];
      let permissions = [];
      for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        navs.push({
          name: item.name,
          title: item.title,
        });
        if (item.child) {
          let m = createRoute(item.child);
          permissions.push({
            name: item.name,
            routers: m
          });
        }
      }
      let activeNavName = store.getters.activeNavName;
      let activeNav = navs.find((x) => x.name === activeNavName);
      if (!activeNav) {
        store.dispatch('setActiveNavName', navs[0].name);
      }
      store.dispatch('setNavs', navs);
      if (registerRouteFresh) {
        appendRoute(permissions);
      }
      store.dispatch('setPermission', permissions).then(() => {});
    }
  }

}
