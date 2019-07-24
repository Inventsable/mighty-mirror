<template>
  <div class="main-editor-padding">
    <split-pane
      v-on:resize="resize"
      id="contents"
      :min-percent="20"
      :default-percent="50"
      split="horizontal"
    >
      <template id="paneL" slot="paneL">
        <editor ref="editorSVG" lang="html" :height="topH" :code="svgsamp" />
      </template>
      <template id="paneR" slot="paneR">
        <editor ref="editorCSS" lang="css" :height="bottomH" :code="csssamp" />
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";
import editor from "../components/editor/editor";

export default {
  components: {
    editor,
    "split-pane": splitPane
  },
  data: () => ({
    bottomH: null,
    topH: null,
    svgsamp: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <title>logo</title>
  <rect class="cls-1" width="200" height="200"/>
  <rect class="cls-2" x="30.75" y="154.59" width="138.51" height="28.54"/>
  <polygon class="cls-2" points="30.75 16.55 30.75 45.07 121.88 100.63 30.75 100.63 30.75 129.17 169.26 129.17 169.26 100.63 77.94 44.97 30.75 16.55"/>
</svg>`,
    csssamp: `.cls-1 {
  fill: none;
}

.cls-2 {
  fill: #232323;
}`
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  mounted() {
    this.resize();
  },
  methods: {
    resize() {
      let parent = document.getElementById("contents");
      let paneL = document.getElementById("contents").children[0];
      let paneR = document.getElementById("contents").children[2];
      console.log(
        `${parent.offsetHeight} = ${paneL.offsetHeight} + ${paneR.offsetHeight}`
      );
      parent.children[1].style.opacity = 1;
      // parent.children[1].style.margin = "0px";
      // parent.children[1].style.border = "0px solid var(--color-bg)";
      // parent.children[1].style.height = `2px`;
      parent.children[1].style.borderColor = `transparent`;
      parent.children[1].style.backgroundColor = `var(--color-bg)`;
      this.bottomH = paneR.offsetHeight;
      this.topH = paneL.offsetHeight;
      this.$refs.editorSVG.updateEditorSize();
      this.$refs.editorCSS.updateEditorSize();
    }
  }
};
</script>

<style>
.main-editor-padding {
  width: 100vw;
  height: calc(100vh - var(--bar-offset));
  background-color: var(--color-editor);
}
</style>
