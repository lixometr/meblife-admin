<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="addItem">
      Добавить валюту
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="currencies" :fields="fields" hover>
        <template #edit="{item, index}">
          <td class="d-flex">
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
            <TInput v-model="item.name" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #slug="{item, index}">
          <td>
            <CInput v-model="item.slug" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #k="{item, index}">
          <td>
            <NInput v-model="item.k" :float="true" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #symbol="{item, index}">
          <td>
            <CInput v-model="item.symbol" @input="changeProp($event, index)" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import NInput from "@/components/NInput"
import TInput from "@/components/TInput"
export default {
  data() {
    return {
      currencies: [],
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
        {
          key: "k",
          label: "Коэффициент"
        },
        {
          key: "symbol",
          label: "Символ"
        },
      ],
    };
  },
  components: {
      NInput,
      TInput,
  },
  async created() {
    this.$loading.start();
    try {
      const { data: currencies } = await this.$api.get("currenciesAdmin");
      this.currencies = currencies;
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    changeProp(newValue, index) {
      if (!this.currencies[index]) this.currencies[index] = {};
      this.$set(this.currencies[index], "isChanged", true);
    },
    async addItem() {
      try {
        const { data: response } = await this.$api.post("currencies");
        this.currencies.push(response);
      } catch (err) {
        this.$error(err);
      }
    },
    async saveItem(index) {
      try {
        const item = this.currencies[index];
        const { data: response } = await this.$api.put(
          "currencyById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
        this.$set(this.currencies[index], "isChanged", false);
      } catch (err) {
        this.$error(err);
      }
    },
    async deleteItem(index) {
      try {
        const item = this.currencies[index];
        const { data: response } = await this.$api.delete(
          "currencyById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.currencies.splice(index, 1);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>