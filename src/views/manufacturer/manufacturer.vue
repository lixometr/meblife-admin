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

        <EditImage label="Изображение" class="mb-5" width="150px" v-model="manufacturer.image.url" />
        <EditImage
          label="Изображение на фоне"
          class="mb-5"
          width="150px"
          v-model="manufacturer.header_image.url"
        />
        <ModuleGroupSelect
          label="Группа модулей"
          class="mb-5"
          v-model="manufacturer.module_groups"
        />

        <TTextArea class="mb-5" label="История" v-model="manufacturer.history" />
        <TTextArea class="mb-5" label="Видео" v-model="manufacturer.videos" />
      </CCardBody>
    </CCard>
    <BtnSave  @click="save">Сохранить</BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import TTextArea from "@/components/TTextArea";
import NInput from "@/components/NInput";
import EditImage from "@/components/EditImage";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    EditImage,
    ModuleGroupSelect,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      manufacturer: {
        name: [],
        slug: [],
        image: {},
        description: [],
        header_image: {},
        history: [],
        videos: [],
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
        const { data } = await this.$api.get("manufacturerByIdAdmin", {
          id: this.$route.params.id,
        });
        this.manufacturer = data;
      } else {
        const { data } = await this.$api.post("manufacturers");
        this.$router.push({ name: "Manufacturer", params: { id: data._id } });
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
        this.$router.push({ name: "Manufacturers" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>