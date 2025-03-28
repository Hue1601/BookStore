<template>
  <Header/>

  <div class="d-flex" style="height: 92vh;">
    <Sitebar/>
    <div class="product-management">
      <h3>Quản lý thuộc tính</h3>
      <div class="d-flex">

        <!--        author-->
        <div class="attribute-content margin-right">
          <table class="table" style="margin-bottom: 0">
            <thead>
            <tr>
              <th class="bold-text">Tác giả</th>
              <th class="text-align">
                <img src="../../../src/components/list-icon/plus-circle.png" alt=""
                     class="icon-add" @click="clickShowPopup('author')">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in listAuthor" :key="author._id">
              <td>{{ author.name }}</td>
              <td class="text-align">
                <img src="../../../src/components/list-icon/pen.png" alt=""
                     class="icon-add margin-right" @click="btnUpdate('author',author._id)">
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!--        category-->
        <div class="attribute-content">
          <table class="table" style="margin-bottom: 0">
            <thead>
            <tr>
              <th class="bold-text">Thể loại</th>
              <th class="text-align">
                <img src="../../../src/components/list-icon/plus-circle.png" alt=""
                     class="icon-add" @click="clickShowPopup('category')">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in listCategory" :key="category._id">
              <td>{{ category.name }}</td>
              <td class="text-align">
                <img src="../../../src/components/list-icon/pen.png" alt=""
                     class="icon-add margin-right" @click="btnUpdate('category',category._id)">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="list-publisher">
        <div class="attribute-content">
          <table class="table" style="margin-bottom: 0">
            <thead>
            <tr>
              <th class="bold-text">Nhà xuất bản</th>
              <th class="text-align">
                <img class="icon-add" src="../../../src/components/list-icon/plus-circle.png" alt=""
                     @click="clickShowPopup('publisher')">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="publisher in listPublisher" :key="publisher._id">
              <td>{{ publisher.name }}</td>
              <td class="text-align">
                <img src="../../../src/components/list-icon/pen.png" alt=""
                     class="icon-add margin-right" @click="btnUpdate('publisher',publisher._id)">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--    show popup-->
    <div class="add-attribute" v-if="openPopup">
      <div class="popup">
        <div class="bg-primary header-popup">
          <img src="../../components/list-icon/x-circle.png" alt="" class="icon-add"
               @click="closePopup">
        </div>
        <div class="content-popup">
          <input class="form-control me-2" placeholder="Name" v-model="name">
          <button class="btn btn-primary " style="margin-top: 15px" @click="save">Save</button>
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
import {
  type Author,
  type Category,
  type Publisher
} from "@/components/interface/admin/attribute.ts";

const listAuthor = ref<Author[]>([]);
const listCategory = ref<Category[]>([]);
const listPublisher = ref<Publisher[]>([]);
const openPopup = ref(false)
const currentType = ref("")
const name = ref("")
const idAttribute = ref("")

const getAuthor = async () => {
  listAuthor.value = await attributeService.getAuthor();
}
const getCategory = async () => {
  listCategory.value = await attributeService.getCategory();
}
const getPublisher = async () => {
  listPublisher.value = await attributeService.getPublisher();
}

const clickShowPopup = async (type: string) => {
  openPopup.value = true;
  currentType.value = type;
}

const btnUpdate = (type: string, id: string) => {
  openPopup.value = true;
  currentType.value = type;
  idAttribute.value = id;
  findDataById();
}
const findDataById = async () => {
  let getById;
  switch (currentType.value) {
    case 'author':
      getById = await attributeService.findAuthorById(idAttribute.value);
      name.value = getById.name
      break;
    case 'publisher':
      getById = await attributeService.findPublisherById(idAttribute.value);
      name.value = getById.name
      break;
    case 'category':
      getById = await attributeService.findCategoryById(idAttribute.value);
      name.value = getById.name
      break;
  }
}

const save = async () => {
  if (idAttribute.value) {
    await update();
  } else {
    await add();
  }
};
const update = async () => {
  let update;
  switch (currentType.value) {
    case 'author':
      update = await attributeService.updateAuthor(idAttribute.value, name.value);
      if (update.status === 200) await getAuthor();
      break;
    case 'category':
      update = await attributeService.updateCategory(idAttribute.value, name.value);
      if (update.status === 200) await getCategory();
      break;
    case 'publisher':
      update = await attributeService.updatePublisher(idAttribute.value, name.value);
      if (update.status === 200) await getPublisher();
      break;

  }
  if (update?.status === 200) {
    closePopup()
  }
}

const add = async () => {
  let response;
  switch (currentType.value) {
    case 'author':
      response = await attributeService.addAuthor(name.value);
      if (response.status === 201) await getAuthor();
      break;
    case 'category':
      response = await attributeService.addCategory(name.value);
      if (response.status === 201) await getCategory();
      break;
    case 'publisher':
      response = await attributeService.addPublisher(name.value);
      if (response.status === 201) await getPublisher();
      break;
  }

  if (response?.status === 201) {
    closePopup()
  }
}
const closePopup = () => {
  openPopup.value = false;
  name.value = "";
}

onMounted(() => {
  getAuthor()
  getCategory()
  getPublisher()
})
</script>
