<template>
  <div name="modal-attr-value" class="modal-attr-value" :adaptive="true" width="100%" height="100%">
    <CContainer class="position-relative" v-if="!isLoading">
      <h3 class="text-center">Создать значение атрибута</h3>
      <CButton color="danger " class="modal-close" @click="close">
        <span>&times;</span>
      </CButton>
      <div class="content">
        <CCard>
          <CCardBody>
            <TInput label="Название" class="mb-4" v-model="attributeValue.name" />
            <TInput label="Slug" v-model="attributeValue.slug" />
            <CRow>
              <CCol lg="2">Атрибут</CCol>
              <CCol lg="8">
                <AttributeSelect :multiple="false" v-model="attributeValue.attributeId" />
              </CCol>
            </CRow>
            <CButton color="primary" class="mt-3" @click="save">Сохранить</CButton>
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
    //   attrId
    attributeId: String,
    // attrValueId
    id: String,
    new: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      attributeValue: {
        name: [],
        slug: [],
        attributeId: this.attributeId,
      },
      isLoading: false,
    };
  },
  components: {
    TInput,
    AttributeSelect,
  },
  computed: {},
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      try {
        if (this.new) {
          //   const { data: attrValue } = await this.$api.post("attributeValues", null, {
          //       attributeId: this.attributeId
          //   });
          //   this.attributeValue = attrValue;
        } else {
          const { data: attrValue } = await this.$api.get(
            "attributeValueByIdAdmin",
            {
              id: this.id,
            }
          );
          this.attributeValue = attrValue;
        }
      } catch (err) {
        this.$error(err)
      }
      this.isLoading = false;
    },
    async save() {
      if(this.isSaving) return
      this.isSaving = true;
      try {
        if (this.new) {
          const {data: result } = await this.$api.post("attributeValues", null, this.attributeValue);
          console.log(result)
        } else {
          const {data: result} = await this.$api.put("attributeValueById", {id: this.id}, this.attributeValue);
          console.log(result)

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
.modal-attr-value {
  width: 100%;
  height: 100%;
  padding-top: 50px;
}
</style>