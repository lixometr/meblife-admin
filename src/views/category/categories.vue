<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/category/new')">
      Добавить категорию
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="categories" :fields="fields" hover>
        <template #edit="{item}">
          <td>
            <CButton color="warning" @click="$router.push('/category/'+item._id)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
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
          key: "edit",
        },
        {
          key: "name",
        },
        {
          key: "slug",
        },
        {
          key: "product_mask",
          label: "Маска"
        },
        {
          key: "image",
        },
        
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data: categories } = await this.$api.get("categories");
      this.categories = categories;
    } catch (err) {
      this.$error(err)
    }
    this.$loading.stop();
  },
};
</script>

<style lang="scss" >
</style>