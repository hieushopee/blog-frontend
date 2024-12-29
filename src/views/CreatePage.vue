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

    <!-- Form Section -->
    <div class="create-page-container">
      <div class="form-container">
        <h2 class="form-title">Create Post</h2>
        <form @submit.prevent="createPost">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              id="title"
              v-model="newPost.title"
              placeholder="Title..."
              maxlength="300"
            />
            <p class="char-count">{{ newPost.title.length }}/300</p>
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input
              id="author"
              v-model="newPost.author"
              placeholder="Author..."
            />
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <input
              id="category"
              v-model="newPost.category"
              placeholder="Category..."
            />
          </div>

          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              id="content"
              v-model="newPost.content"
              placeholder="Content..."
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">Create Post</button>
        </form>
      </div>
      
      <!-- Recent Posts Section -->
      <aside class="recent-posts">
        <h3 class="recent-posts-title">RECENT POSTS</h3>
        <ul class="recent-posts-list">
          <li v-if="recentPosts.length === 0">No recent posts available</li>
          <li v-for="post in recentPosts" :key="post.id" class="recent-post-item">
            <p class="post-category">{{ post.category.toUpperCase() }}</p>
            <p class="post-title">{{ post.title }}</p>
            <button @click="editPost(post)" class="edit-btn">Edit</button>
            <button @click="deletePost(post.id)" class="delete-btn">Delete</button>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newPost: {
        id: null,
        title: "",
        author: "",
        category: "",
        content: "",
      },
      recentPosts: [], // Recent posts to display in the sidebar
    };
  },
  methods: {
    createPost() {
      if (this.newPost.id) {
        // Update the post in both the blog and create APIs
        Promise.all([
          axios.put(`https://67625e7b46efb373237455d7.mockapi.io/api/create/${this.newPost.id}`, this.newPost),
          axios.put(`https://67625e7b46efb373237455d7.mockapi.io/api/blog/${this.newPost.id}`, this.newPost),
        ])
          .then(() => {
            alert("Post updated successfully!");
            this.newPost = { title: "", author: "", category: "", content: "", id: null }; // Reset form
            this.fetchRecentPosts(); // Update the list of posts
          })
          .catch((err) => console.error("Error updating post:", err));
      } else {
        // Create a new post in both the create and blog APIs
        axios
          .post("https://67625e7b46efb373237455d7.mockapi.io/api/create", this.newPost)
          .then(() => {
            // Also add the post to the blog API
            return axios.post("https://67625e7b46efb373237455d7.mockapi.io/api/blog", this.newPost);
          })
          .then(() => {
            alert("Post created successfully!");
            this.newPost = { title: "", author: "", category: "", content: "", id: null }; // Reset form
            this.fetchRecentPosts(); // Update the list of posts
          })
          .catch((err) => console.error("Error creating post:", err));
      }
    },
    deletePost(postId) {
      // Delete the post from both the create and blog APIs
      Promise.all([
        axios.delete(`https://67625e7b46efb373237455d7.mockapi.io/api/create/${postId}`),
        axios.delete(`https://67625e7b46efb373237455d7.mockapi.io/api/blog/${postId}`)
      ])
        .then(() => {
          alert("Post deleted successfully!");
          this.fetchRecentPosts(); // Update the list of posts after deletion
        })
        .catch((err) => console.error("Error deleting post:", err));
    },
    editPost(post) {
      this.newPost = { ...post }; // Copy data from the post to edit
    },
    fetchRecentPosts() {
      // Fetch recent posts from the "create" API only
      axios
        .get("https://67625e7b46efb373237455d7.mockapi.io/api/create")
        .then((res) => {
          this.recentPosts = res.data;
        })
        .catch((err) => console.error("Error fetching posts:", err));
    },
  },
  mounted() {
    this.fetchRecentPosts(); // Fetch the posts when the page loads
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
  color: #a379e5;
  font-weight: bold;
}
.create-btn {
  background: #a379e5;
  color: white;
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
}
/* Create Page Layout */
.create-page-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 10rem;
  flex-wrap: wrap; /* Điều chỉnh khi màn hình nhỏ */
}
.edit-btn,
.delete-btn {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

/* Form Section */
.form-container {
  width: 60%;
  padding-left: 0;
}
.form-title {
  font-size: 2rem;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 1.5rem;
  color: #333;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.form-group input,
.form-group textarea {
  width: 95%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
}
.form-group textarea {
  height: 150px;
  resize: none;
}
.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: gray;
}
.submit-btn {
  width: auto;
  padding: 1rem;
  background: #a379e5;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.submit-btn:hover {
  background: #8b68cc;
}

/* Recent Posts Section */
.recent-posts {
  width: 35%;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
}
.recent-posts-title {
  font-size: 1.2rem;
  font-family: "Open Sans", sans-serif;
  color: #666;
  margin-bottom: 1rem;
}
.recent-posts-list {
  list-style: none;
  padding: 0;
}
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

/* Media Queries for Responsiveness */
@media (max-width: 1024px) {
  .create-page-container {
    padding: 2rem 5rem; /* Giảm padding cho tablet */
    flex-direction: column; /* Sắp xếp các thành phần theo cột */
  }
  .form-container {
    width: 100%; /* Form chiếm toàn bộ chiều rộng */
  }
  .recent-posts {
    width: 100%; /* Recent Posts chiếm toàn bộ chiều rộng */
    margin-top: 2rem;
  }
  .header {
    padding: 1rem 5rem; /* Điều chỉnh padding */
  }
  .nav-link {
    font-size: 1.2rem; /* Giảm kích thước font */
  }
  .create-btn {
    font-size: 1.2rem; /* Giảm kích thước nút Create */
  }
}

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
}
</style>
