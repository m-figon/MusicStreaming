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
            <h1>Title: {{item.title}}</h1>
          </router-link>
          <router-link :to="{ path: `/discover/${item.type}`, params: {type: item.type } }">
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
    <div class="background"></div>
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
      users: []
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
        });
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          this.users = data.slice();
          console.log(this.users);
        });
    },
    selectChange() {
      console.log("select change");
      console.log(this.currentPage);
      this.startLength = (this.currentPage - 1) * 4;
      this.endLength = this.currentPage * 4;
      console.log(this.startLength);
      console.log(this.endLength);
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
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
  z-index: -1;
}
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
.main input {
  background: black; /* fallback for old browsers */
  border: 1px solid white;
  padding: 0 0.5rem;
  margin: 0.5rem 0;
  color: white;
  border-radius: 10px;
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
  overflow: hidden;
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
  align-items: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.308);
}
.button-div {
  position: relative;
  width: 100%;
  top: -10rem;
}
.button-div button {
  -webkit-clip-path: polygon(
    0 29%,
    34% 29%,
    34% 0,
    68% 0,
    68% 28%,
    100% 28%,
    100% 71%,
    68% 70%,
    68% 100%,
    33% 100%,
    33% 70%,
    1% 70%
  );
  clip-path: polygon(
    0 29%,
    34% 29%,
    34% 0,
    68% 0,
    68% 28%,
    100% 28%,
    100% 71%,
    68% 70%,
    68% 100%,
    33% 100%,
    33% 70%,
    1% 70%
  );
  margin-left: 95%;
  margin-top: -3%;
  background-color: white;
  border: 0;
  width: 1rem;
  height: 1rem;
}
.button-div button:hover {
  background-color: #0ff;
  cursor: pointer;
}
.song img {
  margin-top: -11rem;
  width: 100vw;
}
.song h1 {
  font-size: 2rem;
}
.song h1:hover {
  color: #0ff;
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
