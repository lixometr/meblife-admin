<template>
  <Label :label="label" :canFull="true" :required="required">
    <v-select
      :class="inputClass"
      :multiple="multiple"
      :value="selectValues"
      @input="onChange"
      @open="onOpen"
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
      <template #list-footer>
        <slot name="list-footer"></slot>
      </template>
    </v-select>
  </Label>
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
      default: "_id",
    },
    inputClass: [String,Array,Object],
    required: Boolean
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
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  methods: {
    async onSearch(text, loading) {
      loading(true);
      this.options = await this.searchItem(text);
      loading(false);
    },
    async onOpen() {
      this.options = await this.searchItem("");
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
      try {
        if (this.multiple) {
          const resolvers = this.value.map(this.findItem);
          const items = await Promise.all(resolvers);
          this.selectValues = items;
        } else {
          const item = await this.findItem(this.value);
          this.selectValues = item;
        }
      } catch (err) {
        this.$error(err);
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