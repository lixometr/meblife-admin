<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/look/new')">
      Добавить образ
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="looks" :fields="fields" hover>
        <template #edit="{item}">
          <td>
            <CButton color="warning" @click="$router.push('/look/'+item._id)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
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
            <CImg width="300px" :src="item.image && item.image.url" />
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
      looks: [],
      fields: [
        {
          key: "edit",
          label: "Действия"
        },
        {
          key: "image",
          label: "Картинка",
        },
        {
          key: "products",
          label: "Продукты",
        },
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data: looks } = await this.$api.get("looks");
      this.looks = looks;
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
};
</script>

<style lang="scss" >
</style>