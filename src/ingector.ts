import { fabricStyle } from "./fabricStyle";
import { iiroseElements } from "./iiroseElements";
import { windowTools } from "./windowTools";


// 样式
const ingectorStyle = {
  'ingectorCSS': '.ingector-table{background-color:#cd9f9f;width:100%;table-layout:fixed;text-align:center}.ingector-title{background-color:#b99}.ingector-linkname{background-color:#ffd0d0}.ingector-link{background-color:#fdb8b8}.ingector-choice{background-color:#ff9f9f}.ingector-table input{width:90%;text-align:center}.ingector-table button{width:90%;text-align:center}',
  'class': {
    'ingector-text': 'ingector-text',
    'ingector-table': 'ingector-table',
    'ingector-linkname': 'ingector-linkname',
    'ingector-link': 'ingector-link',
    'ingector-choice': 'ingector-choice'
  }
}

// 保存
// @ts-ignore
function iirosesave() { Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")); try { Utils.service.saveStatus(0) } catch (e) { sendBug(e, "saveStatus") } for (var t, o = {}, i = 0, a = localStorage.length; i < a; ++i)o[t = localStorage.key(i)] = localStorage.getItem(t); var e = JSON.stringify(o), s = new Date, s = [s.getFullYear(), Utils.smallTools.zeroFill(s.getMonth() + 1), Utils.smallTools.zeroFill(s.getDate())].join("-") + "_" + [Utils.smallTools.zeroFill(s.getHours()), Utils.smallTools.zeroFill(s.getMinutes()), Utils.smallTools.zeroFill(s.getSeconds())].join("-"), r = uid + "_" + s + ".bak.iirose", s = pako.gzip(e, { level: 9 }), e = new Uint8Array(s.length + 3); e[0] = 2, e[1] = 33, e[s.length + 2] = 77, e.set(s, 2), e = new Blob([e]), 5 == device ? Utils.blobToDataURL(e, function (e) { Main.saveFile(e, r) }) : Utils.service.downloadBlob(e, r) }
// 修复
// @ts-ignore
function iiroserepair() { localStorage.setItem('functionPos', '0#0,6'); location.reload(); };
// 关闭调试工具
// @ts-ignore
async function iiroseremovecaches() {
  await caches.delete('v');
  // @ts-ignore
  _alert('浏览器缓存已经删除');
}
// 打开调试工具
// @ts-ignore
function openconsole() { eruda.init(); }
// 关闭调试工具
// @ts-ignore
function closeconsole() { eruda.destroy(); }

/** 把functionPos清0*/
function clearfunctionPos() {
  // 首先把functionPos清0
  localStorage.setItem('functionPos', '0#0,6');
  // 界面刷新时也清0
  window.addEventListener('unload', (event) => {
    localStorage.setItem('functionPos', '0#0,6');
    console.log('界面重载，清理', event);
  });
}
// 注入Eruda和
function ingectEruda() {
  // 注入eruda
  let er = document.createElement('script');
  er.src = "https://cdn.bootcdn.net/ajax/libs/eruda/3.1.0/eruda.min.js";
  document.body.append(er);
  let allowTemp = localStorage.getItem('allowEruda');
  if (allowTemp == true.toString())
    // @ts-ignore
    er.onload = () => { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); }
  else
    localStorage.setItem('allowEruda', false.toString());
}

