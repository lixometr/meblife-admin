<template>
  <CRow alignVertical="center">
    <CCol class="col-form-label" lg="2" v-if="label">
      {{label}}
    </CCol>
    <CCol :lg="label ? 10 : 12">
      <v-select
        :multiple="multiple"
        :value="selectValues"
        @input="onChange"
        :options="options"
        @search="onSearch"
        :filterable="false"
        :label="keyField"
      >
        <template slot="no-options">Напишите чтобы начать поиск</template>
        <template v-slot:option="option">
          <slot name="option" v-bind="option">
            <div class="d-center">{{ option.name }}</div>
          </slot>
        </template>
        <template v-slot:selected-option="option">
          <slot name="selected-option" v-bind="option">
            <div class="selected d-center">{{ option.name }}</div>
          </slot>
        </template>
      </v-select>
    </CCol>
  </CRow>
</template>

<script>
export default {
  props: {
    // [ 'id' ]
    value: [String, Array],
    multiple: {
      type: Boolean,
      default: true,
    },
    findItem: Function,
    searchItem: Function,
    label: String,
    keyField: {
      type: String,
      default: '_id'
    }
  },
  data() {
    return {
      options: [],
      selectValues: [],
    };
  },
  created() {
    this.loadItems();
  },
  computed: {},
  methods: {
    async onSearch(text, loading) {
      loading(true);
      this.options = await this.searchItem(text);
      loading(false);
    },
    onChange(value) {
      let values;
      if (!value) return this.$emit("input", null);
      if (this.multiple) {
        values = value.map((val) => val._id);
      } else {
        values = value._id;
      }
      this.$emit("input", values);
    },
    async loadItems() {
      if (!this.value) return;

      if (this.multiple) {
        const resolvers = this.value.map(this.findItem);
        const items = await Promise.all(resolvers);
        this.selectValues = items;
      } else {
        const item = await this.findItem(this.value);
        this.selectValues = item;
      }
    },
  },
  watch: {
    async value(val) {
      await this.loadItems();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>