<template>
  <Label :label="label" class="mb-3">
    <ImageUpload width="150px" v-bind="$attrs" v-on="$listeners" />
  </Label>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    label: String,
  },
  components: {
    ImageUpload,
  },
  data() {
    return {};
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>