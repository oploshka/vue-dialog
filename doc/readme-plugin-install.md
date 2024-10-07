

<details>
<summary><b style="font-size: 1.3em;">group-settings.js</b></summary>

```js
//
import {addGroupSetting} from "vue-dlg/src/DlgGroupSettings";

// задаем настройки для разных групп
addGroupSetting('modal', {
  // максимальное количество модальных окон на экране в этой группе
  maxDisplayItem: 1,
  // показывать overlay?
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});
```

</details>

<details>
<summary><b style="font-size: 1.3em;">action.js</b></summary>

```js
// Тонкий клиент
import VueDlgThinClient from 'vue-dlg/src/DlgThinClient';
// Темплейты модальных окон
import DialogBox        from "vue-dlg/src/Template/DialogBox";
import DialogNotify     from "vue-dlg/src/Template/DialogNotify";

// настраиваем список модальных окон
export default {
  open: VueDlgThinClient, // function (VueComponent, VueComponentProps, setting)

  alert: {
    success: (message) => {
      return VueDlgThinClient(
              DialogBox,
              { title: "Успешно", message: message, okLabel: 'Ok', theme: "success", },
              { group: 'modal' }
      );
    },
    warning: (message) => {
      return VueDlgThinClient(
              DialogBox,
              { title: "Предупреждение", message: message, okLabel: 'Ok', theme: "warning" },
              { group: 'modal' }
      );
    },
    error: (message) => {
      return VueDlgThinClient(
              DialogBox,
              { title: "Ошибка", message: message, okLabel: 'Ok', theme: "error" },
              { group: 'modal' }
      );
    },
  },

  confirm(message, options = {}){
    return VueDlgThinClient(
            DialogBox,
            {
              title: "Подтвердите действие",
              message: message,
              okLabel: (options && options.okLabel) ? options.okLabel : 'Ok',
              cancelLabel: (options && options.cancelLabel) ? options.cancelLabel : 'Отмена',
            },
            { group: 'modal' }
    );
  },

  notify: (title, message) => {
    return VueDlgThinClient(
            DialogNotify,
            { title: title, message: message },
            { group: 'notify' }
    );
  }
};
```

</details>

<details>
<summary><b style="font-size: 1.3em;">style.scss</b></summary>

```scss

.dlg .dlg-overlay {
  background: var(--dlg-overlay, rgba(0,0,0,0.5));
  cursor: default;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dlg .dlg-container{
  pointer-events: none;
  & > div {
    pointer-events: all;
  }
}

.dlg .dlg-container.dlg-container-notify{
  position: fixed;
  left: 10px;
  top: 10px;
  width: 320px;
  z-index: 420;

  & > div {
    margin-bottom: 5px;
  }
  & > div:last-child {
    margin-bottom: 0px;
  }

}


.dlg .dlg-container.dlg-container-modal {

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;

  overflow: hidden;
  opacity: 1;

  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;


  & > div {
    width: 100%;
    max-width: 740px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  & > div:last-child {
    margin-bottom: 0px;
  }
}
```

</details>

<details>
<summary><b style="font-size: 1.3em;">index.js</b></summary>

```js
// Подключаем плагин
import vueDlgPlugin from "vue-dlg/src/plugin";

// настройки модальных групп
import "./group-settings";
// задаем стили
import './style.scss';
// список настроенных действий
import dialogAction from "./action";

// опционально можно сделать глобальным
// global.DIALOG = dialogAction;

// фасад для установки плагина (чтоб не перегружать основной main.js) 
export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};
```

</details>

