<template>
  <div
    class="dlg-template dlg-template-simple-message dtsm"
    :class="{ ['dlg-template-' + theme]: !!theme }"
  >
    <div class="dtsm-title">
      <div class="dtsm-title__info notify-title">
        <!--<img-->
        <!--  v-if="theme === 'success'"-->
        <!--  class="notify-title__icon"-->
        <!--  svg-inline-->
        <!--  src="@img/icon/tick-circle.svg"-->
        <!--/>-->
        <!--<img-->
        <!--  v-else-->
        <!--  class="notify-title__icon"-->
        <!--  svg-inline-->
        <!--  src="@img/icon-norm/exclamation-circle.svg"-->
        <!--/>-->
        <span class="notify-title__text">{{ title }}</span>
      </div>
      <div
        class="dtsm-title__btn pointer"
        @click="$emit('close', { action: 'CLOSE' })"
      >
        <!--<img svg-inline src="@img/icon-window/close.svg" />-->
      </div>
    </div>
    <div class="dtsm-message">{{ message }}</div>
    <a v-if="link" class="dtsm-link pointer" @click="redirectTo">{{
      link.title
    }}</a>
  </div>
</template>

<script>
export default {
  name: 'TemplateDialogNotify',
  props: {
    theme: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: Object,
      default: null,
    },
  },

  methods: {
    redirectTo() {
      // this.$router.push({ name: pageName.ACTIVE_REGISTER, params: {id} });
      // this.$emit('close', {action: 'CLOSE'});
    },
  },
  mounted() {
    // TODO: update timer logic
    setTimeout(() => {
      this.$emit('close', { action: 'CLOSE' });
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.dtsm {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 24px;
  color: #181a35;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  gap: 8px;

  .dtsm-title {
    display: flex;
    justify-content: space-between;
  }
  .dtsm-title__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
  .dtsm-message {
    font-size: 14px;
  }
  .dtsm-link {
    color: var(--color-primary);
    font-size: 14px;
  }
  .notify-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .notify-title__text {
    font-weight: 600;
    font-size: 16px;
  }
}
.dlg-template-success {
  background: #eefff4;
  border-left-color: var(--color-state-available-text);

  .notify-title__icon {
    path {
      fill: var(--color-state-available-text);
    }
  }
}
.dlg-template-warning {
  background: #fff5ea;
  border-left-color: var(--color-orange);
  .notify-title__icon {
    path {
      fill: var(--color-orange);
    }
  }
}
.dlg-template-info {
  background: #e1f6ff;
  border-left-color: var(--color-primary-accent-dark);
  .notify-title__icon {
    path {
      fill: var(--color-primary-accent-dark);
    }
  }
}
.dlg-template-error {
  background: #fff3f3;
  border-left-color: var(--color-attention);

  .notify-title__icon {
    path {
      fill: var(--color-attention);
    }
  }
}
</style>
