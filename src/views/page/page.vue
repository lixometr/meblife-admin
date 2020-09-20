<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{page.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Редактировать страницу</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="page.name" />
        <TInput class="mb-5" label="Slug" v-model="page.slug" />
        <EditImage class="mb-5" label="Изображение на фоне" v-model="page.header_image.url" />
        <ModuleGroupSelect label="Группа модулей" v-model="page.module_groups"/>
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
import EditImage from "@/components/EditImage";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    EditImage,
    ImageUpload,
    ModuleGroupSelect
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      page: {
        name: [],
        slug: [],
        header_image: {}
      },
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
        const { data } = await this.$api.get("pageByIdAdmin", {
          id: this.$route.params.id,
        });
        this.page = data;
      } else {
        const { data } = await this.$api.post("pages");
        this.$router.push({ name: "Page", params: { id: data._id } });
        this.page = data;
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
          "pageById",
          { id: this.page._id },
          this.page
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
        const { data } = await this.$api.delete("pageById", {
          id: this.page._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Pages" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>