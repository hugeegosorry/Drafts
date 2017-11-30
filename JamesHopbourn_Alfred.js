var key_list = [];
var input = draft.content;
var default_action = 'gg';
var action, content, uri, arr;

// action List ["ACTION_NAME", "URL_SCHEME", "USE_INTERNAL_BROWSER"]
var action_list = [
    ["app", "itms-apps://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?media=software&term="],
    ["timepage", ""],
    ["linenum", ""],
    ["replace", ""],
    ["map", "http://maps.apple.com/?q="],
    ["scholar", "https://scholar.google.com/scholar?q="],
    ["ai", "aisearch://command?q="],
    ["due", "due:///add?title="],
    ["op", "onepassword://search/"],
    ["redeem", "https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/freeProductCodeWizard?mt=8&code="],
//////📱 Utilities
    ["pt", "pricetag://search?p=iOS&key="],
    ["gm", "comgooglemaps://?q="],
    ["tran", "https://translate.google.cn/m/translate#auto/zh-CN/", 0],
    ["dic", "dictionary2://define-"],
    ["say", "launch://x-callback-url/speak?x-success=drafts4://create&text="],
    ["macs", "https://www.macstories.net/?s="],
    ["def", "launch://x-callback-url/define?x-success=drafts4://create&text="],
    ["freemusic", "https://www.tikitiki.cn/search.do?page=1&type=1&keyword="],

//////📱 Social
    ["call", ""],
    ["airmail", ""],
    ["ins", "instagram://user?username="],
    ["tw", "tweetbot:///post?text="],
    ["twuser", "tweetbot:///follow/"],
    ["sms", "drafts4://create?action=Message&text="],

//////📱 Shopping
    ["tb", "taobao://s.taobao.com/?q=", 0],
    ["am", "http://www.amazon.com/s/?field-keywords=", 1],
    ["wtb", "https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&q=", 1],
    ["jd", "https://so.m.jd.com/ware/search.action?keyword=", 1],
    ["book", "http://search.m.dangdang.com/search.php?keyword=", 1],
    ["sech", "https://s.2.taobao.com/list/list.htm?search_type=item&q=", 1],

//////📱 Search Engine
    ["lyrics", "mxm://search/"],
    ["appinfo", "", 1],
    ["gg", "https://www.google.com/search?q=-baidu%20"],
    ["bing", "http://cn.bing.com/search?q="]
    ["wx", "http://weixin.sogou.com/weixinwap?query=", 1],
    ["wolf", "wolframalpha:///?i=", 0],
    ["imdb", "imdb:///find?q="],
    ["music", "spotify:search:"],
    ["wiki", "https://zh.m.wikipedia.org/wiki/"],
    ["zhihu", "http://www.zhihu.com/search?q="],

//////📱 Writeing
    ["nb", "bear://x-callback-url/create?x-success=drafts4://create&text=", 0],
    ["ns", "ulysses://new-sheet?index=2&text="],

////🌐 Web Tools
    ["encode", "", 0],
    ["decode", "", 0],
    ["ip", "http://ip.cn/index.php?ip=", 1],
    ["pin", "https://www.pinterest.com/search/pins/?q="],
    ["gh", "https://github.com/search?&q=", 1],
    ["uns", "https://unsplash.com/search/photos/"],
    ["ssp", "https://www.google.co.jp/search?q=site:sspai.com+", 1],
    ["youtube", "https://m.youtube.com/results?q="],
    ["medium", "https://medium.com/search?q="],
    ["apple", "https://www.apple.com/cn/search/"],

////🆘 Send SOS Message
    ["110", "sms://12110"],
    ["120", "https://mp.weixin.qq.com/s/XM3hIgsHP9ohaFdhZMkxng"],

////🔍 Google Advanced Search
    ["site", "https://www.google.com/search?q=site:"],
    ["doc", "https://www.google.com/search?q=filetype:doc+"],
    ["ppt", "https://www.google.com/search?q=filetype:ppt+"],
    ["pdf", "https://www.google.com/search?q=filetype:pdf+"],
    ["xls", "https://www.google.com/search?q=filetype:xls+"],

////💠 Workflow series Function
    ["download", "workflow://run-workflow?name=Download%20Files&input="],
    ["movie", "workflow://run-workflow?name=Douban%20Movie&input="],
    ["del", "workflow://run-workflow?name=Delete%20same%20item&input="],
    ["Morse", "workflow://run-workflow?name=MorseCode&input="],
    ["trump", "workflow://run-workflow?name=@realDonaldTrump&input="],

////🚩 Change App Store Country
    ["us", "http://itunes.apple.com/us/app/region-chager/id0123456789"],
    ["jp", "http://itunes.apple.com/jp/app/region-chager/id0123456789"],
    ["ca", "http://itunes.apple.com/ca/app/region-chager/id0123456789"],
    ["hk", "http://itunes.apple.com/hk/app/region-chager/id0123456789"],
    ["cn", "http://itunes.apple.com/cn/app/region-chager/id0123456789"],

//‼️ OmniFocus Function
////🔗 Attach notes
    ["note","", 0],
////📋 Clipboard notes
    ["clip","", 0],
////📅 Date task
    ["date","", 0],
////💻 Project task
    ["pro","drafts4://create?action=OmniFocus%20SSPAI%20Project&text=", 0],
////✴️ Flag task
    ["tdf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Today%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["tmf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Tomorrow%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["saf","omnifocus://x-callback-url/add?flag=true&context=%E2%9C%B4%EF%B8%8F%20&due=Saturday%2023:00&x-success=drafts4://create&autosave=true&name=%E2%9C%B4%EF%B8%8F%20", 0],
    ["weekly","omnifocus://x-callback-url/add?flag=true&defer=Saturday%2019:00&due=Saturday%2020:00&repeat-method=fixed&context=%E2%9C%B4%EF%B8%8F&repeat-method=fixed&repeat-rule=FREQ=WEEKLY;INTERVAL=1&project=%E2%AD%90%EF%B8%8F%E2%AD%90%EF%B8%8F&autosave=true&x-success=drafts4://create&name=", 0],
////💻 Blog task
    ["blog","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2023:30&context=%F0%9F%92%BB%F0%9F%92%BB&x-success=drafts4://create&autosave=true&name=%F0%9F%92%BB%F0%9F%92%BB%20", 0],
////📹 Movie task
    ["mv","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2024:00&context=%F0%9F%93%B9%F0%9F%93%B9&x-success=drafts4://create&autosave=true&due=Saturday%24:00&name=YouTube%20", 0],
////👋 Take task
    ["take","omnifocus://x-callback-url/add?defer=Saturday%2020:00&&context=%F0%9F%91%8B&x-success=drafts4://create&autosave=true&due=Saturday%2018:30&name=", 0],
////📕 Read task
    ["read","omnifocus://x-callback-url/add?&context=%F0%9F%93%95%F0%9F%93%95&x-success=drafts4://create&autosave=true&due=Today%2009:00&name=%F0%9F%93%95%F0%9F%93%95", 0],
////🤔 Question task
    ["why","omnifocus://x-callback-url/add?&context=%F0%9F%A4%94%F0%9F%A4%94&x-success=drafts4://create&autosave=true&due=Sunday%2010:00&name=", 0],
////🔖 App task
    ["app","omnifocus://x-callback-url/add?defer=Saturday%2020:00&&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=App%20", 0],
////🎧 Music task
    ["mu","omnifocus://x-callback-url/add?&context=%F0%9F%8E%A7%F0%9F%8E%A7&x-success=drafts4://create&autosave=true&due=Today%2018:45&name=%F0%9F%8E%A7%F0%9F%8E%A7%20", 0],
////🎧 Music task defer
    ["mud","omnifocus://x-callback-url/add?defer=Saturday%2020:00&context=%F0%9F%8E%A7%F0%9F%8E%A7&x-success=drafts4://create&autosave=true&due=Today%2018:45&name=%F0%9F%8E%A7%F0%9F%8E%A7%20", 0],
////📞 Chat task
    ["chat","omnifocus://x-callback-url/add?&context=%F0%9F%93%9E%F0%9F%93%9E&x-success=drafts4://create&autosave=true&due=Today%2018:40&name=Chat%20", 0],
////📞 Chat task defer
    ["chatd","omnifocus://x-callback-url/add?defer=Saturday%2020:00&context=%F0%9F%93%9E%F0%9F%93%9E&x-success=drafts4://create&autosave=true&due=Saturday%2020:00&name=Chat%20", 0],
////⏰ Today
    ["td","omnifocus://x-callback-url/add?due=Today%2018:25&context=%E2%9C%B4%EF%B8%8F%E2%9C%B4%EF%B8%8F&x-success=drafts4://create&autosave=true&name=", 0],
////🕰 Tomorrow
    ["tom","omnifocus://x-callback-url/add?due=Tomorrow%2023:00&context=%E2%9C%B4%EF%B8%8F%20&x-success=drafts4://create&autosave=true&name=", 0],
////6️⃣ s=Saturday o=one minutes f=five minutes t=ten minutes h=half a hour
    ["so","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sf","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=5%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["st","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sh","omnifocus://x-callback-url/add?due=Saturday%2020:00&context=3%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
////6️⃣ s=Saturday o=one minutes f=five minutes t=ten minutes h=half a hour d=Defer
    ["sod","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sfd","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2020:00&context=5%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["std","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2020:00&context=1%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["shd","omnifocus://x-callback-url/add?defer=Saturday%2020:00&due=Saturday%2020:00&context=3%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
////7️⃣ sun=Sunday o=one minutes f=five minutes t=ten minutes h=half a hour
    ["suno","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=1%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunf","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=5%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunt","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=1%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&name=", 0],
    ["sunh","omnifocus://x-callback-url/add?due=Sunday%2020:00&context=3%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A3&x-success=drafts4://create&autosave=true&&name=", 0],
];

for (i = 0; i < action_list.length; i++) {
          key_list.push(action_list[i][0]);
}

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

if (content.trim().length === 0) {
    if (uri.endsWith('//') || uri.endsWith('=')) {
        content = getClipboard().trim();
    }
}

if (draft.selectionLength > 0) {
    content = draft.content.substr(draft.selectionStart, draft.selectionLength);
}

if (uri.startsWith('http')) {
    if (action_list[key_list.indexOf(action)][2]) {
        content = encodeURIComponent(content);
        setClipboard(uri + content);
        uri = "drafts4://x-callback-url/runAction?action=URL";
        content = "";
    }
}

if (action == 'date') {
    title = draft.processTemplate("[[title]]");
    body = draft.processTemplate("[[body]]");
    year = draft.processTemplate("[[date|%Y.]]");
    reg = new RegExp(/\s*date\s*/, 'i');
    title = (title.replace(reg, ""));
    body = (body.replace(reg, ""));
    uri="omnifocus://x-callback-url/add?&x-success=drafts4://create&name=titlekeyword&due=datekeyword&autosave=true"
    uri = uri.replace(/titlekeyword/g, (encodeURI(title)));
    uri = uri.replace(/datekeyword/g, (encodeURI(year+body)));
    content = "";
}

if (action == 'note') {
    title = draft.processTemplate("[[title]]");
    body = draft.processTemplate("[[body]]");
    reg = new RegExp(/\s*note\s*/, 'i');
    title = (title.replace(reg, ""));
    body = (body.replace(reg, ""));
    uri = "omnifocus://x-callback-url/add?&x-success=drafts4://create&name=titlekeyword&note=notekeyword&autosave=true"
    uri = uri.replace(/titlekeyword/g, (encodeURI(title)));
    uri = uri.replace(/notekeyword/g, (encodeURI(body)));
    content = "";
}

if (action == 'clip') {
    input = draft.content;
    clip = draft.processTemplate("[[clipboard]]");
    uri = "omnifocus://x-callback-url/add?&x-success=drafts4://create&note=clipkeyowrd&name=draftkeyword&autosave=true"
    uri = uri.replace(/clipkeyowrd/g, (encodeURI(clip)));
    uri = uri.replace(/draftkeyword/g, (encodeURI(input)));
    content = "";
}

if (action == 'airmail') {
    title = draft.processTemplate("[[title]]");
    body = draft.processTemplate("[[body]]");
    clipboard = draft.processTemplate("[[clipboard]]");
    reg = new RegExp(/\s*airmail\s*/, 'i');
    title = (title.replace(reg, ""));
    body = (body.replace(reg, ""));
    uri="airmail://x-callback-url/send?subject=titlekeyword&to=addresseekeyword&plainBody=bodykeyword&x-success=drafts4://"
    uri = uri.replace(/titlekeyword/g, (encodeURI(title)));
    uri = uri.replace(/bodykeyword/g, (encodeURI(body)));
    uri = uri.replace(/addresseekeyword/g, addressee);
    content = "";
}

if (action == 'encode') {
    input = draft.content;
    reg = new RegExp(/\s*encode\s*/, 'i');
    input = (input.replace(reg, ""));
    setClipboard((encodeURI(input)))
    uri = "drafts4://create";
    content = "";
}

if (action == 'decode') {
    input = draft.content;
    reg = new RegExp(/\s*decode\s*/, 'i');
    input = (input.replace(reg, ""));
    setClipboard((decodeURI(input)))
    uri = "drafts4://create";
    content = "";
}

//Date format: yyyy-mm-dd,"today" or "tomorrow" and "monday", "tuesday, "wed", etc.
if (action == 'timepage') {
    title = draft.processTemplate("[[title]]");
    date = draft.processTemplate("[[body]]");
    reg = new RegExp(/\s* timepage\s*/, 'i');
    title = (title.replace(reg, ""));
    date = (date.replace(reg, ""));
    uri="timepage://x-callback-url/add_event?title=titlekeyword&day=datekeyword&x-success=drafts4://"
    uri = uri.replace(/titlekeyword/g, (encodeURI(title)));
    uri = uri.replace(/datekeyword/g, (encodeURI(date)));
    content = "";
}

if (action == 'appinfo') {
    input = draft.content;
    reg = new RegExp(/\s*appinfo\s*/, 'i');
    input = (input.replace(reg, ""));
    uri="https://api.unlimapps.com/v1/apple_apps/idkeyword/versions"
    uri = uri.replace(/idkeyword/g, input);
    content = "";
}

if (action == 'replace') {
    title = draft.processTemplate("[[title]]");
    f = title.split(" ")[0];
    r = title.split(" ")[1];
    body = draft.processTemplate("[[body]]");
    reg = new RegExp(/\s*replace\s*/, 'i');
    title = (title.replace(reg, ""));
    body = (body.replace(reg, ""));
    re = new RegExp(f, 'g');
    matches = body.match(re);
    if(matches) {
    draft.content = body.replace(re, r);
    commit(draft);
    alert('Replaced ' + matches.length + ' occurrences');
    }
    else {
     alert("\"" + f + "\" not found.");
    }
}

if (action == 'linenum') {
    drafts = draft.processTemplate("[[draft]]");
    reg = new RegExp(/\s*linenum\s*/, 'i');
    drafts = (drafts.replace(reg, ""));
    lines = drafts.split("\n"); 
    lines = lines.length;
    alert("Lines:"+lines)
    commit(draft);
}

draft.defineTag("uri", uri);
draft.defineTag("content", content);