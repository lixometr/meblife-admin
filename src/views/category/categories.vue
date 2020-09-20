<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push({name: 'CategoryNew'})">
      Добавить категорию
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="categories" :fields="fields" border outlined striped>
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton color="warning" @click="$router.push({name: 'Category', params: {id: item._id}})">
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
    </CCardBody>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      fields: [
        {
          key: "name",
        },
        {
          key: "slug",
        },
        {
          key: "product_mask",
          label: "Маска",
        },
        {
          key: "image",
        },
        {
          key: "edit",
          label: "Действия",
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
        const { data: categories } = await this.$api.get("categories");
        this.categories = categories;
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete(
          "categoryById",
          {
            id,
          }
        );
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