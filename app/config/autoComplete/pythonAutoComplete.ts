// config/autoComplete/pythonAutoComplete.ts
import * as monaco from "monaco-editor";

export function registerPythonAutoComplete(monacoInstance: typeof monaco) {
  monacoInstance.languages.registerCompletionItemProvider("python", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = new monacoInstance.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn
      );

      const keywords = [
        "def", "return", "if", "elif", "else", "for", "while", "break", "continue",
        "class", "import", "from", "as", "try", "except", "finally", "raise",
        "with", "lambda", "yield", "global", "nonlocal", "pass", "assert", "del",
        "in", "is", "not", "and", "or", "True", "False", "None",
      ];

      const builtins = [
        "print", "len", "range", "int", "float", "str", "list", "dict", "set", "tuple",
        "input", "open", "enumerate", "zip", "map", "filter", "sum", "min", "max",
        "abs", "round", "dir", "type", "id", "help", "sorted", "reversed",
      ];

      const suggestions: monaco.languages.CompletionItem[] = [
        ...keywords.map((label) => ({
          label,
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          insertText: label,
          range,
        })),
        ...builtins.map((label) => ({
          label: label + "()",
          kind: monacoInstance.languages.CompletionItemKind.Function,
          insertText: label + "()",
          range,
        })),
      ];

      return { suggestions };
    },
  });
}
