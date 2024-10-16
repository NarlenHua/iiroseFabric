import { TinyEmitter } from "tiny-emitter";

export class FabricAPI {
  version: string;
  fabricSVG: {
    fabric: string;
    max: string;
    med: string;
    min: string;
    close: string;
    more: string;
    delate: string;
    start: string;
  };
  fabricStyle: {
    fabricCSS: string;
    class: {
      'fabric-window': string;
      'fabric-window-menubar': string;
      'fabric-window-menubartitle': string;
      'fabric-window-menubarbutton': string;
      'fabric-window-workspace': string;
    };
  };
  messages: {
    publicMessage: {
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
    };
    privateMessage: {
      timeStamp: string;
      headPortrait: string;
      name: string;
      message: string;
      color: string;
      gender: string;
      uid: string;
      messageUid: string;
      messageClass: 'privateMessage';
    };
    hiddenMessage: {
      messageName: string;
      uid: string;
      data: string;
      messageClass: 'hidenMessage';
    };
    danmuMessage: {
      username: string;
      message: string;
      color: string;
      gender: string;
      avatar: string;
      timeStamp: string;
      uid: string;
      messageClass: 'danmuMessage';
    };
    withdrawnMessage: {
      // 可选的，撤回私聊对象窗口的UID
      privateUID: string;
      uid: string;
      randomNumber: string;
      dataUid: string;
      messageClass: 'withdrawnMessage';
    };
    systemMessage: {
      userMessageList: string[];
      messageClass: 'systemMessage';
    };
    stockMessage: {
      // result * 表示股价过低无法买股票
      // >表示卖出的股票超出数量
      // <表示余额不够
      // 数字表示正常
      result: string;
      stockPrice: number;
      totalStock: number;
      holdingAmount: number;
      totalEquity: number;
      balance: number;
      messageClass: 'stockMessage';
    };
    unkonwMessage: {
      message: string;
      messageClass: 'unkonwMessage';
    };
  };
  encoder: {
    /**
     * 生成公屏消息
     * @param message 消息
     * @param color 消息颜色
     * @returns 返回格式化好的消息
     */
    encodePublicMessage(message: string, color: string): string;
    /**
     * 生成隐藏发送的私聊消息，自己看不到
     * @param uid 对方的UID
     * @param message 消息
     * @param color 消息颜色
     * @returns 返回格式化好的消息
     */
    encodePrivateMessage(uid: string, message: string, color: string): string;
    /**
     * 生成隐藏的消息
     * @param messageNmae 消息的标题或者名字
     * @param uid 要发送的对象
     * @param data 消息数据
     * @returns 返回生成的数据
     */
    encoderHidenMessage(messageNmae: string, uid: string, data: string): string;
    /**
     * 生成一个音乐卡片消息
     * @param typeId 音乐平台从0开始
     * @param title 音乐名字
     * @param singerName 歌手名字
     * @param coverUrl 封面图片链接
     * @param color 颜色
     * @param resolutionRatio 音乐的压缩率
     */
    encoderMusicCard(typeId: string, title: string, singerName: string, coverUrl: string, color: string, resolutionRatio: string): string;
    /**
     * 生成一个视频卡片消息
     * @param typeId 视频平台从0开始
     * @param title 视频名字
     * @param singerName 制作者名字
     * @param coverUrl 封面图片链接
     * @param color 颜色
     * @param resolutionRatio 分辨率，64会被识别成1080p
     */
    encoderVideoCard(typeId: string, title: string, singerName: string, coverUrl: string, color: string, resolutionRatio: string, time: string): string;
    /**
     * 编码点赞消息
     * @param targetUid 目标id
     * @param content 正文
     * @returns 格式化好的消息
     */
    encoderLikeMessage(targetUid: string, content?: string): string;
    /**
     * 生成弹幕消息
     * @param message 消息
     * @param color 颜色
     * @param v v,默认是0
     * @returns 返回格式化好的弹幕消息
     */
    encoderDanmu(message: string, color: string, v?: string): string;
    /**
     * 生成撤回的消息
     * @param randomNumber 指定消息的随机数如：491855401763
     * @param privateUID 私聊对象的UID
     * @returns 
     */
    encodeWithdrawnMessage(randomNumber: string, privateUID?: string): string;
    /**
     * 生成股票请求消息
     * @param count 股票数量，不填或等于0时返回正常查看
     * @returns 
     */
    encodeStockRequest(count: number | undefined);
  };
  decoder: {
    decodeMessage(message: string): (
      {
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
        message: string;
        color: string;
        gender: string;
        avatar: string;
        timeStamp: string;
        uid: string;
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
      })[];
  };
  emitter: TinyEmitter;
  windowTools: {
    /**由fabric创建的窗口列表 */
    windowList: HTMLElement[];
    /**fabric窗口基础的层级，每新建一个加一 */
    maxZindex: number;
    /**
     * 创建标签
     * @param tag 标签类型
     * @param id id
     * @param className 要添加的类型
     * @param textContent 文本内容
     * @returns 创建好的标签
     */
    createItem(tag?: string, id?: string, className?: string, textContent?: string): HTMLElement;
    /**
     * @param id 窗口id
     * @param width 窗口宽
     * @param workSpace 工作区元素
     * @param title 标题
     * @param height 窗口高
     * @returns
     */
    createFabrcWindow(id: string, width: number, workSpace?: HTMLElement, title?: string, height?: number): HTMLElement;
    /**
     * 创建一个一级菜单
     * @param id 菜单id
     * @param name 菜单名字
     * @returns 菜单元素
     */
    createMenu(id: string, name: string): HTMLElement;
    /**
     * 创建一个二级菜单元素
     * @param name 二级菜单名字
     * @param fabricWindow 窗口元素 
     * @returns 菜单元素
     */
    createMenuItem(name: string, fabricWindow?: HTMLElement): HTMLElement;
    /**
     * 关闭元素显示
     * @param ele 要关闭的元素
     */
    closeElement(ele: HTMLElement): void;
    /**
     * 打开元素显示
     * @param ele 要打开的元素
     */
    openElement(ele: HTMLElement): void;
    /**
     * 翻转元素是否显示
     * @param ele 要控制显示的元素
     */
    turnDisplay(ele: HTMLElement): void;
    /**
     * 添加菜单
     * @param Menu 一级菜单元素
     * @param items 二级菜单元素列表
     * @param num 要添加到哪个子元素（下标）之前，null表示添加到父元素的子元素列表最后
     * @param isbefore 是否添加到前面
     */
    insertMenu(Menu: HTMLElement, items: HTMLElement[], num: number, isbefore: boolean): void;
  };
  tools: {
    /**
     * 异步延时函数
     * @param _ms 毫秒
     */
    sleep(ms: number): Promise<unknown>;
    /**
     * html特殊符号转义
     * @param {string} e 
     * @returns {string}
     */
    htmlSpecialCharsEscape: (e: string) => string;
    /**
   * html特殊符号反转义
   * @param {string} e 
   * @returns {string}
   */
    htmlSpecialCharsDecode: (e: string) => string;
    /**
     * 添加一个样式，向页面添加style元素
     * @param id 元素的id
     * @param css 样式字符串
     */
    addStyle(id: string, css: string): boolean;
    /**
     * 刷新记录fabric记录的一些元素
     */
    refreshElements(): void;
    /**
     * 获取当前用户的名字
     * @returns 返回当前用户的名字，没找到返回null
     */
    getUserName(): string | null;
    /**
     * 获取当前用户的UID
     * @returns 返回当前用户的UID，没找到返回null
     */
    getUserUid(): string | null;
    /**
     * 获取当前房间ID
     * @returns 返回当前用户的UID，没找到返回null
     */
    getRoomId(): string | null;
    /**
   * 通过房间id返回房间消息
   * @param roomId 房间的id
   * @returns 返回返回消息
   */
    getRoomInfoById(roomId: string): {
      name: string;
      roomPath: Array<string>;
      color: string;
      description: string;
      roomImage: string;
      currentUserNum: number | "hidden";
      ownerName: string;
      member: Array<{ name: string; auth: "member" | "admin" | "unknow"; }>;
    } | null;
    /**
      * 通过uid获取在线用户的信息
      * @param {string} uid
      * @returns 用户消息
      */
    getOnlineUserInfoById(uid: string): {
      name: string;
      uid: string;
      color: string;
      avatar: string;
      roomId: string;
      personalizedSignature: string;
    } | null;
    /**
     * 获取所有在线用户的信息
     * @returns 用户消息列表
     */
    getAllOnlineUserInfo(): {
      name: any;
      uid: any;
      color: any;
      avatar: any;
      roomId: any;
      personalizedSignature: any;
    }[] | null;
    /**
    * 切换房间
    * @param {string} roomId 房间ID
    */
    changeRoom(roomId: string): void;
    /**
    * 获取用户蔷薇头像url
    * @returns {string}
    */
    getUserProfilePictureUrl(): string | null;
    /**
    * 获取用户蔷薇输入颜色
    * @returns 获取不到返回null
    */
    getUserInputColor(): string | null;
    /**
    * 创造一个新的私聊气泡，搭配静默发送私聊消息才能和“正常一样使用。
    * @param {string} targetUid 目标UID
    * @param {string} content 正文
    * @param {string} messageId 消息气泡的ID
    */
    generatePrivateMessageBubble(targetUid: string, content: string, messageId: string): void;
    /**
    * 切换房间
    * @param {string} roomId
    */
    switchRoom(roomId: string): void;
    /**
      * 在当前用户所在的页面发送信息
      * @param {string} content
      */
    sendCurrentPageMessage(content: string): void;
  };
  ingector: {
    ingectorStyle: {
      ingectorCSS: string;
      class: {
        'ingector-text': string;
        'ingector-table': string;
        'ingector-linkname': string;
        'ingector-link': string;
        'ingector-choice': string;
      };
    };
    /**
     * 保存存档
     */
    iirosesave(): void;
    /** 尝试修复并重启 */
    iiroserepair(): void;

    /** 删除浏览器缓存 */
    iiroseremovecaches(): void;

    /** 打开Eruda */
    openconsole(): void;
    /** 关闭Eruda */
    closeconsole(): void;
    /** 把functionPos清0*/
    clearfunctionPos(): void;
    /** 注入缓存前要调用的函数Eruda,等 */
    runBegain(): void;
    /** 启动后注入资源 */
    runEnd(): void;
    /** 将设置的脚本注入缓存 */
    replaceHTML(): Promise<void>;
    /**
     * 创建一行
     * @param name 脚本名元素
     * @param link 连接元素
     * @param choice 选项按钮
     */
    createTabletr(name: HTMLElement, link: HTMLElement, choice: HTMLElement): HTMLElement;
    /**
     * 创建一个表格
     * @param tableType 表格类型
     * @param writeButton 写功能按钮
     * @param readButton 读功能按钮
     * @param addButton 添加功能按钮
     */
    createTable(tableType: number, writeButton: HTMLElement, readButton: HTMLElement, addButton: HTMLElement): HTMLElement;
    /** 创建注入资源的窗口 */
    creatIngectorWindow(): HTMLElement;
  };
  fabricSocket: {
    messageList: ({
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
    })[],
    beforeSend(_param: string): Promise<string | null>
    originalSend(_param: string): void;
    afterSend(_param: string): Promise<void>;
    send(_param: string): Promise<void>;
    beforeOnmessage(_param: string): Promise<string | null>;
    originalOnmessage(_param: string): void;
    afterOnmessage(_param: string): Promise<void>;
    onmessage(_param: string): Promise<void>;
  };
  iiroseElements: {
    /** 可以拖动的那些元素的父元素 */
    movePanelHolder: HTMLElement | null;
    /** 最左边的功能菜单篮子 */
    functionHolder: HTMLElement | null;
    /** 一级菜单列表 */
    functionButtonGroupList: Element[] | null;
    /**当前输入栏 */
    inputBox: HTMLElement | null;
    //**当前输入栏确定发送按钮 */
    inputSendBtn: Element;
    /**主界面消息栏 */
    msgholderBox: Element | null;
    /**home界面消息栏 */
    homeHolderMsgBox: Element | null;
    /**会话选择元素列表 */
    sessionHolderPmTaskBoxItems: Element[];
  };
  static messages: any;
}

declare let fabricAPI: FabricAPI