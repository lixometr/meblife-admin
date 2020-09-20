<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push({name: 'PageNew'})">
      Добавить страницу
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="pages" :fields="fields" border outlined striped>
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton color="warning" @click="$router.push({name: 'Page', params: {id: item._id}})">
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
              <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
            </div>
          </td>
        </template>

        <template #header_image="{item}">
          <td>
            <CImg :src="item.header_image.url" width="150px" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      fields: [
        
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
        {
          key: "header_image",
          label: "Картинка",
        },
        {
          key: "edit",
          label: "Действия"
        },
      ],
    };
  },
  async created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      this.$loading.start();
      try {
        const { data: pages } = await this.$api.get("pages");
        this.pages = pages;
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete("pageById", {
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
};
</script>

<style lang="scss" >
</style>