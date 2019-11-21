<template>
  <div>
    <info :add='true'></info>
  </div>
</template>

<script>
import interveneInfo from './interveneInfo';
export default {
  data() {
    return {};
  },
  components: {
    'info': interveneInfo
  }
};
</script>

<style lang="less" scoped>

</style>
