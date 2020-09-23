<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <div class="mb-3">
          <h6 class="mb-2">Производитель</h6>
          <ManufacturerSelect
            inputClass="bg-white"
            class="mb-2"
            v-model="filters.manufacturer"
            :multiple="false"
          />
        </div>
        <div class="mb-3">
          <h6 class="mb-2">Категория</h6>
          <CategorySelect
            inputClass="bg-white"
            class="mb-2"
            v-model="filters.category"
            :multiple="false"
          />
        </div>
      </CCardBody>
    </CCard>

    <BtnAdd @click="$router.push({name: 'ProductNew'})">Добавить товар</BtnAdd>

    <CCardBody>
      <AppPagination align="end" :activePage.sync="activePage" :pages="info.totalPages" />
      <CDataTable
        :items="items"
        :fields="fields"
        :pagination="true"
        :itemsPerPage="10"
        border
        outlined
        striped
      >
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton
                color="warning"
                class="mr-2"
                @click="$router.push({name: 'Product', params: {id: item._id}})"
              >
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
              <CButton color="danger" @click="removeItem(item._id)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
            </div>
          </td>
        </template>

        <!-- <template #check="{item}">
          <td>
            <CInputCheckbox custom :checked.sync="selectedItems[item._id]" />
          </td>
        </template>
        <template #check-header>
          <td>
            <CInputCheckbox custom :checked.sync="selectedItems['all']" />
          </td>
        </template>-->
        <template #default_image="{item}">
          <td>
            <CImg :src="item.default_image.url" width="80px" />
          </td>
        </template>
        <template #manufacturer="{item}">
          <td>{{item.manufacturer.name}}</td>
        </template>
        <template #category="{item}">
          <td>
            <span class="d-block mb-2" v-for="cat in item.category" :key="cat._id">{{cat.name}}</span>
          </td>
        </template>
        <template #old_price="{item}">
          <td>{{item.old_price}}</td>
        </template>
        <template #primary_category="{item}">
          <td>{{item.primary_category.name}}</td>
        </template>
        <template #created_at="{item}">
          <td>{{item.created_at | moment('DD.MM.YYYY HH:MM')}}</td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import ManufacturerSelect from "@/components/ManufacturerSelect";
import CategorySelect from "@/components/CategorySelect";
import ItemsPage from "@/mixins/ItemsPage";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      // selectedItems: {},
      filters: {},
      fields: [
        // {
        //   key: "check",
        // },
        // {
        //   key: "_id"
        // },
        {
          key: "default_image",
        },
        {
          key: "name",
        },
        {
          key: "slug",
        },

        {
          key: "price",
          label: "Цена",
        },
        {
          key: "old_price",
          label: "Старая цена",
        },
        {
          key: "primary_category",
          label: "Главная категория",
        },
        {
          key: "category",
          label: "Категории",
        },
        {
          key: "manufacturer",
          label: "Производитель",
        },
        {
          key: "created_at",
          label: "Создан",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  components: {
    ManufacturerSelect,
    CategorySelect,
  },
  async created() {
    this.$loading.start();
    await this.fetchItems();
    this.$loading.stop();
  },
  computed: {
    productFilters() {
      let filters = {};
      if (this.filters.manufacturer) {
        filters.manufacturer = [this.filters.manufacturer];
      }
      if (this.filters.category) {
        filters.category = this.filters.category;
      }

      filters.sort_by = this.filters.sort_by;
      return filters;
    },
    totalPages() {
      return this.info.totalPages;
    },
  },
  methods: {
    async fetchItems() {
      const filters = await this.makeFilters();
      let jsonFilters = {
        manufacturer: filters.manufacturer,
        sort_by: filters.sort_by,
      };
      jsonFilters = JSON.stringify(jsonFilters);
      try {
        let products = {};
        if (filters.category) {
          const { data } = await this.$api.get(
            "categoryProducts",
            {
              slug: filters.category,
            },
            {
              params: {
                filters: jsonFilters,
                page: this.activePage,
              },
            }
          );
          products = data;
        } else {
          const { data } = await this.$api.get("products", null, {
            params: {
              filters: jsonFilters,
              page: this.activePage,
            },
          });
          products = data;
        }
        this.setData(products);

        this.activePage = products.info.nowPage;
      } catch (err) {
        this.$error(err);
      }
    },
    async makeFilters() {
      try {
        const filters = {};
        if (this.productFilters.manufacturer) {
          const resolvers = this.productFilters.manufacturer.map(async (id) => {
            const { data } = await this.$api.get("manufacturerById", { id });
            return data.slug;
          });
          const manufacturerSlugs = await Promise.all(resolvers);
          filters.manufacturer = manufacturerSlugs;
        }
        if (this.productFilters.category) {
          const { data } = await this.$api.get("categoryById", {
            id: this.productFilters.category,
          });
          filters.category = data.slug;
        }

        return filters;
      } catch (err) {
        this.$error(err);
      }
      return "";
    },
    async removeItem(id) {
      try {
        const { data } = await this.$api.delete("productById", { id });
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        await this.fetchItems();
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
  
    filters: {
      deep: true,
      handler() {
        this.fetchItems();
      },
    },
    // selectedItems: {
    //   deep: true,
    //   handler() {
    //     if (this.selectedItems["all"]) {
    //       this.products.forEach((product) => {
    //         this.$set(this.selectedItems, product._id, true);
    //       });
    //     }
    //   },
    // },
  },
};
</script>

<style lang="scss" >
</style>