<template>
  <div>
    <!-- Header -->
    <header class="header">
      <h1 class="logo">Hiew Ne</h1>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap" rel="stylesheet">
      <nav>
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          New
        </router-link>
        <router-link to="/reading-list" class="nav-link">Reading list</router-link>
        <router-link to="/topics" class="nav-link">Topics</router-link>
        <router-link to="/create" class="create-btn">Create</router-link>
      </nav>
    </header>
    
    <!-- Loading Message -->
    <div v-if="loading" class="loading-message">
      <p>Loading post details...</p>
    </div>
    <!-- Post Content -->
    <div class="post-container">
      <div class="social-sidebar">
        <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
      </div>

      <div class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-meta">
          <span>BY {{ post.author }}</span>
          <span> IN {{ post.category }}</span>
        </p>
        <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span>Home</span>
      <span> — </span>
      <span>{{ post.title }}</span>
    </div>
        <div class="image-container">
          <img src="@/assets/social-media.png" alt="Social Media Icon" class="social-media-image" />
          <img :src="getImagePath(post.image)" alt="Post Image" class="post-image" />
          <div class="interaction-column close-to-image">
            <div class="like-counter">
              <i class="fas fa-heart"></i> 12K
            </div>
            <div class="view-counter">
              <i class="fas fa-eye"></i> 25K
            </div>
          </div>
        </div>
        <p class="post-body">{{ post.content }}</p>
      </div>
    </div>
          
<!-- Footer -->
<footer class="footer">
  <div class="social-icons">
    <a href="#"><i class="fab fa-vk"></i></a>
    <a href="#"><i class="fab fa-pinterest"></i></a>
    <a href="#"><i class="fab fa-instagram"></i></a>
    <a href="#"><i class="fab fa-twitter"></i></a>
    <a href="#"><i class="fab fa-facebook"></i></a>
  </div>
  <p>All Rights Reserved 2024</p>
</footer>
</div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
      loading: true,
      error: "",
    };
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.id;
      if (!postId) {
        this.error = "Post ID is missing!";
        this.loading = false;
        return;
      }

      axios
        .get(`https://67625e7b46efb373237455d7.mockapi.io/api/blog/${postId}`)
        .then((res) => {
          this.post = res.data;
        })
        .catch(() => {
          this.error = "Failed to fetch post details. Please try again.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getImagePath(imageName) {
      if (!imageName) return "/path/to/default-image.jpg";
      if (imageName.startsWith("http")) return imageName;
      return new URL(`@/assets/${imageName}`, import.meta.url).href;
    },
  },
  created() {
    this.fetchPost();
  },
};
</script>

<style scoped>
/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10rem;
  background: #f9f9f9;
}
.logo {
  font-size: 3rem;
  font-weight: bold;
  font-family: "Oleo Script Swash Caps", cursive;
}
.nav-link {
  margin: 0 2rem;
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  text-decoration: none;
  color: black;
}
.nav-link.active {
  color: #a379e5; /* Màu tím */
  font-weight: bold;
}
.create-btn {
  background: #a379e5;
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
}
/* Breadcrumb */
.breadcrumb {
  padding: 1rem 0;
  margin-left: 0;
  color: #9b9b9b;
  font-size: 1rem;
  text-align: left;
}

/* Post Content */
.post-container {
  display: flex;
  padding: 2rem 10rem;
}
.social-sidebar {
  position: sticky;
  top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.social-icon {
  font-size: 1.5rem;
  color: #9b9b9b;
  text-decoration: none;
}
.social-icon:hover {
  color: #a379e5;
}
.post-content {
  flex: 1;
}
.post-title {
  font-size: 2.5rem;
  color: #4a4a4a;
  margin-bottom: 1rem;
}
.post-meta {
  color: #9b9b9b;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.social-media-image {
  width: 50px; /* Điều chỉnh kích thước ảnh */
  height: auto;
  margin-right: 1rem; /* Khoảng cách giữa hình ảnh và post-image */
  display: block;
  align-items: start;
}
.image-container {
  display: flex;
  align-items: start;
  justify-content: space-between;
  position: relative;
  margin-bottom: 0.5rem;
}
.interaction-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.interaction-column.close-to-image {
  margin-left: -10px;
}
.post-image {
  width: 80%;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
.like-counter {
  font-size: 1.2rem;
  color: #9b9b9b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.view-counter {
  font-size: 1.2rem;
  color: #9b9b9b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.post-body {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
}

/* Footer */
.footer {
  text-align: center;
  padding: 2rem;
  background: #fff;
}
.footer .social-icons a {
  margin: 0 0.5rem;
  font-size: 1.5rem;
  color: #9b9b9b;
}
.footer .social-icons a:hover {
  color: #a379e5;
}
</style>
