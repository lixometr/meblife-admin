<template>
  <div v-if="!$store.getters.isLoading">
    <CCardBody>
      <div class="mb-3" v-for="(item, idx) in settings" :key="idx">
        <label for="#">{{item.name}}</label>
        <CInput v-if="item.type === 'input' || !item.type" v-model="values[item.slug]" />
        <v-select
          label="name"
          :options="item.value"
          v-model="values[item.slug]"
          :reduce="item => item._id"
          v-if="item.type === 'select'"
        ></v-select>
      </div>
      <CButton color="success" class="mt-2" @click="save()">
        Сохранить
        <CIcon name="cil-save"></CIcon>
      </CButton>
    </CCardBody>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          name: "Язык по умолчанию",
          slug: "language",
          type: "select",
          value: this.$store.getters["language/languages"],
        },
        {
          name: "Валюта по умолчанию",
          slug: "currency",
          type: "select",
          value: this.$store.getters['currency/currencies']
        },
      ],
      values: {},
    };
  },
  async created() {
    this.$loading.start();
    try {
      const resolvers = this.settings.map(async (setting) => {
        const { data: response } = await this.$api.get("settingByName", {
          name: setting.slug,
        });
        this.$set(this.values, setting.slug, response);
      });
      await Promise.all(resolvers);
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    async save(index) {
      try {
        const resolvers = this.settings.map(async (setting) => {
          await this.$api.put(
            "settingByName",
            {
              name: setting.slug,
            },
            {
              value: this.values[setting.slug],
            }
          );
        });
        await Promise.all(resolvers);
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>