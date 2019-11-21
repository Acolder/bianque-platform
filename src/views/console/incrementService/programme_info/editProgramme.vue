<template>
  <div id="addStore">
    <info :addProgramme='false'></info>
  </div>
</template>

<script>
import Info from './programmeInfo';
export default {
  data() {
    return {};
  },
  components: {
    'info': Info
  }
};
</script>

<style>

</style>