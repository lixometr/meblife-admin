<template>
  <Label :label="label" :required="required">
    <LangInput
      v-for="(lang, idx) in languages"
      :key="idx"
      :value="langValue(lang._id)"
      @input="changeLanguage($event)"
    />
  </Label>
</template>

<script>
import { mapGetters } from "vuex";
import LangInput from "./LangInput";
export default {
  props: {
    label: String,
    /*
      [{value: '', langId: ''}]
    */
    value: Array,
    required: Boolean
  },
  components: {
    LangInput,
  },

  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
    languages() {
      return this.$store.getters["language/languages"];
    },
    langValue() {
      return (langId) => {
        return (
          this.value.find((val) => val.langId === langId) || {
            langId,
            value: "",
          }
        );
      };
    },
  },
  methods: {
    changeLanguage(val) {
      const newValue = [...this.value];
      const idx = this.value.findIndex((v) => v.langId === val.langId);
      if (idx < 0) {
        newValue.push(val);
      } else {
        newValue[idx] = val;
      }
      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="scss" >
</style>