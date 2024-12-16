"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// Comprehensive list of Shadcn UI components
const SHADCN_COMPONENTS = [
    'Avatar', 'Accordion', 'Alert', 'AlertDialog', 'AspectRatio', 'Badge', 'Breadcrumb', 'Button', 'Calendar', 'Card', 'Carousel', 'Checkbox', 'Collapsible', 'Command', 'ContextMenu',
    'Table', 'Dialog', 'Drawer', 'Form', 'Input', 'Label', 'Menubar', 'Pagination', 'Popover', 'Progress', 'Select', 'Separator', 'Sheet', 'Skeleton', 'Slider', 'Switch', 'Tabs', 'Textarea',
    'Toggle', 'Tooltip', 'DropdownMenu', 'HoverCard', 'InputOTP', 'NavigationMenu', 'RadioGroup', 'ScrollArea', 'ToggleGroup', 'Toaster', 'ResizableHandle', 'ChartContainer'
];
const COMPONENT_NAME_MAP = {
    'DropdownMenu': 'dropdown-menu',
    'HoverCard': 'hover-card',
    'InputOTP': 'input-otp',
    'NavigationMenu': 'navigation-menu',
    'RadioGroup': 'radio-group',
    'ScrollArea': 'scroll-area',
    'Toaster': 'sonner',
    'ToggleGroup': 'toggle-group',
    'ResizableHandle': 'resizable',
    'Avatar': 'avatar',
    'Accordion': 'accordion',
    'Alert': 'alert',
    'AlertDialog': 'alert-dialog',
    'AspectRatio': 'aspect-ratio',
    'Badge': 'badge',
    'Breadcrumb': 'breadcrumb',
    'Button': 'button',
    'Calendar': 'calendar',
    'Card': 'card',
    'Carousel': 'carousel',
    'Checkbox': 'checkbox',
    'Collapsible': 'collapsible',
    'Command': 'command',
    'ContextMenu': 'context-menu',
    'Table': 'table',
    'Dialog': 'dialog',
    'Drawer': 'drawer',
    'Form': 'form',
    'Input': 'input',
    'Label': 'label',
    'Menubar': 'menubar',
    'Pagination': 'pagination',
    'Popover': 'popover',
    'Progress': 'progress',
    'Select': 'select',
    'Separator': 'separator',
    'Sheet': 'sheet',
    'Skeleton': 'skeleton',
    'Slider': 'slider',
    'Switch': 'switch',
    'Tabs': 'tabs',
    'Textarea': 'textarea',
    'Toggle': 'toggle',
    'Tooltip': 'tooltip',
    'ChartContainer': 'chart'
};
function activate(context) {
    // Diagnostic Collection
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('shadcn-ui-quick-fix');
    // Code Action Provider
    const codeActionProvider = vscode.languages.registerCodeActionsProvider(['typescript', 'typescriptreact', 'javascript', 'javascriptreact'], {
        provideCodeActions(document, range, context, token) {
            const codeActions = [];
            // Find the word at the current range
            const wordRange = document.getWordRangeAtPosition(range.start);
            if (!wordRange)
                return codeActions;
            const word = document.getText(wordRange);
            // Check if the word is a Shadcn component
            if (SHADCN_COMPONENTS.includes(word)) {
                const installAction = new vscode.CodeAction(`Install Shadcn UI ${word} Component`, vscode.CodeActionKind.QuickFix);
                installAction.command = {
                    command: 'shadcn-nextjs.installComponent',
                    title: `Install ${word}`,
                    arguments: [word]
                };
                codeActions.push(installAction);
            }
            return codeActions;
        }
    });
    // Install Command
    const installCommand = vscode.commands.registerCommand('shadcn-nextjs.installComponent', async (componentName) => {
        try {
            await installShadcnComponent(componentName);
            // Show success message
            vscode.window.showInformationMessage(`Shadcn UI Component ${componentName} installed successfully!`);
            // Attempt to reload or update the document
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                // Trigger document reload or type checking
                await vscode.commands.executeCommand('typescript.restartTsServer');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to install component: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    // Language feature provider for hover information
    const hoverProvider = vscode.languages.registerHoverProvider(['typescript', 'typescriptreact', 'javascript', 'javascriptreact'], {
        provideHover(document, position, token) {
            const wordRange = document.getWordRangeAtPosition(position);
            if (!wordRange)
                return null;
            const word = document.getText(wordRange);
            // Check if the word is a Shadcn component
            if (SHADCN_COMPONENTS.includes(word)) {
                // Check if component is imported
                const documentText = document.getText();
                const importRegex = new RegExp(`import\\s+{?\\s*${word}\\s*}?\\s+from\\s+['"]@/components/ui/`);
                if (!importRegex.test(documentText)) {
                    return {
                        contents: [
                            new vscode.MarkdownString(`**Shadcn UI Component**`),
                            new vscode.MarkdownString(`Component \`${word}\` not imported. Click to install.`),
                            new vscode.MarkdownString(`[Install ${word}](command:shadcn-nextjs.installComponent?${encodeURIComponent(word)})`)
                        ]
                    };
                }
            }
            return null;
        }
    });
    // Install Shadcn component via npx
    async function installShadcnComponent(componentName) {
        if (!componentName) {
            throw new Error("Component name is undefined or empty.");
        }
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('No workspace folder found');
        }
        const projectRoot = workspaceFolders[0].uri.fsPath;
        return new Promise((resolve, reject) => {
            const terminal = vscode.window.createTerminal('Shadcn UI Installer');
            terminal.show();
            // Map the component name to the corresponding npx command name
            const npxComponentName = COMPONENT_NAME_MAP[componentName] || componentName.toLowerCase();
            // Ensure `componentName` is valid before passing it to npx
            if (!npxComponentName) {
                vscode.window.showErrorMessage(`Failed to find a valid component name for ${componentName}.`);
                reject(new Error(`Invalid component name: ${componentName}`));
                return;
            }
            // Use npx to run shadcn-ui add command
            terminal.sendText(`cd "${projectRoot}" && npx shadcn@latest add ${npxComponentName}`);
            // Delay to wait for component installation to complete
            setTimeout(async () => {
                await insertImportStatement(componentName);
                terminal.dispose();
                resolve();
            }, 10000); // Give 10 seconds for installation
        });
    }
    // Insert the import statement for the installed component
    async function insertImportStatement(componentName) {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor)
            return;
        const document = activeEditor.document;
        const componentImportPath = `@/components/ui/${COMPONENT_NAME_MAP[componentName] || componentName.toLowerCase()}`;
        // Find the place to insert the import statement
        const importStatement = `import { ${componentName} } from '${componentImportPath}';`;
        // Ensure we only insert the import if it's not already there
        const documentText = document.getText();
        const importRegex = new RegExp(`import\\s+{?\\s*${componentName}\\s*}?\\s+from\\s+['"]${componentImportPath}['"]`);
        if (!importRegex.test(documentText)) {
            const firstLine = document.lineAt(0);
            const edit = new vscode.WorkspaceEdit();
            edit.insert(document.uri, firstLine.range.start, importStatement + '\n');
            await vscode.workspace.applyEdit(edit);
            vscode.window.showInformationMessage(`Imported ${componentName} successfully!`);
        }
        else {
            vscode.window.showInformationMessage(`${componentName} is already imported.`);
        }
    }
    // Register subscriptions
    context.subscriptions.push(diagnosticCollection, codeActionProvider, installCommand, hoverProvider);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map