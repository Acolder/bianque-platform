<template>
  <div class="modify">
    <info :isAdd="true"></info>
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
  }
};
</script>

<style>

</style>
