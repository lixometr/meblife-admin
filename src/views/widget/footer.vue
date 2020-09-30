<template>
  <div v-if="!$store.getters.isLoading">
    <CCard v-for="(cItem, idx) in items" :key="idx">
      <CCardHeader>Блок {{ idx + 1 }}</CCardHeader>
      <CCardBody>
        <!-- <component
          :is="item.c"
          v-bind="item.cProps || {}"
          class="mb-4"
          label="Заголовок"
          v-model="item.v"
        /> -->
        <FooterComponent
          :v="cItem.v"
          :c="cItem.c"
          :changeValue.sync="item"
          :label="cItem.label"
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
import FooterComponent from "@/components/FooterEdit/FooterComponent";
export default {
  data() {
    return {
      item: {
        values: {
          block1: {
            title: [],
            items: []
          },
        },
      },
    };
  },

  components: {
    TInput,
    EditImage,
    ModuleGroupSelect,
    FooterComponent,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {
    items() {
      return [
        {
          c: "TInput",
          v: "values.block1.title",
          label: "Заголовок",
        },
        {
          c: "FooterMultiplyer",
          items: [
            {
              v: "title",
              c: "TInput",
              label: "Заголовок"
            },
            {
              v: "image",
              c: "EditImage",
              label: "Картинка"

            },
          ],
          v: 'values.block1.items',
        },
      ];
    },
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "footer" }, this.item);
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "footer",
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