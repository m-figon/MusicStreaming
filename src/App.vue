<template>
  <div id="app">
    <div class="nav-bar">
      <div class="left">
        <router-link to="/">
          <h2 id="full-name">MusicStreaming</h2>
        </router-link>
        <router-link to="/">
          <h2 id="initials">MS</h2>
        </router-link>
        <router-link to="/main">
          <h1 v-bind:id="mainId">Main</h1>
        </router-link>
        <router-link to="/discover">
          <h1 v-bind:id="discoverId">Discover</h1>
        </router-link>
        <router-link to="/playlists">
          <h1 v-if="logedAc!==''" v-bind:id="playlistId">Playlists</h1>
        </router-link>
      </div>
      <div class="middle"></div>
      <div class="right">
        <router-link to="/settings">
          <h1 v-if="logedAc!==''" v-bind:id="settingsId">{{logedAc}}</h1>
        </router-link>
        <h1 v-on:click="logout()" v-if="logedAc!==''">Logout</h1>
        <router-link to="/login">
          <h1 v-bind:id="loginId">Login</h1>
        </router-link>
        <router-link to="/register">
          <h1 v-bind:id="registerId">Register</h1>
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "./store";

export default {
  name: "App",
  store,
  data() {
    return {
      mainId: "",
      discoverId: "",
      loginId: "",
      registerId: "",
      logedAc: "",
      playlistId: "",
      settingsId: ""
    };
  },
  created() {
    this.readUrl();
    this.userState();
  },
  watch: {
    $route: "readUrl"
  },
  methods: {
    idEmpty() {
      this.discoverId = "";
      this.mainId = "";
      this.loginId = "";
      this.registerId = "";
      this.playlistId = "";
      this.settingsId = "";
    },
    readUrl() {
      if (this.$route.path === "/") {
        this.idEmpty();
      } else if (this.$route.path === "/main") {
        this.idEmpty();
        this.mainId = "other";
      } else if (this.$route.path === "/discover") {
        this.idEmpty();
        this.discoverId = "other";
      } else if (this.$route.path === "/login") {
        this.idEmpty();
        this.loginId = "other";
      } else if (this.$route.path === "/register") {
        this.idEmpty();
        this.registerId = "other";
      } else if (this.$route.path === "/playlists") {
        this.idEmpty();
        this.playlistId = "other";
      } else if (this.$route.path === "/settings") {
        this.idEmpty();
        this.settingsId = "other";
      } else {
        this.idEmpty();
      }
    },
    userState() {
      setInterval(() => {
        this.logedAc = this.$store.state.user.logedUser;
      }, 1000);
    },
    logout() {
      this.$store.commit("changeName", "");
    }
  }
};
</script>

<style>
#app,
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}
a {
  text-decoration: none;
  color: white;
}
#initials{
  display: none;
}
.nav-bar {
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
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
  color: white;
  border-bottom: 1px solid white;
}
.nav-bar h1:hover,
.nav-bar h2:hover {
  text-shadow: 1px 1px #0ff;
  cursor: pointer;
}
.left,
.right,
.middle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
}
#other {
  color: #0ff;
}
.nav-bar h1 {
  font-size: 1.2rem;
  margin: 0 1rem;
}
.nav-bar h2 {
  font-size: 1.5rem;
  margin: 0 1rem;
}
@media only screen and (max-width: 1400px) {
  .left {
    width: 50%;
  }
  .middle {
    display: none;
  }
  .right {
    width: 50%;
  }
}
@media only screen and (max-width: 950px) {
  .nav-bar h1 {
    font-size: 1rem;
    margin: 0 0.3rem;
  }
  .nav-bar h2 {
    font-size: 1.2rem;
    margin: 0 0.3rem;
  }
}
@media only screen and (max-width: 700px) {

  .nav-bar h1 {
    font-size: 0.7rem;
    margin: 0 0.2rem;
  }
  .left,.right{
    width: auto;
  }
  #full-name{
    display: none;
  }
  #initials{
    display: block;
  }
  .nav-bar h2 {
    font-size: 0.9rem;
    margin: 0 0.2rem;
  }
}
</style>
