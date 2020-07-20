<template>
  <div class="login">
    <div class="login-form">
      <div class="login-content">
        <input
          v-model="account"
          type="text"
          v-on:focus="focusFunc('Account Name',$event,false)"
          v-on:blur="blurFunc('Account Name',$event,false)"
        />
        <p v-show="loginShow">Invalid login data</p>
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event,true)"
          v-on:blur="blurFunc('Password',$event,true)"
        />
        <button v-on:click="login()">LOGIN</button>
      </div>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Login",
  store,
  data() {
    return {
      account: "Account Name",
      password: "Password",
      users: [],
      type: "text",
      loginShow: false,
      loaded: false
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  mounted: function() {
    this.$nextTick(function() {
      this.loaded = true;
    });
  },
  methods: {
    focusFunc(text, event, condition) {
      if (text === "Account Name" && this.account === "Account Name") {
        this.account = "";
      }
      else if (text === "Password" && this.password === "Password") {
        this.password = "";
      }
      if (condition) {
        this.type = "password";
      }
    },
    blurFunc(text, event, condition) {
      if (text === "Account Name" && this.account === "") {
        this.account = text;
        if (condition) {
          this.type = "text";
        }
      }
      else if (text === "Password" && this.password === "") {
        this.password = text;
        if (condition) {
          this.type = "text";
        }
      }
    },
    fetchData() {
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          this.users = data.slice();
          console.log(this.users);
        });
    },
    valuesReset() {
      this.loginShow = false;
      this.account = "Account Name";
      this.password = "Password";
      this.type = "text";
    },
    login() {
      let loginFlag = false;
      for (let item of this.users) {
        if (item.account === this.account && item.password === this.password) {
          this.$store.commit("changeName", this.account);
          loginFlag = true;
          this.valuesReset();
          alert("you loged");
        }
      }
      if (!loginFlag) {
        this.loginShow = true;
      }
    }
  }
};
</script>
<style scoped src="../style.css">
</style>
