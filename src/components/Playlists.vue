<template>
  <div v-if="user.name!==''" class="main">
    <h2>{{user.account}}'s Playlists</h2>
    <div class="songs">
      <div class="song" v-for="(item,index) of user.playlists" v-if="user.playlists!==[]">
        <router-link v-bind:to="`/details/${item.id}`">
          <h1 v-bind:key="index">{{item.title}}</h1>
        </router-link>
        <button></button>
      </div>
    </div>
    <div v-if="user.playlists===[]" class="info">
      <h1>There are no playlists</h1>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Playlists",
  data() {
    return {
      user: null
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
            }
          }
        });
    },
    deleteItem() {
      console.log("deleted");
    }
  }
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: calc(100vh - 5rem);
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
.song {
  display: flex;
}
.song button {
  clip-path: polygon(
    20% 0%,
    0% 20%,
    30% 50%,
    0% 80%,
    20% 100%,
    50% 70%,
    80% 100%,
    100% 80%,
    70% 50%,
    100% 20%,
    80% 0%,
    50% 30%
  );

  background-color: red;
  border: 0;
  width: 1rem;
  height: 1rem;
}
.song button:hover {
  cursor: pointer;
}
.songs {
  padding: 1rem 1rem;
  width: 60rem;
  border: 2px solid white;
  border-radius: 10px;
}
.songs h1:hover {
  color: #0ff;
  cursor: pointer;
}
.main h2 {
  font-size: 2rem;
}
.info h1 {
  font-size: 1.2rem;
}
</style>
