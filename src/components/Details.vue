<template>
  <div class="details" ref="details">
    <template v-for="(item,index) of musicArray">
      <div class="details-song" ref="detailsSong" v-if="index==idVal" v-bind:key="index">
        <h1>{{item.title}}</h1>
        <youtube
          :video-id="videoId"
          ref="youtube"
          @paused="paused"
          @playing="playing"
          @ended="paused"
        ></youtube>
      </div>
    </template>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  components: {},
  data() {
    return {
      musicArray: [],
      idVal: 0,
      loaded: false,
      videoId: null
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
          this.videoId = this.musicArray[this.idVal].link;
        });
    },
    getId() {
      this.idVal = this.$route.params.id;
      console.log(this.idVal);
    },
    playing() {
      console.log(this.$refs.detailsSong[0].style);
      this.$refs.detailsSong[0].style.border = "2px solid #0ff";
      this.$refs.details.style.background =
        "url(" + this.musicArray[this.idVal].img + ")";
      this.$refs.details.style.backgroundSize =
        "100% 100%";
    },
    paused() {
      console.log(this.$refs.detailsSong[0].style);
      this.$refs.detailsSong[0].style.border = "2px solid white";
      this.$refs.details.style.background =
        "";
      this.$refs.details.style.backgroundSize =
        "";
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>
<style  src="../style.css">
</style>
<style scoped src="../style.css">
</style>
