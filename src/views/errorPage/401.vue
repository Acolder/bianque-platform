<template>
  <div class="content">
    <div class="info"><h1>401:sorry，你没有权限去该页面！</h1><router-link :to="{ path: '/login'}"> 去登录> </router-link></div>
  </div>
</template>
<style lang="less" scoped>
.content {
  padding: 80px 30px;
  .info {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    clear: both;
    h1 {
      display: inline;
    }
    a {
      display: inline;
      color:gold;
    }
  }
}
</style>
