
import TemplateDialogCardPrompt from './TemplateDialogCardPrompt';

// action prompt
export default (dlgStoreObj) => {
  // 
  return ({ title = '', message= '', onSubmit= null }) => {
    const modal = dlgStoreObj.add(TemplateDialogCardPrompt, {
        title: title,
        message: message,
        theme: 'success',
        okLabel: 'Ok',
        cancelLabel: 'Отмена',
        onSubmit(event) {
          console.log('onSubmit', event);
          onSubmit && onSubmit(event);
          // props.onNegative && props.onNegative(event);
          modal.close();
        },
        onPositive(event) {
          // TODO: fix - всплытие лишнего события в компоненте DialogCardPrompt
          console.log('onPositive', event);
        },
        onNegative(event) {
          console.log('onNegative', event);
          // props.onNegative && props.onNegative(event);
          modal.close();
        }
      },
      { group: 'modal', theme: 'prompt' }
    );
    return modal;
  };
};