<template>
  <modal
    name="modal-product-attributes"
    :adaptive="true"
    width="100%"
    height="100%"
    class="product-attributes-modal"
  >
    <CContainer class="position-relative">
      <CButton color="danger " class="modal-close" @click="close">
        <span>&times;</span>
      </CButton>
      <div class="content">
        <h3 class="text-center mb-4">Редактировать атрибуты</h3>
        <AttributeSelect class="mb-4" :value="attributeNameIds" @input="changeAttrName" />
        <CRow class="mt-2" v-for="(attribute, idx) in items" :key="idx" alignVertical="center">
          <CCol lg="6">
            <div>{{getAttrName(attribute.name)}}</div>
          </CCol>
          <CCol lg="6">
            <AttributeValueSelect
              :attributeId="attribute.name"
              :value="attribute.value"
              @input="changeAttrValue(idx, $event)"
            />
          </CCol>
        </CRow>
      </div>
    </CContainer>
  </modal>
</template>

<script>
import AttributeValueSelect from "@/components/AttributeValueSelect";
import AttributeSelect from "@/components/AttributeSelect";

export default {
  props: {
    // [{name: 'attr-name-id', value: ['attr-value-id']]
    value: Array,
  },
  data() {
    return {
      attributeNames: [],
    };
  },
  components: {
    AttributeValueSelect,
    AttributeSelect,
  },
  computed: {
    items() {
      return this.value;
    },
    attributeNameIds() {
      return this.items.map((attr) => attr.name);
    },
  },
  async created() {
    await this.fetchNames();
  },
  methods: {
    getAttrName(id) {
      const attrName =
        this.attributeNames.find((attr) => attr._id === id) || {};
      return attrName.name;
    },
    async fetchNames() {
      const attributeIds = this.value.map((attr) => attr.name);
      const resolvers = attributeIds.map(async (attrId) => {
        const { data } = await this.$api.get("attributeById", { id: attrId });
        return data;
      });
      const attrNames = await Promise.all(resolvers);
      this.attributeNames = attrNames;
    },
    changeAttrValue(idx, newValue) {
      const attrs = [...this.items];
      if (!attrs[idx].value) attrs[idx].value = [];
      attrs[idx].value = newValue;
      this.$emit("input", attrs);
    },
    changeAttrName(newValue) {
      const newAttrs = [];
      newValue.forEach((value) => {
        const idx = this.items.findIndex((attr) => attr.name === value);
        if (idx < 0) {
          newAttrs.push({
            name: value,
            value: [],
          });
        } else {
          newAttrs.push(this.items[idx]);
        }
      });

      this.$emit("input", newAttrs);
    },
    close() {
      this.$modal.hide("modal-product-attributes");
    },
  },
  watch: {
    async value() {
      await this.fetchNames();
    },
  },
};
</script>

<style lang="scss" scoped>
.product-attributes-modal {
  z-index: 99999;
}

.content {
  padding-top: 150px;
}
</style>