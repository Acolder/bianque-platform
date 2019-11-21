<template>
  <div class="find">
    <info :isAdd="false"></info>
  </div>
</template>

<script>
import passwordInfo from './passwordInfo';
export default {
  data() {
    return {};
  },
  components: {
    'info': passwordInfo
  },
};
</script>

<style>

</style>
