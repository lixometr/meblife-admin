<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/product/new')">
      Добавить товар
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="products" :fields="fields" hover>
        <template #edit="{item}">
          <td>
            <CButton color="warning" @click="$router.push('/product/'+item._id)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
          </td>
        </template>
      
        <template #default_image="{item}">
          <td>
            <CImg :src="item.default_image.url" width="150px" />
          </td>
        </template>
        <template #manufacturer="{item}">
          <td>{{item.manufacturer.name}}</td>
        </template>
        <template #old_price="{item}">
          <td>{{item.old_price}}</td>
        </template>
        <template #primary_category="{item}">
          <td>{{item.primary_category.name}}</td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      fields: [
        {
          key: "edit",
          label: "edit",
        },
        {
          key: "name",
        },
        {
          key: "slug",
        },
        {
          key: "default_image",
        },
        {
          key: "price",
        },
        {
          key: "old_price",
        },
        {
          key: "primary_category",
        },
        {
          key: "manufacturer",
        },
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data: products } = await this.$api.get("products");
      this.products = products;
    } catch (err) {
      console.log(err);
    }
    this.$loading.stop();
  },
};
</script>

<style lang="scss" >
</style>