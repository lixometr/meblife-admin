<template>
  <div>
    <div>
      
    <FooterComponent
      :changeValue="cItem"
      @update:changeValue="onUpdate($event, idx)"
      v-bind="cItem"
      v-for="(cItem, idx) in items"
      :key="idx"
    />
    </div>
    <CButton color="warning" @click="addItem">Добавить</CButton>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  props: {
    value: null,
    items: {
      type: Array,
      default: () => [],
    },
    changeValue: null,
  },
  components: {
    FooterComponent: () => import("@/components/FooterEdit/FooterComponent"),
  },
  computed: {
    
  },
  data() {
    return {};
  },
  methods: {
    addItem() {
      let newValue = [...this.items, undefined]
      this.$emit('input', newValue)
    },
    onUpdate(newValue, idx) {
      const clonedItems = _.cloneDeep(this.items)
      clonedItems[idx] = newValue
      this.$emit('input', clonedItems)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>