<template>
  <div class="dlg" :class="groupClass">

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container">
        <component
          :is="modalObj[groupName].settings.group"
          :class="'dlg-group dlg-group__' + groupName"
          :modalList="modalObj[groupName].list"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">

// ts type
import type { PropType } from 'vue';
import type {tDlgGroupSettingsFullMap, tDlgGroupSettingsMap} from "../tsType/DlgType.ts";
//
import { defineComponent} from 'vue';
//
import DlgGroupSettingsDefault from './DlgGroupSettingsDefault'

export default defineComponent({
  name: 'DlgCore',
  props: {
    $dialogStore:    { type: Object },

    /**
     * {
     *   // настройки для группы
     *   [groupKey]: {
     *     maxDisplayItem: 1,
     *     // overlay
     *     overlay               : true,
     *     overlayClickClose     : true,
     *     overlayClosePriority  : 100,
     *     // дефолтные настройки для окон в группу
     *     animation: {},
     *     // closeByClick  : false,  - стоит управлять из компонента Template
     *     closeByEscape : false,
     *     wrapper: DlgGroupDefault
     *   }
     * }
     */
    groupSetting: { type: Object as PropType<tDlgGroupSettingsMap> },
  },
  methods: {
    //
    closeModal(modal) {
      this.$dialogStore.removeModal(modal);
    },
    overlayClick() {
      this.$dialogStore.overlayModalRemove();
    },
    // keyUp(e) {
    //   if ('Escape' === e.key) {
    //     if (this.items.length > 0) {
    //       this.onClose(this.items[this.items.length - 1]);
    //     }
    //   }
    // }

    todo() {

      /*
      this.overlayModalRemove = () => {
        if (modalListStore.length === 0) {
          return;
        }

        let removeModalInfoObj = null;
        let removePriority = 0;

        for(let i = 0; i < modalListStore.length; i++) {
          const modal = modalListStore[i];
          //
          const group = modal.getGroup();
          const groupSettings = this.groupSettingNormalized.get(group);

          if(!groupSettings.overlay) {
            continue;
          }
          if(!groupSettings.overlayClickClose) {
            continue;
          }

          //
          if(removeModalInfoObj === null){
            removeModalInfoObj = modal;
            removePriority = groupSettings.overlayClosePriority;
            continue;
          }

          if(removePriority > groupSettings.overlayClosePriority){
            removeModalInfoObj = modal;
            removePriority = groupSettings.overlayClosePriority;
            continue;
          }

        }
        removeModalInfoObj && this.removeModal(removeModalInfoObj);
      },
      */
    }
  },
  computed: {

    groupSettingNormalized(): tDlgGroupSettingsFullMap {
      const groupSettingNormalized = {};

      for (const groupCode in this.groupSetting) {
        groupSettingNormalized[groupCode] = Object.assign(DlgGroupSettingsDefault(), this.groupSetting[groupCode]);
      }

      return groupSettingNormalized;
    },
    /**
     *
     * Возвращаем:
     * {
     *   notify: {
     *     settings: {},
     *     list: [modal1, modal2, modal3]
     *   }
     * }
     */
    modalObj() {
      // Это не реактивное свойство.
      const openedGroup = $dialogStore.getOpenedGroup();

      const modalObj = {};

      // Это необходимо для сохранения анимации удаления последнего элемента
      for (const group in openedGroup) {
        modalObj[group] = {
          settings: this.groupSettingNormalized.get(group),
          list: [],
        };
      }

      // строим полное дерево
      for (let i = 0; i < modalListStore.length; i++) {
        const modal = modalListStore[i];

        const group = modal.getGroup();
        if (!modalObj[group]) {
          modalObj[group] = {
            settings: this.groupSettingNormalized.get(group), // TODO: fix
            list: [],
          };
        }
        modalObj[group].list.push(modal);
      }

      // строим полное дерево
      for (const group in modalObj) {
        // modalObj[group].list.sort(); // TODO: add sorting by index

        const maxDisplayItem = modalObj[group].settings.maxDisplayItem;
        if(modalObj[group].list.length > maxDisplayItem) {
          modalObj[group].list = modalObj[group].list.slice(0, maxDisplayItem);
        }

      }
      return modalObj;
    },


    overlayDisplay() {
      let overlay = false;
      for (let key in this.modalObj) {
        if (!this.modalObj[key].list?.length) {
          continue;
        }
        if (this.modalObj[key].settings.overlay) {
          overlay = true;
          break;
        }
      }
      return overlay;
    },
    groupClass() {
      let classStr = '';
      for(const key in this.modalObj) {
        classStr += 'dlg--open-group--' + key + ' ';
      }
      return classStr;
    },
  },
  // created() {
  //   vueClientSetComponent({
  //     open: this.add,
  //     close: this.remove,
  //   });
  // }
});

</script>
