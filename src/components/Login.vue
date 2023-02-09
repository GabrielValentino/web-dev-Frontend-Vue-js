<script>
import axios from 'axios';
//import { goToPage } from './Home_page.vue';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async userRole() {
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      },);
      return response.data.role;
    },
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {username, password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
        const tmp = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${response.data.jwt}`,
          }
      });
        localStorage.setItem('role', tmp.data.role);
      } catch (error) {
        console.error(error);
      }
    },
    async submitLogin() {
      await this.login(this.username, this.password);
      this.$router.push({ path: '/' });
    }
  }
};
</script>


<!--Internet page display-->
<template>
  <h1>Login Page</h1>
  <a>Need an account? </a>
  <a href="/register">Register</a>
  <router-view />
  <form @submit.prevent="submitLogin">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <br/>
    <button type="submit">Login</button>
  </form>
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