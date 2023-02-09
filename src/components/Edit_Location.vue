<script>
import axios from 'axios';

export default {
  data() {
    return {
      filmId: this.$route.params.filmId,
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    }
  },
  created() {
    this.filmId = this.$route.params.filmId;
    this.fetchFilm();
  },
  methods: {
    async fetchFilm() {
      try {
        const { data } = await axios.get(`http://localhost:3000/locations/${this.filmId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.filmName = data.filmName;
        this.filmType = data.filmType;
        this.filmDirectorName = data.filmDirectorName;
        this.filmProducerName = data.filmProducerName;
        this.address = data.address;
        this.district = data.district;
        this.year = data.year;
        // I didn't include the starting and ending dates in the editing because the format is complicated.
      } catch (error) {
        console.error(error);
      }
    },
    async confirm_Edit() {
      try {
        await axios.patch(`http://localhost:3000/locations/${this.filmId}`, {
          filmName: this.filmName,
          filmType: this.filmType,
          filmDirectorName: this.filmDirectorName,
          filmProducerName: this.filmProducerName,
          address: this.address,
          district: this.district,
          year: this.year
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Location successfully updated');
        this.$router.back();
      } catch (error) {
        alert('Error');
      }
    }
  }
};
</script>


<!--Internet page display-->
<template>
  <div>
    <h1>Edit Film</h1>
    <form @submit.prevent="confirm_Edit">
      <div>
        <label for="filmName">Name:</label>
        <input type="text" id="filmName" v-model="filmName" />
      </div>
      <div>
        <label for="filmType">Type:</label>
        <input type="text" id="filmType" v-model="filmType" />
      </div>
      <div>
        <label for="filmDirectorName">Director:</label>
        <input type="text" id="filmDirectorName" v-model="filmDirectorName" />
      </div>
      <div>
        <label for="filmProducerName">Producer:</label>
        <input type="text" id="filmProducerName" v-model="filmProducerName" />
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" />
      </div>
      <div>
        <label for="district">District:</label>
        <input type="text" id="district" v-model="district" />
      </div>
      <div>
        <label for="year">Year:</label>
        <input type="text" id="year" v-model="year" />
      </div>
      <br />
      <button type="submit">Confirm Edit</button>
    </form>
  </div>
</template>

<style>


form {
  width: 85%;
  text-align: Center;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid gray;
  border-radius: 10px;
}

h1 {
  text-align: Center;
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid gray;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
<style>

main {
  display: flex;
  flex-direction: column;
  align-items: Center;
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