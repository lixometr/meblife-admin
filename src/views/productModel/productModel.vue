<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ productModel.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <TInput class="mb-3" label="Название" v-model="productModel.name" />
        <TInput label="Slug" v-model="productModel.slug" />
      </CCardBody>
    </CCard>
    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import NInput from "@/components/NInput";
export default {
  components: {
    TInput,
    NInput,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      productModel: {
        name: [],
        slug: [],
    
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
        const { data } = await this.$api.get("productModelByIdAdmin", {
          id: this.$route.params.id,
        });
        this.productModel = data;
      } else {
        const { data } = await this.$api.post("productModels");
        this.$router.push({ name: "ProductModel", params: { id: data._id } });
        this.productModel = data;
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
          "productModelById",
          { id: this.productModel._id },
          this.productModel
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
        const { data } = await this.$api.delete("productModelById", {
          id: this.productModel._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "productModels" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>