<template>
  <div class="image-modal p-3" v-if="value">
    <CButton class="image-modal-close" color="danger" size="sm" @click="close"><span>&times;</span></CButton>
    <CCard>
      <CCardBody class="pt-5">
        <CRow class="mb-3" alignHorizontal="center">
          <CCol :lg="{size: 4, }">
            <ImageUpload  v-model="imageModel" />
          </CCol>
        </CRow>
        <CRow alignHorizontal="center">
          <CCol :lg="{size: 6, }">
            <div class="mb-3">
              <span class="d-block mb-1">По умолчанию</span>
              <CSwitch
                variant="3d"
                color="primary"
                :checked="isDefault"
                @update:checked="changeDefault"
              />
            </div>
            <div class="mb-3">
              <span class="d-block mb-1">Feature</span>
              <CSwitch
                variant="3d"
                color="primary"
                :checked="isFeature"
                @update:checked="changeFeature"
              />
            </div>
            <div>
              <span class="d-block mb-1">Size</span>
              <CSwitch variant="3d" color="primary" :checked="isSize" @update:checked="changeSize" />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    value: Boolean,
    item: Object,
    isDefault: Boolean,
    isSize: Boolean,
    isFeature: Boolean,
  },
  components: {
    ImageUpload,
  },
  computed: {
    imageUrl() {
      return this.item.url;
    },
    itemOpts() {
      return {
        isDefault: this.isDefault,
        isSize: this.isSize,
        isFeature: this.isFeature,
        item: this.item,
      };
    },
    imageModel: {
      get() {
        return this.imageUrl;
      },
      set(url) {
        const item = { ...this.item, url };
        const newValue = { item };
        this.$emit("change", newValue);
      },
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },

    changeDefault(isDefault) {
      const newValue = { item: this.item, isDefault };
      this.$emit("change", newValue);
    },
    changeSize(isSize) {
      const newValue = { item: this.item, isSize };
      this.$emit("change", newValue);
    },
    changeFeature(isFeature) {
      const newValue = { item: this.item, isFeature };
      this.$emit("change", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
  overflow: auto;
  .image-modal-close {
      position: absolute;
      font-size: 40px;
      right: 10px;
      top: 10px;
      z-index: 30;
      width: 40px;
      height: 40px;
      line-height: 0;
      padding: 0;
      span {
          display: block;
          transform: translateY(-3px);
      }
  }
}

</style>