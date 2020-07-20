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
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
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
      password2Show: false,
      loaded: false,
      registerFlag: true
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.loaded = true;
    });
  },
  methods: {
    focusFunc(text, event, condition) {
      let texts = [
        "Account Name",
        "Password",
        "Confirm Password",
        "Email Address"
      ];
      let states = [
        "this.account",
        "this.password",
        "this.password2",
        "this.email"
      ];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== text")) {
          eval(states[i] + " = ''");
        }
      }
      if (condition === 1) {
        this.type = "password";
      } else if (condition === 2) {
        this.type2 = "password";
      }
    },
    bluring(condition) {
      if (condition === 1) {
        this.type = "text";
      } else if (condition === 2) {
        this.type2 = "text";
      }
    },
    blurFunc(text, event, condition) {
      let texts = [
        "Account Name",
        "Password",
        "Confirm Password",
        "Email Address"
      ];
      let states = [
        "this.account",
        "this.password",
        "this.password2",
        "this.email"
      ];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== ''")) {
          eval(states[i] + " = text");
          this.bluring(condition);
        }
      }
    },
    valuesReset() {
      this.account = "Account Name";
      this.email = "Email Address";
      this.password = "Password";
      this.password2 = "Confirm Password";
      this.type = "text";
      this.type2 = "text";
    },
    ifCheck(condition) {
      if (condition) {
        return false;
      } else {
        this.registerFlag = false;
        return true;
      }
    },
    register() {
      this.registerFlag = true;
      this.emailShow = this.ifCheck(
        !(
          this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
          null
        )
      );
      this.accountShow = this.ifCheck(
        !(this.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)
      );
      this.passwordShow = this.ifCheck(
        !(
          this.password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
          ) === null
        )
      );
      this.password2Show = this.ifCheck(
        this.password === this.password2 &&
          !(
            this.password.match(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
            ) === null
          )
      );
      if (this.registerFlag) {
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
        this.valuesReset();
        alert("New user created");
      }
    }
  }
};
</script>
<style scoped src="../style.css">
</style>
