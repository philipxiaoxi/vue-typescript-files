import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { Generator } from './generator';
import { Menu } from './enums/Menu';
import { searchFiles } from './ioutil';

const generator = new Generator();
export const showDynamicDialog = async (uri: vscode.Uri, fileName: string, ResourceType: Menu) => {

    const loc = await showFileNameDialog(uri, fileName, ResourceType);
    if(loc){
        await generator.generateResources(ResourceType, loc);
        vscode.window.setStatusBarMessage(`${loc.fileName}创建成功`, 2000);
    }else{
        vscode.window.setStatusBarMessage(`文件已存在`, 2000);
    }
 
};

export const showFileNameDialog = async (uri: vscode.Uri, defaultTypeName: string, resourceType: Menu) => {
    let clickdFolderPath: string;
    if (uri) {
        clickdFolderPath = uri.fsPath;
    } else {
        if (!vscode.window.activeTextEditor) {
            throw new Error('请右击文件或文件夹');
        } else {
            clickdFolderPath = path.dirname(vscode.window.activeTextEditor.document.fileName);
        }
    }
    const rootPath = fs.lstatSync(clickdFolderPath).isDirectory() ? clickdFolderPath : path.dirname(clickdFolderPath);

    if (vscode.workspace.rootPath === undefined) {
        throw new Error('请先打开一个项目');
    } else {
        let fileName = await vscode.window.showInputBox({ prompt: `输入新的${resourceType}名称 `, value: `${defaultTypeName}` });

        if (!fileName) {
            throw new Error('请验证输入的文件名');
        } else {
            let dirName = '';
           
            const fileNameTokens = fileName.split(' ');
             // 判断文件是否存在
            [fileName] = fileNameTokens;
        
            if(await searchFiles(rootPath,fileName,resourceType)){
                return null;
            };
            const fullPath = path.join(rootPath, fileName);
            if (fileName.indexOf('\\') !== -1) {
                [dirName, fileName] = fileName.split('\\');
            }
            const dirPath = path.join(rootPath, dirName);
            return {
                fullPath,
                fileName,
                dirName,
                dirPath,
                rootPath
            };

        }
    }
};