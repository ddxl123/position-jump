// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("start ok!");

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(["*"], { provideDefinition })
  );
}

function provideDefinition(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
) {
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
    var targetPath =
      workDir + "/" + line.text.substring(index + 5, line.text.length);
    // console.log(targetPath);
    return new vscode.Location(
      vscode.Uri.file(targetPath),
      new vscode.Position(0, 0)
    );
  }
}
// this method is called when your extension is deactivated
export function deactivate() {}
