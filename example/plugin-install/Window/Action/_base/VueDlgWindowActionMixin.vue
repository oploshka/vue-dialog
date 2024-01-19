<script>

import VueDlgWindowActionTemplate from './VueDlgWindowActionTemplate';

export default {
  name: 'VueDlgWindowActionMixin',
  props: {
    theme:          { type: String,   default: ''         },
    closeBtn:       { type: Boolean,  default: true       },
    title:          { type: String,   required: true      },
    okLabel:        { type: String,   default: ''         },
    cancelLabel:    { type: String,   default: ''         },
  },
  components: {
    VueDlgWindowActionTemplate,
  },
  computed: {
    actionTemplateBind() {
      return {
        theme:       this.theme,
        closeBtn:    this.closeBtn,
        title:       this.title,
        okLabel:     this.okLabel,
        cancelLabel: this.cancelLabel,
      }
    }
  }
};
</script>
