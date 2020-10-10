<template>
  <div class="module-editor" v-if="!$store.getters.isLoading">
    <h4 class="mb-3">Модуль {{ moduleNumber }}</h4>
    <CCard>
      <CCardBody>
        <CImg block :style="{ maxWidth: '100%' }" :src="moduleScreen" />
      </CCardBody>
    </CCard>
    <CCard
      v-if="
        shouldShow('main_image') ||
        shouldShow('module_items') ||
        shouldShow('show_type')
      "
    >
      <CCardHeader>Редактировать модуль</CCardHeader>
      <CCardBody>
        <EditImage
          label="Изображение"
          v-model="appModule.main_image"
          v-if="shouldShow('main_image')"
        />
        <ProductAndCategorySelect
          label="Товары и категории"
          v-model="appModule.module_items"
          v-if="shouldShow('module_items')"
        />
        <Label
          class="mt-4"
          label="Тип отображения"
          v-if="shouldShow('show_type')"
        >
          <v-select
            :multiple="false"
            v-model="appModule.show_type"
            :options="showTypeOptions"
            :reduce="(item) => item.value"
            label="label"
          ></v-select>
        </Label>
        <Label class="mt-4" label="Цвет текста" v-if="shouldShow('color')">
          <AppColorPicker v-model="appModule.color" />
        </Label>
        <Label class="mt-4" label="Цвет фона" v-if="shouldShow('bg_color')">
          <AppColorPicker v-model="appModule.bg_color" />
        </Label>
      </CCardBody>
    </CCard>
    <CCard
      v-if="
        shouldShow('title') ||
        shouldShow('sub_title') ||
        shouldShow('description') ||
        shouldShow('more_btn') ||
        shouldShow('more_btn_url')
      "
    >
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <TInput
          class="mb-4"
          label="Заголовок"
          v-model="appModule.title"
          v-if="shouldShow('title')"
        />
        <TInput
          class="mb-4"
          label="Подзаголовок"
          v-model="appModule.sub_title"
          v-if="shouldShow('sub_title')"
        />
        <TTextArea
          class="mb-4"
          label="Описание"
          v-model="appModule.description"
          v-if="shouldShow('description')"
        />
        <TInput
          class="mb-4"
          label="Текст в кнопке"
          v-model="appModule.more_btn"
          v-if="shouldShow('more_btn')"
        />
        <TInput
          class="mb-4"
          label="Url в кнопке"
          v-model="appModule.more_btn_url"
          v-if="shouldShow('more_btn_url')"
        />
      </CCardBody>
    </CCard>

    <CCard v-if="shouldShow('module_images')">
      <CCardHeader>Текст с изображением</CCardHeader>
      <CCardBody>
        <ModuleImageEditor
          @save="save"
          v-model="appModule.module_images"
          :moduleNumber="moduleNumber"
          :translatedItems="moduleImages"
        />
      </CCardBody>
    </CCard>

    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import EditImage from "@/components/EditImage";
