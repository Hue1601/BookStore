<template>
  <Header/>
  <div class="d-flex">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý thuộc tính</h3>
      <div class="d-flex">
        <div class="attribute-content" style="margin-right: 10px">
          <table class="table" style="margin-bottom: 0">
            <thead style="background-color: blue;">
            <tr>
              <th>Tác giả</th>
              <th style="text-align: end">Add</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in listAuthor" :key="author._id">
              <td>{{ author.name }}</td>
              <td style="text-align: end">
                <router-link
                  to=""
                  class="text-primary"
                  style="text-decoration: none"
                >
                  Update
                </router-link>
                <a class="text-danger" style="text-decoration: none">Delete</a>
              </td>
            </tr>

            </tbody>
          </table>
        </div>

        <div class="attribute-content" >
          <table class="table" style="margin-bottom: 0">
            <thead style="background-color: blue;">
            <tr>
              <th>Thể loại</th>
              <th style="text-align: end">Add</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in listCategory" :key="category._id">
              <td>{{ category.name }}</td>
              <td style="text-align: end">
                <router-link
                  to=""
                  class="text-primary"
                  style="text-decoration: none"
                >
                  Update
                </router-link>
                <a class="text-danger" style="text-decoration: none">Delete</a>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-top: 20px; display: flex;justify-content: center;">
        <div class="attribute-content" >
          <table class="table" style="margin-bottom: 0">
            <thead style="background-color: blue;">
            <tr>
              <th>Nhà xuất bản</th>
              <th style="text-align: end">Add</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="publisher in listPublisher" :key="publisher._id">
              <td>{{ publisher.name }}</td>
              <td style="text-align: end">
                <router-link
                  to=""
                  class="text-primary"
                  style="text-decoration: none"
                >
                  Update
                </router-link>
                <a class="text-danger" style="text-decoration: none">Delete</a>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sitebar from '../../components/common/Sitebar.vue'
import Header from "@/components/common/Header.vue";
import {attributeService} from "@/components/service/AttributeService.ts";
import {onMounted, ref} from "vue";
import {type Author,type Category} from "@/components/interface/admin/attribute.ts";

const listAuthor = ref<Author[]>([]);
const listCategory = ref<Category[]>([]);
const listPublisher = ref<Category[]>([]);

const getAuthor = async () => {
  listAuthor.value = await attributeService.getAuthor();
}
const getCategory = async () => {
  listCategory.value = await attributeService.getCategory();
}
const getPublisher = async () => {
  listCategory.value = await attributeService.getPublisher();
}

onMounted(() => {
  getAuthor()
  getCategory()
  getPublisher()
})
</script>
