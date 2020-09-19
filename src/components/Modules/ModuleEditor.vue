<template>
  <div class="module-editor">
    <TInput v-model="title" />
    <TInput v-model="sub_title" />
  </div>
</template>

<script>
export default {
  props: {
      module_id: Array,
    title: Array,
    sub_title: Array,
    description: Array,
    more_btn: Array,
    more_btn_url: Array,
    module_images: Array,
    module_items: Array
  },
  data() {
      return {
          
      }
  }
};
</script>

<style lang="scss" scoped>
</style>