<template>
  <div class="home">
    <div class="ad">
      <h2>All your favourite music in one place</h2>
      <h2>Best quality of sound</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
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
.ad {
  width: 40rem;
  height: 17rem;
  background-color: rgba(0, 0, 0, 0.637);
  border-radius: 10px;
  color:white;
  padding: 1rem 3rem;
}
.ad h2 {
  font-size: 3rem;
}
</style>
