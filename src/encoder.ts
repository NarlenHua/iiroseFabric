/**
 * 生成公屏消息
 * @param message 消息
 * @param color 消息颜色
 * @returns 返回格式化好的消息
 */
function encodePublicMessage(message: string, color: string) {
    if (message === 'cut') {
        return `{0${JSON.stringify({
            m: message,
            mc: color,
            i: Math.random().toString().slice(2, 12)
        })}`
    }
    return JSON.stringify({
        m: message,
        mc: color,
        i: Math.random().toString().slice(2, 12)
    })
}
/**
 * 生成隐藏发送的私聊消息，自己看不到
 * @param uid 对方的UID
 * @param message 消息
 * @param color 消息颜色
 * @returns 返回格式化好的消息
 */
function encodePrivateMessage(uid: string, message: string, color: string) {
    return JSON.stringify({
        g: uid,
        m: message,
        mc: color,
        i: Math.random().toString().slice(2, 12)
    })
}
/**
 * 生成隐藏的消息
 * @param messageNmae 消息的标题或者名字
 * @param uid 要发送的对象
 * @param data 消息数据
 * @returns 返回生成的数据
 */
function encoderHidenMessage(messageNmae: string, uid: string, data: string) {
    return `/<${messageNmae}>${uid}:${data}`;
}
/**
 * 生成一个音乐卡片消息
 * @param typeId 音乐平台从0开始
 * @param title 音乐名字
 * @param singerName 歌手名字
 * @param coverUrl 封面图片链接
 * @param color 颜色
 * @param resolutionRatio 音乐的压缩率
 */
function encoderMusicCard(typeId: string, title: string, singerName: string, coverUrl: string, color: string, resolutionRatio: string) {
    // "{"m":"m__4@0>今天开始自己上厕所>小兰>https://img2.doubanio.com/view/photo/l/public/p822890313.webp>24505b>128","mc":"24505b","i":"722254956566"}"
    // 生成房间媒体卡片消息格式
    let mediaCardContent = `m__4=${typeId}>${title}>${singerName}>${coverUrl}>${color}>${resolutionRatio}`;
    // 转化成房间消息
    return encodePublicMessage(mediaCardContent, color)
}
/**
 * 生成一个视频卡片消息
 * @param typeId 视频平台从0开始
 * @param title 视频名字
 * @param singerName 制作者名字
 * @param coverUrl 封面图片链接
 * @param color 颜色
 * @param resolutionRatio 分辨率，64会被识别成1080p
 */
function encoderVideoCard(typeId: string, title: string, singerName: string, coverUrl: string, color: string, resolutionRatio: string, time: string) {
    // {"m":"m__4*3>今天开始自己上厕所>小兰>https://img2.doubanio.com/view/photo/l/public/p822890313.webp>352a31>>64>>5:36","mc":"352a31","i":"482200197882"}
    // 生成房间媒体卡片消息格式
    let mediaCardContent = `m__4*${typeId}>${title}>${singerName}>${coverUrl}>${color}>${resolutionRatio}>${time}`;
    // 转化成房间消息
    return encodePublicMessage(mediaCardContent, color)
}
/**
 * 编码点赞消息
 * @param targetUid 目标id
 * @param content 正文
 * @returns 格式化好的消息
 */
function encoderLikeMessage(targetUid: string, content: string = "") {
    // if (targetUid) return;
    return `+*${targetUid}${content}`
}
/**
 * 生成弹幕消息
 * @param message 消息
 * @param color 颜色
 * @param v v,默认是0
 * @returns 返回格式化好的弹幕消息
 */
function encoderDanmu(message: string, color: string, v: string = '0') {
    // ~{"t":"[http://r.iirose.com/i/22/3/21/18/3125-DK.gif#e]","c":"ffff00","v":0}
    return `~{"t":"${message}","c":"${color}","v":${v}}`
}
/**
 * 生成撤回的消息
 * @param randomNumber 指定消息的随机数如：491855401763
 * @param privateUID 私聊对象的UID
 * @returns 
 */
function encodeWithdrawnMessage(randomNumber: string, privateUID: string = '') {
    // v0#491855401763
    // v0*61aef798c94e6#015913147468
    if (privateUID == '')
        return `v0#${randomNumber}`;
    else
        return `v0*${privateUID}#${randomNumber}`;
}

/**
 * 生成股票请求消息
 * @param count 股票数量，不填或等于0时返回正常查看
 * @returns 
 */
function encodeStockRequest(count: number | undefined) {
    // 查看">#"
    // '>1507"1507"1"0"21.021'
    // 买了一个">$1"
    // '>1508"1508"1"20.021'
    // 卖了一个">@1"
    // '>1507"1507"0"21.021'
    // 购买超出数量">$99999"
    // 余额这么多'><20.676'
    // 卖出超出持有的股票数量">@9999"
    // 只有1股'>>1'
    // 股票价格太低(低于0.1)购买失败
    // ">*"
    if (count == undefined)
        return '>#';
    else if (count > 0)
        return `>$${Math.round(Math.abs(count))}`;
    else if (count < 0)
        return `>@${Math.round(Math.abs(count))}`;
    else return '>#';


}

export const encoder = {
    encodePublicMessage,
    encodePrivateMessage,
    encoderHidenMessage,
    encoderMusicCard,
    encoderVideoCard,
    encoderLikeMessage,
    encoderDanmu,
    encodeWithdrawnMessage,
    encodeStockRequest
}