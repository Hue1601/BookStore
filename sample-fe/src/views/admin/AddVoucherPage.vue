<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý sản phẩm</h3>
      <div class="box-shadow p-3">
        <input class="form-control mt-3" placeholder="Mã giảm giá" v-model="code">
        <div class="d-flex mt-3">
          <select
            class="form-control me-3"
            v-model="type"
            :class="{ 'text-muted': type === '' }"
          >
            <option disabled value="">Kiểu giảm giá</option>
            <option :value="false">Giảm theo tiền</option>
            <option :value="true">Giảm theo phần trăm</option>
          </select>

          <input class="form-control" type="number" placeholder="Số lượng" v-model="quantity">
        </div>

        <input class="form-control mt-3" placeholder="Điều kiện giảm" v-model="condition">

        <div class="d-flex mt-3">
          <input class="form-control me-3 " placeholder="Giá trị giảm giá" v-model="value">
          <input class="form-control " placeholder="Giảm tối đa" v-model="maxValue">
        </div>

        <div class="d-flex mt-3">
          <input class="form-control me-3" type="date" placeholder="Ngày bắt đầu"
                 v-model="formattedStartDate">
          <input class="form-control " type="date" placeholder="Ngày kết thúc" v-model="formattedEndDate">
        </div>

        <select class="form-control mt-3" type="" v-model="status" :class="{ 'text-muted': status === '' }">
          <option value="" disabled>Trạng thái</option>
          <option value="Chưa bắt đầu">Chưa bắt đầu</option>
          <option value="Đang diễn ra">Đang diễn ra</option>
          <option value="Kết thúc">Kết thúc</option>
        </select>

        <div class="mt-2 text-align">
          <button class="btn btn-outline-primary m-3" @click="goBack">Hủy</button>
          <button class="btn btn-primary" @click="updateVoucher">Lưu</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sitebar from '../../components/common/Sitebar.vue'
import Header from "@/components/common/Header.vue";
import { useRoute,useRouter} from "vue-router";
import {voucherService} from "@/components/service/VoucherService.ts";
import {computed, onMounted, ref} from "vue";

const route = useRoute()
const router = useRouter()

const code = ref("")
const condition = ref("")
const type = ref<string | boolean>('');
const value = ref<number>()
const maxValue = ref<number>()
const quantity = ref<number>()
const startDate = ref<Date>(new Date())
const endDate = ref<Date>(new Date())
const status = ref<string >('');

const goBack = () => {
  router.push("/voucher")
}
const getById = async () => {
  const response = await voucherService.getVoucherById(route.params.id as string);
  code.value = response.code
  condition.value = response.condition
  type.value = response.type
  value.value = response.value
  maxValue.value = response.maxValue
  quantity.value= response.quantity
  startDate.value = new Date(response.startDate)
  endDate.value = new Date(response.endDate)
  status.value = response.status
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
    // Khi user chọn ngày, thiết lập giờ về 00:00:00 UTC
    const date = new Date(val);
    date.setUTCHours(0, 0, 0, 0);
    startDate.value = date;
  }
});


const formattedEndDate = computed({
  get: () => {
    const date = endDate.value;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  set: (val: string) => {
    // Chuyển thành UTC 23:59:59
    const date = new Date(val);
    date.setUTCHours(23, 59, 59, 999);
    endDate.value = date;
  }
});

const updateVoucher = async () => {
  let response;
  if(route.params.id ) {
    response =await voucherService.updateVoucher(
      route.params.id as string,
      code.value,
      condition.value,
      type.value as boolean,
      value.value ?? 0,
      maxValue.value ?? 0,
      quantity.value ?? 0,
      startDate.value,
      endDate.value,
      status.value,
    )
  }else{
     response = await voucherService.addVoucher(
      code.value,
      condition.value,
      type.value as boolean,
      value.value ?? 0,
      maxValue.value ?? 0,
      quantity.value ?? 0,
      startDate.value,
      endDate.value,
      status.value,
    )
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
