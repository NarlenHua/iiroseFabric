import { FabricAPI } from "./FabricAPI.d";
import { fabricSocket } from "./fabricSocket";
import { fabricStyle } from "./fabricStyle";
import { iiroseElements } from "./iiroseElements";
import { ingector } from "./ingector";
import { tools } from "./tools";
import { windowTools } from "./windowTools";

// @ts-ignore
import { config } from "../config"
import { decoder } from "./decoder";
import { encoder } from "./encoder";
import { fabricSVG } from "./fabricSVG";
import { emitter } from "./emitter";
// 初始化fabricSocket
async function initSocket() {
    console.log('代理网络');
    for (let index = 0; index < 30; index++) {
        try {
            console.log('网络代理', index);
            // @ts-ignore
            if (window["socket"].__onmessage == undefined && window["socket"]._onmessage != undefined && window["socket"].send != undefined) {
                console.log('网络连接成功');
                break;
            }
            else {
                console.log('网络连接失败');
                // 等待一下
                await tools.sleep(500);
                continue;
            }
        } catch (error) {
            console.error(error);
        }
    }
    // @ts-ignore
    if (window["socket"].__onmessage == undefined && window["socket"]._onmessage != undefined && window["socket"].send != undefined) {
    } else {
        console.log('连接失败')
        return;
    }
    // 等待一下
    await tools.sleep(500);

    // 发送
    // @ts-ignore
    fabricSocket.originalSend = window.socket.send;
    // 覆写原来的发送函数
    // @ts-ignore
    socket.send = fabricSocket.send;
    // 接收
    // @ts-ignore
    fabricSocket.originalOnmessage = socket._onmessage;
    // 覆写接收函数
    // @ts-ignore
    socket._onmessage = fabricSocket.onmessage;
}

// 初始化元素
async function initIirsoeElements() {
    iiroseElements.movePanelHolder = document.querySelector('#movePanelHolder');
    iiroseElements.functionHolder = document.querySelector('#functionHolder');
    iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
}

// 初始化主窗口
async function initMainWindow() {
    console.log('初始化窗口');
    // 一级菜单
    let menu = windowTools.createMenu('fabricMianMenu', 'Fabric');

    // 工作区
    let workSpace: HTMLElement = windowTools.createItem('div', `fabricMainWindow-workspace`, fabricStyle.class["fabric-window-workspace"]);

    let openEruda = windowTools.createItem('button', undefined, undefined, '打开Eruda');
    openEruda.style.backgroundColor = '#ffffd2';
    // @ts-ignore
    openEruda.onclick = () => { if (window.eruda != undefined) { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); } else { _alert('Eruda没有安装') } };
    let closeEruda = windowTools.createItem('button', undefined, undefined, '关闭Eruda');
    closeEruda.style.backgroundColor = '#fcbad3';
    // @ts-ignore
    closeEruda.onclick = () => { if (window.eruda != undefined) { eruda.destroy(); } else { _alert('Eruda没有安装') } }
    let allowEruda = windowTools.createItem('button', undefined, undefined, '设置是否自启动Eruda');
    allowEruda.style.backgroundColor = '#aa96da';
    allowEruda.onclick = () => {
        let allowTemp = localStorage.getItem('allowEruda');
        if (allowTemp == true.toString())
            localStorage.setItem('allowEruda', false.toString());
        else
            localStorage.setItem('allowEruda', true.toString());
        // @ts-ignore
        _alert(`allowEruda设置为${localStorage.getItem('allowEruda')}`);
    }
    let deleteCache = windowTools.createItem('button', undefined, undefined, '删除缓存');
    deleteCache.style.backgroundColor = '#61c0bf';
    // @ts-ignore
    deleteCache.onclick = async () => {
        await caches.delete('v');
        // @ts-ignore
        _alert('浏览器缓存已经删除');
    }


    let dis1 = windowTools.createItem('p', undefined, undefined, '调试工具');
    workSpace.append(dis1, openEruda, closeEruda, allowEruda, deleteCache);
    let fabiricMianWindow = windowTools.createFabrcWindow('fabric设置', 400, workSpace);
    // 关闭窗口
    // windowTools.closeElement(fabiricMianWindow);
    console.log('窗口', fabiricMianWindow);
    // menuItem1.onclick = () => { windowTools.turnDisplay(fabiricMianWindow); };
    iiroseElements.movePanelHolder?.appendChild(fabiricMianWindow);
    console.log('移动', iiroseElements.movePanelHolder);
    let menuItem1 = windowTools.createMenuItem('fabric设置', fabiricMianWindow);
    let menuItem2 = ingector.creatIngectorWindow();
    windowTools.insertMenu(menu, [menuItem1, menuItem2], 0, true);
}

