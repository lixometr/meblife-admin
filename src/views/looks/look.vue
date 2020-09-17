<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{look.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <!-- <CCardHeader>Тексты о товаре</CCardHeader> -->
      <CCardBody>
        <!-- <TInput class="mb-5" label="Название" v-model="look.name" /> -->
        <CRow class="mb-5" alignVertical="center">
          <CCol :class="horizontal.label">Изображение</CCol>
          <CCol :class="horizontal.input">
            <ImageUpload width="150px" v-model="look.image.url" />
          </CCol>
        </CRow>
        <CRow class="mb-5" alignVertical="center">
          <CCol :class="horizontal.label">Товары</CCol>
          <CCol :class="horizontal.input">
              <ProductSelect v-model="look.products"/>
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
import ProductSelect from "@/components/ProductSelect"
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    ImageUpload,
    ProductSelect
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      look: {},
     
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("lookByIdAdmin", {
          id: this.$route.params.id,
        });
        this.look = data;
      } else {
        const { data } = await this.$api.post("looks");
        this.$router.push("/look/" + data._id);
        this.look = data;
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
          "lookById",
          { id: this.look._id },
          this.look
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
        const { data } = await this.$api.delete("lookById", {
          id: this.look._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push("/looks");
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>