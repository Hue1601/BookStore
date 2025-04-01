<template>
  <Header/>
  <div class="d-flex" >
    <Sitebar/>
     <div class="product-management">
       <h3>Quản lý sản phẩm</h3>
         <div class="row update-row">
           <div class="col-11">
             <input class="form-control " type="search" placeholder="Search" aria-label="Search" style="width: 400px">
           </div>

           <button class="btn btn-outline-success col-1" type="submit" @click="goToAdd">Add</button>
         </div>

         <table class="table box-shadow" style="margin-top: 30px">
           <thead>
           <tr>
             <th scope="col">ID</th>
             <th scope="col">Tên sách</th>
             <th scope="col">Giá bán</th>
             <th scope="col">Số lượng</th>
             <th scope="col">Trạng thái</th>
             <th scope="col">
               Hành động
             </th>
           </tr>
           </thead>
           <tbody>
           <tr >
<!--             <th scope="row">{{data.name}}</th>-->
<!--             <td>{{data.email}}</td>-->
<!--             <td>{{data.age}}</td>-->

             <td>
<!--               <router-link-->
<!--                 :to="`/update/${data._id}`"-->
<!--                 class="text-primary"-->
<!--                 style="text-decoration: none"-->
<!--               >-->
<!--                 Update-->
<!--               </router-link>-->

             </td>
           </tr>
           </tbody>
         </table>
     </div>
  </div>
</template>
<script setup lang="ts">
import Sitebar from '../../components/common/Sitebar.vue'
import Header from "@/components/common/Header.vue";
import {useRouter} from "vue-router";

const router = useRouter()

</script>
