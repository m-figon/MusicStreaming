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
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
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
