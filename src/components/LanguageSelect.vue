<template>
  <div>
    <v-select
      :multiple="true"
      :style="{minWidth: '200px'}"
      :options="options"
      v-model="activeLang"
      label="name"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeLang: {
      get() {
        return this.$store.getters["language/activeLanguages"];
      },
      set(val) {
        this.$store.commit(
          "language/setActiveLanguages",
          val.map((v) => v._id)
        );
      },
    },
    options() {
      return this.$store.getters["language/languages"];
    },
  },

};
</script>

<style lang="scss" scoped>
</style>