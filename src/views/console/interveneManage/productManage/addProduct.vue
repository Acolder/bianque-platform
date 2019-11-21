<template>
  <div id="box-wrap">
    <info :add='true'></info>
  </div>
</template>

<script>
import info from './productInfo';
export default {
  data() {
    return {};
  },
  components: {
    'info': info
  }
};
</script>

<style lang="less" scoped>

</style>
