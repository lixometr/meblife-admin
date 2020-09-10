<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/attribute/new')">
      Добавить атрибут
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="attributes" :fields="fields" hover>
        <template #edit="{item}">
          <td>
            <CButton color="warning" @click="$router.push('/attribute/'+item._id)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
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
      attributes: [],
      fields: [
        {
          key: "edit",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
        {
          key: "attribute_type",
        },
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data: attributes } = await this.$api.get("attributes");
      this.attributes = attributes;
    } catch (err) {
      console.log(err);
    }
    this.$loading.stop();
  },
};
</script>

<style lang="scss" >
</style>