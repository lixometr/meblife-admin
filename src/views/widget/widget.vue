<template>
  <div>
    <!-- <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody> </CCardBody>
    </CCard> -->
    <router-view ref="widget"></router-view>
    <BtnSave @click="save">Сохранить</BtnSave>
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

  data() {
    return {};
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
 

  methods: {
    async save() {
      try {
        const { data } = await this.$refs.widget.save();
        if (data.ok) {
          this.$notify({
            group: "main",
            title: "Сохранено!",
            type: "success",
          });
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>