import TTextArea from "@/components/TTextArea";
import ProductAndCategorySelect from "@/components/ProductAndCategorySelect";
import ModuleImageEditor from "@/components/Modules/ModuleImageEditor";
import AppColorPicker from "@/components/AppColorPicker";
const whatShow = {
  1: ["texts", "main_image", "module_items", "show_type", ],
  2: ["texts", "main_image", "module_items", "show_type", ],
  3: ["texts", "main_image", "module_items", "show_type", ],
  8: ["texts", "main_image", "show_type"],
  16: ["title", "sub_title", "description", "module_images"],
  19: ["module_images"],
  14: ["title", "sub_title", "module_items"],
  15: ["title", "description"],
  21: ["title", "description"],
  22: ["module_images"],
  23: ["title", "sub_title", "module_images"],
  26: ["module_images"],
  28: ["title", "module_images"],
  33: ["title", "sub_title", "module_images"],
  35: ["title"],
};
const showTypes = {
  1: [
    { label: "Нормальный", value: "" },
    { label: "Перевернутый", value: "reverse" },
  ],
  2: [
    { label: "Нормальный", value: "" },
    { label: "Перевернутый", value: "reverse" },
  ],
  3: [
    { label: "Нормальный", value: "" },
    { label: "Перевернутый", value: "reverse" },
  ],
  8: [
    { label: "Нормальный", value: "" },
    { label: "Перевернутый", value: "reverse" },
  ],
};
export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    EditImage,
    TTextArea,
    ProductAndCategorySelect,
    ModuleImageEditor,
  AppColorPicker
},
  data() {
    return {
      moduleGroup: {},
      // translated
      moduleImages: [],
      // not translated
      appModule: {
        main_image: {},
        title: [],
        sub_title: [],
        description: [],
        more_btn: [],
        more_btn_url: [],
      },
    };
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {
    showTypeOptions() {
      return showTypes[this.moduleNumber];
    },
    showOpts() {
      return whatShow[this.moduleNumber] || [];
    },
    shouldShow() {
      return (name) => {
        if (this.showOpts.includes("all")) return true;
        const isText = [
          "title",
          "sub_title",
          "description",
          "more_btn",
          "more_btn_url",
        ];
        if (isText.includes(name)) {
          if (this.showOpts.includes("texts")) return true;
        }
        return this.showOpts.includes(name);
      };
    },

    moduleGroupId() {
      return this.$route.params.id;
    },
    moduleId() {
      return this.$route.params.module_id;
    },
    moduleNumber() {
      if (this.isNew) {
        return this.$route.query.module_id.toString();
      } else {
        return this.appModule.module_id.toString();
      }
    },
    moduleScreen() {
      const screens = {};
      new Array(40)
        .fill(1)
        .map((_, idx) => (screens[idx] = `/modules/module_${idx}.png`));
      return screens[this.moduleNumber];
    },
  },
  methods: {
    async fetchItem() {
      try {
        const { data: moduleGroup } = await this.$api.get(
          "moduleGroupByIdAdmin",
          { id: this.moduleGroupId },
          {}
        );
        this.moduleGroup = moduleGroup;
        if (!this.isNew) {
          const { data } = await this.$api.get("moduleByIdAdmin", {
            id: this.moduleId,
          });
          this.appModule = data;
          await this.loadModuleImages();
        } else {
          const { data } = await this.$api.post(
            "modules",
            {},
            {
              module_id: this.moduleNumber,
            }
          );
          this.moduleGroup.modules.push(data._id);
          await this.$api.put(
            "moduleGroupById",
            { id: this.moduleGroupId },
            this.moduleGroup
          );

          this.$router.push({
            name: "ModuleGroupEditor",
            params: { id: this.moduleGroupId, module_id: data._id },
          });
          // this.$router.push(
          //   `/module-group/${this.moduleGroupId}/module/${data._id}`
          // );
        }
      } catch (err) {
        this.$error(err);
      }
    },
    async loadModuleImages(id) {
      try {
        const { data: appModule } = await this.$api.get("moduleById", {
          id: this.moduleId,
        });
        this.moduleImages = appModule.module_images;
      } catch (err) {
        this.$error(err);
      }
    },

    async save() {
      try {
        const { data: response } = await this.$api.put(
          "moduleById",
          { id: this.moduleId },
          this.appModule
        );
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
        await this.fetchItem();
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("moduleById", {
          id: this.moduleId,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({
          name: "ModuleGroup",
          params: { id: this.moduleGroupId },
        });
        // this.$router.push(`/module-group/${this.moduleGroupId}`);
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    appModule: {
      deep: true,
      handler() {
        const moduleImages = [];
        this.appModule.module_images.map((moduleImage) => {
          const image = this.moduleImages.find(
            (item) => item._id === moduleImage._id
          );
          if (!image) return;
          moduleImages.push(image);
        });
        this.moduleImages = moduleImages;
      },
    },
  },
};
</script>

<style lang="scss">
</style>