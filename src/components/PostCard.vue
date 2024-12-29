<template>
  <li class="recent-post-item">
    <p class="post-category">{{ post.category.toUpperCase() }}</p>
    <p class="post-title">{{ post.title }}</p>
  </li>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: Object
  }
};
</script>

<style scoped>
.recent-post-item {
  margin-bottom: 1rem;
}
.post-category {
  font-size: 0.8rem;
  color: gray;
}
.post-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
</style>
