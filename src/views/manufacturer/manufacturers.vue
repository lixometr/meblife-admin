<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="$router.push('/manufacturer/new')">
      Добавить производителя
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="manufacturers" :fields="fields" hover>
        <template #edit="{item}">
          <td>
            <CButton color="warning" @click="$router.push('/manufacturer/'+item._id)">
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
      manufacturers: [],
      fields: [
        {
          key: "edit",
        },
        {
          key: "name",
          label: "Название"
        },
        {
          key: "slug",
        },
        {
          key: "image",
          label: "Картинка"
        },
       
        
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data: manufacturers } = await this.$api.get("manufacturers");
      this.manufacturers = manufacturers;
    } catch (err) {
      this.$error(err)
    }
    this.$loading.stop();
  },
};
</script>

<style lang="scss" >
</style>