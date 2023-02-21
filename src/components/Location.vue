<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      films: [],
      currentPage: 1,
      itemsPerPage: 10,
      role: '',
    };
  },
  computed: {
    currentFilms() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.films.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchFilms();
    this.role = await this.userRole();
  },
  methods: {
    async userRole() {
      try {
        const response = await axios.get('https://web-dev-backend-valentino.onrender.com/users/me', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async fetchFilms() {
      const { data } = await axios.get('https://web-dev-backend-valentino.onrender.com/locations?limit=1000', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }});
      this.films = data;
    },
    Details(filmId) {
      this.$router.push(`/filmDetails/${filmId}`);
    },
    createFilm() {
      this.$router.push('/createFilm');
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.films.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
  },
};
</script>


<!--Internet page display-->
<template>
  <h2>Films :</h2>
  <div>
    <div v-for="film in currentFilms" :key="film._id">
      <button @click="Details(film._id)">{{ film.filmName }}</button>
    </div>
    <br />
    <div>
      <button @click="previousPage">Previous</button>
      <button @click="nextPage">Next</button>
      <div v-if="role === 'admin'">
        <button @click="createFilm">Add Film</button>
      </div>
    </div>
  </div>
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