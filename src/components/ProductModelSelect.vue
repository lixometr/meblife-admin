<template>
  <SearchSelect
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
    :multiple="multiple"
    :findItem="findItem"
    :searchItem="searchItem"
    :required="required"
  >
    <template v-slot:selected-option="option">
      <div class="selected d-center">
        <span v-for="parent in option.parents" :key="parent._id">{{parent.name}} -></span>
        {{ option.name }}
      </div>
    </template>
  </SearchSelect>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [String, Array],
    multiple: {
      type: Boolean,
      default: false,
    },
    label: String,
    required: Boolean
  },
  components: {
    SearchSelect,
  },
  data() {
    return {};
  },

  methods: {
    async findItem(id) {
      const { data: productModel } = await this.$api.get("productModelById", { id });
     
      return { ...productModel };
    },
    async searchItem(text, options) {
      const { data: productModels } = await this.$api.get("productModelsSearch", {text}, {params: options});
      return productModels
    },
  },
};
</script>

<style lang="scss">
</style>