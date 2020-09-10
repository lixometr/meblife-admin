<template>
  <div>
    <SearchSelect :label="label" :value="value" @input="$emit('input', $event)" :multiple="false" :findItem="findItem" :searchItem="searchItem">

    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: String,
    label: String
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
        const {data: items} = await this.$api.get('manufacturers')
        return items
    },
  },
};
</script>

<style lang="scss">
</style>