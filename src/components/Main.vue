<template>
  <div class="main">
    <input v-model="searchVal" />
    <template v-for="(item,index) of musicArray">
      <div
        class="song"
        v-if="(index<endLength && index>=startLength && searchVal==='') || ((item.title.toLowerCase().includes(searchVal.toLowerCase())) && searchVal!=='')"
        v-bind:key="index"
      >
        <div class="left-part">
          <div v-if="logedAc!==''" class="button-div">
            <button v-on:click="addToPlaylist($event,item.id)"></button>
          </div>
          <router-link :to="`/details/${item.id}`">
            <h1>{{item.title}}</h1>
          </router-link>
          <router-link :to="{ path: `/discover/${item.type}`, params: {type: item.type } }">
            <h1>Genre: {{item.type}}</h1>
          </router-link>
        </div>
        <div class="right-part">
        <img v-bind:src="item.img" />
        </div>
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
    <div class="background"></div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Main",
  store,
  data() {
    return {
      musicArray: [],
      startLength: 0,
      endLength: 4,
      currentPage: 1,
      pages: [],
      searchVal: "",
      logedAc: "",
      users: [],
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
          this.musicArray = data.slice();
          console.log(this.musicArray);
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
          this.loaded = true;
        });
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          this.users = data.slice();
          console.log(this.users);
        });
    },
    selectChange() {
      this.startLength = (this.currentPage - 1) * 4;
      this.endLength = this.currentPage * 4;
    },
    addToPlaylist(event,idNum) {
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
              event.target.id="changed";
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
