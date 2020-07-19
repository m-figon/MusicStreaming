<template>
  <div class="main">
    <template v-for="(item,index) of musicArray">
      <div class="song" v-if="index==idVal" v-bind:key="index">
        <h1>{{item.title}}</h1>
        <iframe v-bind:src="item.link"></iframe>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      musicArray: [],
      idVal: 0
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getId();
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/music")
        .then(response => response.json())
        .then(data => {
          this.musicArray = data.slice();
          console.log(this.musicArray);
        });
    },
    getId() {
      this.idVal = this.$route.params.id;
      console.log(this.idVal);
    }
  }
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: calc(100vh - 5rem);
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
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  color: white;
}
iframe{
  width:50rem;
  height:35rem;
}
.song {
  width: auto;
  height: auto;
  padding:0rem 1rem;
  padding-bottom: 1rem;
  border: 2px solid #0ff;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}
.song h1 {
  font-size: 2rem;
  margin: 2rem 0;
}
@media only screen and (max-width: 1050px) {
  .song h1 {
  font-size: 1.5rem;
}
  iframe{
  width:35rem;
  height:23rem;
}
}
@media only screen and (max-width: 700px) {
  .song h1 {
  font-size: 1.2rem;
}
  iframe{
  width:25rem;
  height:15rem;
}
}
@media only screen and (max-width: 500px) {
    .song h1 {
  font-size: 1.0rem;
}
  iframe{
  width:16rem;
  height:10rem;
}
}
</style>
