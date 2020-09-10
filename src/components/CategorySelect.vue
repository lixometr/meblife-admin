<template>
  <SearchSelect
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
    :multiple="multiple"
    :findItem="findItem"
    :searchItem="searchItem"
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
    // [ 'cat_id' ]
    value: [String, Array],
    multiple: {
      type: Boolean,
      default: true,
    },
    label: String
  },
  components: {
    SearchSelect,
  },
  data() {
    return {};
  },

  methods: {
    async findItem(id) {
      const { data: category } = await this.$api.get("categoryById", { id });
      const { data: parents } = await this.$api.get("categoryParents", {
        slug: category.slug,
      });
      parents.pop();
      return { ...category, parents };
    },
    async searchItem(text) {
      const { data: categories } = await this.$api.get("categories");
      return categories.filter((category) => category.name.indexOf(text) >= 0);
    },
  },
};
</script>

<style lang="scss">
</style>