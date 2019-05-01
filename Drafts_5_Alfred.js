var key_list = []; var input = draft.content;
var default_action = '☞';
var action, content, uri, arr;

// action List ["ACTION_NAME", "URL_SCHEME", "USE_INTERNAL_BROWSER"]
var action_list = [

    ["✎", "drafts5://x-callback-url/runAction?action=%24BearDiary&x-success=drafts5://&text=", 0],

    ["work", "drafts5://x-callback-url/runAction?action=WorkLog&text=", 0],
    // ["w", "drafts5://x-callback-url/runAction?action=WorkLog&text=", 0],
    //["WorkLog", "drafts5://x-callback-url/runAction?action=WorkLog&text=", 0],
    ["jdi", "drafts5://x-callback-url/runAction?action=%24JustDoIt&x-success=drafts5://&text=", 0],
    
    //默认动作为复制。但由于 action 中设置了 trash，所以执行完会删除。
    ["☞", "drafts5://x-callback-url/runAction?action=Copy&text=", 0],
    
    //添加到 iCloud 文档
    ["rec", "drafts5://x-callback-url/runAction?action=%24Memory&text=", 0],
    
    //下面这个动作处理多行文本时会添加多个任务。
    // ["dd", "ticktick://x-callback-url/v1/add_task?list=inbox&x-success=drafts5://&title=", 0],
    ["dd", "drafts5://x-callback-url/runAction?action=Task2TickTick&x-success=drafts5://&text=", 0],
    ["TickTick", "drafts5://x-callback-url/runAction?action=Task2TickTick&x-success=drafts5://&text=", 0],

    ["ai", "aisearch2://search?q=", 0],
    ["amz", "http://www.amazon.com/s/?field-keywords=", 1],
    ["app", "itms-apps://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?edia=software&term=", 0],
    // ["as", "itms-apps://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?edia=software&term=", 0],
    //["beorg", "beorg://x-callback-url/capture", 0],
    ["bing", "http://cn.bing.com/search?q=", 1],
    ["def", "launch://x-callback-url/define?x-success=drafts5://create&text=", 0],
    ["dang", "http://search.m.dangdang.com/search.php?keyword=", 1],
    ["dic", "dictionary2://define-", 0],
    ["due", "due:///add?title=", 0],
    ["gg", "https://www.google.com/search?q=", 1],
    ["Google", "https://www.google.com/search?q=", 1],
    ["sa", "https://www.google.com/search?q=", 0],
    ["Safari", "https://www.google.com/search?q=", 0],
    ["gh", "https://github.com/search?&q=", 0],
    ["imdb", "imdb:///find?q=", 0],
    ["ins", "instagram://user?username=", 0],
    ["ip", "http://ip.cn/index.php?ip=", 1],
    ["jdm", "https://so.m.jd.com/ware/search.action?keyword=", 1],
    // ["mail", "drafts5://create?action=Email&text=", 0],
    ["medium", "https://medium.com/search?q=", 0],
    ["moke", "moke:///post?text=", 0],
    ["mk", "moke://6714650703/post?text=", 0],
    ["op", "onepassword://search/", 0],
    ["Pinterest", "https://www.pinterest.com/search/pins/?q=", 0],
    ["pt", "pricetag://search?p=iOS&key=", 0],
    ["redeem", "https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/freeProductCodeWizard?mt=8&code="],
    ["say", "launch://x-callback-url/speak?x-success=drafts5://create&text=", 0],
    ["sms", "drafts5://create?action=Message&text=", 0],
    // ["sms", "sms://", 0],
    ["spot", "spotify:search:", 0],
    ["ssp", "https://www.google.com/search?q=site:sspai.com+", 0],
    ["tel", "tel://", 0],
    ["tb", "taobao://s.taobao.com/?q=", 0],
    ["tbm", "https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&q=", 1],
    ["tran", "https://translate.google.cn/m/translate#auto/zh-CN/", 1],
    ["Tweetbot", "tweetbot:///post?text=", 0],
    // ["twuser", "tweetbot:///follow/", 0],
    ["uns", "https://unsplash.com/search/photos/", 0],
    ["url", "", 1],
    ["weibo", "sinaweibo://sendweibo?show_keyboard=1&content=", 0],
    ["wiki", "https://zh.m.wikipedia.org/wiki/", 1],
    ["wolf", "wolframalpha:///?i=", 0],
    // 搜狗 - 微信公众号 失效。
    // ["wx", "http://weixin.sogou.com/weixinwap?query=", 1],
    // 咸鱼网页已失效。
    // ["xy", "https://s.2.taobao.com/list/list.htm?search_type=item&q=", 1],
    ["yt", "https://m.youtube.com/results?q=", 0],
    ["Youtube", "https://m.youtube.com/results?q=", 0],
    ["zhihu", "http://www.zhihu.com/search?q=", 1],
    
    //谷歌高级搜索
    ["site", "https://www.google.com/search?q=-baidu%20site:", 0],
    ["doc", "https://www.google.com/search?q=-baidu%20filetype:doc+", 0],
    ["ppt", "https://www.google.com/search?q=-baidu%20filetype:ppt+", 0],
    ["pdf", "https://www.google.com/search?q=-baidu%20filetype:pdf+", 0],
    ["xls", "https://www.google.com/search?q=-baidu%20filetype:xls+", 0],

    //切换商店地区
    ["us", "http://itunes.apple.com/us/app/", 0],
    ["jp", "http://itunes.apple.com/jp/app/", 0],
    ["ca", "http://itunes.apple.com/ca/app/", 0],
    ["hk", "http://itunes.apple.com/hk/app/", 0],
    ["cn", "http://itunes.apple.com/cn/app/", 0],
    
    //文字收集
    // ["do", "dayone://post?entry=", 0],
    ["nb", "bear://x-callback-url/create?x-success=drafts5://create&text=", 0],
    // ["ns", "ulysses://x-callback-url/new-sheet?index=2&text=", 0],

    // Shortcuts
    // ["#", "shortcuts://x-callback-url/run-shortcut?name=###&x-success=drafts5://", 0],

    //Workflow Example
    // ["download", "workflow://run-workflow?name=Download%20Files&input=", 0],
    
    //OmniFocus
    // ["task", "drafts5://x-callback-url/runAction?action=TaskPaper&text=", 0],

    ["test", "", 0],
    ["encode", "", 0],
    ["decode", "", 0],
    ["linenum", "", 0],
    ["replace", "", 0]
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
    content = input.trim() ? input.trim() : app.getClipboard();
}

