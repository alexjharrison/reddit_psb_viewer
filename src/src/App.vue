<template>
  <div>
    <h1>Photoshop Battalias</h1>
    <div id="app">
      <post-thumb v-for="post in posts" :post="post" :key="post.id"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostThumb from "./components/PostThumb";
export default {
  components: {
    PostThumb
  },
  data() {
    return {
      posts: ""
    };
  },
  async mounted() {
    //api.reddit.com/r/photoshopbattles/comments/c4dqnm
    const { data } = await axios.post("/api", {
      url: "http://api.reddit.com/r/photoshopbattles/hot"
    });
    this.posts = data.data.children
      .map(({ data }) => data)
      .filter(({ is_self }) => !is_self);
    console.log(this.posts);
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}
#app * {
  margin: 10px;
  border: 2px solid teal;
  padding: 10px;
  border-radius: 5px;
}
</style>
<style>
body {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
}
.pointer {
  cursor: pointer;
}
</style>

