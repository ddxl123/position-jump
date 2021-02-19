"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("start ok!");
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(["*"], { provideDefinition }));
}
exports.activate = activate;
function provideDefinition(document, position, token) {
    var _a, _b;
    const fileName = document.fileName; // 当前文件完整路径
    // const workDir = path.dirname(fileName);// 当前文件所在目录
    // const word = document.getText(document.getWordRangeAtPosition(position));// 当前光标所在单词
    const line = document.lineAt(position); // 当前光标所在行
    // console.log("fileName: " + fileName);
    // console.log("workDir: " + workDir);
    // console.log("word: " + word);
    // console.log("line: " + line.text);
    // 获取项目根目录
    const rootPath = (_a = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fileName))) === null || _a === void 0 ? void 0 : _a.uri.path;
    // 获取开始路径的角标
    var index = line.text.search("@see");
    // 含 @see 时才触发
    if (index != -1) {
        // 获取 @see 之后的文本，包括 targetLine
        var target = line.text.substring(index + 5, line.text.length);
        // 分离 targetPath 和 targetLine
        var targetSplit = target.split(":");
        var targetPath = targetSplit[0];
        var targetLine = Number((_b = targetSplit[1]) !== null && _b !== void 0 ? _b : "0");
        // 补全路径
        var targetPath = rootPath + "/" + targetPath;
        // console.log(targetPath);
        return new vscode.Location(vscode.Uri.file(targetPath), new vscode.Position(targetLine, 0));
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map