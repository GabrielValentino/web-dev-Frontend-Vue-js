<script>
import axios from 'axios';
import Login from './Login.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async submitRegister() {
      try {
        const response = await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          password: this.password,
        });
        //await Login.login(this.username, this.password);

        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', this.username);
          /*const tmp = await axios.get('http://localhost:3000/users/me', {
            headers: {
              'Authorization': `Bearer ${response.data.jwt}`,
            }
          });q
          localStorage.setItem('role', tmp.data.role);*/
        } catch (error) {
          console.error(error);
        }

        this.$router.push({ path: '/' });
      } catch (error) {
        if (error.response.status === 400) {
          this.errorMessage = "This username already exists. If you already have an account, please login";
        }
        else {
          this.errorMessage = "error";
        }
      }
    }
  }
};
</script>


<!--Internet page display-->
<template>
  <h1>Register Page</h1>
  <a>Have an account? </a>
  <a href="/login">Login</a>
  <!-- <router-view />  !-->
  <form @submit.prevent="submitRegister">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <br/>
    <button type="submit">Register</button>
  </form>
</template>




