<script>
export default {
  props: {
    // theme: {
    //   type: String,
    //   default: ''
    // },
    // preCloseHook: {
    //   type: Function,
    //   default: true
    // },
    // closeOnClick  : false,
    duration: {
      type: Number,
      default: -1
    },
  },
  methods: {
    close(data = {}) {
      // try {
      //   if(!this.preCloseHook(data)) {
      //     return;
      //   }
      // } catch (e) {
      //   console.error('[DIALOG:preCloseHook]', this, data);
      // }
      this.$emit('close', data);
    }
  }
};
</script>
