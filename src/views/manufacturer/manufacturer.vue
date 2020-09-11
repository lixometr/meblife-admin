<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{manufacturer.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты о товаре</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="manufacturer.name" />
        <TInput class="mb-5" label="Slug" v-model="manufacturer.slug" />
        <CRow class="mb-5" alignVertical="center">
          <CCol :class="horizontal.label">Изображение</CCol>
          <CCol :class="horizontal.input">
            <ImageUpload width="150px" v-model="manufacturer.image.url" />
          </CCol>
        </CRow>
        <TTextArea label="История" v-model="manufacturer.history" />
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
      manufacturer: {},
      horizontal: { input: "col-lg-10", label: "col-lg-2" },
    };
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("manufacturerByIdAdmin", {
          id: this.$route.params.id,
        });
        this.manufacturer = data;
      } else {
        const { data } = await this.$api.post("manufacturers");
        this.$router.push("/manufacturer/" + data._id);
        this.manufacturer = data;
      }
    } catch (err) {
      this.$error(err)
    }

    this.$loading.stop();
  },
  methods: {
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "manufacturerById",
          { id: this.manufacturer._id },
          this.manufacturer
        );
        console.log(response);
      } catch (err) {
        this.$error(err)
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("manufacturerById", {
          id: this.manufacturer._id,
        });
        this.$router.push("/manufacturers");
      } catch (err) {
        this.$error(err)
      }
    },
  },
};
</script>

<style lang="scss">
</style>