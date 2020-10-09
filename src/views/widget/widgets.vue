<template>
  <div v-if="!$store.getters.isLoading">
    <!-- <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard> -->

    <!-- <AppPagination
      align="end"
      :activePage.sync="activePage"
      :pages="info.totalPages"
    /> -->
    <CDataTable :items="widgets" :fields="fields" border outlined striped>
      <template #edit="{ item }">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({ name: item.routeName })"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
          </div>
        </td>
      </template>

      <template #image="{ item }">
        <td>
          <CImg :src="item.image.url" width="150px" />
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  data() {
    return {
      fetchRoute: "manufacturersSearch",
      widgets: [
        {
          slug: "main_page",
          label: "Главная страница",
          routeName: "WidgetMainPage",
        },
        {
          slug: "top_bar",
          label: "Верхняя панель",
          routeName: "WidgetTopBar",
        },
        {
          slug: "header_menu",
          label: "Меню в шапке",
          routeName: "WidgetHeaderMenu",
        },
        // {
        //   slug: "footer",
        //   label: "Футер",
        //   routeName: "WidgetFooter",
        // },
      ],
      fields: [
        {
          key: "label",
          label: "Название",
        },
        {
          key: "slug",
          label: "Slug",
        },

        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  mixins: [ItemsPage],

  methods: {
    async fetchItems() {
      return
      try {
        const resolvers = this.widgets.map(async (widget) => {
          const { data: response } = await this.$api.get("widgetByName", {
            name: widget.slug,
          });
          this.items.push(response);
        });
        await Promise.all(resolvers);
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" >
</style>