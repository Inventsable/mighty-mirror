<template>
  <v-toolbar style="max-height: 56px;" :color="app.getCSS('color-input')">
    <v-btn icon dark small @click="openPrefs">
      <v-icon small>mdi-settings</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn small text :loading="isSaving" @click="grabDoc">
      <v-icon>mdi-download</v-icon>
    </v-btn>
    <v-btn small text :disabled="!isSyncing" @click="isSyncing = false">
      <v-icon>mdi-cancel</v-icon>
    </v-btn>
    <v-btn small text :loading="isSyncing" @click="isSyncing = !isSyncing">
      <v-icon>mdi-sync</v-icon>
    </v-btn>
    <timer :isSyncing="isSyncing" />
  </v-toolbar>
</template>

<script>
import timer from "@/components/timer";
const require = require || cep_node.require;
const fs = require("fs");

export default {
  name: "toolbar",
  data: () => ({
    toggle_multiple: [1],
    isSyncing: false,
    isSaving: false
  }),
  components: {
    timer
  },
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  watch: {
    isSyncing(state) {
      this.app.isSyncing = state;
    }
  },
  mounted() {
    this.app.toolbar = this;
  },
  methods: {
    openPrefs() {
      this.app.preferencedialog.state = true;
    },
    grabDoc() {
      const self = this;
      // self.app.masterCode = "";
      this.isSaving = true;
      let path = `${this.app.identity.root}/src/temp`;
      return new Promise((resolve, reject) => {
        self.app.csInterface.evalScript(`quickExportSVG('${path}')`, name => {
          self.isSaving = false;
          // self.app.masterCode = fs.readFileSync(name, { encoding: "utf-8" });
          fs.readFile(name, "utf-8", (err, data) => {
            // console.log(data);
            // resolve();
            self.app.masterCode = data;
            self.app.home.forceRedraw();
          });
        });
      });
    }
  }
};
</script>
