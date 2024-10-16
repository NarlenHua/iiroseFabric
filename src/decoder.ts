import { init } from "./init";

function decodePublicMessage(message: string) {
  // "1726160174>http://r.iirose.com/i/23/8/17/12/0120-9Y.jpg#e>留不住别样年华>不行啊>6b4d44>6b4d44>2>>61aef798c94e6>0ৡ年华ོꦿ࿐''8368'14'20,99.9,0.5>748984053771
  let tempMessage = init.fabricAPI.messages.publicMessage;
  let message_list = message.split('>');
  tempMessage.timeStamp = message_list[0].slice(1);
  tempMessage.headPortrait = message_list[1];
  tempMessage.name = message_list[2];
  tempMessage.message = message_list[3];
  tempMessage.color = message_list[5];
  tempMessage.gender = message_list[6];
  tempMessage.uid = message_list[8];
  tempMessage.designation = message_list[9];
  tempMessage.messageUid = message_list[10];
  return tempMessage;
}
function decodePrivateMessage(message: string) {
  // ""1726160459>61aef798c94e6>留不住别样年华>http://r.iirose.com/i/23/8/17/12/0120-9Y.jpg#e>1>6b4d44>>6b4d44>2>>593356694306
  let tempMessage = init.fabricAPI.messages.privateMessage;
  let message_list = message.split('>');
  tempMessage.timeStamp = message_list[0].slice(2);
  tempMessage.uid = message_list[1];
  tempMessage.name = message_list[2];
  tempMessage.headPortrait = message_list[3];
  tempMessage.message = message_list[4];
  tempMessage.color = message_list[5];
  tempMessage.gender = message_list[8];
  tempMessage.messageUid = message_list[10];
  return tempMessage;
}
/**解码弹幕消息 */
function decodeDanmuMessage(message: string) {
  // =narlen>http://r.iirose.com/i/23/12/17/9/4944-6D.jpg>7f544c>7f544c>2>anime/63>1726212024>655352ad667a8>>350>0>0,0,0.5>f0
  let tempMessage = init.fabricAPI.messages.danmuMessage;
  // console.log('弹幕消息', message)
  let message_list = message.split('>');
  tempMessage.username = message_list[0];
  tempMessage.message = message_list[1];
  tempMessage.color = message_list[2];
  tempMessage.gender = message_list[4];
  tempMessage.avatar = message_list[5];
  tempMessage.timeStamp = message_list[6];
  tempMessage.uid = message_list[7];
  return tempMessage;
}

function decodeHiddenMessage(message: string) {
  let tempMessage = init.fabricAPI.messages.hiddenMessage;
  let temp;
  temp = message.match(/(?<=^[/]<).*(?=>[0-9|a-z]{13}:.*)/gs);
  tempMessage.messageName = (temp == null) ? '' : temp[0];
  temp = message.match(/(?<=^[/]<.*>)[0-9|a-z]{13}(?=:.*)/gs);
  tempMessage.uid = (temp == null) ? '' : temp[0];
  temp = message.match(/(?<=^[/]<.*>[0-9|a-z]{13}:).*/gs);
  tempMessage.data = (temp == null) ? '' : temp[0];
  return tempMessage;
}
/**解码撤回消息 */
function decodeWithdrawnMessage(message: string) {
  // `v0#62506af353dd9_491855401763"`
  // `v0#61aef798c94e6_656602774703"`
  // `v0*61aef798c94e6"62506af353dd9_015913147468`
  // console.log('撤回类型的原消息', message);
  let tempMessage = init.fabricAPI.messages.withdrawnMessage;
  if (message[2] == '#') {
    tempMessage.privateUID = '';
    tempMessage.uid = message.slice(3, 16);
    tempMessage.randomNumber = message.slice(17, 29);
    tempMessage.dataUid = message.slice(3, 29);
  }
  else {
    tempMessage.privateUID = message.slice(3, 16);
    tempMessage.uid = message.slice(17, 30);
    tempMessage.randomNumber = message.slice(31);
    tempMessage.dataUid = message.slice(17);
  }
  return tempMessage;
}
function decodeSystemMessage(message: string) {
  let tempMessage = init.fabricAPI.messages.systemMessage;
  tempMessage.userMessageList = message.split('<');
  return tempMessage;
}
function decodeStockMessage(message: string) {
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
  // >1000  "3177.2   "3.1772 "0      "21.732
  // >1001  "3180.3   "1      "18.555
  // >1000  "3177.2   "0      "21.732
  let tempMessage = init.fabricAPI.messages.stockMessage;
  tempMessage.result = message[2];
  // console.log('正在解析的股票消息', message);
  if (tempMessage.result == '*') {
    return tempMessage;
  } else if (tempMessage.result == '>') {
    tempMessage.holdingAmount = parseInt(message.slice(2))
    return tempMessage;
  } else if (tempMessage.result == '<') {
    tempMessage.balance = parseInt(message.slice(2))
    return tempMessage;
  } else {
    let L = message.split('"');
    if (L.length == 5) {
      tempMessage.stockPrice = parseFloat(L[2]);
      tempMessage.totalStock = parseInt(L[0].slice(1));
      tempMessage.holdingAmount = parseInt(L[3]);
      tempMessage.totalEquity = parseFloat(L[1]);
      tempMessage.balance = parseFloat(L[4]);
      return tempMessage;
    } else if (L.length == 4) {
      tempMessage.stockPrice = parseFloat(L[1]) / parseInt(L[0].slice(1));
      tempMessage.totalStock = parseInt(L[0].slice(1));
      tempMessage.holdingAmount = parseInt(L[2]);
      tempMessage.totalEquity = parseFloat(L[1]);
      tempMessage.balance = parseFloat(L[3]);
      return tempMessage;
    }
  }
  // else {
  //   return tempMessage;
  // }
  return tempMessage;
}
function decodeUnkonwMessage(message: string) {
  let tempMessage = init.fabricAPI.messages.unkonwMessage;
  tempMessage.message = message;
  return tempMessage;
}
function decodeMessage(message: string) {
  let messageObjList = []
  if (/^"[^"].*/gs.test(message)) {
    // 房间的消息
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--)
      messageObjList.push(decodePublicMessage(temp_list[i]))
  } else if (/^"".*/gs.test(message)) {
    // 私聊消息
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      messageObjList.push(decodePrivateMessage(temp_list[i]))
    }
  } else if (/^=.*/gs.test(message)) {
    // 弹幕消息
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      messageObjList.push(decodeDanmuMessage(temp_list[i]))
    }
  } else if (/^[/]<.*>[0-9|a-z]{13}:.*/gs.test(message)) {
    // 隐式消息
    messageObjList.push(decodeHiddenMessage(message));
  } else if (/^v0.*/gs.test(message)) {
    // 撤回消息
    messageObjList.push(decodeWithdrawnMessage(message));
  } else if (/^%\*".*/gs.test(message)) {
    // 系统消息
    messageObjList.push(decodeSystemMessage(message));
  } else if (/^>.*/gs.test(message)) {
    // 股票消息
    messageObjList.push(decodeStockMessage(message));
  } else {
    // 未知消息
    messageObjList.push(decodeUnkonwMessage(message));

  }
  return messageObjList;
}

export const decoder = {
  decodeMessage,
}