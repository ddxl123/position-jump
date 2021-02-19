"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("start ok!");
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(["*"], { provideDefinition }));
}
exports.activate = activate;
function provideDefinition(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);
    //   console.log("fileName: " + fileName); // 当前文件完整路径
    console.log("workDir: " + workDir); // 当前文件所在目录
    //   console.log("word: " + word); // 当前光标所在单词
    //   console.log("line: " + line.text); // 当前光标所在行
    // 获取 @see 之后的路径
    var index = line.text.search("@see");
    if (index != -1) {
        var targetPath = workDir + "/" + line.text.substring(index + 5, line.text.length);
        // console.log(targetPath);
        return new vscode.Location(vscode.Uri.file(targetPath), new vscode.Position(0, 0));
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map