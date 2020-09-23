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
    multiple: {
      type: Boolean,
      default: true
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("moduleGroupById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data: items } = await this.$api.get("moduleGroupsSearch", {
        text,
      }, {params: options});
      return items;
    },
  },
};
</script>

<style lang="scss">
</style>