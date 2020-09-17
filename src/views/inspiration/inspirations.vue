<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/inspiration/new')">
      Добавить вдохновение
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="inspirations" :fields="fields" border outlined striped>
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton color="warning" @click="$router.push('/inspiration/'+item._id)">
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
      inspirations: [],
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
          label: "Изображение",
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
        const { data: inspirations } = await this.$api.get("inspirations");
        this.inspirations = inspirations;
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async removeItem(id) {
      try {
        const { data: attributes } = await this.$api.delete("inspirationById", {
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