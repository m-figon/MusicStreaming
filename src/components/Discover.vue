<template>
  <div class="discover">
    <div class="discover-genres">
      <div class="discover-genre" v-for="(item,index) of genres">
        <router-link :to="{ path: `/discover/${item.name}`, params: {type: item.name } }">
          <h1 v-bind:key="index">{{item.name}}</h1>
        </router-link>
        <img v-bind:key="index" v-bind:src="item.img" />
      </div>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Discover",
  data() {
    return {
      musicArray: [],
      genres: [],
      imgs: [],
      loaded: false
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
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
          for (let item of this.musicArray) {
            let genreFlag = true;
            for (let genre of this.genres) {
              if (genre.name === item.type) {
                genreFlag = false;
              }
            }
            if (genreFlag) {
              this.genres.push({
                name: item.type,
                img: item.img
              });
            }
          }
          console.log(this.genres);
          this.loaded=true;
        });
    }
  }
};
</script>
<style scoped src="../style.css">

</style>
