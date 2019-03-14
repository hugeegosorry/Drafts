# Drafts

## Drafts 5 Action

Yet Another Alfred for iOS Drafts.

> Forked from:
>
> - [Yet Another Alfred for iOS Drafts](https://gist.github.com/soffchen/5989f7ef4c0cef9f7a4e29254f3fa0e2)
> - [JamesHopbourn / Apple-Automation](https://github.com/JamesHopbourn/Apple-Automation/tree/master/Drafts)

---

## 使用方法：

### Drafts 5 Action 创建方法：

1. 新建 action；

2. 添加 Steps：
    第一步，添加 JavaScript，内容为 [Drafts_5_Alfred.js](https://raw.githubusercontent.com/GoodWillChase/Drafts/master/Drafts_5_Alfred.js)；
    第二步，Open URL，URL TEMPLATE 写 `[[uri]]{{[[content]]}}`，URL encode tag output 关掉，Open in Drafts 关掉，After Success 设置为 Do Nothing 或者 Trash；

3. 再创建一个名为 URL 的 action，用来在内置浏览器中打开网页，Step 为 Open URL，URL TEMPLATE 为 `[[clipboard]]`，URL encode tag output 关掉，Open in Drafts 打开；

4. 把 action 放到 Keyboard 栏会更方便。

---

### Notes：

适用于 Drafts 5。

> *个人自用。*