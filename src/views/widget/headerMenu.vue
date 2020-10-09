<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <CategorySelect label="Категории" v-model="item.values.items" />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import EditImage from "@/components/EditImage";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
import CategorySelect from "@/components/CategorySelect";
import merge from "lodash.merge";
export default {
  data() {
    return {
      item: {
        values: {
          items: [],
        },
      },
    };
  },

  components: {
    TInput,
    EditImage,
    ModuleGroupSelect,
    CategorySelect
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "header_menu" }, this.item);
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "header_menu",
        });
        this.item = merge({}, this.item, data);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>