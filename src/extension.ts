import * as vscode from 'vscode';

function splitIntoWords(str: string): string[] {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/[-_\s]+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 0);
}

function toCamelCase(words: string[]): string {
    return words
        .map((w, index) => {
            const lower = w.toLowerCase();
            return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

function toPascalCase(words: string[]): string {
    return words
        .map(w => {
            const lower = w.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

function toSnakeCase(words: string[]): string {
    return words.map(w => w.toLowerCase()).join('_');
}

function toConstantCase(words: string[]): string {
    return words.map(w => w.toUpperCase()).join('_');
}

function toKebabCase(words: string[]): string {
    return words.map(w => w.toLowerCase()).join('-');
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('case-converter.convertCase', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Нет активного текстового редактора');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection).trim();

        if (!text) {
            vscode.window.showWarningMessage('Сначала выделите переменную в коде');
            return;
        }

        const words = splitIntoWords(text);
        if (words.length === 0) {
            return;
        }

        // Считываем пользовательские настройки плагина
        const config = vscode.workspace.getConfiguration('caseConverter');
        const enableCamel = config.get<boolean>('enableCamelCase', true);
        const enablePascal = config.get<boolean>('enablePascalCase', true);
        const enableSnake = config.get<boolean>('enableSnakeCase', true);
        const enableConstant = config.get<boolean>('enableConstantCase', true);
        const enableKebab = config.get<boolean>('enableKebabCase', true);
        const showNotification = config.get<boolean>('showSuccessNotification', true);

        // Формируем список вариантов только из тех, что включены в настройках
        const options: { label: string; description: string }[] = [];

        if (enableCamel) {
            options.push({ label: toCamelCase(words), description: 'camelCase' });
        }
        if (enablePascal) {
            options.push({ label: toPascalCase(words), description: 'PascalCase' });
        }
        if (enableSnake) {
            options.push({ label: toSnakeCase(words), description: 'snake_case' });
        }
        if (enableConstant) {
            options.push({ label: toConstantCase(words), description: 'CONSTANT_CASE' });
        }
        if (enableKebab) {
            options.push({ label: toKebabCase(words), description: 'kebab-case' });
        }

        if (options.length === 0) {
            vscode.window.showWarningMessage('Все стили регистра отключены в настройках плагина');
            return;
        }

        const chosen = await vscode.window.showQuickPick(options, {
            placeHolder: 'Выберите целевой стиль для переменной'
        });

        if (chosen) {
            await editor.edit(editBuilder => {
                editBuilder.replace(selection, chosen.label);
            });

            if (showNotification) {
                vscode.window.showInformationMessage(`Стиль изменён на ${chosen.description}`);
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}