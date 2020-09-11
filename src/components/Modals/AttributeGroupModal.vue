<template>
  <Modal title="Группа атрибутов" @close="$emit('close')">
    <template>
      <TInput label="Название" v-model="item.name"></TInput>
      <CButton color="success" @click="save">Сохранить</CButton>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modals/Modal";
import TInput from "@/components/TInput";
export default {
  props: {
    new: Boolean,
    id: String,
  },
  components: {
    Modal,
    TInput,
  },
  data() {
    return {
      isNew: this.new,

      item: {
        name: [],
      },
    };
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get("attributeGroupByIdAdmin", {
            id: this.id,
          });
          this.item = data;
        }
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    async save() {
      if (this.isSaving) return;
      this.isSaving = true;
      try {
        if (this.isNew) {
          const { data } = await this.$api.post(
            "attributeGroups",
            null,
            this.item
          );
          this.$notify({
            group: "main",
            type: "success",
            text: "Сохранено!",
          });
          this.isNew = false;
        } else {
          const { data } = await this.$api.put(
            "attributeGroupById",
            { id: this.id },
            this.item
          );
          this.$notify({
            group: "main",

            type: "success",
            text: "Сохранено!",
          });
        }
      } catch (err) {
        this.$error(err);
      }
      this.isSaving = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>