<template>
  <v-dialog v-model="state" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card id="preferences">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="state = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox class="mt-3" v-model="hasClassPrefix" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-text-field
              :disabled="!hasClassPrefix"
              v-model="defaultClassPrefix"
              spellcheck="false"
              hide-details
              label="Prefix to use for unnamed classes"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="ignoreImages" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>No Images</v-list-item-title>
            <v-list-item-subtitle>
              Strip any base-64
              <code class="mx-1 py-1">image</code> elements from results
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="useClasses" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto Classes</v-list-item-title>
            <v-list-item-subtitle>Any item whose name begins with a period is assigned as a class</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="noDataNames" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Remove data-name</v-list-item-title>
            <v-list-item-subtitle>
              Strip
              <code class="mx-1 py-1">data-name</code> attribute from results
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="forVue" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create as Vue File</v-list-item-title>
            <v-list-item-subtitle>Create boilerplate as standalone .vue file</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    state: false,
    ignoreImages: false,
    hasClassPrefix: true,
    defaultClassPrefix: "logo",
    useClasses: true,
    noDataNames: false,
    forVue: false,
    hasPreview: false,
    hasPrettier: false,
    isMounted: false
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    prefs() {
      const self = this;
      let prefs = {
        hasClassPrefix: self.hasClassPrefix,
        defaultClassPrefix: self.defaultClassPrefix,
        ignoreImages: self.ignoreImages,
        useClasses: self.useClasses,
        noDataNames: self.noDataNames,
        forVue: self.forVue,
        hasPreview: self.hasPreview,
        hasPrettier: self.hasPrettier
      };
      if (this.isMounted) {
        window.localStorage.setItem("prefs", JSON.stringify(prefs));
        this.app.prefs = prefs;
      }
    }
  },
  watch: {
    prefs(content) {
      this.app.prefs = content;
    }
  },
  mounted() {
    this.app.preferencedialog = this;
    if (window.localStorage.getItem("prefs"))
      this.assignPrefs(JSON.parse(window.localStorage.getItem("prefs")));
    this.isMounted = true;
  },
  methods: {
    assignPrefs(prefs) {
      console.log("Updating prefs");
      this.hasClassPrefix = prefs.hasClassPrefix;
      this.defaultClassPrefix = prefs.defaultClassPrefix;
      this.ignoreImages = prefs.ignoreImages;
      this.useClasses = prefs.useClasses;
      this.noDataNames = prefs.noDataNames;
      this.forVue = prefs.forVue;
      this.hasPreview = prefs.hasPreview;
      this.hasPrettier = prefs.hasPrettier;
    }
  }
};
</script>
<style>
#preferences {
  /* border: 2px solid red; */
  font-size: 16px;
}

.v-application code {
  background-color: var(--color-input);
  color: #d09862;
}
</style>

