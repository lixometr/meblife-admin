<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>
        Поиск
      </CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>
    <CButton color="primary" @click="$router.push('/module-group/new')">
      Добавить группу модулей
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CDataTable class="mt-3" :items="moduleGroups" :fields="fields" border outlined striped>
      <template #edit="{item}">
        <td>
          <div class="d-flex">
            <CButton color="warning" @click="$router.push('/module-group/'+item._id)">
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
export default {
  data() {
    return {
      searchPhrase: "",
      moduleGroups: [],
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
  async created() {
    this.$loading.start();
    await this.fetchItems();
    this.$loading.stop();
  },
  methods: {
    async fetchItems() {
      try {
        let moduleGroups = [];
        if (this.searchPhrase) {
          const { data: items } = await this.$api.get("moduleGroupsSearch", {
            text: this.searchPhrase,
          });
          moduleGroups = items;
        } else {
          const { data: items } = await this.$api.get("moduleGroups");
          moduleGroups = items;
        }

        this.moduleGroups = moduleGroups;
      } catch (err) {
        this.$error(err);
      }
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete("moduleGroupById", {
          id,
        });
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.fetchItems();
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    searchPhrase() {
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
</style>