<template>
  <div>
    <SearchSelect
      :label="label"
      :value="value"
      @input="onInput"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
      keyField="item"
    >
      <template v-slot:option="option">
        <slot name="option" v-bind="option">
          <div class="d-center" v-if="option.type === 'Product'">{{ option.item.full_name }}</div>
          <div class="d-center" v-else>{{ option.item.name }}</div>
        </slot>
      </template>
      <template v-slot:selected-option="option">
        <slot name="selected-option" v-bind="option">

          <div class="selected d-center" v-if="option.type === 'Product'">{{ option.item.full_name }}</div>
          <div class="selected d-center" v-else>{{ option.item.name }}</div>
        </slot>
      </template>
    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
import _ from "lodash";
export default {
  props: {
    //   [{type: "Type", item: 'itemId'}]
    value: [Array],
    label: String,
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SearchSelect,
  },
  data() {
    return {
      savedItems: [],
    };
  },
  methods: {
    /**
     * @param {Array} - newValue [{}, {}]
     */
    onInput(value) {
      let newValue = [...value];
      newValue = newValue.map((val) => {
        const savedItem = this.savedItems.find(
          (item) => item.item._id === val._id
        );
        return {
          type: savedItem.type,
          item: savedItem.item._id,
        };
      });
      newValue = newValue.filter(
        (val, index) => newValue.findIndex((v) => val.item === v.item) === index
      );

      this.$emit("input", newValue);
    },
    async findItem({ type, item: id }) {
      let item;
      if (type === "Product") {
        const { data: product } = await this.$api.get("productById", { id });
        item = product;
      }
      if (type === "Category") {
        const { data: category } = await this.$api.get("categoryById", { id });
        item = category;
      }
      return {
        item,
        type,
      };
    },
    async searchItem(text) {
      try {
        let { data: products } = await this.$api.get("productsSearch", {
          text,
        });
        let { data: categories } = await this.$api.get("categoriesSearch", {
          text,
        });
        products = products.map((item) => ({ type: "Product", item }));
        categories = categories.map((item) => ({ type: "Category", item }));
        const items = [...products, ...categories];
        this.savedItems = items;
        return items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>