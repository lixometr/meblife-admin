<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <!-- <div>
          Доступен:
          <b>{{product.is_available}}</b>
        </div>
        <div>
          Обновлен:
          <b>{{product.updated_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>-->
        <div>
          Создан:
          <b>{{product.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody class="text-right">
        <div class="mb-3">
          <CategorySelect
            label="Главная категория"
            v-model="product.primary_category"
            :multiple="false"
            required
          />
        </div>
        <div class="mb-3">
          <CategorySelect label="Категории" v-model="product.category" />
        </div>
        <ManufacturerSelect
          required
          class="mb-3"
          label="Производитель"
          v-model="product.manufacturer"
        />
        <ModuleGroupSelect
          class="mb-3"
          label="CMS Module Group Top"
          v-model="product.module_groups_top"
        />
        <ModuleGroupSelect
          class="mb-3"
          label="CMS Module Group Bottom"
          v-model="product.module_groups_bottom"
        />
        <NInput :horizontal="horizontal" label="Sort order" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Атрибуты</CCardHeader>
      <CCardBody>
        <Label label="Атрибуты">
          <CButton class="border" color="white" @click="editAttrs">Редактировать атрибуты</CButton>
        </Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Изображения</CCardHeader>
      <CCardBody>
        <div class="mb-4">
          <Label label="Изображения продукта">
            <ProductImages
              :defaultImage="product.default_image"
              :productImages="product.product_images"
              :featureImages="product.feature_images"
              :sizeImage="product.size_image"
              @defaultImage="$set(product, 'default_image', $event)"
              @featureImages="$set(product, 'feature_images', $event)"
              @productImages="$set(product, 'product_images', $event)"
              @sizeImage="$set(product, 'size_image', $event)"
            />
          </Label>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Данные о товаре</CCardHeader>
      <CCardBody>
        <CInput :horizontal="horizontal" label="Номер продукта" v-model="product.product_number
" />
        <CInput
          :horizontal="horizontal"
          label="Product Suplier Number"
          v-model="product.product_suplier_number"
        />
        <CInput :horizontal="horizontal" label="EAN" v-model="product.ean" />

        <CInput :horizontal="horizontal" label="SKU" v-model="product.sku" />
        <CInput :horizontal="horizontal" label="MPN" v-model="product.mpn" />
        <CInput :horizontal="horizontal" label="ASIN" v-model="product.asin" />
        <Label label="Встроенное 3d">
          <CTextarea v-model="product.embed_3d" />
        </Label>
        <Label label="Встроенное Youtube видео">
          <CTextarea v-model="product.embed_video" />
        </Label>
        <!-- <EditFiles label="Файл" v-model="product.product_files"/> -->
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Цена</CCardHeader>
      <CCardBody>
        <NInput required :horizontal="horizontal" label="Цена" v-model="product.price" />
        <NInput :horizontal="horizontal" label="Старая цена" v-model="product.old_price" />
        <NInput :horizontal="horizontal" label="Price - Buy" v-model="product.price_buy" />
        <NInput :horizontal="horizontal" label="Price - RRP" v-model="product.price_rrp" />
        <NInput
          :horizontal="horizontal"
          type="number"
          label="Скидка"
          v-model="product.promotion.value"
        />
        <CInput
          :horizontal="horizontal"
          label="Действует до"
          type="date"
          v-model="product.promotion.end_at"
        />

        <LabelSelect label="Флаги" v-model="product.labels" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Количество</CCardHeader>
      <CCardBody>
        <NInput
          :horizontal="horizontal"
          label="Кол-во на складе"
          v-model="product.available_stock"
        />
        <NInput
          :horizontal="horizontal"
          label="Кол-во на складе поставщика"
          v-model="product.available_stock_manufacturer"
        />
        <CInput
          :horizontal="horizontal"
          label="Закажите до"
          type="date"
          v-model="product.order_until"
        />
        <CInput
          :horizontal="horizontal"
          label="Отправим"
          type="date"
          v-model="product.delivery_at"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Скидка</CCardHeader>
      <CCardBody>
        <NInput
          :horizontal="horizontal"
          type="number"
          label="Скидка"
          v-model="product.promotion.value"
        />
        <CInput
          :horizontal="horizontal"
          label="Действует до"
          type="date"
          v-model="product.promotion.end_at"
        />

        <LabelSelect label="Флаги" v-model="product.labels" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты о товаре</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" required label="Название" v-model="product.name" />
        <TInput class="mb-5" required label="Slug" v-model="product.slug" />
        <!-- <TInput label="Описание" v-model="product.description" /> -->
        <!-- <froala :tag="'textarea'" v-model="product.description[0].value"></froala> -->

        <TTextArea label="Описание" v-model="product.description" />
      </CCardBody>
    </CCard>

    <ProductAttributesModal v-model="product.attributes" />

    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger mt-2 mb-4" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import TInput from "@/components/TInput";
import TTextArea from "@/components/TTextArea";
import NInput from "@/components/NInput";
import CategorySelect from "@/components/CategorySelect";
import ManufacturerSelect from "@/components/ManufacturerSelect";
import LabelSelect from "@/components/LabelSelect";
import ImageUpload from "@/components/ImageUpload";
import EditFiles from "@/components/EditFiles";
import ProductImages from "@/components/Product/ProductImages";
import ProductAttributesModal from "@/components/Product/ProductAttributesModal";
import ModuleGroupSelect from "@/components/ModuleGroupSelect";
import Label from "@/components/Label";

export default {
  name: "Product",
  components: {
    TInput,
    TTextArea,
    CategorySelect,
    ManufacturerSelect,
    NInput,
    ImageUpload,
    ProductImages,
    ProductAttributesModal,
    LabelSelect,
    Label,
    ModuleGroupSelect,
    EditFiles
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      product: {},
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
        const { data } = await this.$api.get("productByIdAdmin", {
          id: this.$route.params.id,
        });
        this.setProduct(data);
      } else {
        const { data } = await this.$api.post("products");
        this.$router.push({ name: "Product", params: { id: data._id } });
        this.product = data;
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    setProduct(product) {
      if (product.order_until) {
        product.order_until = this.$moment(
          new Date(product.order_until)
        ).format("YYYY-MM-DD");
      }
      if (product.delivery_at) {
        product.delivery_at = this.$moment(
          new Date(product.delivery_at)
        ).format("YYYY-MM-DD");
      }
      if (product.promotion && product.promotion.end_at) {
        product.promotion.end_at = this.$moment(
          new Date(product.promotion.end_at)
        ).format("YYYY-MM-DD");
      }
      this.product = product;
    },
    editAttrs() {
      this.$modal.show("modal-product-attributes");
    },
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "productById",
          { id: this.product._id },
          this.product
        );
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
        console.log(response);
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("productById", {
          id: this.product._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Products" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>