<template>
  <div class="main-editor-container">
    <!-- <div :style="getPaddingStyle()"></div> -->
    <MonacoEditor
      id="realEditor"
      ref="editor"
      :focusable="!isSyncing"
      :disabled="!isSyncing"
      :width="editorW"
      :height="editorH"
      :theme="theme"
      :language="lang"
      :options="options"
      @change="onChange"
      @focus="seeFocus"
      :value="code"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "editor",
  components: {
    MonacoEditor
  },
  props: {
    lang: String,
    height: Number,
    code: String,
    solo: Boolean
  },
  data: () => ({
    theme: "vs-dark",
    editor: null,
    editorH: 250,
    editorW: 700,
    // code: "",
    colors: {
      dark: {
        bg: "#2e2e2e",
        editor: "#1e1e1e",
        activeLine: "#262626",
        syntax: [
          "#d4d4d4",
          "red",
          "green",
          "#fca369",
          "#98c379",
          "#d09966",
          "#676767",
          // "#b17cb6",
          "#f2777a", // 8
          // "#56b7c2",
          "#cdcdcd",
          "#cdcdcd",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "#d09966",
          "#50a14e",
          "",
          "#69addf"
        ]
      },
      light: {
        bg: "#fff",
        editor: "#fafbfc",
        activeLine: "#f3f3f3",
        syntax: [
          "#101010",
          "red",
          "green",
          "violet",
          "orange",
          "#4f72b7",
          "#e45649",
          "#9ea0a6",
          "yellow",
          "red",
          "#E45649",
          "",
          "",
          "#c0852b",
          "",
          "",
          "",
          "",
          "#d09966",
          "#50a14e",
          "",
          "#9d3895"
        ]
      }
    },
    options: {
      //Monaco Editor Options
      glyphMargin: true,
      scrollBeyondLastLine: false,
      lineDecorationsWidth: "6px",
      lineNumbersMinChars: 4,
      autoIndent: true,
      formatOnPaste: true,
      // readOnly: true,
      formatOnType: true
    }
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    contents() {
      return this.editor ? this.editor.getValue() : null;
    },
    selection() {
      return this.editor
        ? this.editor.getModel().getValueInRange(this.editor.getSelection())
        : null;
    },
    isSyncing() {
      return this.app.toolbar ? this.app.toolbar.isSyncing : null;
    }
  },
  watch: {
    theme(value) {
      this.updateTheme();
    }
  },
  async mounted() {
    const self = this;
    if (!this.solo) {
      let currLang = /css/.test(this.lang) ? "CSS" : "SVG";
      this.app[`editor${currLang}`] = this;
    } else {
      console.log("Mounted solo");
      this.app.editorTotal = this;
    }
    this.editor = this.$refs.editor._getEditor();
    // this.setDefaultLibsToFalse();
    window.addEventListener("resize", this.updateEditorSize);
    this.updateEditorSize();
    this.updateTheme();
    // this.createActions();
    console.log("Editor mounted");
  },
  methods: {
    seeFocus() {
      console.log("Focus was on");
      if (this.isSyncing) this.editor.blur();
    },
    focus() {
      this.editor.focus();
    },
    getPaddingStyle() {
      let str = `padding-top: 6px; width: 100%;`;
      str += `background-color: ${this.app.getCSS("color-editor")};`;
      return str;
    },
    createActions() {
      // this.editor.addAction({
      //   id: "open",
      //   label: "Open Snippet",
      //   precondition: null,
      //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O],
      //   keybindingContext: null,
      //   contextMenuGroupId: "io",
      //   contextMenuOrder: 1.6,
      //   run: async function(ed) {
      //     // self.app.toolbar.promptOpenDialog();
      //     return null;
      //   }
      // });
    },
    toggleTheme() {
      if (/dark/.test(this.theme)) this.theme = "vs";
      else this.theme = "vs-dark";
      monaco.editor.setTheme(this.theme);
    },
    updateEditorSize() {
      // console.log(`${this.lang} ==  ${this.height}`);
      this.editorW = this.$el.offsetWidth;
      if (!this.height) {
        if (!this.solo) {
          let parent = document.getElementById("contents");
          this.editorH = /css/.test(this.lang)
            ? parent.children[2].offsetHeight - 6
            : parent.children[0].offsetHeight - 6;
        } else {
          let parent = document.getElementById("main");
          this.editorH = parent.offsetHeight - 6;
        }
      } else {
        this.editorH = this.height - 6;
      }

      // this.editorH = this.$el.offsetHeight / 2;
    },

    onChange(value) {
      if (!this.doc) window.localStorage.setItem("code", value);
      else {
        // No changes should be made?
      }
    },
    updateTheme() {
      let isDark = /dark/.test(this.theme);
      let active = isDark ? "dark" : "light";

      // this.app.setCSS("color-bg", this.colors[active].bg);
      this.app.setCSS("color-editor", this.colors[active].editor);
      this.app.setCSS("color-active-line", this.colors[active].activeLine);
      this.colors[active].syntax.forEach((entry, i) => {
        this.app.setCSS(`mtk${i + 1}`, entry);
      });
    }
  }
};
</script>

<style>
.mtk1 {
  color: var(--mtk1) !important;
}

.mtk2 {
  color: var(--mtk2) !important;
}

.mtk3 {
  color: var(--mtk3) !important;
}

.mtk4 {
  color: var(--mtk4) !important;
}

.mtk5 {
  /* String */
  color: var(--mtk5) !important;
}

.mtk6 {
  /* Number */
  color: var(--mtk6) !important;
}

.mtk7 {
  color: var(--mtk7) !important;
}

.mtk8 {
  /* Keyword like let/var JS */
  /* tags for HTML */
  color: var(--mtk8) !important;
}

.mtk9 {
  /* Default */
  color: var(--mtk9) !important;
}

.mtk10 {
  /* Default */
  color: var(--mtk10) !important;
}

.mtk10 {
  /* Default */
  color: var(--mtk10) !important;
}
.mtk11 {
  color: var(--mtk11) !important;
}
.mtk12 {
  color: var(--mtk12) !important;
}
.mtk13 {
  color: var(--mtk13) !important;
}
.mtk14 {
  color: var(--mtk14) !important;
}
.mtk15 {
  color: var(--mtk15) !important;
}
.mtk16 {
  color: var(--mtk16) !important;
}
.mtk17 {
  color: var(--mtk17) !important;
}
.mtk18 {
  color: var(--mtk18) !important;
}
.mtk19 {
  color: var(--mtk19) !important;
}
.mtk20 {
  color: var(--mtk20) !important;
}
.mtk21 {
  color: var(--mtk21) !important;
}
.mtk22 {
  color: var(--mtk22) !important;
}

.main-editor-container {
  box-sizing: border-box;
  /* border: 2px solid blue; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.current-line {
  border: 0px solid transparent !important;
  background-color: var(--color-active-line);
}

.myGlyphMarginClass {
  background: transparent;
  border-style: solid;
  border-color: var(--color-note-margin);
  border-width: 0px 4px 0px 0px;
}
.myContentClass {
  background: var(--color-note-label);
}
#realEditor {
  padding-top: 6px;
}
</style>
