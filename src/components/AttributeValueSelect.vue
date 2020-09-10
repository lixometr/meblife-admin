<template>
  <div>
    <SearchSelect :label="label" :value="value" @input="$emit('input', $event)" :multiple="true" :findItem="findItem" :searchItem="searchItem">

    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: Array,
    label: String,
    attributeId: [String, Number]
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("attributeValueById", { id });
      return item;
    },
    async searchItem(text) {
        const {data: items} = await this.$api.get('attributeByIdValues', {id: this.attributeId})
        return items
    },
  },
};
</script>

<style lang="scss">
</style>