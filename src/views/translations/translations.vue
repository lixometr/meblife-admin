<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <h6>Выберите перевод</h6>
        <v-select
          :multiple="false"
          :style="{ minWidth: '200px' }"
          :options="options"
          v-model="activeLanguage"
          :reduce="(item) => item.slug"
          label="name"
        ></v-select>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <TranslationItem v-for="(value, name) in translation" :key="name" :name="name" v-model="translation[name]"/>
      </CCardBody>
    </CCard>
    <BtnSave @click="save"/>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";
import TranslationFields from "./fields"
import merge from "lodash.merge"
export default {
  mixins: [ItemsPage],
  data() {
    return {
      activeLanguage: "",
      translation: {},
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
  components: {
    TranslationItem: () => import("@/components/Translation/TranslationItem"),
  },
  computed: {
    options() {
      return this.$store.getters["language/languages"];
    },
  },
  methods: {
    async save() {
      try {
        const {data} = await this.$api.put('language', {slug: this.activeLanguage}, this.translation)
        console.log(data)
        if(data.ok) {
          this.$notify({
            type: "success",
            group: "main",
            title: "Сохранено!"
          })
        }
      } catch(err) {
        this.$error(err)
      }
    },
    async fetchItems() {
      try {
        if (!this.activeLanguage) return;
        const { data } = await this.$api.get("language", {
          slug: this.activeLanguage,
        });
        const items = merge({}, TranslationFields, data)
        this.translation = items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    activeLanguage() {
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
</style>