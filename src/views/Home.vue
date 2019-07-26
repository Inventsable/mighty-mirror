<template>
  <div class="main-editor-padding" id="main">
    <split-pane
      v-show="!solo"
      v-on:resize="resize"
      id="contents"
      :min-percent="20"
      :default-percent="50"
      split="horizontal"
    >
      <template id="paneL" slot="paneL">
        <editor ref="editorSVG" lang="html" :solo="false" :height="topH" :code="svgsamp" />
      </template>
      <template id="paneR" slot="paneR">
        <editor ref="editorCSS" lang="css" :solo="false" :height="bottomH" :code="csssamp" />
      </template>
    </split-pane>
    <editor
      v-show="solo"
      ref="editorTotal"
      lang="html"
      :solo="true"
      :height="totalH"
      :code="totalsamp"
    />
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
    solo: true,
    totalH: null,
    svgsamp: "",
    csssamp: "",
    totalsamp: ""
    //     svgsamp: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    //   <title>logo</title>
    //   <rect class="cls-1" width="200" height="200"/>
    //   <rect class="cls-2" x="30.75" y="154.59" width="138.51" height="28.54"/>
    //   <polygon class="cls-2" points="30.75 16.55 30.75 45.07 121.88 100.63 30.75 100.63 30.75 129.17 169.26 129.17 169.26 100.63 77.94 44.97 30.75 16.55"/>
    // </svg>`,
    //     csssamp: `.cls-1 {
    //   fill: none;
    // }

    // .cls-2 {
    //   fill: #232323;
    // }`,
    //     totalsamp: `<svg
    //   id="Layer_1"
    //   data-name="Layer 1"
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 87.5 100"
    // >
    //   <defs>
    //     <style>
    //       .cls-1 {
    //         fill: #1697f6;
    //       }
    //       .cls-2 {
    //         fill: #7bc6ff;
    //       }
    //       .cls-3 {
    //         fill: #1867c0;
    //       }
    //       .cls-4 {
    //         fill: #aeddff;
    //       }
    //     </style>
    //   </defs>
    //   <title>Artboard 46</title>
    //   <polyline class="cls-1" points="43.75 0 23.31 0 43.75 48.32" />
    //   <polygon
    //     class="cls-2"
    //     points="43.75 62.5 43.75 100 0 14.58 22.92 14.58 43.75 62.5"
    //   />
    //   <polyline class="cls-3" points="43.75 0 64.19 0 43.75 48.32" />
    //   <polygon
    //     class="cls-4"
    //     points="64.58 14.58 87.5 14.58 43.75 100 43.75 62.5 64.58 14.58"
    //   />
    // </svg>
    // `
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    appSolo() {
      return this.app.solo;
    },
    masterCode() {
      return this.app.masterCode;
    }
  },
  watch: {
    appSolo(state) {
      this.solo = state;
    },
    masterCode(content) {
      // If preferences and not solo, then trigger parse
      const self = this;
      console.log("Total changed");
      if (content) {
        this.forceRedraw(content);
      } else {
        this.totalsamp = "";
      }
      // this.totalsamp = content ? this.forceRedraw(content) : "";
    }
  },
  mounted() {
    const self = this;
    this.app.home = this;
    setTimeout(() => {
      self.resize();
    }, 20);
    console.log("Page mounted");
  },
  methods: {
    forceRedraw(content) {
      const self = this;
      // return new Promise((resolve, reject) => {
      content = content || self.app.masterCode;
      console.log("Force redraw");
      this.totalsamp = self.parseCode(content);
      // self.totalsamp = content
      // ? Promise.resolve(self.parseCode(content))
      // : Promise.resolve("");
      // if (content) {

      // }
      // });
    },
    parseCode(content) {
      console.log("Parsing...");

      // Should be separate
      content = this.app.prefs.noDataNames
        ? content.replace(/data-name\=\"\.[^\"]*\"\s/gm, "")
        : content;
      content = this.app.prefs.noDataNames
        ? content.replace(/\sdata\-name\=\".*\"(?=\>)/gm, "")
        : content;
      content = this.app.prefs.hasClassPrefix
        ? content.replace(/cls\-/gm, `${this.app.prefs.defaultClassPrefix}-`)
        : content;
      content = this.app.prefs.useClasses
        ? this.replaceClasses(content)
        : content;

      // return Promise.resolve(content);
      return content;
    },
    replaceClasses(content) {
      let classLineRX = /\<\w*\sid\=\"\_\.[^\"]*\".*\>/gm;
      let idmatch = /id\=\"\_\.([^\"]*)\"/;
      let classmatch = /class\=\"([^\"]*)\"/;

      let allID = /id\=\"[^\"]*\"\s/gm;
      let allClass = /class\=\"[^\"]*\"/gm;

      let targs = content.match(classLineRX);
      targs.forEach(match => {
        let original = match;
        console.log(match);
        let idmatcher = original.match(idmatch);
        console.log(idmatcher);
        let newclass = idmatcher[1];
        let classmatcher = original.match(classmatch);
        let oldclass = classmatcher[1];
        let classString = `class="${newclass} ${oldclass}"`;
        console.log(classString);
        match = match.replace(allID, "");
        match = match.replace(allClass, classString);

        content = content.replace(original, match);
      });
      console.log("Finished?");
      return content;
    },
    resize() {
      if (!this.solo) {
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
      } else {
        this.$refs.editorTotal.updateEditorSize();
        this.totalH = this.$el.offsetHeight;
      }
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

.theme--dark.v-sheet {
  background-color: var(--color-bg) !important;
}
</style>
