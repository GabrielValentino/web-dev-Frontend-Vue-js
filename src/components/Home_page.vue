<script>
import axios from 'axios';
export default {
  data() {
    return {
      awesome: true,
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
      role: localStorage.getItem('role',),
      dataTest: [],
    };
  },
  computed: {
    message() {
      return this.token ? `Hello ${localStorage.getItem('username')}. If you want to see movies shooting locations , click on Locations.` :
          "You need to login to see the different locations.\n If you do not already have an account, please register.";
    },
  },
  methods: {
    logout() {
      this.token, this.role, this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.goTo('/login');
    },
    async getFilms() {
      try {
        const { data } = await axios.get('http://localhost:3000/locations', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.dataTest = data;
      }
      catch(error) {
        console.error(error);
      }
    },
    goTo(path) {
      this.$router.push({ path: path });
    }
  },
  mounted() {
    if (this.token) {
      this.getFilms();
    }
  },
}
</script>


<!--Internet page display-->
<template>
  <main>
    <p>{{message}}</p>
    <template v-if="token">
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <button @click="goTo('/login')">Login</button>
      <button @click="goTo('/register')">Register</button>
    </template>
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