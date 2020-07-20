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
<style scoped>
.home {
  width: 100vw;
  height: calc(100vh - 5rem);
  background: url("../assets/background.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home2 {
  width: 100vw;
  height: calc(100vh - 5rem);
  background: url("../assets/background3.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.ad {
  width: 40rem;
  height: 17rem;
  background-color: rgba(0, 0, 0, 0.637);
  border-radius: 10px;
  color: white;
  padding: 1rem 3rem;
}
.ad h2 {
  font-size: 3rem;
}
.loading {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.loading img {
  height: 3rem;
  width: 3rem;
}
@media only screen and (max-width: 950px) {
  .home {
    display: none;
  }
  .home2 {
    display: flex;
  }
  .ad {
    width: 20rem;
    height: 13rem;
    background-color: rgba(0, 0, 0, 0.637);
  }
  .ad h2 {
    font-size: 2rem;
  }
}
@media only screen and (max-width: 550px) {
  .ad {
    width: 12rem;
    height: 11rem;
    background-color: rgba(0, 0, 0, 0.637);
    padding: 1rem 1.5rem;
  }
  .ad h2 {
    font-size: 1.5rem;
  }
}
</style>