// 需要注入在缓存里的函数
function runBegain() {
  console.log('提前运行的函数');
  /** 把functionPos清0*/
  localStorage.setItem('functionPos', '0#0,6');
  // 界面刷新时也清0
  window.addEventListener('unload', (event) => {
    localStorage.setItem('functionPos', '0#0,6');
    console.log('界面重载，清理', event);
  });

  ingectEruda();
  // 把保存、退出、尝试修复函数注入到环境中
  // @ts-ignore
  window.iirosesave = () => { Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")); try { Utils.service.saveStatus(0) } catch (e) { sendBug(e, "saveStatus") } for (var t, o = {}, i = 0, a = localStorage.length; i < a; ++i)o[t = localStorage.key(i)] = localStorage.getItem(t); var e = JSON.stringify(o), s = new Date, s = [s.getFullYear(), Utils.smallTools.zeroFill(s.getMonth() + 1), Utils.smallTools.zeroFill(s.getDate())].join("-") + "_" + [Utils.smallTools.zeroFill(s.getHours()), Utils.smallTools.zeroFill(s.getMinutes()), Utils.smallTools.zeroFill(s.getSeconds())].join("-"), r = uid + "_" + s + ".bak.iirose", s = pako.gzip(e, { level: 9 }), e = new Uint8Array(s.length + 3); e[0] = 2, e[1] = 33, e[s.length + 2] = 77, e.set(s, 2), e = new Blob([e]), 5 == device ? Utils.blobToDataURL(e, function (e) { Main.saveFile(e, r) }) : Utils.service.downloadBlob(e, r) };
  // @ts-ignore
  window.iiroserepair = () => { localStorage.setItem('functionPos', '0#0,6'); location.reload(); };
  // @ts-ignore
  window.openconsole = () => { eruda.init(); };
  // @ts-ignore
  window.closeconsole = () => { eruda.destroy(); };
  // @ts-ignore
  window.clearfunctionPos = () => {
    // 首先把functionPos清0
    localStorage.setItem('functionPos', '0#0,6');
    // 界面刷新时也清0
    window.addEventListener('unload', (event) => {
      localStorage.setItem('functionPos', '0#0,6');
      console.log('界面重载，清理', event);
    });
  }

  // 监听错误信息
  /**
   * 若该函数返回true，则阻止执行默认事件处理函数，如异常信息不会在console中打印。没有返回值或者返回值为false的时候，异常信息会在console中打印
   * @param message 错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
   * @param source 发生错误的脚本URL（字符串）
   * @param lineno 发生错误的行号（数字）
   * @param colno 发生错误的列号（数字）
   * @param error Error对象
   */
  window.onerror = function (message, source, lineno, colno, error) {
    // 首先把functionPos清0
    localStorage.setItem('functionPos', '0#0,6');
    console.error(`消息"${message}"`, '错误脚本的链接', source, '错误行号', lineno, '错误列号', colno, '错误对象', `[[[${error?.toString()}]]]`);
    let judge1 = "TypeError: Cannot read properties of undefined (reading 'lastChild')";
    let judge2 = "at SocketInit.socket.onopen";
    let allowTemp = localStorage.getItem('allowAutoReload');
    if (error?.stack?.toString().includes(judge1) && error?.stack?.toString().includes(judge2) || /^TypeError: [a-z]\[[a-z]\[[a-z]\]\] is undefined$/gm.test(message as string)) {
      if (allowTemp != false.toString()) { localStorage.removeItem('functionPos'); location.reload(); return false; }
      else {
        console.log(`消息"${message}"`, '错误脚本的链接', source, '错误行号', lineno, '错误列号', colno, '错误对象', error);
        if (confirm('检测到错误是否保存存档？')) {
          // @ts-ignore
          Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")); try { Utils.service.saveStatus(0) } catch (e) { sendBug(e, "saveStatus") } for (var t, o = {}, i = 0, a = localStorage.length; i < a; ++i)o[t = localStorage.key(i)] = localStorage.getItem(t); var e = JSON.stringify(o), s = new Date, s = [s.getFullYear(), Utils.smallTools.zeroFill(s.getMonth() + 1), Utils.smallTools.zeroFill(s.getDate())].join("-") + "_" + [Utils.smallTools.zeroFill(s.getHours()), Utils.smallTools.zeroFill(s.getMinutes()), Utils.smallTools.zeroFill(s.getSeconds())].join("-"), r = uid + "_" + s + ".bak.iirose", s = pako.gzip(e, { level: 9 }), e = new Uint8Array(s.length + 3); e[0] = 2, e[1] = 33, e[s.length + 2] = 77, e.set(s, 2), e = new Blob([e]), 5 == device ? Utils.blobToDataURL(e, function (e) { Main.saveFile(e, r) }) : Utils.service.downloadBlob(e, r)
        }
        if (confirm('检测到错误是否尝试修复重载？')) {
          localStorage.setItem('functionPos', '0#0,6'); location.reload();
        }
      }
    }
    return false;
  }

  // 注入js
  let temp = localStorage.getItem(`externalResources2`);
  let data: [string, string, number][] = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log('提前注入的数据', data);
  }
  // 将读取到的js注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let jsTemp = document.createElement('script');
      jsTemp.src = data[i][1];
      document.body.append(jsTemp);
    }
}

