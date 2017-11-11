var input = draft.content;
var action, content, uri, arr;
var key_list = [];

// default action
var default_action = 'gg';

// action List ["ACTION_NAME", "URL_SCHEME", "USE_INTERNAL_BROWSER"]
var action_list = [
    ["tp", "", 0],
    ["ai", "aisearch://command?q=", 0],
    ["due", "due:///add?title=", 0],
    ["op", "onepassword://search/", 0],
    ["redeem", "https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/freeProductCodeWizard?mt=8&code=", 0],
//////📱 Utilities
    ["app", "itms-apps://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?edia=software&term=", 0],
    ["pt", "pricetag://search?p=iOS&key=", 0],
    ["gm", "comgooglemaps://?q=", 0],
    ["tran", "https://translate.google.cn/m/translate#auto/zh-CN/", 1],
    ["dic", "dictionary2://define-", 0],
    ["say", "launch://x-callback-url/speak?x-success=drafts4://create&text=", 0],
    ["macs", "https://www.macstories.net/?s=", 0],
    ["def", "launch://x-callback-url/define?x-success=drafts4://create&text=", 0],
    ["freemusic", "https://www.tikitiki.cn/search.do?page=1&type=1&keyword=", 1],
    ["event", "drafts4://create?action=Fantastical%20Event&text=", 0],

//////📱 Social
    ["call", "", 0],
    ["airmail", "", 0],
    ["ins", "instagram://user?username=", 0],
    ["tw", "tweetbot:///post?text=", 0],
    ["twuser", "tweetbot:///follow/", 0],
    ["sms", "drafts4://create?action=Message&text=", 0],
    ["wb", "moke:///post?text="],
    ["wbuser", "moke:///search/users?query="],

//////📱 Shopping
    ["tb", "taobao://s.taobao.com/?q=", 0],
    ["amz", "http://www.amazon.com/s/?field-keywords=", 1],
    ["wtb", "https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&q=", 1],
    ["wjd", "https://so.m.jd.com/ware/search.action?keyword=", 1],
    ["book", "http://search.m.dangdang.com/search.php?keyword=", 1],

//////📱 Search Engine
    ["appinfo", "", 1],
    ["gg", "https://www.google.com/search?q=", 1],
    ["bing", "http://cn.bing.com/search?q=", 1]
    ["wx", "http://weixin.sogou.com/weixinwap?query=", 1],
    ["wolf", "wolframalpha:///?i=", 0],
    ["imdb", "imdb:///find?q=", 0],
//    ["music", "spotify:search:", 0],
    ["wiki", "https://zh.m.wikipedia.org/wiki/", 1],
    ["baike", "http://www.baike.com/wiki/"],
 //   ["smusic", "https://www.tikitiki.cn/search.do?page=1&type=1&keyword=", 1],
    ["zhihu", "http://www.zhihu.com/search?q=", 1],
//    ["lyrics", "mxm://search/", 0],
    ["xy", "https://s.2.taobao.com/list/list.htm?search_type=item&q=", 1],

//////📱 Writeing
    ["life", "", 0],
    ["newbear", "bear://x-callback-url/create?x-success=drafts4://create&text=", 0],
//    ["bear", "bear://x-callback-url/create?text="],
    ["ns", "ulysses://x-callback-url/new-sheet?index=2&x-success=drafts4://create&text=", 0],
    ["dayone", "dayone://post?entry="],


////🌐 Web Tools
    ["encode", "", 0],
    ["decode", "", 0],
    ["IP", "http://www.ip138.com/ips138.asp?ip=", 1],
    ["cy", "http://chengyu.t086.com/chaxun.php?q=", 1],
    ["pin", "https://www.pinterest.com/search/pins/?q=", 1],
    ["uns", "https://unsplash.com/search/photos/", 1],
    ["ssp", "https://www.google.co.jp/search?q=site:sspai.com+", 1],
    ["youtube", "https://m.youtube.com/results?q=", 0],
    ["medium", "https://medium.com/search?q=", 0],
    ["apple", "https://www.apple.com/cn/search/", 0],

////🆘 Send SOS Message
    ["110", "sms://12110", 0],
    ["120", "https://mp.weixin.qq.com/s/XM3hIgsHP9ohaFdhZMkxng", 0],

////🔍 Google Advanced Search
    ["min", "https://www.google.co.jp/search?q=-", 0],
    ["add", "https://www.google.co.jp/search?q=+", 0],
    ["site", "https://www.google.com/search?q=site:", 0],
    ["safe", "https://www.google.co.jp/search?q=-baidu%20", 0],
    ["doc", "https://www.google.com/search?q=filetype:doc+", 0],
    ["png", "https://www.google.com/search?q=filetype:png+", 0],
    ["tex", "https://www.google.com/search?q=filetype:tex+", 0],
    ["ppt", "https://www.google.com/search?q=filetype:ppt+", 0],
    ["pdf", "https://www.google.com/search?q=filetype:pdf+", 0],
    ["xls", "https://www.google.com/search?q=filetype:xls+", 0],

////💠 Workflow series Function
    ["movie", "workflow://run-workflow?name=Douban%20Movie&input=", 0],
    ["imovie", "https://workflow.is/workflows/67bd72ec70444d3fa0256b02fc2b0087", 0],

    ["del", "workflow://run-workflow?name=Delete%20same%20item&input=", 0],
    ["idel", "https://workflow.is/workflows/5f1ecac204cd476aa20cdad16cdff569", 0],

    ["Morse", "workflow://run-workflow?name=MorseCode&input=", 0],
    ["iMorse", "https://workflow.is/workflows/adcd9cfcef164cfcadc4e7a9a2eabba8", 0],

    ["appinfo", "workflow://run-workflow?name=App%20Info&input=", 0],
    ["iappinfo", "https://workflow.is/workflows/7a82235dd7ef4a2c8c8e98b6f3aac1db", 0],

    ["trump", "workflow://run-workflow?name=@realDonaldTrump&input=", 0],
    ["itrump", "https://workflow.is/workflows/573bc6a58afa4054be7aa2dc9ff94dd8", 0],

////🚩 Change App Store Country
    ["us", "http://itunes.apple.com/us/app/region-chager/id0123456789", 0],
    ["jp", "http://itunes.apple.com/jp/app/region-chager/id0123456789", 0],
    ["ca", "http://itunes.apple.com/ca/app/region-chager/id0123456789", 0],
    ["hk", "http://itunes.apple.com/hk/app/region-chager/id0123456789", 0],
    ["cn", "http://itunes.apple.com/cn/app/region-chager/id0123456789", 0],

//// Todolist f=first s=second t=third f=fourth
    ["tdlf", "todoist://addtask?date=none&priority=1&content="],
    ["tdls", "todoist://addtask?date=none&priority=2&content="],
    ["tdlt", "todoist://addtask?date=none&priority=3&content="],
    ["tdlf", "todoist://addtask?date=none&priority=4&content="],

//‼️ OmniFocus Function
////📋 Attach notes
    ["note","", 0],
////📋 Clipboard notes
    ["task","", 0],
////📅 Date task
    ["date","", 0],
////💻 Project task
    ["pro","drafts4://create?action=OmniFocus%20SSPAI%20Project&text=", 0],
////✴️ Flag task
    ["tdf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Today%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["tmf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Tomorrow%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["suf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Subsay%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["weekly","omnifocus://x-callback-url/add?flag=true&defer=Saturday%2019:00&due=Saturday%2020:00&repeat-method=fixed&context=%E2%9C%B4%EF%B8%8F&repeat-method=fixed&repeat-rule=FREQ=WEEKLY;INTERVAL=1&project=%E2%AD%90%EF%B8%8F%E2%AD%90%EF%B8%8F&autosave=true&x-success=drafts4://create&name=", 0],
////💻 Blog task
    ["blog","omnifocus://x-callback-url/add?due=Saturday%2023:30&context=%F0%9F%92%BB%F0%9F%92%BB&x-success=drafts4://create&autosave=true&name=%F0%9F%92%BB%F0%9F%92%BB%20", 0],
////📹 Movie task
    ["mv","omnifocus://x-callback-url/add?due=Saturday%2024:00&context=%F0%9F%93%B9%F0%9F%93%B9&x-success=drafts4://create&autosave=true&due=Saturday%24:00&name=YouTube%20", 0],
////👋 Take task
    ["tk","omnifocus://x-callback-url/add?&context=%F0%9F%91%8B&x-success=drafts4://create&autosave=true&due=Saturday%2018:30&name=", 0],
////📕 Read task
    ["read","omnifocus://x-callback-url/add?&context=%F0%9F%93%95%F0%9F%93%95&x-success=drafts4://create&autosave=true&due=Today%2009:00&name=%F0%9F%93%95%F0%9F%93%95", 0],
////🤔 Question task
    ["why","omnifocus://x-callback-url/add?&context=%F0%9F%A4%94%F0%9F%A4%94&x-success=drafts4://create&autosave=true&due=Sunday%2010:00&name=", 0],
////🔖 App task
    ["apps","omnifocus://x-callback-url/add?&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&due=Today%2019:35&name=Apps%20", 0],
////🎧 Music task
    ["mu","omnifocus://x-callback-url/add?&context=%F0%9F%8E%A7%F0%9F%8E%A7&x-success=drafts4://create&autosave=true&due=Today%2018:45&name=%F0%9F%8E%A7%F0%9F%8E%A7%20", 0],
////📞 Chat task
    ["chat","omnifocus://x-callback-url/add?&context=%F0%9F%93%9E%F0%9F%93%9E&x-success=drafts4://create&autosave=true&due=Today%2018:40&name=Chat%20", 0],
////⏰ Today
    ["td","omnifocus://x-callback-url/add?due=Today%2018:25&context=%E2%9C%B4%EF%B8%8F%E2%9C%B4%EF%B8%8F&x-success=drafts4://create&autosave=true&name=", 0],
////🕰 Tomorrow
    ["tom","omnifocus://x-callback-url/add?due=Tomorrow%2023:00&context=%E2%9C%B4%EF%B8%8F%20&x-success=drafts4://create&autosave=true&name=", 0],
////6️⃣ sat=Saturday o=one minutes f=five minutes t=ten minutes h=half a hour
    ["so","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sf","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=5%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["st","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sh","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=3%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
////7️⃣ sun=Sunday o=one minutes f=five minutes t=ten minutes h=half a hour
    ["suno","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunf","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=5%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunt","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=1%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunh","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=3%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&&name=", 0],
];

for (i = 0; i < action_list.length; i++) {
    key_list.push(action_list[i][0]);
}

// parse keyword
if (key_list.indexOf(input.split(' ').shift().toLowerCase()) != -1) {
    arr = input.split(' ');
    action = arr.shift().toLowerCase();
    uri = action_list[key_list.indexOf(action)][1];
    content = arr.join(' ');
}
else if (key_list.indexOf(input.split(' ').pop().toLowerCase()) != -1) {
    arr = input.split(' ');
    action = arr.pop().toLowerCase();
    uri = action_list[key_list.indexOf(action)][1];
    content = arr.join(' ');
}
else if (key_list.indexOf(input.split('\n').shift().toLowerCase()) != -1) {
    arr = input.split('\n');
    arr.shift().toLowerCase()
    uri = action_list[key_list.indexOf(action)][1];
    content = arr.join('\n');
}
else if (key_list.indexOf(input.split('\n').pop().toLowerCase()) != -1) {
    arr = input.split('\n');
    action = arr.pop().toLowerCase();
    uri = action_list[key_list.indexOf(action)][1];
    content = arr.join('\n');
}
else {
    action = default_action;
    uri = action_list[key_list.indexOf(action)][1];
    content = input.trim() ? input.trim() : getClipboard();
}

// don't append unnecessary clipboard content 
if (content.trim().length === 0) {
    if (uri.endsWith('//') || uri.endsWith('=')) {
        content = getClipboard().trim();
    }
}

if (draft.selectionLength > 0) {
    content = draft.content.substr(draft.selectionStart, draft.selectionLength);
}

// url without http://
if (action == 'url') {
    uri = content.startsWith('http') ? content : 'http://' + content;
    content = '';
}

// parse mobile and phone number
if (action == 'tel' || action == 'sms' || action == 'ip') {
    content = content.replace('\u202d', '');
    content = content.replace('\u202c', '');

    var num = content.match(/(86)?1[3|5|7|8][0-9]\d{4,8}/);

    if (!num) {
        num = content.match(/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/);
    }

    content = num ? num[0] : content;
}

// use internal browser
if (uri.startsWith('http')) {
    if (action_list[key_list.indexOf(action)][2]) {
        content = encodeURIComponent(content);
        setClipboard(uri + content);
        uri = 'drafts4://x-callback-url/runAction?action=URL';
        content = '';
    }
}

//匹配 IP 地址并复制到剪切板
if (action == "ip") {
    var ip = input.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
    content = ip ? ip[0] : content;
    uri = "drafts4://create"
    setClipboard(ip)
}

if (action == "date") {
//日期双变量
//获取第一行内容 设置变量 title
var title = draft.processTemplate("[[title]]");
//获取第二行内容 设置变量 body
var body = draft.processTemplate("[[body]]");
//获取今年年份 设置变量 year
var year = draft.processTemplate("[[date|%Y.]]");
//替换 title 或 body 中的调用关键字
var reg = new RegExp(/\s*date\s*/, 'i');
var title = (title.replace(reg, ""));
var body = (body.replace(reg, ""));
//编码 title 和 body 内容
var title = (encodeURI(title))
var body = (encodeURI(year+body))
alert(body)
//声明 x-callback-url
var uri="omnifocus://x-callback-url/add?&x-success=drafts4://create&name=titlekeyword&due=datekeyword&autosave=true"
//用编码内容替换两个 keyword 字符
var uri = uri.replace(/titlekeyword/g, title);
var uri = uri.replace(/datekeyword/g, body);
content ="";
}

if (action == "note") {
//任务备注双变量
//获取第一行内容 设置变量 title
var title = draft.processTemplate("[[title]]");
//获取第二行内容 设置变量 body
var body = draft.processTemplate("[[body]]");
//替换 title 或 body 中的调用关键字
var reg = new RegExp(/\s*note\s*/, 'i');
var title = (title.replace(reg, ""));
var body = (body.replace(reg, ""));
//编码 title 和 body 内容
var title = (encodeURI(title))
var body = (encodeURI(body))
//声明 x-callback-url
var uri="omnifocus://x-callback-url/add?&x-success=drafts4://create&name=titlekeyword&note=notekeyword&autosave=true"
//用编码内容替换两个 keyword 字符
var uri = uri.replace(/titlekeyword/g, title);
var uri = uri.replace(/notekeyword/g, body);
content ="";
}

if (action == "task") {
//设置草稿内容变量
var input = draft.content;
//获取剪切板内容 设置变量 clip
var clip = draft.processTemplate("[[clipboard]]");
//编码 clip 和 input 内容
var clip = (encodeURI(clip))
var input = (encodeURI(input))
//声明 x-callback-url
var uri="omnifocus://x-callback-url/add?&x-success=drafts4://create&note=clipkeyowrd&name=draftkeyword&autosave=true"
//用编码内容替换 draftkeyword 字符
var uri = uri.replace(/clipkeyowrd/g, clip);
var uri = uri.replace(/draftkeyword/g, input);
content ="";
}

if (action == "airmail") {
//Airmail 标题 内容 收件人 三变量
//获取第一行内容 设置变量 title
var title = draft.processTemplate("[[title]]");
//获取第二行内容 设置变量 body
var body = draft.processTemplate("[[body]]");
//尝试从剪切板收件人邮箱地址 设置变量 clipboard
var clipboard = draft.processTemplate("[[clipboard]]");
//判断剪切板是否有收件人邮件地址
var reg = new RegExp(/\S*@\S*/, 'i');
var addressee = (clipboard.match(reg, ""));
var num = addressee.length;
if (num > 0) {
    addressee = addressee;
} else {
    //从草稿内容中获取收件人邮件地址
    addressee = (body.match(reg, ""));
}
//替换 title 或 body 中的调用关键字
var reg = new RegExp(/\s*airmail\s*/, 'i');
var title = (title.replace(reg, ""));
var body = (body.replace(reg, ""));
//编码 title 和 body 内容
var title = (encodeURI(title))
var body = (encodeURI(body))
//声明 x-callback-url
var uri="airmail://x-callback-url/send?subject=titlekeyword&to=addresseekeyword&plainBody=bodykeyword&x-success=drafts4://"
//用编码内容替换两个 keyword 字符
var uri = uri.replace(/titlekeyword/g, title);
var uri = uri.replace(/bodykeyword/g, body);
var uri = uri.replace(/addresseekeyword/g, addressee);
content ="";
}

if (action == "encode") {
//编码草稿内容
//设置草稿内容变量
var input = draft.content;
//替换 draft 中的调用关键字
var reg = new RegExp(/\s*encode\s*/, 'i');
var input = (input.replace(reg, ""));
//编码 draft 内容
var input = (encodeURI(input))
//复制到剪切板
setClipboard(input)
//重置 uri 和 content
uri ="drafts4://create";
content ="";
}

if (action == "decode") {
//编码草稿内容
//设置草稿内容变量
var input = draft.content;
//替换 draft 中的调用关键字
var reg = new RegExp(/\s*decode\s*/, 'i');
var input = (input.replace(reg, ""));
//编码 draft 内容
var input = (decodeURI(input))
//复制到剪切板
setClipboard(input)
//重置 uri 和 content
uri ="drafts4://create";
content ="";
}

//Bear 日记记录
if (action == "life") {
//获取草稿内容 设置变量 drafts
var drafts = draft.processTemplate("[[draft]]");
//获取今日日期 设置变量 date
var date = draft.processTemplate("[[date|%Y.%m.%d %I:%M %p]]\n");
var idkeyword = "137D7FB1-8CF8-4B7D-9907-75C7D20C95FB-272-000000048EDF2EDC"
//替换 title 或 body 中的调用关键字
var reg = new RegExp(/\s*life\s*/, 'i');
var drafts = (drafts.replace(reg, ""));
//拼接 title body
var drafts = (date.concat(drafts));
//编码 title 和 body 内容
var drafts = (encodeURI(drafts))
//声明 x-callback-url
var uri="bear://x-callback-url/add-text?id=idkeyword&mode=append&x-success=drafts4://&text=textkeyword"
//用编码内容替换两个 keyword 字符
var uri = uri.replace(/textkeyword/g, drafts);
var uri = uri.replace(/idkeyword/g, idkeyword);
content ="";
}

//Timepage 双变量添加事件
//day can be specified as either:
//Date in the format yyyy-mm-dd
//Special strings "today" or "tomorrow"
//Upcoming weekday name (long or short) such as "monday", "tuesday, "wed", etc.  Is specific to the language set by the device.  Always specifies the next upcoming day with this name.
if (action == "tp") {
//获取草稿内容 设置变量 title
var title = draft.processTemplate("[[title]]");
//获取今日日期 设置变量 date
var date = draft.processTemplate("[[body]]");
//替换 title 或 date 中的调用关键字
var reg = new RegExp(/\s*tp\s*/, 'i');
var title = (title.replace(reg, ""));
var date = (date.replace(reg, ""));
//编码 title 和 body 内容
var title = (encodeURI(title))
var date = (encodeURI(date))
//声明 x-callback-url
var uri="timepage://x-callback-url/add_event?title=titlekeyword&day=datekeyword&x-success=drafts4://"
//用编码内容替换两个 keyword 字符
var uri = uri.replace(/titlekeyword/g, title);
var uri = uri.replace(/datekeyword/g, date);
content ="";
}

//App 历史版本 ID 查询
if (action == "appinfo") {
//设置草稿内容变量
var input = draft.content;
//替换 input 中的调用关键字
var reg = new RegExp(/\s*appinfo\s*/, 'i');
var input = (input.replace(reg, ""));
//声明 uri
var uri="https://api.unlimapps.com/v1/apple_apps/idkeyword/versions"
//用编码内容替换 appid 字符
var uri = uri.replace(/idkeyword/g, input);
content ="";
}

if (action == "call") {
//获取草稿内容变量
var input = draft.content;
//替换 input 中的调用关键字
var reg = new RegExp(/\s*call\s*/, 'i');
var input = (input.replace(reg, ""));
//匹配电话号码 将匹配到的电话号码设置变量 phonenum
var reg = new RegExp(/^1[0-9]{10}$/);
var content = (input.match(reg, ""));
var uri = "tel:"
}

draft.defineTag("uri", uri);
draft.defineTag("content", content);