<template>
  <div>
    <div class="d-flex align-items-stretch">
      <div class="input-group-text">{{prefix}}</div>
      <div>
        <vue-editor
          :editorOptions="editorSettings"
          :useCustomImageHandler="true"
          @image-added="handleImageAdded"
          v-model="inputValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    //   {value: "", langId: '' }
    value: Object,
  },
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: true,
        },
      },
    };
  },
  computed: {
    prefix() {
      const lang = this.$store.getters["language/getLanguage"](
        this.value.langId
      );
      return lang.slug;
    },
    inputValue: {
      get() {
        return this.value.value;
      },
      set(val) {
        this.$emit("input", { ...this.value, value: val });
      },
    },
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log("wtf");
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data: result } = await this.$api.post(
          "uploadImage",
          null,
          formData
        );
        let url = result.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lang-editor-prefix {
  width: 40px;
  text-align: center;
  display: block;
  flex-shrink: 0;
}
</style>