<template>
  <div name="modal-attr-value" class="modal-attr-value" :adaptive="true" width="100%" height="100%">
    <CContainer class="position-relative" v-if="!isLoading">
      <h3 class="text-center">{{title}}</h3>
      <CButton color="danger " class="modal-close" @click="close">
        <span>&times;</span>
      </CButton>
      <div class="content">
        <CCard>
          <CCardBody>
            <slot name="default" :item="item"></slot>
          </CCardBody>
        </CCard>
      </div>
    </CContainer>
  </div>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import TInput from "@/components/TInput";
export default {
  props: {
    create: Function,
    put: Function,
    get: Function,
  },
  data() {
    return {
      item: {},
      isLoading: false,
    };
  },
  components: {
    TInput,
    AttributeSelect,
  },
  computed: {},
  async created() {
    // await this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      try {
        if (this.new) {
        } else {
          this.item = await this.get();
        }
      } catch (err) {
        this.$error(err)
      }
      this.isLoading = false;
    },
    async save() {
      if (this.isSaving) return;
      this.isSaving = true;
      try {
        if (this.new) {
          const result = await this.create(this.item);

          console.log(result);
        } else {
          await this.put(this.item)
        }
      } catch (err) {
        this.$error(err)
      }
      this.isSaving = false;
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    async id() {
      await this.fetch();
    },
    attributeId() {
      this.attributeValue.attributeId = this.attributeId;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>