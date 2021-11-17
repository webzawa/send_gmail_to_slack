// 初期設定
const HOOK_URL = ''; // Slackから取得したWebHooks URL
const SEND_CHANNEL = ''; // Gmailの内容を送信したいSlackチャンネル名
const FROM_ADDRESS = ''; // Slackに送信したいメールの送信元アドレス

function main() {
  var searchTarget = "in:inbox is:unread from:" + FROM_ADDRESS;

  GmailApp
  .search(searchTarget)
  .forEach(function (thread) {
    thread.getMessages().forEach(function (message) {
      send(message);
    });
    thread.markRead();
  });
}

function send(message) {
  var sendText = '【件名】' + message.getSubject()
              //  + '\n【本文】\n' + message.getPlainBody();
               + '\n【本文】\n' + message.getBody();
  
  var jsonData = {
    "icon_emoji": ':mailbox:',
    "channel" : SEND_CHANNEL,
    "username" : message.getFrom(),
    "text" : sendText
  };

  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(jsonData)
  };

  UrlFetchApp.fetch(HOOK_URL, options);
}
