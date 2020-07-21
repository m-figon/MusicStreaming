<template>
<div>
  <div v-if="user" class="playlists">
    <h2>{{user.account}}'s Playlist</h2>
    <template v-if="user.playlists.length>0">
      <div class="playlists-songs">
        <div class="playlists-song" v-for="(item,index) of user.playlists">
          <router-link v-bind:to="`/details/${item.id}`">
            <h1 v-bind:key="index">{{item.title}}</h1>
          </router-link>
          <button v-on:click="deleteItem(item.id)"></button>
        </div>
      </div>
    </template>
    <div v-if="user.playlists.length<=0" class="info">
      <h1>There are no songs in a playlist</h1>
    </div>
  </div>
  <div v-else class="playlists">
    <h2>You are not logged</h2>
  </div>
  <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
</div>
</template>

<script>
import store from "../store";
export default {
  name: "Playlist",
  data() {
    return {
      user: null,
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
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          let users = data.slice();
          let logedAc = this.$store.state.user.logedUser;
          for (let item of users) {
            if (item.account === logedAc) {
              this.user = item;
              console.log(this.user);
            }
          }
          this.loaded=true;
        });
    },
    deleteItem(id) {
      let tmp = this.user.playlists.slice();
      console.log(tmp);
      for (let i = 0; i < tmp.length; i++) {
        if (id === tmp[i].id) {
          tmp.splice(i, 1);
          console.log(tmp);
        }
      }
      fetch(
        "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users/" +
          this.user.id,
        {
          method: "PUT",
          body: JSON.stringify({
            email: this.user.email,
            account: this.user.account,
            password: this.user.password,
            playlists: tmp,
            id: this.user.id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      ).then(() => {
        this.fetchData();
      });
    }
  }
};
</script>
<style scoped src="../style.css">

</style>
