<template>
  <div id="popout">
    <div id="mask" @click="$emit('clear')"></div>

    <div id="display">
      <p class="nav" @click="decrement">&lt;</p>
      <div>
        <h4 class="readable">{{title}}</h4>
        <img :src="this.commentImage">
      </div>
      <p class="nav" @click="increment">&gt;</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      comments: [],
      selectedCommentId: 0
    };
  },
  computed: {
    selectedComment() {
      if (!this.comments) return {};
      return this.comments[this.selectedCommentId];
    },
    commentImage() {
      if (!this.selectedComment) return "";
      const splits = this.selectedComment.body_html.split('"');
      const image = splits.filter(str => str.includes("https://"))[0];
      return (
        image + (image.toLowerCase().includes(".png" || ".jpg") ? "" : ".jpg")
      );
    },
    title() {
      if (!this.selectedComment) return "";
      return this.selectedComment.author + ":" + this.selectedComment.body;
    }
  },
  async mounted() {
    const { data } = await axios.post("/api", {
      url: "https://api.reddit.com/r/photoshopbattles/comments/" + this.id
    });
    this.comments = data[1].data.children.map(({ data }) => data);
  },
  methods: {
    increment() {
      this.selectedCommentId =
        this.selectedCommentId + 1 === this.comments.length
          ? 0
          : this.selectedCommentId + 1;
    },
    decrement() {
      this.selectedCommentId =
        this.selectedCommentId - 1 < 0
          ? this.comments.length - 1
          : this.selectedCommentId - 1;
    }
  }
};
</script>

<style scoped>
#mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(109, 109, 109, 0.411);
}
#display {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#display img {
  max-width: calc(100vw - 180px);
  max-height: 80vh;
}
.nav {
  font-size: 40px;
  margin: 5px;
  width: 40px;
  background-color: #fff;
  font-weight: bold;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.readable {
  background-color: rgb(195, 255, 220);
  padding: 10px;
  border-radius: 5px;
}
</style>
