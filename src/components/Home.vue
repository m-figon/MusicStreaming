<template>
  <div>
    <div class="home">
      <div class="ad">
        <h2>All your favourite music in one place</h2>
        <h2>Best quality of sound</h2>
      </div>
    </div>
    <div class="home2">
      <div class="ad">
        <h2>All your favourite music in one place</h2>
        <h2>Best quality of sound</h2>
      </div>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loaded: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.loaded = true;
    });
  }
};
</script>
<style scoped src="../style.css">

</style>
