<template>
  <header class="header">
    <h1 class="logo">Hiew Ne</h1>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap" rel="stylesheet">
    <nav>
      <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">New</router-link>
      <router-link to="/reading-list" class="nav-link">Reading list</router-link>
      <router-link to="/topics" class="nav-link">Topics</router-link>
      <router-link to="/create" class="create-btn">Create</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderBlog'
};
</script>

<style scoped>
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
</style>
