# Разработка

```shell
pnpm install
pnpm dev
pnpm typecheck
```

# Сборка

Демо:

```shell
pnpm build
```

Библиотека:

```shell
pnpm build:library
pnpm pack --dry-run
```

`build:library` собирает пакет в `lib/`. Каталог очищается Vite перед новой сборкой и не хранится в git.

# GitHub Pages

Локально production-сборку для GitHub Pages можно проверить так:

```shell
pnpm build:ph-pages
```

Публиковать отдельную ветку `gh-pages` вручную не нужно. Push в `master` запускает `.github/workflows/gh-pages.yml`, который собирает demo и публикует `dist/` через GitHub Pages Actions.

# Публикация пакета в npm

Перед публикацией авторизоваться в npm registry:

```shell
npm login
npm whoami
```

Перед beta-релизом обновить версию пакета, например `3.0.0-beta.1`, затем проверить сборку:

```shell
pnpm typecheck
pnpm build:library
pnpm publish --dry-run --tag beta
```

Публикация beta:

```shell
pnpm publish --tag beta
```

`--tag beta` обязателен для prerelease, чтобы версия не стала `latest`.

Установка beta-версии:

```shell
pnpm add vue-dlg@beta
```
