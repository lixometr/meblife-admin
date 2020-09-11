<template>
  <div  class="modal-attr-value" :adaptive="true" width="100%" height="100%">
    <CContainer class="position-relative" >
      <CButton color="danger " class="modal-close" @click="close">
        <span>&times;</span>
      </CButton>
      <div class="content">
      <h3 class="text-center">{{title}}</h3>

        <CCard>
          <CCardBody>
            <slot name="default"></slot>
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
    value: Object,
    title: String
  },
  data() {
    return {
      item: this.value,
      isLoading: false,
    };
  },
  components: {
    TInput,
    AttributeSelect,
  },
  computed: {},

  methods: {
    // async fetch() {
    //   this.isLoading = true;
    //   try {
    //     if (this.new) {
    //     } else {
    //       this.item = await this.get();
    //     }
    //   } catch (err) {
    //     this.$error(err)
    //   }
    //   this.isLoading = false;
    // },
    // async save() {
    //   if (this.isSaving) return;
    //   this.isSaving = true;
    //   try {
    //     if (this.new) {
    //       const result = await this.create(this.item);

    //       console.log(result);
    //     } else {
    //       await this.put(this.item)
    //     }
    //   } catch (err) {
    //     this.$error(err)
    //   }
    //   this.isSaving = false;
    // },
    close() {
      this.$emit("close");
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-top: 100px;
}
</style>