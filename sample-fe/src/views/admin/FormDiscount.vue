<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý đợt giảm giá</h3>
      <div class="box-shadow p-3">
        <input
        class="form-control mt-3"
        placeholder="Tên đợt giảm giá"
        v-model="name"
        :aria-errormessage="errors.name"
        :class="{'is-invalid': errors.name}"
        />
        <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>

        <input class="form-control mt-3" placeholder="Phần trăm giảm" v-model="discountRate" :aria-errormessage="errors.discountRate"
               :class="{'is-invalid': errors.discountRate}">
        <p v-if="errors.discountRate" class="text-danger">{{ errors.discountRate }}</p>

        <div class="d-flex mt-3">
          <input class="form-control me-3" type="date" placeholder="Ngày bắt đầu"
                 v-model="formattedStartDate" :aria-errormessage="errors.startDate"
                 :class="{'is-invalid': errors.startDate}">

          <input class="form-control " type="date" placeholder="Ngày kết thúc"
                 v-model="formattedEndDate" :aria-errormessage="errors.endDate"
                 :class="{'is-invalid': errors.endDate}" >

        </div>
        <p v-if="errors.startDate" class="text-danger">{{ errors.startDate }}</p>
        <p v-if="errors.endDate" class="text-danger">{{ errors.endDate }}</p>
        <select class="form-control mt-3" type="" v-model="status"
                :class="{ 'text-muted': status === '','is-invalid': errors.status }" :aria-errormessage="errors.status" >
          <option value="" disabled>Trạng thái</option>
          <option value="Chưa bắt đầu">Chưa bắt đầu</option>
          <option value="Đang diễn ra">Đang diễn ra</option>
          <option value="Kết thúc">Kết thúc</option>
        </select>
        <p v-if="errors.status" class="text-danger">{{ errors.status }}</p>

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
const startDate = ref<Date | null>(null);

const endDate = ref<Date | null>(null);
const status = ref<string>('');
const errors = ref<Record<string, string>>({});

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
    if (startDate.value) {
      const date = startDate.value;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  },
  set: (val: string) => {
    if (val) {
      const date = new Date(val);
      date.setUTCHours(0, 0, 0, 0);
      startDate.value = date;
    }
  }
});

const formattedEndDate = computed({
  get: () => {
    if(endDate.value) {
      const date = endDate.value;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  },
  set: (val: string) => {
    const date = new Date(val);
    date.setUTCHours(23, 59, 59, 999);
    endDate.value = date;
  }
})

const save = async () => {
  errors.value = {}
  const currentDate = new Date();
  let response;
  if (!startDate.value >= !endDate.value) {
    errors.value.startDate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc.";
    return;
  }
  if (!endDate.value < !currentDate) {
    errors.value.endDate = "Ngày kết thúc phải bằng hoặc lớn hơn ngày hiện tại.";
    return;
  }
  try {
    if (route.params.id) {
      response = await discountService.update(route.params.id as string,
        name.value,
        discountRate.value,
        startDate.value ?? new Date(),
        endDate.value ?? new Date(),
        status.value,
      );
    } else {
      response = await discountService.add(
        name.value,
        discountRate.value,
        startDate.value ?? new Date(),
        endDate.value ?? new Date(),
        status.value,
      );
    }
    if (response.status === 200) {
      router.back()
    }
  }catch (err:any){
      errors.value = err.response.data.errors;
  }
}

const goBack = () =>{
  router.back()
}
onMounted(() => {
  if(route.params.id){
    getById()
  }

})
</script>
