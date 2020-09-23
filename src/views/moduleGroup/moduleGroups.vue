<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>
    <CButton color="primary" @click="$router.push({name: 'ModuleGroupNew'})">
      Добавить группу модулей
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CPagination align="end" :pages="info.totalPages" :activePage.sync="activePage" />
    <CDataTable class="mt-3" :items="items" :fields="fields" border outlined striped>
      <template #edit="{item}">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({name: 'ModuleGroup', params: {id: item._id}})"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>

      <template #cnt="{item}">
        <td>
          <b>{{item.modules.length}}</b>
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
      fetchRoute: 'moduleGroupsSearch',
      removeRoute: 'moduleGroupById',
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "cnt",
          label: "Кол-во модулей",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {
   
   
  },
  watch: {
   
  },
};
</script>

<style lang="scss" >
</style>