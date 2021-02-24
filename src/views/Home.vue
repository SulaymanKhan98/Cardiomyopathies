<template>
  <div class="home_page">
  <div class="jumbotron text-left"> 
  <h1> Welcome to Homepage </h1>
  
    
</div>  
<div class="tabs">
  <h2 v-if="user">Hi, {{user.displayName}}, please enter data</h2> 
  <h2 v-if="user"> <user-upload-data/> </h2> 
</div>  
   


  <div class="jumbotron2 text-center">
  <h1>Saerch keywords </h1> 
  <p>Please select one keyword to search</p> 
   <div class="input-container" >
      <select v-model="selected">
        <option disabled value="">Please select one </option>
        <option>TNNT</option>
        <option>MYH</option>
        <option>MYBPC3</option>
        <option>TPM1</option>
      </select>
      <span>Selected: {{selected}}</span>
      <button class="btn btn-success" @click="populateDiseaseList()">SEARCH </button>
    </div>
      <SearchList v-if="somethingEntered" v-bind:results="results"/>
  

</div>
  </div>
</template>

<script>
// @ is an alias to /src
import {ref} from "vue";
import {firebaseAuthentication } from "@/firebase/database";
import UserUploadData from '../components/UserUploadData';
import SearchList from '../components/SearchList';




export default {
  name: 'Home',
  components: {
    UserUploadData,
    SearchList
  },

  setup(){

    const user = ref(firebaseAuthentication.currentUser);
   

   
    
  
    firebaseAuthentication.onAuthStateChanged(user => {
      user.value = user;
    });


    return {user};
  },
  data() {
    return{
      results: '',
      selected: '',
      somethingEntered: false,
      geneType: '',
      diseaseList: '',
      disease_base_url: "https://hpo.jax.org/api/hpo/disease",
      error: ''
    }
  },
  methods: {
   async populateDiseaseList() {
      if (this.selected === 'TNNT') {
      this.geneType = 'OMIM:601494';
      }
      else if (this.selected === 'MYH') {
      this.geneType = 'OMIM:192600';
      }
      else if (this.selected === 'MYBPC3'){
       this.geneType = 'OMIM:115197';
      }
      else{
        this.geneType ='OMIM:115196'
      }
      const disease_list_url = this.disease_base_url + "/" +this.geneType
      try {
        let disease_data = await fetch(disease_list_url);
        if (!disease_data.ok) {
          throw Error("unable kiddo");
        }
        this.diseaseList = await disease_data.json();
        this.results = this.diseaseList
        console.log(this.results)
      this.somethingEntered=true
        console.log("it didnt catch");
      } catch (error) {
        console.log("it caught");
      }
    }
  }


}

</script>


<style scoped>
  .jumbotron {
    background-color: #5f75f1;
    color: #fff;
    padding: 60px 25px;
    font-family: Montserrat, sans-serif;
  }

    .jumbotron2 {
    background-color: #121172;
    color: #fff;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
  }

  .drop
  {
    background-color: #121172;
    color: rgb(0, 0, 0);
    padding: 20px 25px;
    font-family: Montserrat, sans-serif;
    font-size: 20px;
  }

  .tabs
  {
    display: inline-block;
    margin-left: 40%;
    margin-right: auto;
    text-align: left;
    padding: 12px 20px;
    border-radius: 4px;



  }




</style>
