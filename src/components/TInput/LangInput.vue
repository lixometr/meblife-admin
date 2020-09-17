<template>
  <CInput  :prepend="prefix" v-model="inputValue" />
</template>

<script>
export default {
  props: {
    //   {value: "", langId: '' }
    value: Object,
  },
  computed: {

    prefix() {
        const lang = this.$store.getters['language/getLanguage'](this.value.langId)
        return lang.slug
    },
    inputValue: {
      get() {
        return this.value.value;
      },
      set(val) {
        this.$emit("input", { ...this.value, value: val });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>