<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{category.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="category.name" />
        <TInput class="mb-5" label="Slug" v-model="category.slug" />
        <TInput class="mb-5" label="Маска продукта" v-model="category.product_mask" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Родитель</CCardHeader>
      <CCardBody>
        <CategorySelect label="Родитель" v-model="category.parent" :multiple="false" />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>Изображения</CCardHeader>

      <CCardBody>
        <CRow class="mb-5" alignVertical="center">
          <CCol :class="horizontal.label">Изображение</CCol>
          <CCol :class="horizontal.input">
            <ImageUpload width="150px" v-model="category.image.url" />
          </CCol>
        </CRow>
        <CRow class="mb-5" alignVertical="center">
          <CCol :class="horizontal.label">Изображение в шапке</CCol>
          <CCol :class="horizontal.input">
            <ImageUpload width="150px" v-model="category.bg_image.url" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CButton color="success mb-2 w-100" @click="save">  <CIcon name="cil-save" /> Сохранить</CButton>
    <CButton color="danger mb-3" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import TTextArea from "@/components/TTextArea";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import CategorySelect from "@/components/CategorySelect";
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    ImageUpload,
    CategorySelect,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      category: {},
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
        const { data } = await this.$api.get("categoryByIdAdmin", {
          id: this.$route.params.id,
        });
        this.category = data;
      } else {
        const { data } = await this.$api.post("categories");
        this.$router.push("/category/" + data._id);
        this.category = data;
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
          "categoryById",
          { id: this.category._id },
          this.category
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
        const { data } = await this.$api.delete("categoryById", {
          id: this.category._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push("/categories");
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>