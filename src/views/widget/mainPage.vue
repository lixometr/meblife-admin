<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <TInput class="mb-4" label="Заголовок" v-model="item.texts.title" />
        <TInput
          class="mb-4"
          label="Подзаголовок"
          v-model="item.texts.sub_title"
        />
        <TInput class="mb-4" label="Кнопка" v-model="item.texts.more_btn" />
        <TInput
          class="mb-4"
          label="Ссылка в кнопке"
          v-model="item.texts.more_btn_url"
        />
        <EditImage
          label="Картинка на фоне"
          v-model="item.values.bg_image.url"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Слайдер</CCardHeader>
      <CCardBody>
        <EditComponent
          v="slider"
          c="EditMultiplyer"
          :schema="sliderSchema"
          :items="sliderItems"
          :changeValue.sync="item.values"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader> Таб 1</CCardHeader>
      <CCardBody>
        <TInput
          class="mb-4"
          label="Заголовок"
          v-model="item.values.tabs[0].tab_name"
        />
        <ModuleGroupSelect
          label="Группы модулей"
          v-model="item.values.tabs[0].module_groups"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader> Таб 2</CCardHeader>
      <CCardBody>
        <TInput
          class="mb-4"
          label="Заголовок"
          v-model="item.values.tabs[1].tab_name"
        />
        <ModuleGroupSelect
          label="Группы модулей"
          v-model="item.values.tabs[1].module_groups"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader> Таб 3</CCardHeader>
      <CCardBody>
        <TInput
          class="mb-4"
          label="Заголовок"
          v-model="item.values.tabs[2].tab_name"
        />
        <ModuleGroupSelect
          label="Группы модулей"
          v-model="item.values.tabs[2].module_groups"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import EditImage from "@/components/EditImage";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
import merge from "lodash.merge";
export default {
  data() {
    return {
      item: {
        texts: {
          title: [],
          sub_title: [],
          more_btn: [],
          more_btn_url: [],
        },
        values: {
          bg_image: {
            url: "",
          },
          tabs: [
            {
              tab_name: [],
              module_groups: [],
            },
            {
              tab_name: [],
              module_groups: [],
            },
            {
              tab_name: [],
              module_groups: [],
            },
          ],
        },
      },
    };
  },

  components: {
    TInput,
    EditImage,
    ModuleGroupSelect,
  },
  computed: {
    sliderSchema() {
      return {
        slider: [
          {
            title: [],
            sub_title: [],
            image: {},
            more_btn: [],
            more_btn_url: []

          }
        ]
      }
    },
    sliderItems() {
      return [
        {
          c: 'TInput',
          v: 'title',
          label: "Заголовок"
        },
        {
          c: 'TInput',
          v: 'sub_title',
          label: "Под заголовок"
        },
        {
          c: 'TInput',
          v: 'more_btn',
          label: "Текст в кнопке"
        },
        {
          c: 'TInput',
          v: 'more_btn_url',
          label: "Ссылка в кнопке"
        },
        {
          c: 'EditImage',
          v: 'image',
          label: "Изображение"
        },
      ]
    }
  },  
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "main_page" }, this.item);
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "main_page",
        });
        this.item = merge({}, this.item, data);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>