// 注入外部资源
function runEnd() {
  // 注入js
  let temp = localStorage.getItem(`externalResources0`);
  let data: [string, string, number][] = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log(data);
  }
  // 将读取到的js注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let jsTemp = document.createElement('script');
      jsTemp.src = data[i][1];
      document.body.append(jsTemp);
    }
  // 注入CSS
  temp = localStorage.getItem(`externalResources1`);
  data = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log(data);
  }
  // 将读取到的CSS注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let linkTemp = document.createElement('link');
      // 设置 <link> 元素的属性
      linkTemp.rel = 'stylesheet'; // 指定为样式表
      linkTemp.type = 'text/css';   // 指定类型为CSS
      linkTemp.href = data[i][1]; // 设置CSS文件的路径
      // 将 <link> 元素添加到 <head> 元素中
      document.head.appendChild(linkTemp);
    }
}

/**
  * message页面请求拦截注入外部js和函数
  * @param scripturls js外部链接
  * @param functions 要注入的函数列表
*/
async function replaceHTML(scripturls: string[] = [], functions: Function[] = []) {
  console.log('注入缓存');
  let message: string = (await (await fetch('https://iirose.com/messages.html?timestamp=new%20Date().getTime()')).text());
  // 默认注入之前运行的函数
  let scriptTemp: string = '<' + `script>(async function (){${runBegain} ${runBegain.name}();})()<\/script>`;
  for (let i = 0; i < scripturls.length; i++)
    scriptTemp = scriptTemp + '<' + `scrpit src="${scripturls[i]}"><\/script>`;

  for (let i = 0; i < (functions as Function[]).length; i++)
    scriptTemp = scriptTemp + '<' + `scrpit>(async function (){${functions[i]}${functions[i].name}();})()<\/script>`;
  let newMessage: string = message.slice(0, message.length - 14) + scriptTemp + message.slice(message.length - 14);
  // 打开花园的缓存,将缓存写入
  await (await caches.open('v')).put(
    '/messages.html',
    new Response(new Blob(
      [newMessage]),
      { status: 200, statusText: "OK" })
  );
  // 显示
  // let res = await (await caches.open('v')).match('/messages.html');
  // let msg = await res?.text();
  // if (msg)
  //   console.log('注入的页面', msg.slice(msg.length - 4000, msg.length));
}



// 创建一个表格的一行
function createTabletr(name: HTMLElement, link: HTMLElement, choice: HTMLElement) {
  let tabletr = windowTools.createItem('tr');
  let nametd = windowTools.createItem('td', undefined, ingectorStyle.class["ingector-linkname"]);
  nametd.append(name);
  let linktd = windowTools.createItem('td', undefined, ingectorStyle.class["ingector-link"]);
  linktd.append(link);
  let choicetd = windowTools.createItem('td', undefined, ingectorStyle.class["ingector-choice"]);
  choicetd.append(choice);
  tabletr.append(nametd, linktd, choicetd);
  return tabletr;
}

