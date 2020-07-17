<template>
  <div class="login">
    <div class="login-form">
      <div class="login-content">
        <input
          v-model="account"
          v-on:focus="focusFunc('Account Name',$event)"
          v-on:blur="blurFunc('Account Name',$event)"
        />
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event)"
          v-on:blur="blurFunc('Password',$event)"
        />
        <button v-on:click="login()">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: "Account Name",
      password: "Password",
      users: [],
      type: "text"
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
    focusFunc(text, event) {
      if (event.target.value === text) {
        event.target.value = "";
      }
      if (text === "Password") {
        this.type = "password";
      }
    },
    blurFunc(text, event) {
      if (event.target.value === "") {
        event.target.value = text;
        if (text === "Password") {
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
    login() {
      for (let item of this.users) {
        if (item.account === this.account && item.password === this.password) {
          this.account = "Account Name";
          this.password = "Password";
          this.type = "text";
          alert("you loged");
        }
      }
    }
  }
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: calc(100vh - 8rem);
  padding-top: 3rem;
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
  align-items: flex-start;
}
.login-form {
  width: 30rem;
  height: 15rem;
  background: url("../assets/background2.jpg");
  background-size: 100% 100%;
  border-radius: 10px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-content {
  width: 60%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}
.login-content input {
  width: 100%;
  height: 2rem;
  padding-left: 0.5rem;
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
  border-radius: 5px;
  margin: 1rem 0;
  color: white;
  border: 1px solid white;
}
.login-content button {
  margin-top: 0.5rem;
  padding: 0.5rem 0.5rem;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
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
.login-content button:hover {
  text-shadow: 1px 1px #0ff;
  cursor: pointer;
}
</style>
