<template>
  <div class="main">
    <input v-model="searchVal" />
    <template v-for="(item,index) of musicArray">
      <div
        class="song"
        v-if="(index<endLength && index>=startLength && searchVal==='') || ((item.title.toLowerCase().includes(searchVal.toLowerCase())) && searchVal!=='')"
        v-bind:key="index"
      >
        <div class="text">
          <router-link :to="`/details/${index}`">
            <h1>{{item.title}}</h1>
            <h1>Genre: {{item.type}}</h1>
          </router-link>
          <div v-if="logedAc!==''" class="button-div">
            <button v-on:click="addToPlaylist(item.id)"></button>
          </div>
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
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Genre",
  store,
  data() {
    return {
      musicArray: [],
      type: "",
      startLength: 0,
      endLength: 4,
      currentPage: 1,
      pages: [],
      searchVal: "",
      loaded: false
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/music")
        .then(response => response.json())
        .then(data => {
          let tmp = data.slice();
          this.type = this.$route.params.type;
          for(let item of tmp){
            if(item.type===this.type){
              this.musicArray.push(item);
            }
          }
          setInterval(() => {
            this.logedAc = this.$store.state.user.logedUser;
          }, 1000);
          let pageNumber = 1;
          for (let i = 0; i < this.musicArray.length; i++) {
            if (i % 4 === 0) {
              this.pages.push(pageNumber);
              pageNumber++;
            }
          }
          console.log(this.pages);
          this.loaded=true;
        });
    },
    selectChange() {
      this.startLength = (this.currentPage - 1) * 4;
      this.endLength = this.currentPage * 4;
    },
    addToPlaylist(idNum) {
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          this.users = data.slice();
          console.log(this.users);
          for (let item of this.users) {
            if (item.account === this.logedAc) {
              let tmp = item.playlists.slice();
              tmp.push(this.musicArray[idNum]);
              console.log(tmp);
              fetch(
                "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users/" +
                  item.id,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    email: item.email,
                    account: item.account,
                    password: item.password,
                    playlists: tmp,
                    id: item.id
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }
              );
            }
          }
        });
    }
  }
};
</script>
<style scoped src="../style.css">

</style>
