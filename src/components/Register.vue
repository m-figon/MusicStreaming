<template>
  <div class="register">
    <div class="register-form">
      <div class="register-content">
        <input
          v-model="account"
          type="text"
          v-on:focus="focusFunc('Account Name',$event,0)"
          v-on:blur="blurFunc('Account Name',$event,0)"
        />
        <p v-show="accountShow">Invalid account name</p>
        <input
          v-model="email"
          type="text"
          v-on:focus="focusFunc('Email Address',$event,0)"
          v-on:blur="blurFunc('Email Address',$event,0)"
        />
        <p v-show="emailShow">Invalid email address</p>
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event,1)"
          v-on:blur="blurFunc('Password',$event,1)"
        />
        <p v-show="passwordShow">Invalid password</p>
        <input
          v-model="password2"
          v-bind:type="type2"
          v-on:focus="focusFunc('Confirm Password',$event,2)"
          v-on:blur="blurFunc('Confirm Password',$event,2)"
        />
        <p v-show="password2Show">Invalid password confirm</p>
        <button v-on:click="register()">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      account: "Account Name",
      email: "Email Address",
      password: "Password",
      password2: "Confirm Password",
      users: [],
      type: "text",
      type2: "text",
      accountShow: false,
      emailShow: false,
      passwordShow: false,
      password2Show: false
    };
  },
  methods: {
    focusFunc(text, event, condition) {
      console.log(event.target.value);
      if (event.target.value === text) {
        event.target.value = "";
        if (condition===1) {
          this.type = "password";
        }else if (condition===2) {
          this.type2 = "password";
        }
      }
    },
    blurFunc(text, event, condition) {
      if (event.target.value === "") {
        event.target.value = text;
        if (condition===1) {
          this.type = "text";
        }else if (condition===2) {
          this.type2 = "text";
        }
      }
    },
    register() {
      let registerFlag = true;
      if (
        !(
          this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
          null
        )
      ) {
        console.log("email correct");
        this.emailShow = false;
      } else {
        this.emailShow = true;
        registerFlag = false;
      }
      if (!(this.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
        console.log("account correct");
        this.accountShow = false;
      } else {
        this.accountShow = true;
        registerFlag = false;
      }
      if (
        !(
          this.password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
          ) === null
        )
      ) {
        console.log("password correct");
        this.passwordShow = false;
      } else {
        this.passwordShow = true;
        registerFlag = false;
      }
      if (
        this.password === this.password2 &&
        !(
          this.password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
          ) === null
        )
      ) {
        console.log("password2 correct");
        this.password2Show = false;
      } else {
        this.password2Show = true;
        registerFlag = false;
      }
      if (registerFlag) {
        fetch(
          "https://rocky-citadel-32862.herokuapp.com/MusicStreaming/users",
          {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              account: this.account,
              password: this.password,
              playlists: []
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
        );
        this.account = "Account Name";
        this.email = "Email Address";
        this.password = "Password";
        this.password2 = "Confirm Password";
        this.type = "text";
        this.type2 = "text";
        alert("New user created");
      }
    }
  }
};
</script>
<style scoped>
.register {
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
.register-form {
  width: 30rem;
  height: 30rem;
  background: url("../assets/background2.jpg");
  background-size: 100% 100%;
  border-radius: 10px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-content {
  width: 60%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}
.register-content p {
  color: red;
  margin: 0;
}
.register-content input {
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
.register-content button {
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
.register-content button:hover {
  text-shadow: 1px 1px #0ff;
  cursor: pointer;
}
</style>
