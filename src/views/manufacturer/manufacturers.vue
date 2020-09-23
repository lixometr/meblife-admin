<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>
    <BtnAdd color="primary" @click="$router.push({name: 'ManufacturerNew'})">
      Добавить производителя
    </BtnAdd>
    <AppPagination align="end" :activePage.sync="activePage" :pages="info.totalPages" />
    <CDataTable :items="items" :fields="fields" border outlined striped>
      <template #edit="{item}">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({name: 'Manufacturer', params: {id: item._id}})"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>

      <template #image="{item}">
        <td>
          <CImg :src="item.image.url" width="150px" />
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  data() {
    return {
      fetchRoute: "manufacturersSearch",
      removeRoute: "manufacturerById",
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
        {
          key: "image",
          label: "Картинка",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  mixins: [ItemsPage],

  methods: {},
  watch: {},
};
</script>

<style lang="scss" >
</style>