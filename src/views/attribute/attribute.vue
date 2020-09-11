<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{attribute.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="attribute.name" />
        <TInput class="mb-5" label="Slug" v-model="attribute.slug" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <CRow alignVertical="center">
          <CCol :class="horizontal.label">Тип</CCol>
          <CCol :class="horizontal.input">
            <v-select
              label="label"
              :options="attributeTypes"
              :reduce="attribute => attribute.value"
              v-model="attribute.attribute_type"
            />
          </CCol>
        </CRow>
        <CRow alignVertical="center" class="mt-3">
          <CCol :class="horizontal.label">Группа</CCol>
          <CCol :class="horizontal.input">
            <AttributeGroupSelect v-model="attribute.groupId" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Значения</CCardHeader>
      <CCardBody>
        <CDataTable :items="values" :fields="valueFields" hover>
          <template #actions="{item}">
            <td>
              <CButton color="danger" class="mr-2" @click="deleteValue(item)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
              <CButton color="warning" @click="editValue(item)">
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
            </td>
          </template>
        </CDataTable>
        <CButton color="primary" @click="addValue">
          Добавить значение
          <CIcon class="ml-1" name="cib-addthis" />
        </CButton>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Действия</CCardHeader>
      <CCardBody>
        <CButton color="success mr-3" @click="save">Сохранить</CButton>
        <CButton color="danger" @click="onDelete">Удалить</CButton>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import TTextArea from "@/components/TTextArea";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import AttrValueModal from "@/components/AttrValueModal";
import AttributeGroupSelect from "@/components/AttributeGroupSelect";
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    ImageUpload,
    AttributeGroupSelect,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      attribute: {},
      values: [],
      horizontal: { input: "col-lg-10", label: "col-lg-2" },
    };
  },
  computed: {
    attributeTypes() {
      return [
        { value: "values", label: "Значение" },
        { value: "decimal", label: "Цифровой" },
      ];
    },
    valueFields() {
      return [
        { key: "actions", label: "Действия" },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
      ];
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data: attribute } = await this.$api.get("attributeByIdAdmin", {
          id: this.$route.params.id,
        });
        this.attribute = attribute;
        await this.fetchValues();
      } else {
        const { data } = await this.$api.post("attributes");
        this.$router.push("/attribute/" + data._id);
        this.attribute = data;
      }
    } catch (err) {
      this.$error(err)
    }

    this.$loading.stop();
  },
  methods: {
    async fetchValues() {
      const { data: values } = await this.$api.get("attributeByIdValues", {
        id: this.$route.params.id,
      });
      this.values = values;
    },
    async deleteValue(item) {
      try {
        const { data: result } = await this.$api.delete("attributeValueById", {
          id: item._id,
        });
        await this.fetchValues();
      } catch (err) {
        this.$error(err)
      }
    },
    editValue(item) {
      console.log(item._id);
      this.$modal.show(
        AttrValueModal,
        { id: item._id, attributeId: this.attribute._id },
        { height: "100%", width: "100%" }
      );
    },
    async addValue() {
      this.$modal.show(
        AttrValueModal,
        { new: true, attributeId: this.attribute._id },
        { height: "100%", width: "100%" }
      );
    },
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "attributeById",
          { id: this.attribute._id },
          this.attribute
        );
        console.log(response);
      } catch (err) {
        this.$error(err)
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("attributeById", {
          id: this.attribute._id,
        });
        this.$router.push("/attributes");
      } catch (err) {
        this.$error(err)
      }
    },
  },
};
</script>

<style lang="scss">
</style>