## Magic Translator

这是一个基于Vue的chrome浏览器插件，提供了文本翻译和网址二维码生成工具，通过这个实践，你将知道如何开发一个浏览器插件。

在开始之前先看看效果（如果无法查看图片效果请[点击这里](https://www.jianshu.com/p/f4f8273e7b7a)）
![插件效果](https://upload-images.jianshu.io/upload_images/8535415-8fb45b6c6b512047.gif?imageMogr2/auto-orient/strip)

### 第一步

打开有道智云[https://ai.youdao.com](https://ai.youdao.com/)，登陆之后，

创建一个应用，
![创建应用](https://upload-images.jianshu.io/upload_images/8535415-2dea8e3329242788.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


接入方式要选择“API”，再下一步，可以先不绑定服务

### 第二步

依次找到“自然语言翻译” - “翻译实例” - “创建实例”，创建后记录好自己的key和appKey

![创建实例](https://upload-images.jianshu.io/upload_images/8535415-f71d15cbc0cf0fc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


选择“文本翻译”即可

这样你就拥有了一个翻译API，注意不要把自己的key泄漏给别人。

API文档可以参考这里做开发

[网易文本翻译服务-API文档](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html)

![修改key](https://upload-images.jianshu.io/upload_images/8535415-9bb3c6ab455c2779.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


在js/popup.js中找到两处key并修改保存。

这样，你就可以在chrome中运行自己的插件了！

### 第三步

打开拓展程序管理，并开启开发者模式
![打开拓展管理](https://upload-images.jianshu.io/upload_images/8535415-fa3a4fbf665a4e9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![启用开发者模式并加载文件](https://upload-images.jianshu.io/upload_images/8535415-c842a089eb8ceb65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择“magic-translator”，你会看到“拓展程序”里多了Magic Translator

并且右上角也多了个可爱的小图标
![创建完成](https://upload-images.jianshu.io/upload_images/8535415-e835de4c9c62bfc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

自此，完满成功！

![查看插件](https://upload-images.jianshu.io/upload_images/8535415-9d1cbcb324a0398f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
