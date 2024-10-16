import { iiroseElements } from "./iiroseElements";
/**
 * 
 * 异步延时函数
 * @param {时间毫秒} ms 
 */
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * html特殊符号转义
 * @param {string} e 
 * @returns {string}
 */
function htmlSpecialCharsEscape(e: string): string {
    e = e.replace(`&`, "&amp;");
    e = e.replace(`<`, "&lt;");
    e = e.replace(`>`, "&gt;");
    e = e.replace(`"`, "&quot;");
    e = e.replace(`'`, "&#039;");
    e = e.replace(`\\`, "&#092;");
    return e;
};
/**
 * html特殊符号反转义
 * @param {string} e 
 * @returns {string}
 */
function htmlSpecialCharsDecode(e: string): string {
    e = e.replace("&lt;", `<`);
    e = e.replace("&gt;", `>`);
    e = e.replace("&quot;", `"`);
    e = e.replace("&#039;", `'`);
    e = e.replace("&#092;", `\\`);
    e = e.replace("&amp;", `&`);
    return e;
}

/**
 * 添加样式
 * @param id style元素id
 * @param css 样式文件
 * @returns 添加成功返回true否则返回false
 */
function addStyle(id: string, css: string): boolean {
    try {
        console.log('添加样式', id);
        let st = document.createElement('style');
        st.id = id;
        st.innerHTML = css;
        document.head.appendChild(st);
        return true;
    } catch (error) {
        return false;
    }
}
/**
 * 刷新记录fabric记录的一些元素
 */
function refreshElements() {
    iiroseElements.movePanelHolder = document.querySelector('#movePanelHolder');
    iiroseElements.functionHolder = document.querySelector('#functionHolder');
    iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
    iiroseElements.inputBox = document.getElementById("moveinput");
    iiroseElements.inputSendBtn = document.querySelectorAll(".moveinputSendBtn")[0];
    iiroseElements.msgholderBox = document.querySelector(`#msgholder .fullBox .fullBox.msgholderBox`);
    iiroseElements.homeHolderMsgBox = document.querySelector(`#homeHolder .homeHolderMsgContentBox .homeHolderMsgBox.fullBox`);
    iiroseElements.sessionHolderPmTaskBoxItems = [...document.querySelectorAll(`.sessionHolderPmTaskBoxItem.whoisTouch2`)];
}
/**
 * 获取当前用户的名字
 * @returns 返回当前用户的名字，没找到返回null
 */
function getUserName(): string | null {
    // @ts-ignore
    if (window["myself"]) return window['myself'];
    else return null;
}
/**
 * 获取当前用户的UID
 * @returns 返回当前用户的UID，没找到返回null
 */
function getUserUid(): string | null {
    // @ts-ignore
    if (window["uid"]) return window['uid'];
    else return null;
}
/**
 * 获取当前房间ID
 * @returns 返回当前用户的UID，没找到返回null
 */
function getRoomId(): string | null {
    // @ts-ignore
    if (window["roomn"]) return window['roomn'];
    else return null;
}
/**
 * 通过房间id返回房间消息
 * @param roomId 房间的id
 * @returns 返回返回消息
 */
function getRoomInfoById(roomId: string): {
    name: string;
    roomPath: Array<string>;
    color: string;
    description: string;
    roomImage: string;
    currentUserNum: number | "hidden";
    ownerName: string;
    member: Array<{ name: string; auth: "member" | "admin" | "unknow"; }>;
} | null {
    // @ts-ignore
    let roomInfoArray = window.Objs.mapHolder?.Assets?.roomJson?.[roomId];
    if (roomInfoArray) {
        /** @type {Array<Array<string>>} */
        let roomInfoPart: Array<Array<string>> = roomInfoArray[5].split("&&").map((o: string) => o.split(" & "));
        let imageAndDescription = htmlSpecialCharsDecode(roomInfoPart[0][0]);
        let firstSpaceIndex = imageAndDescription.indexOf(" ");
        return {
            name: roomInfoArray[1],
            color: roomInfoArray[2],
            roomPath: (/** @type {string} */(roomInfoArray[0])).split("_"),
            description: imageAndDescription.slice(firstSpaceIndex + 1),
            roomImage: imageAndDescription.slice(0, firstSpaceIndex),
            currentUserNum: (typeof (roomInfoArray[7]) == "number" ? roomInfoArray[7] : "hidden"),
            ownerName: roomInfoPart[1][0],
            member: roomInfoPart[4].map((o: string) => ({
                name: htmlSpecialCharsDecode(o.slice(1)),
                auth: (o[0] == "0" ? "member" : o[0] == "1" ? "admin" : "unknow")
            }))
        };
    }
    else
        return null;
}
/**
  * 通过uid获取在线用户的信息
  * @param {string} uid
  * @returns 用户消息
  */
