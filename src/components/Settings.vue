<template>
  <div>
    <div v-if="user" class="settings" >
      <div class="settings-form">
        <div class="settings-content">
          <div class="one-line">
            <h1>Account Name</h1>
            <input v-model="account" type="text" />
          </div>
          <div class="button-line">
            <button v-on:click="changeData('account')">Change Account Name</button>
          </div>
          <div class="one-line">
            <h1>Email Address</h1>
            <input v-model="email" type="text" />
          </div>
          <div class="button-line">
            <button v-on:click="changeData('email')">Change Email Address</button>
          </div>
          <div class="one-line">
            <h1>Password</h1>
            <input v-model="password" />
          </div>
          <div class="one-line">
            <h1>Confirm Password</h1>
            <input v-model="password2" />
          </div>
          <div class="button-line">
            <button v-on:click="changeData('password')">Change Password</button>
          </div>
        </div>
      </div>
    </div>
    <div class="settings" v-else>
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
  name: "Settings",
  data() {
    return {
      user: null,
      account: "",
      email: "",
      password: "",
      password2: "",
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
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users")
        .then(response => response.json())
        .then(data => {
          let users = data.slice();
          let logedAc = this.$store.state.user.logedUser;
          for (let item of users) {
            if (item.account === logedAc) {
              this.user = item;
              console.log(this.user);
              this.account = this.user.account;
              this.email = this.user.email;
            }
          }
          this.loaded=true;
        });
    },
    changeData(type) {
      if (type === "account") {
        let accountFlag = true;
        if (!(this.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
          accountFlag = true;
        } else {
          accountFlag = false;
        }
        if (accountFlag) {
          fetch(
            "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users/" +
              this.user.id,
            {
              method: "PUT",
              body: JSON.stringify({
                email: this.user.email,
                account: this.account,
                password: this.user.password,
                playlists: this.user.playlists,
                id: this.user.id
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          ).then(() => {
            this.fetchData();
            this.$store.commit("changeName", this.account);
            alert("Account name changed");
          });
        } else {
          alert("Account name should be 4-10 letters long");
        }
      } else if (type === "email") {
        let emailFlag = true;
        if (
          !(
            this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
            null
          )
        ) {
          emailFlag = true;
        } else {
          emailFlag = false;
        }
        if (emailFlag) {
          fetch(
            "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users/" +
              this.user.id,
            {
              method: "PUT",
              body: JSON.stringify({
                email: this.email,
                account: this.user.account,
                password: this.user.password,
                playlists: this.user.playlists,
                id: this.user.id
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          ).then(() => {
            this.fetchData();
            alert("Email Address Changed");
          });
        } else {
          alert("Wrong email address");
        }
      } else if (type === "password") {
        let passwordFlag = true;
        if (
          this.password === this.password2 &&
          !(
            this.password.match(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
            ) === null
          )
        ) {
          passwordFlag = true;
        } else {
          passwordFlag = false;
        }
        if (passwordFlag) {
          fetch(
            "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users/" +
              this.user.id,
            {
              method: "PUT",
              body: JSON.stringify({
                email: this.user.email,
                account: this.user.account,
                password: this.password,
                playlists: this.user.playlists,
                id: this.user.id
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          ).then(() => {
            this.fetchData();
            alert("Password changed");
          });
        } else {
          alert(
            "Password must be 8-13 signs long, consist of at least one uppercase, lowercase letter, a digit, special sign"
          );
        }
      }
    }
  }
};
</script>
<style scoped>
.settings {
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
.settings h2{
  color:white;
  font-size: 2rem;
}
.settings-form {
  width: 30rem;
  height: 27rem;
  background: url("../assets/background2.jpg");
  background-size: 100% 100%;
  border-radius: 10px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.one-line {
  display: flex;
  align-items: center;
  width: 100%;
}
.button-line {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.one-line h1 {
  color: #0ff;
  font-size: 1rem;
  width: 50%;
}
.settings-content {
  width: 80%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}
.settings-content input {
  width: 100%;
  height: 2rem;
  padding-left: 0.5rem;
  background: #0000007e; /* fallback for old browsers */
  border-radius: 5px;
  margin: 1rem 0;
  color: white;
  border: 1px solid white;
}
.settings-content button {
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
.settings-content button:hover {
  text-shadow: 1px 1px #0ff;
  cursor: pointer;
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
@media only screen and (max-width: 600px) {
  .settings-form{
    width:18rem;
  }
  .settings-content{
    width:80%;
  }
  .one-line h1 {
  font-size: 1rem;
  width: 50%;
}
}

</style>
