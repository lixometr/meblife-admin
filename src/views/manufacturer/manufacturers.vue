<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/manufacturer/new')">
      Добавить производителя
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="manufacturers" :fields="fields" border outlined striped>
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton color="warning" @click="$router.push('/manufacturer/'+item._id)">
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
      manufacturers: [],
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
        const { data: manufacturers } = await this.$api.get("manufacturers");
        this.manufacturers = manufacturers;
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete("manufacturerById", {
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