function getOnlineUserInfoById(uid: string): {
    name: string;
    uid: string;
    color: string;
    avatar: string;
    roomId: string;
    personalizedSignature: string;
} | null {
    uid = String(uid);
    // @ts-ignore
    let userInfoArray = window.Objs.mapHolder?.function?.findUserByUid?.(uid);
    if (userInfoArray) {
        return {
            name: userInfoArray[2],
            uid: uid,
            color: userInfoArray[3],
            avatar: userInfoArray[0],
            roomId: userInfoArray[4],
            personalizedSignature: userInfoArray[6]
        };
    }
    else
        return null;
}
/**
 * 获取所有在线用户的信息
 * @returns 用户消息列表
 */
function getAllOnlineUserInfo(): {
    name: any;
    uid: any;
    color: any;
    avatar: any;
    roomId: any;
    personalizedSignature: any;
}[] | null {
    // @ts-ignore
    let userInfoMapObj = window.Objs.mapHolder.Assets.userJson;
    if (userInfoMapObj) {
        return (Object.keys(userInfoMapObj)).map(key => {
            let o = userInfoMapObj[key];
            return {
                name: o[2],
                uid: o[8],
                color: o[3],
                avatar: o[0],
                roomId: o[4],
                personalizedSignature: o[6]
            };
        });
    }
    else
        return null;
}

/**
* 切换房间
* @param {string} roomId 房间ID
*/
function changeRoom(roomId: string) {
    roomId = String(roomId);
    if (roomId)
        // @ts-ignore
        window.Objs.mapHolder?.function?.roomchanger(roomId);
}

/**
* 获取用户蔷薇头像url
* @returns {string}
*/
function getUserProfilePictureUrl(): string | null {
    // @ts-ignore
    if (window.avatar2 && window.avatarconv)
        // @ts-ignore
        return window.avatarconv(window.avatar2);
    return null;
}

/**
* 获取用户蔷薇输入颜色
* @returns 获取不到返回null
*/
function getUserInputColor(): string | null {
    // @ts-ignore
    if (window.inputcolorhex) return window.inputcolorhex;
    return null;
}

/**
 * 创造一个新的私聊气泡，搭配静默发送私聊消息才能和“正常一样使用。
* @param {string} targetUid 目标UID
* @param {string} content 正文
* @param {string} messageId 消息气泡的ID
*/
function generatePrivateMessageBubble(targetUid: string, content: string, messageId: string) {
    // @ts-ignore
    if (window.privatechatfunc) window.privatechatfunc(
        ([
            Math.floor(Date.now() / 1000).toString(10), // 0
            getUserUid(), // 1
            htmlSpecialCharsEscape(getUserName() as string), // 2
            htmlSpecialCharsEscape(getUserProfilePictureUrl() as string), // 3
            htmlSpecialCharsEscape(content), // 4
            htmlSpecialCharsEscape(getUserInputColor() as string), // 5
            "", // 6
            htmlSpecialCharsEscape(getUserInputColor() as string), // 7
            "", // 8
            "", // 9
            messageId, // 10
            targetUid, // 11
            "", // 12
            "", // 13
            "", // 14
            "", // 15
            "", // 16
        ]).join(">"));
}

/**
* 切换房间
* @param {string} roomId
*/
function switchRoom(roomId: string) {
    // @ts-ignore
    if (window.Objs.mapHolder?.function?.roomchanger) window.Objs.mapHolder.function.roomchanger(roomId);
}

// /**
// * 执行终端命令
// * 插件暂时无法申请此权限
// * @param {string} command
// */
// runTerminalCommand: (command) => {
//     command = String(command);
//     runTerminalCommand(command);
// },

/**
* 在当前用户所在的页面发送信息
* @param {string} content
*/
function sendCurrentPageMessage(content: string) {
    refreshElements();
    let inputBox: HTMLInputElement = iiroseElements.inputBox as HTMLInputElement;
    let old = inputBox.value;
    inputBox.value = content;
    // @ts-ignore
    inputBox.oninput(null);
    // @ts-ignore
    iiroseElements.inputSendBtn.onclick(null);
    inputBox.value = old;
}
export const tools = {
    sleep,
    htmlSpecialCharsEscape,
    htmlSpecialCharsDecode,
    addStyle,
    refreshElements,
    getUserName,
    getUserUid,
    getRoomId,
    getRoomInfoById,
    getOnlineUserInfoById,
    getAllOnlineUserInfo,
    changeRoom,
    getUserProfilePictureUrl,
    getUserInputColor,
    generatePrivateMessageBubble,
    switchRoom,
    sendCurrentPageMessage
}