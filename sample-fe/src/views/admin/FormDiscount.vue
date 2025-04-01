<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý đợt giảm giá</h3>
      <div class="box-shadow p-3">
        <input class="form-control mt-3" placeholder="Tên đợt giảm giá" v-model="name">
        <input class="form-control mt-3" placeholder="Phần trăm giảm" v-model="discountRate">
        <div class="d-flex mt-3">
          <input class="form-control me-3" type="date" placeholder="Ngày bắt đầu"
                 v-model="formattedStartDate">
          <input class="form-control " type="date" placeholder="Ngày kết thúc"
                 v-model="formattedEndDate">
        </div>

        <select class="form-control mt-3" type="" v-model="status"
                :class="{ 'text-muted': status === '' }">
          <option value="" disabled>Trạng thái</option>
          <option value="Chưa bắt đầu">Chưa bắt đầu</option>
          <option value="Đang diễn ra">Đang diễn ra</option>
          <option value="Kết thúc">Kết thúc</option>
        </select>

        <div class="mt-2 text-align">
          <button class="btn btn-outline-primary m-3" @click="goBack">Hủy</button>
          <button class="btn btn-primary" @click="save">Lưu</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sitebar from "@/components/common/Sitebar.vue";
import Header from "@/components/common/Header.vue";
import {computed, onMounted, ref} from "vue";
import {discountService} from "@/components/service/DiscountService.ts";
import {useRoute,useRouter} from "vue-router";

const route = useRoute();
const router = useRouter()
const name = ref("")
const discountRate = ref()
const startDate = ref<Date>(new Date())
const endDate = ref<Date>(new Date())
const status = ref<string>('');


const getById = async () => {
  const res = await discountService.getById(route.params.id as string);
  name.value = res.name
  discountRate.value = res.discountRate
  status.value = res.status
  startDate.value = new Date(res.startDate)
  endDate.value = new Date(res.endDate)
}

const formattedStartDate = computed({
  get: () => {
    const date = startDate.value;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  set: (val: string) => {
    const date = new Date(val);
    date.setUTCHours(0, 0, 0, 0);
    startDate.value = date;
  }
})

const formattedEndDate = computed({
  get: () => {
    const date = endDate.value;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  set: (val: string) => {
    const date = new Date(val);
    date.setUTCHours(23, 59, 59, 999);
    endDate.value = date;
  }
})

const save = async () => {
  let response;
  if(route.params.id ) {
    response = await discountService.update(route.params.id as string,
      name.value,
      discountRate.value,
      startDate.value,
      endDate.value,
      status.value,
    );
  }
  else{
    response = await discountService.add(
      name.value,
      discountRate.value,
      startDate.value,
      endDate.value,
      status.value,
    );
  }
  if(response.status ===200){
    router.back()
  }
}
onMounted(() => {
  if(route.params.id){
    getById()
  }

})
</script>
