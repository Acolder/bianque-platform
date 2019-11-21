<template>
  <div id="box-wrap">
    <info :add='false'></info>
  </div>
</template>

<script>
import info from './newsInfo';
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
