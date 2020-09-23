<template>
  <div v-if="!$store.getters.isLoading">
    <BtnAdd @click="$router.push({name: 'LookNew'})">Добавить образ</BtnAdd>
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CDataTable :items="items" :fields="fields" border outlined striped>
      <template #edit="{item}">
        <td>
          <div class="d-flex">
            <CButton color="warning" @click="$router.push({name: 'Look', params: {id: item._id}})">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>

      <template #products="{item}">
        <td>
          <span
            class="d-block"
            v-for="product in item.products"
            :key="product._id"
          >{{product.full_name}}</span>
        </td>
      </template>
      <template #image="{item}">
        <td>
          <CImg width="150px" :src="item.image && item.image.url" />
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      fetchRoute: "looks",
      removeRoute: "lookById",
      fields: [
        {
          key: "image",
          label: "Картинка",
        },
        {
          key: "products",
          label: "Продукты",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>