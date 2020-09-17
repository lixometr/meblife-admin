<template>
  <div class="py-2 border px-4">
    <CRow alignVertical="center">
      <b class="font-bold mr-2 ">
        <CBadge class="bg-black text-white mr-1">{{idx}}</CBadge><span class="font-xs">Изображение продукта</span>
      </b>
      <div class="image-wrapper p-2 rounded">
        <CImg :src="url" />
      </div>
      <div>
        <div  class="ml-2 font-md" v-if="isDefault">По умолчанию</div>
        <div  class="ml-2 font-md" v-if="isFeature">Feature</div>
        <div  class="ml-2 font-md" v-if="isSize">Размер</div>
      </div>
      <div class="actions ml-auto">
        <CButton class="move mr-1">
          <CIcon name="cil-cursor-move"></CIcon>
        </CButton>
        <CButton color="warning mr-1" class="edit" @click="onEdit">
          <CIcon name="cil-pencil"></CIcon>
        </CButton>
        <CButton color="danger" class="delete" @click="onDelete">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </div>
    </CRow>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    idx: [String, Number],
    isFeature: Boolean,
    isDefault: Boolean,
    isSize: Boolean,
  },
  methods: {
    onEdit() {
      this.$emit("edit");
    },
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 100px;
  height: 100px;
  background-color: rgb(244, 244, 244);
  img {
    object-fit: contain;
    mix-blend-mode: darken;
    width: 100%;
    height: 100%;
  }
}
</style>