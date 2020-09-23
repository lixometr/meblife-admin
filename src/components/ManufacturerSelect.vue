<template>
  <div>
    <SearchSelect
      :required="required"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
      :inputClass="inputClass"
    ></SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [Array, String],
    label: String,
    required: Boolean,
    inputClass: [String, Array,Object],
    multiple: Boolean,
  },

  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("manufacturerById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data } = await this.$api.get("manufacturersSearch", {
        text,
      }, {
        params: options
      });
      return data;
    },
  },
};
</script>

<style lang="scss">
</style>