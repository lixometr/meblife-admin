<template>
  <v-select
    :multiple="false"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    label="value"
    :reduce="item => item.value"
    class="modules-select"
    placeholder="Выберите модуль"
  >
    <template v-slot:option="option">
      <slot name="option" v-bind="option">
        <div class="d-center">{{ option.name }}</div>
      </slot>
    </template>
    <template v-slot:selected-option="option">
      <slot name="selected-option" v-bind="option">
        <div class="selected d-center">{{ option.name }}</div>
      </slot>
    </template>
    <template #list-footer>
      <slot name="list-footer"></slot>
    </template>
  </v-select>
</template>

<script>
export default {
  props: {
    value: Number
  },
  computed: {
    options() {
      const options = [];
      new Array(40)
        .fill(1)
        .map((_, idx) =>
          options.push({ value: idx + 1, name: `Модуль ${idx + 1}` })
        );
      return options;
    },
  },
};
</script>

<style lang="scss" scoped>
.modules-select {
    width: 170px;
}
</style>