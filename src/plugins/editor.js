import Vue from "vue";
import Vue2Editor from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import { Quill } from "vue2-editor";

Quill.register("modules/imageResize", ImageResize);

Vue.use(Vue2Editor);