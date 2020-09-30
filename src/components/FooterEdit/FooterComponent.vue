<template>
  <div>
    <component :is="c" v-bind="attrs" v-on="listeners"></component>
  </div>
</template>

<script>
import _ from "lodash";
import TInput from "@/components/TInput";
import EditImage from "@/components/EditImage";
import FooterMultiplyer from "@/components/FooterEdit/FooterMultiplyer";

export default {
  props: {
    changeValue: null,
    c: String,
    v: String,
    label: String
  },
  components: {
      FooterMultiplyer,
      TInput,
      EditImage
  },
  computed: {
    cValue() {
      return _.get(this.changeValue, this.v);
    },
    attrs() {
      return {
        ...this.$attrs,
        label: this.label,
        value: this.cValue,
        c: this.c,
        v: this.v,
        changeValue: this.changeValue
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (value) => {
            this.onChangeValue(value)
        }
      };
    },
  },
  methods: {
    onChangeValue(val) {
      let newValue = val;
      const clonedValue = _.cloneDeep(this.changeValue)
      newValue = _.set(clonedValue, this.v, newValue)
      this.$emit("update:changeValue", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>