<template>
  <div>
    <draggable :value="items" @input="onDragChange">
      <ProductImagesItem
        v-for="(item, idx) in items"
        :key="item._id"
        :url="item.url"
        :idx="idx + 1"
        :isFeature="isFeature(item)"
        :isDefault="isDefault(item)"
        :isSize="isSize(item)"
        @delete="itemDelete(item)"
        @edit="itemEdit(item, idx)"
      />
    </draggable>
    <CButton color="warning" @click="add" class="float-right mt-4">
      Добавить изображение
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <!-- <ProductImageModal
      :item="modalItem"
      :isFeature="isFeature(modalItem)"
      :isDefault="isDefault(modalItem)"
      :isSize="isSize(modalItem)"
      @change="modalItemChange"
    
    />-->
  </div>
</template>

<script>
import ProductImagesItem from "./ProductImagesItem";
import ProductImageModal from "./Modal";
import draggable from "vuedraggable";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    images: Array,
    featureImages: {
      type: Array,
      default: () => [],
    },
    productImages: {
      type: Array,
      default: () => [],
    },
    defaultImage: {
      type: Object,
      default: () => ({}),
    },
    sizeImage: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ProductImagesItem,
    draggable,
    ProductImageModal,
  },
  beforeMount() {
    console.log(this.featureImages);
  },
  data() {
    return {
      modalItemIdx: undefined,
    };
  },
  computed: {
    items() {
      let images = [...this.productImages, ...this.featureImages];
      if (this.sizeImage && this.sizeImage.url) {
        images.push(this.sizeImage);
      }
      if (this.defaultImage && this.defaultImage.url) {
        images.push(this.defaultImage);
      }
      images = images.filter((image, index) => {
        return images.findIndex((img) => img.url === image.url) === index;
      });

      return images;
    },
    modalItem() {
      return this.items[this.modalItemIdx] || {};
    },
  },
  methods: {
    onApply() {},
    onCancel() {},
    isDefault(image) {
      if (!image.url || !this.defaultImage.url) return false;

      return this.defaultImage.url === image.url;
    },
    isSize(image) {
      if (!image.url || !this.sizeImage.url) return false;
      return this.sizeImage.url === image.url;
    },
    isFeature(image) {
      if (!image.url || !this.featureImages) return false;
      return this.featureImages.findIndex((img) => img.url === image.url) >= 0;
    },
    isProductImage(image) {
      if (!image.url || !this.productImages) return false;
      return this.productImages.findIndex((img) => img.url === image.url) >= 0;
    },
    add() {
      const newItem = {
        url: "",
      };
      const newValue = [...this.items, newItem];
      this.$emit("productImages", newValue);
    },
    /**
     * @param {Object} value {isDefault: Boolean, isSize: Boolean, isFeature: Boolean, item: {url: ""}}
     */
    modalItemChange(value) {
      console.log("a", value);
      if (value.isDefault === true) {
        this.$emit("defaultImage", value.item);
      } else if (value.isDefault === false) {
        this.$emit("defaultImage", {});
      }
      if (value.isFeature === true) {
        const newValue = [...this.featureImages, value.item];
        this.$emit("featureImages", newValue);
      } else if (value.isFeature === false) {
        this.$emit(
          "featureImages",
          this.featureImages.filter((img) => img.url !== value.item.url)
        );
      }
      if (value.isSize === true) {
        this.$emit("sizeImage", value.item);
      } else if (value.isSize === false) {
        this.$emit("sizeImage", {});
      }
      const newValue = [...this.items];

      newValue[this.modalItemIdx] = value.item;
      this.$emit("productImages", newValue);
    },
    itemDelete(item) {
      if (this.isDefault(item)) {
        this.$emit("defaultImage", {});
      }
      if (this.isFeature(item)) {
        this.$emit(
          "featureImages",
          this.featureImages.filter((img) => img.url !== item.url)
        );
      }
      if (this.isSize(item)) {
        this.$emit("sizeImage", {});
      }

      this.$emit(
        "productImages",
        this.productImages.filter((img) => img.url !== item.url)
      );
    },
    openModal() {
      this.$modal.show(ProductImageModal, {
        item: this.modalItem,
        isFeature: this.isFeature(this.modalItem),
        isDefault: this.isDefault(this.modalItem),
        isSize: this.isSize(this.modalItem),
        change: this.modalItemChange,
      }, {
        width: '100%',
        height: '100%'
      });
    },
    itemEdit(item, idx) {
      this.modalItemIdx = idx;
      this.openModal()
    },
    onDragChange(value) {
      this.$emit("productImages", value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>