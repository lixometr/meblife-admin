<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Доступен:
          <b>{{product.is_available}}</b>
        </div>
        <div>
          Обновлен:
          <b>{{product.updated_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
        <div>
          Создан:
          <b>{{product.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты о товаре</CCardHeader>
      <CCardBody>
        <TInput class="mb-5" label="Название" v-model="product.name" />
        <TInput class="mb-5" label="Slug" v-model="product.slug" />
        <CInput :horizontal="horizontal" label="Sku" v-model="product.sku" />
        <!-- <TInput label="Описание" v-model="product.description" /> -->
        <!-- <froala :tag="'textarea'" v-model="product.description[0].value"></froala> -->

        <TTextArea label="Описание" v-model="product.description" />
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
        <ManufacturerSelect class="mb-3" label="Производитель" v-model="product.manufacturer" />
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
      <CCardHeader>Цена</CCardHeader>
      <CCardBody>
        <NInput :horizontal="horizontal" label="Цена" v-model="product.price" />
        <NInput :horizontal="horizontal" label="Старая цена" v-model="product.old_price" />

        <NInput
          :horizontal="horizontal"
          type="number"
          label="Скидка"
          v-model="product.promotion.value"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Категории и атрибуты</CCardHeader>
      <CCardBody>
        <div class="mb-3">
          <CategorySelect
            label="Главная категория"
            v-model="product.primary_category"
            :multiple="false"
          />
        </div>
        <div class="mb-3">
          <CategorySelect label="Категории" v-model="product.category" />
        </div>

        <CButton color="primary" @click="editAttrs">Редактировать атрибуты</CButton>
      </CCardBody>
    </CCard>
    <ProductAttributesModal v-model="product.attributes" />
    <CCard>
      <CCardHeader>Изображения</CCardHeader>
      <CCardBody>
        <div class="mb-4">
          <h6>Изображения продукта</h6>
          <CRow>
            <CCol lg="12">
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
            </CCol>
          </CRow>
        </div>
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
import CategorySelect from "@/components/CategorySelect";
import ManufacturerSelect from "@/components/ManufacturerSelect";
import ImageUpload from "@/components/ImageUpload";
import ProductImages from "@/components/Product/ProductImages";
import ProductAttributesModal from "@/components/Product/ProductAttributesModal";
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
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      product: {},
      horizontal: { input: "col-lg-10", label: "col-lg-2" },
    };
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
        this.$router.push("/product/" + data._id);
        this.product = data;
      }
    } catch (err) {
      console.log(err);
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
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("productById", {
          id: this.product._id,
        });
        console.log(data);
        this.$router.push("/products");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>