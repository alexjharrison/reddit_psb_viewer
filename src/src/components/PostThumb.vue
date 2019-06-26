<template>
  <div
    id="post-thumb"
    class="pointer"
    @click="$emit('modal',{
      title, postUrl,id, photoUrl
  })"
  >
    <div class="padding">{{title}}</div>
    <img :src="photoUrl" :alt="title">
    <div>
      <a :href="postUrl">Link</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    photoUrl() {
      return this.post.url;
    },
    postUrl() {
      return "https://old.reddit.com" + this.post.permalink;
    },
    title() {
      return this.post.title.split("PsBattle: ")[1];
    },
    id() {
      return this.post.id;
    }
  }
};
</script>

<style scoped>
img {
  object-fit: contain;
  max-width: 300px;
}
#post-thumb {
  font-size: 20px;
}
.padding {
  padding: 10px 0;
}
</style>
