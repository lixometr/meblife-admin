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
        <CRow alignVertical="center">
          <CCol :class="horizontal.label">
              Тип
          </CCol>
          <CCol :class="horizontal.input">
            <v-select
              label="label"
              :options="attributeTypes"
              :reduce="attribute => attribute.value"
              v-model="attribute.attribute_type"
            />
          </CCol>
        </CRow>
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
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    ImageUpload,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      attribute: {},
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
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("attributeByIdAdmin", {
          id: this.$route.params.id,
        });
        this.attribute = data;
      } else {
        const { data } = await this.$api.post("attributes");
        this.$router.push("/attribute/" + data._id);
        this.attribute = data;
      }
    } catch (err) {
      console.log(err);
    }

    this.$loading.stop();
  },
  methods: {
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "attributeById",
          { id: this.attribute._id },
          this.attribute
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("attributeById", {
          id: this.attribute._id,
        });
        this.$router.push("/attributes");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>