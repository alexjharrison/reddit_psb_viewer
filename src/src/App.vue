<template>
  <span>{{this.data}}</span>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: ""
    };
  },
  async mounted() {
    //api.reddit.com/r/photoshopbattles/comments/c4dqnm
    const { data } = await axios.post("/api", {
      url: "http://api.reddit.com/r/photoshopbattles/hot"
    });
    this.data = data;
    console.log(this.data);
  }
};
</script>

<style scoped>
</style>
