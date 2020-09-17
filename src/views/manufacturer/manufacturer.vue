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
      <CCardHeader></CCardHeader>
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
    <CButton color="success mb-2 w-100" @click="save">
      <CIcon name="cil-save" /> Сохранить
    </CButton>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
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
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
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
      this.$error(err);
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
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("manufacturerById", {
          id: this.manufacturer._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push("/manufacturers");
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>