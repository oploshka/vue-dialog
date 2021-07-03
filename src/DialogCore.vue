<template>
<div class="vue-plugin-dlg">
  <template v-for="item in items">
    <DialogStructure
      :key="item.key"

      :show="item.show"
      :item="item"

      :componentVue="item.componentVue"
      :componentVueData="item.componentVueData"
      :settings="item.settings"

      @close="onClose"
    />
  </template>
</div>
</template>

<script>

const key = () => `${Date.now()}-${Math.random()}`;
import DialogStructure from './DialogStructure';

export default {
  components: {
    DialogStructure
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    // core
    open(componentVue, componentVueData, settings = {}) { //   {title, cancelLabel, prompt, size, okLabel = 'OK'}
      let _settings = Object.assign({
        theme: '',
        preCloseHook: () => { return true; },
        close: {}
      }, settings);

      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      return new Promise(resolve => {
        const item = {
          //
          resolve,
          //
          key: key(),
          show: true,
          settings: _settings,
          componentVue,
          componentVueData,
        };
        this.items.push(item);
      });
    },
    remove(item) {
      let i = this.items.indexOf(item);
      if (i >= 0) {
        this.items.splice(i, 1);
      }
    },
    onClose(item, closeData) {
      try {
        if(!item.settings.preCloseHook(closeData)) {
          return;
        }
      } catch (e) {
        console.error('[DIALOG:preCloseHook]', item, closeData);
      }

      item.resolve(closeData);
      item.show = false;
      this.remove(item);
    },
    keyUp(e) {
      if ('Escape' === e.key) {
        if (this.items.length > 0) {
          this.onClose(this.items[this.items.length - 1]);
        }
      }
    }
  },
  created() {
    window.addEventListener('keyup', this.keyUp);
  }
};
</script>
