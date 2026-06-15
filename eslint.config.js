// eslint.config.js
import sharedConfig from 'eslint-plugin-oploshka';

//
// файл .eslintignore не работает в ESLint 9. Он был устаревшим в пользу новой системы конфигурации (Flat Config),
// которая используется по умолчанию в этой версии.
// Вместо него для игнорирования файлов и каталогов нужно использовать свойство ignorePatterns в файле конфигурации ESLint

export default [
  ...sharedConfig,
  {
    rules: {
      // Отключаем правило: "off" или 0
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];