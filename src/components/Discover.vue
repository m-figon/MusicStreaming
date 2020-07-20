<template>
  <div class="discover">
    <div class="genres">
      <div class="genre" v-for="(item,index) of genres">
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
<style scoped>
.discover {
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
  justify-content: center;
  align-items: center;
}
.genres {
  display: grid;
  grid-template-columns: auto auto auto;
}
.genre {
  width: 20rem;
  height: 15rem;
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
@media only screen and (max-width: 1300px) {
  .genre {
    width: 15rem;
    height: 12rem;
  }
  .genre h1 {
    font-size: 1.2rem;
  }
}
@media only screen and (max-width: 1000px) {
  .genre {
    width: 12rem;
    height: 10rem;
  }
}
@media only screen and (max-width: 800px) {
  .genres {
    grid-template-columns: auto auto;
  }
  .genre {
    width: 10rem;
    height: 7rem;
    margin: 0.5rem 0.5rem;
  }
  .genre h1 {
    font-size: 1rem;
  }
}
@media only screen and (max-width: 450px) {
  .genre {
    width: 8rem;
    height: 6rem;
  }
  .genre h1 {
    font-size: 0.8rem;
  }
}
</style>
