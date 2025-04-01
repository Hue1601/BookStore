<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý đợt giảm giá</h3>
      <div class="row update-row">
        <div class="col-11">
          <input class="form-control " type="search" placeholder="Search" aria-label="Search"
                 style="width: 400px" v-model="searchQuery">
        </div>

        <button class="btn btn-outline-success col-1" type="submit" @click="goToAdd">Add</button>
      </div>

      <table class="table" style="margin-top: 30px">
        <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên đợt giảm giá</th>
          <th scope="col">Phần trăm giảm</th>
          <th scope="col">Ngày bắt đầu</th>
          <th scope="col">Ngày hết hạn</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">
            Thao tác
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, i) in filteredVoucher" :key="data._id">
          <td>{{ i + 1 }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.discountRate }}</td>
          <td>{{ formatDate(data.startDate) }}</td>
          <td>{{ formatDate(data.endDate) }}</td>
          <td>{{ data.status }}</td>

          <td>
            <router-link
              :to="`/update-discount/${data._id}`"
              class="text-primary"
              style="text-decoration: none"
            >
              Update
            </router-link>

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
import {discountService} from "@/components/service/DiscountService.ts";
import {computed, onMounted, ref} from "vue";
import {type Discount} from "@/components/interface/admin/admin.ts";

const router = useRouter()
const discount = ref<Discount[]>([])
const searchQuery = ref("")

const goToAdd = () => {
  router.push("/add-discount")
}

const getListDiscount = async () =>{
    const response = await discountService.getAll()
  discount.value = response.data
}
const formatDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

const filteredVoucher = computed(() =>{
  if(searchQuery.value == "") {
    return discount.value
  }
  return discount.value.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


onMounted(() => {
  getListDiscount()
})
</script>
