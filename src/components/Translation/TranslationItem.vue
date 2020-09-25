<template>
  <div class="translation-item border-bottom py-2 px-2">
    <div :class="rowClass">
      <div :class="nameClass" lg="6" v-if="name" @click="toggle">
        <!-- <CInput label="Имя" v-model="modelName" /> -->
        <div>{{ modelName }}</div>
        <CIcon
          :class="{ 'rotate-180': isOpen }"
          name="cil-arrow-circle-bottom"
          v-if="hasChildren"
        />
      </div>
      <div class="pl-2" v-if="isOpen">
        <div key="isObj" v-if="itemType === 'object'">
          <TranslationItem
            v-for="(val, name) in value"
            :name="name"
            v-model="value[name]"
            :key="name"
          />
        </div>
        <div v-if="itemType === 'array'" class="d-flex">
          <TranslationItem
            v-for="(val, idx) in value"
            :open="true"
            v-model="value[idx]"
            :key="idx"
          />
        </div>
        <div v-if="itemType === 'string'">
          <CInput width="300px" class="mb-0" v-model="modelValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TranslationItem",
  props: {
    name: String,
    value: [String, Object, Array, Number],
    open: Boolean,
  },
  created() {
    if (this.itemType === "string") {
      this.isOpen = true;
    }
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  components: {
    TranslationItem: () => import("@/components/Translation/TranslationItem"),
  },
  computed: {
    hasChildren() {
      return this.itemType !== "string";
    },
    nameClass() {
      return {
        "cursor-pointer d-flex align-items-center justify-content-between": this
          .hasChildren,
      };
    },
    rowClass() {
      return {
        "d-flex justify-content-between align-items-center":
          this.itemType === "string",
      };
    },
    itemType() {
      if (Array.isArray(this.value)) return "array";
      return typeof this.value;
    },
    modelName: {
      get() {
        return this.name;
      },
    },
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    onInput(newValue) {
        this.$emit('input', )
    },
    toggle() {
      if (this.itemType === "string" && this.isOpen) return;
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>