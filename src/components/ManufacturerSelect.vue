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
    async searchItem(text) {
      const { data: items } = await this.$api.get("manufacturersSearch", {
        text,
      });
      return items;
    },
  },
};
</script>

<style lang="scss">
</style>