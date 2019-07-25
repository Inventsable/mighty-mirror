<template>
  <v-toolbar max-height="44px" dense :color="app.getCSS('color-input')">
    <v-spacer></v-spacer>
    <!-- <v-btn-toggle flat v-model="toggle_multiple" multiple>
      <v-btn small :value="1" text>
        <v-icon small>format_bold</v-icon>
      </v-btn>

      <v-btn small :value="2" text>
        <v-icon small>format_italic</v-icon>
      </v-btn>

      <v-btn small :value="3" text>
        <v-icon small>format_underlined</v-icon>
      </v-btn>

      <v-btn small :value="4" text>
        <v-icon small>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>-->
    <v-btn small text :loading="isSaving" @click="grabDoc">
      <v-icon>mdi-download</v-icon>
    </v-btn>
    <v-btn small text :disabled="!isSyncing" @click="isSyncing = false">
      <v-icon>mdi-cancel</v-icon>
    </v-btn>
    <v-btn small text :loading="isSyncing" @click="isSyncing = !isSyncing">
      <v-icon>mdi-sync</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
const require = require || cep_node.require;
const fs = require("fs");

export default {
  name: "toolbar",
  data: () => ({
    toggle_multiple: [1],
    isSyncing: false,
    isSaving: false
  }),
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
  methods: {
    grabDoc() {
      const self = this;
      this.isSaving = true;
      let path = `${this.app.identity.root}/src/temp`;
      this.app.csInterface.evalScript(`quickExportSVG('${path}')`, name => {
        self.isSaving = false;
        self.app.masterCode = fs.readFileSync(name, { encoding: "utf-8" });
      });
    }
  }
};
</script>