// don't append unnecessary clipboard content
if (content.trim().length === 0) {
    if (uri.endsWith('//') || uri.endsWith('=')) {
        content = app.getClipboard().trim();
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

// use internal browser
if (uri.startsWith('http')) {
    if (action_list[key_list.indexOf(action)][2]) {
        content = encodeURIComponent(content);
        app.setClipboard(uri + content);
        uri = 'drafts5://x-callback-url/runAction?action=URL';
        content = "";
    }
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

// parse ip address
if (action == 'ip') {
    var ip = content.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
    content = ip ? ip[0] : content;
}

if (action == 'test') {
    uri = encodeURI(content);
    content = "";
}

if (action == 'encode') {
    app.setClipboard((encodeURI(content)));
    uri = "drafts5://create";
    content = "";
}

if (action == 'decode') {
    app.setClipboard((decodeURI(content)));
    uri = "drafts5://create";
    content = "";
}

// if (action == 'encode') {
//     input = draft.content;
//     reg = new RegExp(/\s*encode\s*/, 'i');
//     input = (input.replace(reg, ""));
//     app.setClipboard((encodeURI(input)))
//     uri = "drafts5://create";
//     content = "";
// }

// if (action == 'decode') {
//     input = draft.content;
//     reg = new RegExp(/\s*decode\s*/, 'i');
//     input = (input.replace(reg, ""));
//     app.setClipboard((decodeURI(input)))
//     uri = "drafts5://create";
//     content = "";
// }

if (action == 'replace') {
    strings = content.split("\n")[0];
    find = strings.split(",")[0];
    replace = strings.split(",")[1];
    body = draft.processTemplate("[[body]]");
    re = new RegExp(find, 'g');
    matches = body.match(re);
    if(matches) {
    content = body.replace(re, replace);
    alert('已替换 '+matches.length+' 处');
    uri = "drafts5://create?text="
    app.setClipboard(content)
    }
    else {
     alert('「'+find+'」'+'未找到');
    }
}

if (action == 'linenum') {
    linenum = content.split("\n"); 
    linenum = lines.length;
    alert("Line number is:"+ linenum)
    uri = "drafts5://create?text="+ encodeURI(content);
    content = "";
}

if (action == 'tasks') {
// 处理来自 Web Capture Extension 的链接
weblink = content.match(/\[.*\]\(.*\)/g);
if (weblink != null) {
   title = content.match(/\[.*\]/g);
   link = content.match(/\(http.*\)/g);
   content = "- 🔖 "+title+" @estimate(05 min) @concontent(📕📕 Reading Lists)"+"\n"+link
   target = 'inbox';
   content = content.replace(/\(|\)|\[|\]/g, "")
   uri = "omnifocus:///paste?content="+ encodeURIComponent(content)+"&target="+ encodeURIComponent(target)+"&x-success=drafts5://"
   content = "";
}

// 处理项目清单任务
var folderTag = content.match(/@folder\(.+?\)/g);
if (folderTag != null) {
    target = '/folder/' + folderTag[0].slice(8,-1);
    uri = "omnifocus:///paste?content="+ encodeURIComponent(content)+"&target="+target+"&x-success=drafts5://"
} else {
    uri = "omnifocus:///paste?content="+ encodeURIComponent(content)+"&target=inbox"+"&x-success=drafts5://"
   content = "";
}

uri = uri.replace(/丨.*| -.*|\|.*|【.*】|“|”|……|「|」| –.*|！/gi, "")
}

draft.setTemplateTag("uri", uri);
draft.setTemplateTag("content", content);
