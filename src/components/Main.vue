<template>
  <div class="main">
    <template v-for="(item,index) of musicArray">
      <div class="song" v-if="index<endLength && index>=startLength" v-bind:key="index">
        <div class="text">
          <router-link :to="`/details/${index}`">
            <h1>{{item.title}}</h1>
            <h1>Genre: {{item.type}}</h1>
          </router-link>
        </div>
        <img v-bind:src="item.img" />
      </div>
    </template>
    <div class="pages">
      <h1>Current Page</h1>
      <select v-on:change="selectChange()" v-model="currentPage">
        <template v-for="(item,index) of pages">
          <option v-bind:value="item" v-bind:key="index">{{item}}</option>
        </template>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      musicArray: [],
      startLength: 0,
      endLength: 4,
      currentPage: 1,
      pages: []
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
          let pageNumber = 1;
          for (let i = 0; i < this.musicArray.length; i++) {
            if (i % 4 === 0) {
              this.pages.push(pageNumber);
              pageNumber++;
            }
          }
          console.log(this.pages);
        });
    },
    selectChange() {
      console.log("select change");
      console.log(this.currentPage);
      this.startLength = (this.currentPage - 1) * 4;
      this.endLength = this.currentPage * 4;
      console.log(this.startLength);
      console.log(this.endLength);
    }
  }
};
</script>
<style scoped>
.main {
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
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  color: white;
}
.song {
  width: 100vw;
  border: 2px solid #0ff;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 0;
}
.text {
  top: 7rem;
  left: -17rem;
  position: relative;
  border-radius: 15px;
  z-index: 2;
  width: 50rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.308);
}
.song img {
  margin-top: -5rem;
  width: 100vw;
}
.song h1 {
  font-size: 2rem;
}
.pages {
  width: 100vw;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pages h1 {
  font-size: 1.5rem;
  color: white;
}
.pages select,
#option {
  color: #0ff;
  border: 1.5px solid #0ff;
  border-radius: 10px;
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
  margin-left: 1rem;
  width: 3rem;
  height: 1.5rem;
}
</style>
