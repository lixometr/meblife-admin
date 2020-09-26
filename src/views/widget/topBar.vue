<template>
  <div v-if="!$store.getters.isLoading">
   
    <CCard v-for="(el, idx) in item.values.items" :key="idx">
      <CCardHeader>Элемент {{idx + 1}}</CCardHeader>
      <CCardBody>
        <TInput
          class="mb-4"
          label="Заголовок"
          v-model="item.values.items[idx].title"
        />
        <TInput
          class="mb-4"
          label="Ссылка в кнопке"
          v-model="item.values.items[idx].url"
        />
        <EditImage
          label="Иконка"
          v-model="item.values.items[idx].icon.url"
        />
      </CCardBody>
    </CCard>
 
   
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import EditImage from "@/components/EditImage";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
import merge from "lodash.merge";
export default {
  data() {
    return {
      item: {
        values: {
          items: [
            {
              title: [],
              url: [],
              icon: {}
            },
            {
              title: [],
              url: [],
              icon: {}
            },
            {
              title: [],
              url: [],
              icon: {}
            },
            {
              title: [],
              url: [],
              icon: {}
            },
          ]
        }
      },
    };
  },

  components: {
    TInput,
    EditImage,
    ModuleGroupSelect,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "top_bar" }, this.item);
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "top_bar",
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