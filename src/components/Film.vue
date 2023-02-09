<script>
import axios from "axios";

export default {
  data() {
    return {
      filmId: this.$route.params.filmId,
      filmInfos: [],
      role: '',
    };
  },
  async mounted() {
    await this.fetchFilmInfos();
    this.role = await this.userRole();
  },
  methods: {
    async fetchFilmInfos() {
      const {data} = await axios.get(`http://localhost:3000/locations/${this.filmId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      this.filmInfos = data;
    },
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async Delete_Location() {
      try {
        await axios.delete(`http://localhost:3000/locations/${this.filmId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Film deleted successfully !');
        this.$router.back();
      } catch (error) {
        alert('Error');
      }
    },
    async Delete_Confirmation() {
      if(confirm("Confirm deletion")) {
        await this.Delete_Location();
      }
    },
    goToEdit(filmId) {
      this.$router.push(`/editFilm/${filmId}`);
    },
  }
};
</script>

<!--Internet page display-->
<template>
  <div>
    <h2>Name: {{filmInfos.filmName}}</h2>
    <h4>Type: {{filmInfos.filmType}}</h4>
    <h4>Director: {{filmInfos.filmDirectorName}}</h4>
    <h4>Producer: {{filmInfos.filmProducerName}}</h4>
    <h4>Address: {{filmInfos.address}}</h4>
    <h4>District: {{filmInfos.district}}</h4>
    <h4>Year: {{filmInfos.year}}</h4>
    <h4>Starting date: {{filmInfos.startDate}}</h4>
    <h4>Ending date: {{filmInfos.endDate}}</h4>
  </div>
  <div v-if="role === 'admin'">
    <button @click="goToEdit(filmId)">Edit</button>
    <button @click="Delete_Confirmation">Delete</button>
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