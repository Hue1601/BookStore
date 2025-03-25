<template>
  <div class="sitebar">

    <button class="btn-sitebar">Thống kê</button>
    <button class="btn-sitebar">Bán hàng tại quầy</button>
    <button class="btn-sitebar">Quản lý đơn hàng</button>

    <div class="btn-sitebar btn-dropdown background"  @click="showProductManage">
      <button style="border: none">Sản phẩm</button>
      <img alt="" src="../list-icon/Polygon%209.png" class="icon-dropdown"/>
    </div>
    <div v-if="isProductManagement" style="text-align: end">
      <button class="btn-sitebar option">Quản lý sản phẩm</button>
      <button class="btn-sitebar option">Quản lý thuộc tính</button>
    </div>

    <div class="btn-sitebar btn-dropdown "  @click="showDiscountManage" >
      <button style="border: none">Quản lý giảm giá</button>
      <img alt="" src="../list-icon/Polygon%209.png" class="icon-dropdown"/>
    </div>
    <div v-if="isDiscountManagement" style="text-align: end">
      <button class="btn-sitebar option">Phiếu giảm giá</button>
      <button class="btn-sitebar option">Đợt giảm giá</button>
    </div>

  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const isProductManagement = ref<Boolean>(false)
const isDiscountManagement = ref(false)

const showProductManage = () => {
  isProductManagement.value = !isProductManagement.value
}

const showDiscountManage = () => {
  isDiscountManagement.value = !isDiscountManagement.value
}
</script>
