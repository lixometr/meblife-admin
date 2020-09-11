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
        <CategorySelect v-model="category.parent" :multiple="false" />
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
          <CCol :class="horizontal.label">Изображение на фоне</CCol>
          <CCol :class="horizontal.input">
            <ImageUpload width="150px" v-model="category.bg_image.url" />
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
      horizontal: { input: "col-lg-10", label: "col-lg-2" },
    };
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