
# История проекта

## С чего все началось
Данное решение основано на [v-slim-dialog](https://github.com/paliari/v-slim-dialog).
Данный плагин был просто взят за основу и практически переписан полностью.
Данное решение связано с простотой данного плагина и я не сильно хотел верстать и писать стили.
Pug был конвертирован в html, stylus в scss (это дело вкуса).
Длинные имена классов переименованы в более короткие.
Добавлена возможность конфигурировать стили и расширен функционал.

## Погружение в создание плагина
Для создания данного плагина использовалось данное руководство
https://habr.com/ru/post/516250/
с небольшими доработками

#### Размер
Данный плагин в сбилженной версии занимает ~15Кб, а сами исходники без сжатия ~10Кб.
Странный парадокс, но интеграции не сбилженной версии лучше.
Возможно, нужно собирать по другому (буду рад узнать как).

## Начало 2022
На судьбу плагина повлияла миграция на Vue 3 и некоторые идеи были взяты из
[vue3-notification](https://github.com/kyvg/vue3-notification).

# 2023 Август
Куча не законченных изменения (с октября 2022) и попытки уйти от promise, приводят к уходу от ленивой загрузки
в сторону формирования мини store и computed.
Дополнительно пересмотрел инициализацию плагина в сторону модульного подхода.

# 2023 ~Октябрь
Переработка папки plugin install

# 2024 Январь
Продолжаем переработку plugin install. Начало внедрения анимаций/эффектов.