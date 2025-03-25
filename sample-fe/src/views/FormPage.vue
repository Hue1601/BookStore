<template>
  <h1>{{route.params.id ? "Update user" : "Thêm mới user"  }}</h1>
  <input class="form-control me-2"  placeholder="Name" v-model="name">
  <input class="form-control me-2" placeholder="Email" style="margin: 20px 0" v-model="email">
  <input class="form-control me-2"  placeholder="Age" v-model="age">
  <button class="btn btn-primary mt-2 " @click="create">Tạo</button>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const name = ref("")
const email = ref("")
const age = ref("")

const create = async () =>{
   if (route.params.id){
     const update = await axios.put(`http://localhost:5000/api/users/${route.params.id}`, {
       name: name.value,
       email: email.value,
       age: age.value,
     })
     if(update.status === 200){
       router.push("/")
     }
   }else{
     const create = await axios.post(`http://localhost:5000/api/users`,{
       name: name.value,
       email: email.value,
       age: age.value,
     })

     if(create.status === 201){
        router.push("/")
     }
   }
}
onMounted(async () =>{
  if (route.params.id) {
    const user = await axios.get(`http://localhost:5000/api/users/${route.params.id}`)
    console.log("hue " +JSON.stringify(user))
      name.value = user.data.name;
      email.value = user.data.email;
      age.value = user.data.age;

  }
})
</script>
