import { readFile, writeFile } from 'fs';
import { config } from "../config";
// 要读取的文件路径  
const inputFilePath = './dist/main.js';
// 要写入的文件路径  
const outputJSFilePath = `./dist/${config.name}${config.version}.user.js`;
const outputTXTFilePath = `./dist/${config.name}${config.version}.txt`;

// 要添加的字符串  
const prependString = `// ==UserScript==
// @name         ${config.name}
// @namespace    ${config.namespace}
// @version      ${config.version}
// @description  ${config.description}
// @author       ${config.author}
// @match        ${config.match}
// @grant        ${config.grant}
// @run-at       ${config.runat}
// @license      ${config.license}
// ==/UserScript==
`;

// 异步读取文件内容  
readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件时出错:', err);
    return;
  }

  // 在文件内容之前添加字符串  
  // 将代码包裹进立即执行函数中
  let newData = `${prependString}(async function (){${data}})()`;

  // 异步写入新文件  
  writeFile(inputFilePath, newData, 'utf8', (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
      return;
    }
    console.log('文件已成功处理并保存到：', inputFilePath);
  });
  writeFile(outputJSFilePath, newData, 'utf8', (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
      return;
    }
    console.log('文件已成功处理并保存到：', outputJSFilePath);
  });
  writeFile(outputTXTFilePath, newData, 'utf8', (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
      return;
    }
    console.log('文件已成功处理并保存到：', outputTXTFilePath);
  });
});