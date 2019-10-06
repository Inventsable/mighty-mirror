<template>
  <div></div>
</template>

<script>
export default {
  name: "timer",
  props: {
    isSyncing: Boolean
  },
  data: () => ({
    timers: [],
    lastPathItemCount: null
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    active() {
      return document.activeElement;
    }
  },
  watch: {
    isSyncing(state) {
      if (state) this.setTimers();
      else this.clearTimers();
    },
    active(content) {
      console.log(content);
    }
  },
  methods: {
    clearTimers() {
      this.timers.forEach(timer => {
        clearInterval(timer);
      });
      this.timers = [];
      console.log("Cleared");
    },
    setTimers() {
      const self = this;
      this.timers.push(this.startPathItemScanner());

      // this.timers.push(this.startElementFocusTimer());
      // this.timers.push(this.startSimpleTimer());

      // this.$worker
      //   .run(
      //     str => {
      //       setInterval(() => {
      //         alert("Hello");
      //       }, 200);
      //       return "Hello?";
      //     },
      //     ["Hello"]
      //   )
      //   .then(console.log) // logs 'this.$worker run 2: Another function in other thread'
      //   .catch(console.error); // logs any possible error

      // if (window.Worker) {
      //   let myWorker = new Worker("worker.js");

      //   myWorker.postMessage([23, 42]);
      //   console.log("Message posted to worker");

      //   myWorker.onmessage = function(e) {
      //     result.textContent = e.data;
      //     console.log("Message received from worker");
      //   };
      // } else {
      //   console.log("Nope");
      // }
    },
    startPathItemScanner() {
      const self = this;
      return setInterval(() => {
        self.app.csInterface.evalScript("getPathItemCount()", res => {
          if (res !== self.lastPathItemCount) {
            self.lastPathItemCount = res;
            this.triggerRescan();
          }
        });
      }, 1000);
    },
    startElementFocusTimer() {
      return setInterval(() => {
        console.log(document.activeElement);
      }, 500);
    },
    startSimpleTimer() {
      return setInterval(() => {
        console.log("Scanning");
      }, 500);
    },
    triggerRescan() {
      console.log("CHANGE DETECTED.");
      Promise.resolve(this.app.toolbar.grabDoc());
    }
  }
};
</script>
