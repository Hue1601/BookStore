<template>
  <div style="display: flex;justify-content: center">
   <div class="login">
     <h1>Đăng nhập</h1>
     <input class="form-control me-2"  placeholder="Name" v-model="username">
     <input class="form-control me-2"  placeholder="Password" style="margin: 20px 0" v-model="password">
     <button class="btn btn-primary mt-2 " @click="login">Đăng nhập</button>
   </div>
  </div>



<!-- <h1>Danh sách user</h1>-->
<!--  <div class="d-flex">-->
<!--    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">-->
<!--    <button class="btn btn-outline-success" type="submit" @click="goToAdd">Add</button>-->
<!--  </div>-->
<!--  <table class="table">-->
<!--    <thead>-->
<!--    <tr>-->
<!--      <th scope="col">Name</th>-->
<!--      <th scope="col">Email</th>-->
<!--      <th scope="col">Age</th>-->
<!--      <th scope="col">-->
<!--        Hành động-->
<!--      </th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    <tr v-for="(data, i) in listUser" :key="i">-->
<!--      <th scope="row">{{data.name}}</th>-->
<!--      <td>{{data.email}}</td>-->
<!--      <td>{{data.age}}</td>-->

<!--      <td>-->
<!--        <router-link-->
<!--          :to="`/update/${data._id}`"-->
<!--          class="text-primary"-->
<!--          style="text-decoration: none"-->
<!--        >-->
<!--          Update-->
<!--        </router-link>-->
<!--        <a class="text-danger" style="text-decoration: none" @click="deleteData(data._id)">Delete</a>-->
<!--      </td>-->
<!--    </tr>-->

<!--    </tbody>-->
<!--  </table>-->

</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router'
const router = useRouter()
interface User{
  name: string,
  email: string,
  age: number,
  _id:string
}
const listUser = ref<User[]>([])
const get = async () =>{
  const response = await axios.get('http://localhost:5000/api/users')
  listUser.value = response.data
}

const goToAdd = () =>{
   router.push("/user")
}

const deleteData = async (id) =>{
  await axios.delete(`http://localhost:5000/api/users/${id}`)
  get()
}
onMounted(() =>{
  get()
})

const username = ref("")
const password = ref("")

const login = () =>{
  console.log("login")
}
</script>
<style>
.table {
  width: 100%;
  border-spacing: 15px;
}

th, td {
  text-align: center;
}

</style>
