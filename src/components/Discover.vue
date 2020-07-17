<template>
  <div class="discover">
    <div class="genres">
      <div class="genre" v-for="(item,index) of genres">
        <router-link :to="{ path: `/discover/${item.name}`, params: {type: item.name } }"><h1 v-bind:key="index">{{item.name}}</h1></router-link>
        <img v-bind:key="index" v-bind:src="item.img" />
      </div>
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
      imgs: []
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
        });
    }
  }
};
</script>
<style scoped>
.discover {
  width: 100vw;
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
  justify-content: center;
  align-items: center;
}
.genres {
  display: grid;
  grid-template-columns: auto auto;
}
.genre {
  width: 30rem;
  height: 20rem;
  margin: 2rem 2rem;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.genre h1 {
  font-size: 2rem;
  color: white;
  margin: 0.2rem 0;
}
.genre img {
  width: 100%;
}
</style>
