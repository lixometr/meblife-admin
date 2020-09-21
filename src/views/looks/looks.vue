<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push({name: 'LookNew'})">
      Добавить образ
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="looks" :fields="fields" border outlined striped>
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
  async created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      this.$loading.start();
      try {
        const { data: looks } = await this.$api.get("looks");
        this.looks = looks;
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete("lookById", {
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