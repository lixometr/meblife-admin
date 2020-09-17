<template>
  <div class="image-modal" >
    <Modal title="Редактировать изоражение" @close="cancel">
      <template>
        <CCard>
          <CCardHeader>Настройки изображения</CCardHeader>
          <CCardBody class="pt-4">
            <CRow class="mb-3" alignHorizontal="center">
              <CCol :lg="{size: 6, }">
                <ImageUpload showInfo v-model="imageModel" />
              </CCol>
            </CRow>
            <CRow alignHorizontal="center">
              <CCol :lg="{size: 6, }">
                <Label class="mb-3" label="По умолчанию">
                  <toggle-button
                    :width="100"
                    color="#f9b115"
                    :sync="true"
                    :value="thisIsDefault"
                    @input="changeDefault"
                  />
                </Label>
                <Label class="mb-3" label="Feature">
                  <toggle-button
                    :width="100"
                    color="#f9b115"
                    :sync="true"
                    :value="thisIsFeature"
                    @input="changeFeature"
                  />
                </Label>

                <Label class="mb-3" label="Размер">
                  <toggle-button
                    :width="100"
                    color="#f9b115"
                    :value="thisIsSize"
                    :sync="true"
                    @input="changeSize"
                  />
                </Label>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </template>
      <template #footer>
        <div class="d-flex justify-content-end">
          <CButton class="mr-2" color="secondary" @click="cancel">Отменить</CButton>
          <CButton color="success" @click="save">Сохранить</CButton>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
import Modal from "@/components/Modals/Modal";

export default {
  props: {
    value: Boolean,
    item: Object,
    isDefault: Boolean,
    isSize: Boolean,
    isFeature: Boolean,
    change: Function
  },
  data() {
    return {
      thisIsDefault: this.isDefault,
      thisIsSize: this.isSize,
      thisIsFeature: this.isFeature,
      thisItem: this.item,
      changedFields: {},
    };
  },
  components: {
    ImageUpload,
    Modal,
  },
  computed: {
    imageUrl() {
      return this.thisItem.url;
    },

    imageModel: {
      get() {
        return this.imageUrl;
      },
      set(url) {
        const item = { ...this.item, url };
   
        this.thisItem = item;
        this.$set(this.changedFields, "item", true);

        // this.$emit("change", newValue);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      let newValue = { item: this.thisItem };
      Object.keys(this.changedFields).forEach((field) => {
        const fVal = this.changedFields[field];
        if (field === "isDefault") {
          newValue.isDefault = this.thisIsDefault;
        }
        if (field === "isSize") {
          newValue.isSize = this.thisIsSize;
        }
        if (field === "isFeature") {
          newValue.isFeature = this.thisIsFeature;
        }
      });
      this.change(newValue)
      this.close()
    },
    cancel() {
      this.thisIsDefault = undefined;
      this.thisIsSize = undefined;
      this.thisIsFeature = undefined;
      this.thisItem = {};
      this.changedFields = {};
      this.close();
    },
    changeDefault(isDefault) {
      this.thisIsDefault = isDefault;
      this.$set(this.changedFields, "isDefault", true);
      const newValue = { item: this.item, isDefault };
      // this.$emit("change", newValue);
    },
    changeSize(isSize) {
      this.thisIsSize = isSize;
      this.$set(this.changedFields, "isSize", true);

      const newValue = { item: this.item, isSize };
      // this.$emit("change", newValue);
    },
    changeFeature(isFeature) {
      this.thisIsFeature = isFeature;
      this.$set(this.changedFields, "isFeature", true);

      const newValue = { item: this.item, isFeature };
      // this.$emit("change", newValue);
    },
  },
  watch: {
    isDefault() {
      this.thisIsDefault = this.isDefault;
    },
    isSize() {
      this.thisIsSize = this.isSize;
    },
    isFeature() {
      this.thisIsFeature = this.isFeature;
    },
    item() {
      this.thisItem = this.item;
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