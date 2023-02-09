<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token',),
    }
  },
}
</script>

<template>
  <main>
    <router-link to="/">Home Page</router-link>
    <router-link to="/data">Locations</router-link>
    <router-view/>
  </main>
</template>

 <style>
main {
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

router-link {
  color: #333;
  text-decoration: none;
  margin: 10px;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
}

router-link:hover {
  color: #7f7f7f;
  transform: translate(5px, -5px);
}

</style>