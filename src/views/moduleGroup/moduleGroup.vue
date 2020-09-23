<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{moduleGroup.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Обновить группу модулей</CCardHeader>
      <CCardBody>
        <TInput label="Название" v-model="moduleGroup.name" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Модули</CCardHeader>
      <CCardBody>
        <div v-if="modules.length > 0">
          <CRow class="border-top border-bottom border-right">
            <CCol class="border-left p-2" col="5">
              <b>Название</b>
            </CCol>
            <CCol class="border-left border-right p-2" col="4">
              <b>Номер модуля</b>
            </CCol>
            <CCol col="3"></CCol>
          </CRow>
          <draggable v-model="modules" ghostClass="ghost">
            <CRow
              class="border-bottom border-left border-right cursor-pointer"
              v-for="item in modules"
              :key="item._id"
            >
              <CCol class="p-2" col="5">{{item.title}}</CCol>
              <CCol class="border-left border-right p-2" col="4">
                <b class="text-primary">{{item.module_id}}</b>
              </CCol>
              <CCol class="p-2" col="3">
                <div class="d-flex justify-content-end">
                  <CButton class="move mr-1">
                    <CIcon name="cil-cursor-move"></CIcon>
                  </CButton>
                  <CButton color="warning" @click="editModule(item._id)">
                    <CIcon name="cil-pencil"></CIcon>
                  </CButton>
                  <CButton color="danger" class="ml-2" @click="deleteModule(item._id)">
                    <CIcon name="cil-trash"></CIcon>
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </draggable>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <ModulesSelect class="mr-2" v-model="moduleId" />
          <CButton color="warning" @click="addModule">Добавить модуль</CButton>
        </div>
      </CCardBody>
    </CCard>
    <BtnSave  @click="save">
    Сохранить
    </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import TTextArea from "@/components/TTextArea";
import NInput from "@/components/NInput";
import ModulesSelect from "@/components/Modules/ModulesSelect";
import draggable from "vuedraggable";

export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    ModulesSelect,
    draggable,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      moduleId: undefined,
      moduleGroup: {},
      modules: [],
      modulesTableFields: [
        {
          key: "title",
          label: "Название",
        },
        {
          key: "module_id",
          label: "Id модуля",
        },
        {
          key: "actions",
          label: "Действия",
        },
      ],
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  async created() {
    await this.fetchItem();
  },
  methods: {
    async fetchItem() {
      this.$loading.start();
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get("moduleGroupByIdAdmin", {
            id: this.$route.params.id,
          });
          this.moduleGroup = data;
          await this.fetchModules();
        } else {
          const { data } = await this.$api.post("moduleGroups");
          this.$router.push({ name: "ModuleGroup", params: { id: data._id } });
          this.moduleGroup = data;
        }
      } catch (err) {
        this.$error(err);
      }
      this.$loading.stop();
    },
    async fetchModules() {
      const resolvers = this.moduleGroup.modules.map(async (id) => {
        try {
          const { data: appModule } = await this.$api.get("moduleById", { id });
          return appModule;
        } catch (err) {
          this.$error(err);
        }
        return {};
      });
      this.modules = await Promise.all(resolvers);
    },
    editModule(id) {
      this.$router.push({
        name: "ModuleGroupEditor",
        params: { id: this.$route.params.id, module_id: id },
      });
      // this.$router.push(`/module-group/${this.$route.params.id}/module/${id}`);
    },
    async deleteModule(id) {
      try {
        const { data } = await this.$api.delete("moduleById", {
          id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        await this.fetchItem();
      } catch (err) {
        this.$error(err);
      }
    },

    addModule() {

      if (this.moduleId) {
        this.$router.push({
          name: "ModuleGroupEditorNew",

          query: { module_id: this.moduleId },
        });
        // this.$router.push({
        //   path: `/module-group/${this.$route.params.id}/module/new`,
        //   query: { module_id: this.moduleId },
        // });
      }
    },
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "moduleGroupById",
          { id: this.moduleGroup._id },
          {
            ...this.moduleGroup,
            modules: this.modules,
          }
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
        const { data } = await this.$api.delete("moduleGroupById", {
          id: this.moduleGroup._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({name:"ModuleGroups"});
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>