<template>
  <Modal title="Редактировать изображение модуля" @close="$emit('close')">
    <template>
      <CCard>
        <CCardHeader>Редактировать изображение модуля</CCardHeader>
        <CCardBody>
          <EditImage label="Изображение" v-model="thisItem.image.url" />
          <TInput class="mb-4" label="Заголовок" v-model="thisItem.title" />
          <TInput class="mb-4" label="Подзаголовок" v-model="thisItem.sub_title" />
          <TTextArea class="mb-4" label="Описание" v-model="thisItem.description" />
          <TInput class="mb-4" label="Текст в кнопке" v-model="thisItem.more_btn" />
          <TInput class="mb-4" label="Url в кнопке" v-model="thisItem.more_btn_url" />
        </CCardBody>
      </CCard>
    </template>
    <template #footer>
      <div class="d-flex justify-content-end pb-4">
        <CButton color="secondary" class="mr-2" @click="cancel">Отмена</CButton>
        <CButton color="success" class @click="save">Сохранить</CButton>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import EditImage from "@/components/EditImage";
import TTextArea from "@/components/TTextArea";
import { cloneDeep } from "lodash";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    change: Function,
    isNew: Boolean,
  },
  data() {
    const defautItem = {
      image: {},
      title: [],
      sub_title: [],
      description: [],
      more_btn: [],
      more_btn_url: [],
    };
    let item = cloneDeep(this.item);
    item = { ...defautItem, ...item };

    return {
      thisItem: item,
    };
  },
  components: {
    Modal,
    EditImage,
    TTextArea,
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    save() {
      this.change(this.thisItem, this.isNew);
      this.$emit("close");
    },
  },
  watch: {
    thisItem: {
      deep: true,
      handler() {},
    },
    item() {
      this.thisItem = this.item;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>