<template>
  <div class="module-image-editor">
    <CRow class="border-top border-bottom border-right">
      <CCol class="border-left p-2" col="5">
        <b>Название</b>
      </CCol>
      <CCol class="border-left border-right p-2" col="4">
        <b>Картинка</b>
      </CCol>
      <CCol col="3"></CCol>
    </CRow>
    <draggable :value="items" @input="onChangeImages" ghostClass="ghost">
      <CRow
        class="border-bottom border-left border-right cursor-pointer"
        v-for="(item, idx) in translatedItems"
        :key="item._id"
      >
        <CCol class="p-2" col="5">{{item.title}}</CCol>
        <CCol class="border-left border-right p-2" col="4">
          <CImg :src="item.image.url" width="150px" />
        </CCol>
        <CCol class="p-2" col="3">
          <div class="d-flex justify-content-end">
            <CButton class="move mr-1">
              <CIcon name="cil-cursor-move"></CIcon>
            </CButton>
            <CButton color="warning" @click="editImageItem(idx)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="deleteImageItem(idx)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </CCol>
      </CRow>
    </draggable>
    <div class="d-flex justify-content-end mt-4">
      <CButton color="warning" @click="addImageItem">Добавить изображение</CButton>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ModuleImageModal from "@/components/Modals/ModuleImageModal";

export default {
  props: {
    moduleNumber: String,
    value: {
      type: Array,
      default: () => [],
    },
    translatedItems: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    draggable,
    ModuleImageModal,
  },
  data() {
    return {
      itemIdx: undefined,
    };
  },
  computed: {
    items() {
      return this.value;
    },
  },
  methods: {
    onChangeImages(newValue) {
      this.$emit("input", newValue);
    },
    onItemChange(value, isNew) {
      const newValue = [...this.items];
      if (isNew) {
        console.log("is new", value);
        newValue.push(value);
      } else {
        newValue[this.itemIdx] = value;
      }
      this.$emit("input", newValue);
      this.$emit("save");
    },
    editImageItem(idx) {
      this.itemIdx = idx;
      const item = this.items[idx];
      this.openImageModal(item, false);
    },
    openImageModal(item, isNew) {
      this.$modal.show(
        ModuleImageModal,
        {
          item,
          change: this.onItemChange,
          isNew,
          moduleNumber: this.moduleNumber
        },
        {
          width: "100%",
          height: "100%",
        }
      );
    },
    deleteImageItem(idx) {
      const newValue = [...this.items];
      newValue.splice(idx, 1);
      this.$emit("input", newValue);
    },
    addImageItem() {
      this.openImageModal(undefined, true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>