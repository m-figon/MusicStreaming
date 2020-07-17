<template>
  <div id="app">
    <div class="nav-bar">
      <div class="left">
        <router-link to="/">
          <h2>MusicStreaming</h2>
        </router-link>
        <router-link to="/main">
          <h1 v-bind:id="mainId">Main</h1>
        </router-link>
        <router-link to="/discover">
          <h1 v-bind:id="discoverId">Discover</h1>
        </router-link>
      </div>
      <div class="middle"></div>
      <div class="right">
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
export default {
  name: "App",
  data() {
    return {
      mainId: "",
      discoverId: "",
      loginId: "",
      registerId: ""
    };
  },
  created() {
    this.readUrl();
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
      } else {
        this.idEmpty();
      }
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
</style>
