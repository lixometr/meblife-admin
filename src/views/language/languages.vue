<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="addItem">
      Добавить язык
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="languages" :fields="fields" hover>
        <template #edit="{item, index}">
          <td>
            <CButton color="danger" @click="deleteItem(index)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
            <CButton color="success" class="ml-2" @click="saveItem(index)" v-if="item.isChanged">
              <CIcon name="cil-save"></CIcon>
            </CButton>
          </td>
        </template>
        <template #name="{item, index}">
          <td>
            <CInput v-model="item.name" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #slug="{item, index}">
          <td>
            <CInput v-model="item.slug" @input="changeProp($event, index)" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";
export default {
  // mixins: [ItemsPage],
  data() {
    return {
      languages: [],
      fields: [
        {
          key: "edit",
          label: "Действия",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
      ],
    };
  },
  async created() {
    this.$loading.start();
    try {
      const { data } = await this.$api.get("languages");
      this.languages = data;
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    changeProp(newValue, index) {
      if (!this.languages[index]) this.languages[index] = {};
      this.$set(this.languages[index], "isChanged", true);
    },
    async addItem() {
      try {
        const { data: response } = await this.$api.post("languages");
        this.languages.push(response);
      } catch (err) {
        this.$error(err);
      }
    },
    async saveItem(index) {
      try {
        const item = this.languages[index];
        const { data: response } = await this.$api.put(
          "languageById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
        this.$set(this.languages[index], "isChanged", false);
      } catch (err) {
        this.$error(err);
      }
    },
    async deleteItem(index) {
      try {
        const item = this.languages[index];
        const { data: response } = await this.$api.delete(
          "languageById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.languages.splice(index, 1);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>