<template>
  <div :style="{width: width}">
    <file-upload
      class="upload w-100"
      ref="upload"
      v-model="files"
      :custom-action="doUpload"
      :drop="true"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      <CImg class="upload-image" :src="value" maxWidth="100%" v-if="value" />
      <CIcon name="cil-cloud-upload" width="100%" v-else :style="{maxWidth: '300px'}"/>
    </file-upload>
  </div>
</template>

<script>
export default {
  props: {
    // url
    value: String,
    width: String
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    async doUpload(file, component) {
      try {
        const formData = new FormData();
        console.log(file);
        formData.append("image", file.file);
        const { data: result } = await this.$api.post(
          "uploadImage",
          null,
          formData
        );
        this.$emit("input", result.url);
      } catch (err) {
        this.$error(err)
      }
    },
    inputFile(newFile, oldFile) {
      this.$refs.upload.active = true;

      // if (newFile && oldFile && !newFile.active && oldFile.active) {
      //   console.log('hey', newFile)
      // }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     */
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent();
        }
      }

      // Create a blob field
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  cursor: pointer;
}
.upload-image {
  max-width: 100%;
  cursor: pointer;
}
</style>