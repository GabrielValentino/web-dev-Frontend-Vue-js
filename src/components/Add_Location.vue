<script>
import axios from "axios";

export default {
  data() {
    return {
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    };
  },

  methods: {
    async submitNewFilm() {
      try {
        await axios.post('https://web-dev-backend-valentino.onrender.com/locations', {
          filmName: this.filmName,
          filmType: this.filmType,
          filmDirectorName: this.filmDirectorName,
          filmProducerName: this.filmProducerName,
          address: this.address,
          district: this.district,
          year: this.year
          //no need to enter the starting and the ending of the shooting because the format is complicated
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }});
        this.filmName = '';
        this.filmType = '';
        this.filmDirectorName = '';
        this.filmProducerName = '';
        this.address = '';
        this.district = '';
        this.year = '';
        alert('New location successfully created');
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
  <form @submit.prevent="submitNewFilm">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="filmName" v-model="filmName" />
    </div>
    <div class="form-group">
      <label for="filmType">Film Type</label>
      <input type="text" id="filmType" v-model="filmType" />
    </div>
    <div class="form-group">
      <label for="filmDirectorName">Film Director Name</label>
      <input type="text" id="filmDirectorName" v-model="filmDirectorName" />
    </div>
    <div class="form-group">
      <label for="filmProducerName">Film Producer Name</label>
      <input type="text" id="filmProducerName" v-model="filmProducerName" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" id="address" v-model="address" />
    </div>
    <div class="form-group">
      <label for="district">District (only integers, or else rerun backend)</label>
      <input type="text" id="district" v-model="district" />
    </div>
    <div class="form-group">
      <label for="year">Year</label>
      <input type="number" id="year" v-model="year" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

