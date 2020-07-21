<template>
  <div class="details">
    <template v-for="(item,index) of musicArray">
      <div class="details-song" v-if="index==idVal" v-bind:key="index">
        <h1>{{item.title}}</h1>
        <videoplayer :options="videoOptions" />
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
    videoplayer: VideoPlayer
  },
  data() {
    return {
      musicArray: [],
      idVal: 0,
      loaded: false,
      videoOptions: null
    };
  },
  created() {
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
          this.getId();
          console.log(this.musicArray[this.idVal].link);
          this.videoOptions = {
            autoplay: true,
            controls: true,
            sources: [
              {
                src: this.musicArray[this.idVal].link,
                type: "video/mp4"
              }
            ]
          };
        });
    },
    getId() {
      this.idVal = this.$route.params.id;
      console.log(this.idVal);
    }
  }
};
</script>
<style  src="../style.css">
</style>
<style scoped src="../style.css">
</style>
