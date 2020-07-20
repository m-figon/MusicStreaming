<template>
  <div class="main">
    <template v-for="(item,index) of musicArray">
      <div class="details-song" v-if="index==idVal" v-bind:key="index">
        <h1>{{item.title}}</h1>
        <iframe v-bind:src="item.link"></iframe>
        <VideoPlayer :options="videoOptions" />
      </div>
    </template>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "Main",
  components: {
    VideoPlayer
  },
  data() {
    return {
      musicArray: [],
      idVal: 0,
      loaded: false,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "https://www.youtube.com/embed/EP625xQIGzs",
            type: "video/mp4",
            height: 300,
            width: 300
          }
        ]
      }
    };
  },
  created() {
    this.getId();
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  beforeUpdate: function() {
    this.$nextTick(function() {
      this.loaded = true;
    });
  },
  methods: {
    fetchData() {
      fetch("https://rocky-citadel-32862.herokuapp.com/MusicStreaming/music")
        .then(response => response.json())
        .then(data => {
          this.musicArray = data.slice();
          console.log(this.musicArray);
        });
    },
    getId() {
      this.idVal = this.$route.params.id;
      console.log(this.idVal);
    }
  }
};
</script>
<style scoped src="../style.css">
</style>
