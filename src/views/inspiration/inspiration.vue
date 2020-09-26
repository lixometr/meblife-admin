<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{inspiration.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <!-- <CCardHeader>Тексты о товаре</CCardHeader> -->
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="inspiration.name" />
        <TInput class="mb-5" label="Slug" v-model="inspiration.slug" />
        <EditImage label="Изображение" width="150px" v-model="inspiration.image.url" />
        <ManufacturerSelect label="Производитель" v-model="inspiration.manufacturer" />
        <CRow class="mt-5" alignVertical="center">
          <CCol :class="horizontal.label">Выводить товары без шаблона?</CCol>
          <CCol :class="horizontal.input">
            <CInputCheckbox custom :checked.sync="inspiration.no_template" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <template v-if="!inspiration.no_template">
      <CCard>
        <CCardBody>
          <TInput class="mb-5" label="Заголовок" v-model="inspiration.introduction_title" />
          <TTextArea class="mb-5" label="Текст" v-model="inspiration.introduction_text" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Блок 1</CCardHeader>
        <CCardBody>
          <TInput
            class="mb-5"
            label="Заголовок"
            v-model="inspiration.first_block_introduction_title"
          />
          <TTextArea
            class="mb-5"
            label="Текст"
            v-model="inspiration.first_block_introduction_text"
          />

          <EditImage
            label="Изображение слева"
            width="150px"
            v-model="inspiration.first_block_image_left.url"
          />

          <EditImage
            width="150px"
            label="Изображение справа"
            v-model="inspiration.first_block_image_right.url"
          />

          <ProductSelect label="Товары" v-model="inspiration.products1" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Блок 2</CCardHeader>
        <CCardBody>
          <TInput
            class="mb-5"
            label="Заголовок"
            v-model="inspiration.second_block_introduction_title"
          />
          <TTextArea
            class="mb-5"
            label="Текст"
            v-model="inspiration.second_block_introduction_text"
          />

          <EditImage
            label="Изображение слева"
            width="150px"
            v-model="inspiration.second_block_image_left.url"
          />

          <EditImage
            width="150px"
            label="Изображение справа"
            v-model="inspiration.second_block_image_right.url"
          />

          <ProductSelect label="Товары" v-model="inspiration.products2" />
        </CCardBody>
      </CCard>
      <CCard>
        <!-- <CCardHeader></CCardHeader> -->
        <CCardBody>
          <EditImage
            label="Изображение снизу"
            width="150px"
            v-model="inspiration.separator_image.url"
          />
          <ProductSelect label="Товары" v-model="inspiration.products3" />
        </CCardBody>
      </CCard>
    </template>
    <!-- Only products -->
    <template v-else>
      <CCard>
        <CCardHeader>Товары</CCardHeader>
        <CCardBody>
          <ProductSelect label="Товары" v-model="inspiration.products1" />
        </CCardBody>
      </CCard>
    </template>
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
import EditImage from "@/components/EditImage";
import ProductSelect from "@/components/ProductSelect";
import ManufacturerSelect from "@/components/ManufacturerSelect";
export default {
  components: {
    TInput,
    TTextArea,
    NInput,
    EditImage,
    ProductSelect,
    ManufacturerSelect,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      inspiration: {
        name: [],
        slug: [],
        image: {},
        header_image: {},
        products1: [],
        products2: [],
        products3: [],

        introduction_title: [],
        introduction_text: [],
        first_block_introduction_title: [],
        first_block_introduction_text: [],

        second_block_introduction_title: [],
        second_block_introduction_text: [],
        first_block_image_left: {},
        first_block_image_right: {},

        second_block_image_left: {},
        second_block_image_right: {},
        separator_image: {},
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
        const { data } = await this.$api.get("inspirationByIdAdmin", {
          id: this.$route.params.id,
        });
        this.inspiration = data;
      } else {
        const { data } = await this.$api.post("inspirations");
        this.$router.push({name: "Inspiration", params: {id: data._id}});
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
          "inspirationById",
          { id: this.inspiration._id },
          this.inspiration
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
        const { data } = await this.$api.delete("inspirationById", {
          id: this.inspiration._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Inspirations" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>