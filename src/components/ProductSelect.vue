<template>
  <div>
    <SearchSelect :label="label" :value="value" @input="$emit('input', $event)" :multiple="multiple" :findItem="findItem" :searchItem="searchItem">

    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [String, Array],
    label: String,
    multiple: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("productById", { id });
      return item;
    },
    async searchItem(text) {
        const {data: items} = await this.$api.get('products')

        return items.filter(item => item.name.indexOf(text) > -1)
    },
  },
};
</script>

<style lang="scss">
</style>