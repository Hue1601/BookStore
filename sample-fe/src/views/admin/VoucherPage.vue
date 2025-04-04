<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý phiếu giảm giá</h3>
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
          <th scope="col">Mã</th>
          <th scope="col">Giá trị</th>
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
          <td>{{ data.code }}</td>
          <td>{{ data.value }}</td>
          <td>{{ formatDate(data.startDate) }}</td>
          <td>{{ formatDate(data.endDate) }}</td>
          <td>{{ data.status }}</td>

          <td>
            <router-link
              :to="`/update-voucher/${data._id}`"
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
import {voucherService} from "@/components/service/VoucherService.ts";
import {computed, onMounted, ref} from "vue";
import {type Voucher} from "@/components/interface/admin/admin.ts";

const router = useRouter()
const voucher = ref<Voucher[]>([])
const searchQuery = ref("")

const goToAdd = () => {
  router.push("/add-voucher")
}

const formatDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

const getListVoucher = async () => {
  const response = await voucherService.getVoucher()
  voucher.value = response.data
}

const filteredVoucher = computed(() =>{
  if(searchQuery.value == "") {
    return voucher.value
  }
  return voucher.value.filter((data) =>
    data.code.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


onMounted(() => {
  getListVoucher()
})
</script>
