import { decoder } from "./decoder";
import { emitter } from "./emitter";


let messageList: ({
    timeStamp: string;
    headPortrait: string;
    name: string;
    message: string;
    color: string;
    gender: string;
    uid: string;
    designation: string;
    messageUid: string;
    messageClass: "publicMessage";
} |
{
    timeStamp: string;
    headPortrait: string;
    name: string;
    message: string;
    color: string;
    gender: string;
    uid: string;
    messageUid: string;
    messageClass: 'privateMessage';
} |
{
    messageName: string;
    uid: string;
    data: string;
    messageClass: 'hidenMessage';
} |
{
    username: string;
    avatar: string;
    message: string;
    color: string;
    messageClass: 'danmuMessage';
} |
{
    // 可选的，撤回私聊对象窗口的UID
    privateUID: string;
    uid: string;
    randomNumber: string;
    dataUid: string;
    messageClass: 'withdrawnMessage';
} |
{
    userMessageList: string[];
    messageClass: 'systemMessage';
} |
{
    result: string;
    stockPrice: number;
    totalStock: number;
    holdingAmount: number;
    totalEquity: number;
    balance: number;
    messageClass: 'stockMessage';
} |
{
    message: string;
    messageClass: 'unkonwMessage';
})[] = [];
export let fabricSocket = {
    // 当前消息列表
    messageList,
    // 发送消息
    async beforeSend(_param: string): Promise<string | null> {
        console.log(`发送消息"${_param}"`);
        return _param;
    },
    originalSend(_param: string) { return; },
    async afterSend(param: string) {
        console.log(`成功发送"${param}"`);
    },
    async send(_param: string) {
        let temp = await fabricSocket.beforeSend(_param);
        if (temp != null) {
            try {
                fabricSocket.originalSend(temp);
            } catch (error) {
                console.error('捕获到错误', error);
            }
            // 不等待异步函数实现“多线程”的目的
            fabricSocket.afterSend(temp);
        }
    },
    // 接收消息
    async beforeOnmessage(_param: string): Promise<string | null> {
        fabricSocket.messageList = decoder.decodeMessage(_param);
        return _param;
    },

    originalOnmessage(_param: string) { return; },
    async afterOnmessage(_param: string) {
        // console.log(`收到消息 "${_param}"`);
        // console.log(`收到消息 "${_param.slice(0, 300)}..."`);
        for (let message of fabricSocket.messageList) {
            console.log(`触发${message.messageClass}事件`, {
                message,
                _param
            });
            emitter.emit(message.messageClass, message)
        };
    },
    async onmessage(_param: string) {
        let temp: string | null = await fabricSocket.beforeOnmessage(_param);
        if (temp != null) {
            try {
                fabricSocket.originalOnmessage(temp);
            } catch (error) {
                console.error('捕获到错误', error);
            }
            // 不等待异步函数实现“多线程”的目的
            fabricSocket.afterOnmessage(_param);
        }
    }
}
// 