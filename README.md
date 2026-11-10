# Case Style Extension

Расширение для Visual Studio Code, позволяющее быстро преобразовывать стиль наименования выделенных переменных, констант и функций в различные регистры кода.

## Возможности

- Преобразование любого выделенного идентификатора в:
  - `camelCase`
  - `PascalCase`
  - `snake_case`
  - `CONSTANT_CASE`
  - `kebab-case`
- Корректное разбиение составных слов независимо от исходного стиля.
- Интерактивный выбор целевого стиля через всплывающее меню.

## Настройки расширения

Расширение предоставляет графический интерфейс управления параметрами через стандартные настройки VS Code (`Preferences: Open Settings` -> `Extensions` -> `Case Converter`):

- `caseConverter.showSuccessNotification`: Показывать всплывающее уведомление после успешного изменения регистра.
- `caseConverter.enableCamelCase`: Включение/отключение стиля `camelCase` в меню выбора.
- `caseConverter.enablePascalCase`: Включение/отключение стиля `PascalCase` в меню выбора.
- `caseConverter.enableSnakeCase`: Включение/отключение стиля `snake_case` в меню выбора.
- `caseConverter.enableConstantCase`: Включение/отключение стиля `CONSTANT_CASE` в меню выбора.
- `caseConverter.enableKebabCase`: Включение/отключение стиля `kebab-case` в меню выбора.

Все параметры автоматически сохраняются в пользовательском профиле настроек (`settings.json`).

## Использование

1. Выделите имя переменной в редакторе кода.
2. Откройте палитру команд: `Cmd + Shift + P` (macOS) или `Ctrl + Shift + P` (Windows/Linux).
3. Введите `Case Converter: Change Variable Style` и нажмите `Enter`.
4. Выберите требуемый регистр из предложенного списка.