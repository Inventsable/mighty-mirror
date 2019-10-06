<template>
  <div id="vbwindow">
    <vb-window
      v-model="open"
      :top="100"
      :left="100"
      :active="0"
      :tabs="['tab1', 'tab2', 'tab3']"
      mode="tab"
      @close="open = false"
    >
      <vb-window-item class="items">
        <h2>item1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </vb-window-item>
      <vb-window-item class="items">
        <h2>item2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </vb-window-item>
      <vb-window-item class="items">
        <h2>item3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </vb-window-item>
    </vb-window>
    <button id="toggle_window" :class="{open}" @click="onClickButton">{{ open ? 'Close' : 'Open' }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true
    };
  },
  methods: {
    onClickButton: function() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="stylus">
.items {
  padding: 20px;
  color: #888;

  h2 {
    margin-top: 0;
  }
}

#toggle_window {
  margin: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 200;
  transition: background 0.1s linear;

  &:focus {
    outline: 0;
  }
}
</style>