// 创建一个外部资源表格
function createTable(tableType: number, writeButton: HTMLElement, readButton: HTMLElement, addButton: HTMLElement): HTMLElement {
  let tableElements: [HTMLElement, HTMLElement, HTMLElement, HTMLElement][] = [];
  let tableValues: [string, string, number][] = [];
  console.log('表格类型：', tableType);
  let table = windowTools.createItem('table', undefined, ingectorStyle.class["ingector-table"]);
  let titleTemp = ''
  switch (tableType) {
    case 0:
      titleTemp = '加载后注入的js';
      break;
    case 1:
      titleTemp = '加载后注入的CSS';
      break;
    case 2:
      titleTemp = '加载前注入的js';
      break;
    // 默认加载前注入js
    default:
      titleTemp = '未知的资源';
  }
  table.innerHTML = `<thead><tr><th colspan="3" class="ingector-title">${titleTemp}</th></tr><tr><th>名称</th><th>链接</th><th>选项</th></tr></thead>`;
  let tablebody = windowTools.createItem('tbody');
  let tabletr = createTabletr(writeButton, readButton, addButton)
  tablebody.append(tabletr);
  table.append(tablebody);
  let addline = async (lineValue?: [string, string, number]) => {
    let name: HTMLInputElement = windowTools.createItem('input') as HTMLInputElement;
    let link = windowTools.createItem('input') as HTMLInputElement;
    let choice = windowTools.createItem('button') as HTMLButtonElement;
    let value: [string, string, number];
    if (lineValue != undefined) {
      value = lineValue;
      [name.value, link.value] = [lineValue[0], lineValue[1]];
      switch (lineValue[2]) {
        case 0:
          choice.innerHTML = '启用';
          choice.style.color = 'green';
          break;
        case 1:
          choice.innerHTML = '删除';
          choice.style.color = 'red';
          break;
        case 2:
          choice.innerHTML = '禁用';
          choice.style.color = 'black';
          break;
        default:
          choice.innerHTML = '其他';
          choice.style.color = 'black';
          break;
      }
    } else {
      name.value = `第${tableElements.length + 1}个资源`;
      link.value = '';
      choice.innerHTML = '启用';
      choice.style.color = 'green';
      value = [name.value, link.value, 0];
    }
    // 更换选项
    choice.onclick = () => {
      value[2] = (value[2] + 1) >= 3 ? 0 : (value[2] + 1);
      switch (value[2]) {
        case 0:
          choice.innerHTML = '启用';
          choice.style.color = 'green';
          break;
        case 1:
          choice.innerHTML = '删除';
          choice.style.color = 'red';
          break;
        case 2:
          choice.innerHTML = '禁用';
          choice.style.color = 'black';
          break;
        default:
          choice.innerHTML = '其他';
          break;
      }
    }
    let newTabletr = createTabletr(name, link, choice);
    tablebody.insertBefore(newTabletr, tabletr);
    tableValues.splice(tableValues.length, 0, value);
    tableElements.splice(tableElements.length, 0, [name, link, choice, newTabletr]);
  }
  // 添加元素
  addButton.onclick = () => { addline() };
  // 保存数据
  writeButton.onclick = () => {
    // 更新数据并删除不合理的,表中的最后一行按钮并不在这个变量中，所以循环不需要减一来避免删除最后一排按钮
    for (let i = 0; i < tableValues.length; i++) {
      // @ts-ignore
      if (tableElements[i][0].value == '') { tableValues[i][0].value = `第${tableElements.length + 1}个资源`; tableElements[i][0].value = `第${tableElements.length + 1}个资源`; }
      // @ts-ignore
      else tableValues[i][0] = tableElements[i][0].value;
      // @ts-ignore
      tableValues[i][1] = tableElements[i][1].value;
      if (tableValues[i][1] == '' || tableValues[i][2] == 1) {
        // 删除这一行
        tableValues.splice(i, 1);
        // 删掉元素
        tableElements[i][3].remove();
        tableElements.splice(i, 1);
        // 减一，防止漏掉下一行，因为下一行的下标变成了这一行
        i--;
      }
    }
    localStorage.setItem(`externalResources${tableType}`, JSON.stringify(tableValues));
    // @ts-ignore
    _alert('写入完成，脚本将在重载后运行');
  }
  // 读取数据
  readButton.onclick = () => {
    let temp = localStorage.getItem(`externalResources${tableType}`)
    let data: [string, string, number][] = [];
    if (temp == null) data = [];
    else {
      data = JSON.parse(temp);
      console.log(data);
    }
    // 清空两个变量，删除元素
    tableValues = [];
    for (let i = 0; i < tableElements.length; i++)
      tableElements[i][3].remove();
    tableElements = [];
    // 显示读取到的
    for (let i = 0; i < data.length; i++)
      addline(data[i]);
    // @ts-ignore
    // _alert('已读取本地数据');
  }
  return table;
}

