<script>

import DlgWindowActionTemplate from './DlgWindowActionTemplate';

export default {
  name: 'DlgWindowActionMixin',
  props: {
    theme:          { type: String,   default: ''         },
    closeBtn:       { type: Boolean,  default: true       },
    title:          { type: String,   required: true      },
    okLabel:        { type: String,   default: ''         },
    cancelLabel:    { type: String,   default: ''         },
  },
  components: {
    DlgWindowActionTemplate,
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
