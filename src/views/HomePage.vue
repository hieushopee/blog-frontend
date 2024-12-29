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

    <!-- Search Bar -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Type something..." />
      <button @click="searchPosts" class="search-button">
        <img src="@/assets/search.png" alt="Search" class="search-icon" />
      </button>
    </div>
    <h3 class="all-post-title">ALL POST</h3>
    <!-- Post Grid -->
    <section class="post-grid">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card" @click="goToDetail(post.id)">
        <img :src="getImagePath(post.image)" alt="Post Image" class="post-image" />
        <div class="post-info">
          <p class="post-meta">
            <span class="meta-label">BY</span>
            <span class="meta-value">{{ post.author }}</span>
            <span class="meta-label">IN</span>
            <span class="meta-value">{{ post.category }}</span>
          </p>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-summary">{{ post.content.substring(0, 100) }}...</p>
        </div>
      </div>
    </section>

    <!-- Load More Button -->
    <button class="load-more" @click="loadMore">Load More</button>

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
      posts: [], // Danh sách bài viết
      searchQuery: "", // Nội dung tìm kiếm
      page: 1, // Trang hiện tại
      limit: 10, // Số bài viết mỗi trang
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchPosts() {
  axios
    .get(`https://67625e7b46efb373237455d7.mockapi.io/api/blog?page=${this.page}&limit=${this.limit}`)
    .then((res) => {
      if (this.page === 1) {
        this.posts = res.data; // Làm mới danh sách bài viết khi ở trang đầu tiên
      } else {
        this.posts.push(...res.data); // Thêm bài viết nếu là trang tiếp theo
      }
    })
    .catch((err) => console.error(err));
},
    loadMore() {
      this.page++;
      this.fetchPosts();
    },
    searchPosts() {
      this.page = 1;
      this.posts = [];
      this.fetchPosts();
    },
    getImagePath(imageName) {
      if (!imageName || typeof imageName !== 'string') {
      return "/path/to/default-image.jpg"; // Trả về ảnh mặc định
    }
    if (imageName.startsWith("http")) {
      return imageName;
    }
    try {
      return require(`@/assets/${imageName}`);
    } catch (error) {
      console.error("Image not found:", imageName);
      return "";
    }
  },
  goToDetail(postId) {
    this.$router.push({ name: 'Detail', params: { id: postId } });
  },
  },
  created() {
    this.fetchPosts();
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

/* Search Bar */
.search-bar {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #f0f0f0;
}
.search-bar input {
  width: 60%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 0.5rem;
}
.search-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.search-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.all-post-title {
  font-size: 0.7rem;
  font-family: "Open Sans", sans-serif;
  text-align: left;
  padding-left: 10rem;
  color: gray;
  margin-bottom: 1rem;
}

/* Post Grid */
.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  padding: 1rem 10rem; /* Tăng khoảng cách trái phải */
}
.post-card {
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}
.post-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.post-info {
  padding: 1.5rem;
}
.post-meta {
  font-size: 0.8rem;
  color: gray;
}
.meta-label {
  color: gray;
  margin-right: 0.3rem;
}
.meta-value {
  color: black;
  font-weight: bold;
  margin-right: 0.5rem;
}
.post-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}
.post-summary {
  color: #666;
}

/* Load More */
.load-more {
  display: block;
  margin: 2rem auto;
  padding: 0.5rem 2rem;
  border: 2px solid #ff66a3;
  color: #ff66a3;
  background: transparent;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
}

/* Footer */
.footer {
  text-align: center;
  padding: 2rem;
  background: #f9f9f9;
  font-family: "Open Sans", sans-serif;
  color: gray;
}

.footer .social-icons {
  margin-bottom: 1rem;
}

.footer .social-icons a {
  color: gray;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer .social-icons a:hover {
  color: #ff66a3;
}
/* Media Queries cho thiết bị di động */
@media (max-width: 768px) {
  /* Header */
  .header {
    padding: 1rem 2rem;
    flex-direction: column; /* Đặt logo và nav-link theo chiều dọc */
    align-items: center;
  }

  .logo {
    font-size: 2rem; /* Giảm kích thước logo trên điện thoại */
  }

  .nav-link {
    margin: 0.5rem 0; /* Điều chỉnh khoảng cách giữa các link */
    font-size: 1.2rem;
  }

  .create-btn {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }

  /* Search Bar */
  .search-bar input {
    width: 80%; /* Đặt chiều rộng của input lớn hơn */
    padding: 0.8rem;
  }

  .search-bar button {
    padding: 0.5rem; /* Điều chỉnh kích thước của button */
  }

  /* Post Grid */
  .post-grid {
    grid-template-columns: 1fr; /* Đặt grid thành một cột duy nhất trên điện thoại */
    gap: 2rem; /* Giảm khoảng cách giữa các card */
    padding: 1rem 2rem;
  }

  .post-card {
    width: 100%; /* Đảm bảo các post-card chiếm hết chiều rộng */
  }

  .post-title {
    font-size: 1.5rem; /* Tăng kích thước tiêu đề bài viết trên điện thoại */
  }

  .post-summary {
    font-size: 0.9rem; /* Giảm kích thước text summary */
  }

  /* Footer */
  .footer {
    padding: 1.5rem 1rem; /* Điều chỉnh khoảng cách padding */
  }

  .footer .social-icons a {
    font-size: 1.2rem; /* Điều chỉnh kích thước icon */
  }

  .all-post-title {
    padding-left: 0; /* Tắt padding bên trái của tiêu đề */
    text-align: center; /* Căn giữa tiêu đề */
    font-size: 1.2rem; /* Tăng kích thước font */
  }
}

/* Media Queries cho thiết bị rất nhỏ (dưới 480px) */
@media (max-width: 480px) {
  .header {
    padding: 1rem; /* Giảm padding */
  }

  .logo {
    font-size: 1.8rem; /* Giảm kích thước logo */
  }

  .nav-link {
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }

  .create-btn {
    font-size: 1.1rem;
    padding: 0.6rem 1.2rem;
  }

  .post-grid {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.2rem;
  }

  .post-summary {
    font-size: 0.85rem;
  }

  .footer {
    padding: 1rem;
  }

  .footer .social-icons a {
    font-size: 1rem;
  }
}
</style>