/**
 * 生成管理注入js文件列表的窗口,并返回控制它开关的二级菜单
 */
function creatIngectorWindow() {

  // 工作区
  let workSpace: HTMLElement = windowTools.createItem('div', `ingectorjsWindow-workspace`, fabricStyle.class["fabric-window-workspace"])
  let read0 = windowTools.createItem('button', undefined, undefined, '读取');
  let table0 = createTable(
    0,
    windowTools.createItem('button', undefined, undefined, '写入'),
    read0,
    windowTools.createItem('button', undefined, undefined, '添加')
  );
  read0.click();
  let read1 = windowTools.createItem('button', undefined, undefined, '读取');
  let table1 = createTable(
    1,
    windowTools.createItem('button', undefined, undefined, '写入'),
    read1,
    windowTools.createItem('button', undefined, undefined, '添加')
  );
  read1.click();
  let read2 = windowTools.createItem('button', undefined, undefined, '读取');
  let table2 = createTable(
    2,
    windowTools.createItem('button', undefined, undefined, '写入'),
    read2,
    windowTools.createItem('button', undefined, undefined, '添加')
  );
  read2.click();
  let disc = windowTools.createItem('p', undefined, undefined, '添加脚本，写入后会覆盖之前写入的，所以要先读取，下次启动将注入最后一次写入的链接');
  let disc0 = windowTools.createItem('p', undefined, undefined, '大多数js脚本适用，它运行在界面加载后。');
  let disc1 = windowTools.createItem('p', undefined, undefined, '大多数css文件适用，它的加载也在界面加载后。');
  let disc2 = windowTools.createItem('p', undefined, undefined, '下面设置的脚本，在界面加载时会运行，它在下次启动后会写入到缓存，即使删掉fabric也依旧会运行，这里的脚本下下次启动才能运行。');
  workSpace.append(disc, disc0, table0, disc1, table1, disc2, table2);
  let fabiricMianWindow = windowTools.createFabrcWindow('ingectorjsWindow', 300, workSpace, '设置注入的资源', 400);
  // 关闭窗口
  // windowTools.closeElement(fabiricMianWindow);
  console.log('窗口', fabiricMianWindow);
  // 二级菜单
  let menuItem = windowTools.createMenuItem('设置注入的资源', fabiricMianWindow);
  // menuItem.onclick = () => { windowTools.turnDisplay(fabiricMianWindow); };
  iiroseElements.movePanelHolder?.appendChild(fabiricMianWindow);

  // 返回控制它的二级菜单
  return menuItem;
}

export const ingector = {
  ingectorStyle,
  iirosesave,
  iiroserepair,
  iiroseremovecaches,
  openconsole,
  closeconsole,
  clearfunctionPos,
  runBegain,
  runEnd,
  replaceHTML,
  createTabletr,
  createTable,
  creatIngectorWindow

}