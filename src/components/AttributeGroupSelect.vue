<template>
  <div>
    <SearchSelect
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
    >
      <template #list-footer>
        <CButton
          class="w-100 mt-2"
          variant="outline"
          color="primary"
          @click="addGroup"
        >Добавить группу</CButton>
      </template>
    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
// import AttributeGroupModal from "@/components/AttributeGroupModal";
export default {
  props: {
    value: [String, Array],
    label: String,
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    addGroup() {
      this.$modal.show(
        AttributeGroupModal,
        {},
        { width: "100%", height: "100%" }
      );
    },
    async findItem(id) {
      const { data: item } = await this.$api.get("attributeGroupById", { id });
      return item;
    },
    async searchItem(text) {
      const { data: items } = await this.$api.get("attributeGroups");
      return items.filter(
        (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    },
  },
};
</script>

<style lang="scss">
</style>