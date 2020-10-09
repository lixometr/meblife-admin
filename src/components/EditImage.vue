<template>
  <Label :label="label" class="mb-3">
    <ImageUpload width="150px" v-bind="attrs" v-on="listeners" />
  </Label>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    label: String,
    value: [Object, String]
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
    
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      }
    },
    attrs() {
      return {
        ...this.$attrs,
        value: typeof this.value === 'string' ? this.value : this.value.url
      }
    }
  },
  methods: {
    onInput(val) {
      if(typeof this.value === 'string') {
        this.$emit('input', val)
      } else {
        this.$emit('input', {url: val})

      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>