let fabricAPI: FabricAPI = new FabricAPI();
// 初始化
async function initFabricAPI() {
    // 把functionPos清0
    localStorage.setItem('functionPos', '0#0,6');
    window.addEventListener('unload', (event) => {
        localStorage.setItem('functionPos', '0#0,6');
        console.log('界面重载，清理', event);
    });

    // 防止重复注入，自己启动自己
    // 读取和设置标识符
    let res0 = localStorage.getItem('fabricIngected0');
    if (res0 == null) {
        localStorage.setItem('fabricIngected0', '0');
        res0 = '0';
    }
    let res1 = localStorage.getItem('fabricIngected1');
    if (res1 == null) {
        localStorage.setItem('fabricIngected1', '0');
        res1 = '0';
    }
    // @ts-ignore
    if (res1 == '0' && res0 == '0' && window.fabricAPI == undefined) {
        // 0,0表示之前还没注入
        // fabricIngected0等于1表示开始注入,设置成开始注入状态。
        localStorage.setItem('fabricIngected0', '1');
        localStorage.setItem('fabricIngected1', '0');
        res0 = '1';
        res1 = '0';
        // @ts-ignore
        _alert(`欢迎您第一次使用 Fabric ${config.version}\n左上角可以进行设置。`);
    }
    // @ts-ignore
    else if (res1 == '1' && res0 == '1' && window.fabricAPI == undefined) {
        // 两个都等于1，表示上一次注入正常，这次运行也可以正常注入。设置成开始注入状态。
        localStorage.setItem('fabricIngected0', '1');
        localStorage.setItem('fabricIngected1', '0');
        res0 = '1';
        res1 = '0';
    }
    // @ts-ignore
    else if (res1 == '2' && res0 == '2') {
        // 两个都等于2，表示上一次注入异常，清除注入的fabric,重新注入。设置成开始注入状态。
        // @ts-ignore
        if (window.fabricAPI != undefined) window.fabricAPI = undefined;
        localStorage.setItem('fabricIngected0', '1');
        localStorage.setItem('fabricIngected1', '0');
        res0 = '1';
        res1 = '0';
        // @ts-ignore
        _alert(`上一次 Fabric ${config.version} 注入异常，重新开始注入fabric`);
    }
    else {
        // 注入异常
        console.log('注入异常', res0, res1);
        // @ts-ignore
        if (window.fabricAPI != undefined) window.fabricAPI = undefined;
        localStorage.setItem('fabricIngected0', '2');
        localStorage.setItem('fabricIngected1', '2');
        res0 = '2';
        res1 = '2';
    }
    // 因为FabricAPI只是做了类型声明，并未实现具体功能，所以内容都需要初始化
    fabricAPI.version = config.version;
    fabricAPI.fabricSVG = fabricSVG;
    fabricAPI.fabricStyle = fabricStyle;
    fabricAPI.messages = {
        publicMessage: {
            timeStamp: '',
            headPortrait: '',
            name: '',
            message: '',
            color: '',
            gender: '',
            uid: '',
            designation: '',
            messageUid: '',
            messageClass: 'publicMessage'
        },
        privateMessage: {
            timeStamp: '',
            headPortrait: '',
            name: '',
            message: '',
            color: '',
            gender: '',
            uid: '',
            messageUid: '',
            messageClass: 'privateMessage'
        },
        hiddenMessage: {
            messageName: '',
            uid: '',
            data: '',
            messageClass: 'hidenMessage'
        },
        danmuMessage: {
            username: '',
            message: '',
            color: '',
            gender: '',
            avatar: '',
            timeStamp: '',
            uid: '',
            messageClass: 'danmuMessage'
        },
        withdrawnMessage: {
            privateUID: '',
            uid: '',
            randomNumber: '',
            dataUid: '',
            messageClass: 'withdrawnMessage'
        },
        systemMessage: {
            userMessageList: [''],
            messageClass: 'systemMessage'
        },
        stockMessage: {
            result: '',
            stockPrice: NaN,
            totalStock: NaN,
            holdingAmount: NaN,
            totalEquity: NaN,
            balance: NaN,
            messageClass: 'stockMessage'
        },
        unkonwMessage: {
            message: '',
            messageClass: 'unkonwMessage'
        }
    };
    fabricAPI.encoder = encoder;
    fabricAPI.decoder = decoder;
    fabricAPI.emitter = emitter;
    fabricAPI.windowTools = windowTools;
    fabricAPI.tools = tools;
    fabricAPI.ingector = ingector;
    // 初始化动态的成员
    await initIirsoeElements();
    // 先等待网络连接好
    await initSocket();
    // 初始化后再写入
    fabricAPI.fabricSocket = fabricSocket;
    fabricAPI.iiroseElements = iiroseElements;
    // 注入CSS
    tools.addStyle('fabricStyle', fabricStyle.fabricCSS);
    tools.addStyle('ingectorStyle', ingector.ingectorStyle.ingectorCSS);
    await initMainWindow();
    // 等初始化菜单，具备基本功能后，阻止运行列表里的插件和停止注入。
    if (res1 == '2' && res0 == '2') {
        // @ts-ignore
        _alert(`Fabric ${config.version} 注入异常，停止注入fabric,\n可能是因为重复注入`);
        // 停止程序
        return;
    } else {
        // 将接口注入到环境中
        // @ts-ignore
        window.fabricAPI = fabricAPI;
        // @ts-ignore
        window.top.fabricAPI = fabricAPI;
        // 运行外部脚本
        fabricAPI.ingector.runEnd();
        // 将脚本注入到缓存
        await fabricAPI.ingector.replaceHTML();

        // 设置注入成功的标志
        localStorage.setItem('fabricIngected0', '1');
        localStorage.setItem('fabricIngected1', '1');
        res0 = '1';
        res1 = '1';
        // @ts-ignore
        _alert(`Fabric ${config.version} 注入成功`);
    }
}
export const init = {
    fabricAPI,
    initSocket,
    initIirsoeElements,
    initMainWindow,
    initFabricAPI
}