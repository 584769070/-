## 作品背景
在浏览CSDN时发现许多代码需要付费下载，并且如果去github中寻找对应的代码较为困难，因此我开发了这个代码分享平台，让大家来互相帮助，互相分享代码资源
## 作品简介
作品中所有用到存储的地方都采用了IPFS/Filecoin来完成，平台页面采用react框架与Moralis技术来完成

## 运行指南
## a.npm install 
## b.（由于使用了Moralis，需要去官网申请appId以及serverUrl）附官网地址:[https://admin.moralis.io/dapps](https://admin.moralis.io/dapps)
### 申请好的appId以及serverUrl填写到这个index.js的以下位置
### ![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249852883-0ee86440-4a93-4dbf-b231-61d6d618f27b.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=42&id=ub0111da9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=63&originWidth=990&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12595&status=done&style=none&taskId=uc701b47b-7bd7-4400-8719-ef639dc2d65&title=&width=660)
## c.因为使用MetaMask，需要将truffle-config.js中的![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249816300-592c00b4-fc83-4e17-99c7-6b464600e858.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=81&id=u84207707&margin=%5Bobject%20Object%5D&name=image.png&originHeight=121&originWidth=1197&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21884&status=done&style=none&taskId=ud44323c5-92f9-4d72-a438-763ec0f5ade&title=&width=798)
### str_mnemonic 修改为自己的钱包助记词
## d.控制台输入npm run start 启动项目


## 作品展示
导航栏：分别为主页，个人中心，以及设置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249421077-ed6a1b87-3a44-41ab-8534-364d14c6b689.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=289&id=uaa82ed32&margin=%5Bobject%20Object%5D&name=image.png&originHeight=433&originWidth=475&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18801&status=done&style=none&taskId=u9b778717-6e4c-4b3a-9f89-2e03a53fb40&title=&width=316.6666666666667)
登出按钮：点击Logout按钮可以进入登录界面，用来切换用户
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249450117-b220a88e-9d50-4883-a488-b45d50e047c0.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=127&id=u29850386&margin=%5Bobject%20Object%5D&name=image.png&originHeight=191&originWidth=455&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16552&status=done&style=none&taskId=ufb1ba3f2-e75a-4fcb-8ee6-eaab9d1e85b&title=&width=303.3333333333333)
主页：用来发布信息，以及查看其他人发布的代码信息
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249505518-c8ed13e5-4bd4-4893-b2b8-db92deccc1a2.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=749&id=ufe842f64&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1123&originWidth=1166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=582772&status=done&style=none&taskId=uedfa0e24-8849-4353-8179-60f284ced80&title=&width=777.3333333333334)
个人中心:仅能查看自己发布的代码信息，以及个人信息的设置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249515658-3a78e6d4-7293-4abe-89ba-96f6a8d64b56.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=691&id=u8fcc827f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1036&originWidth=1254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=440514&status=done&style=none&taskId=u3d294d09-02e1-4035-a108-2d9fbedcae8&title=&width=836)
设置:设置页面可以用来修改个人信息（背景图存储在IPFS上面）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249549443-ab60c0fe-e530-4889-9733-5001b50b5ad5.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=709&id=u2117b7b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1064&originWidth=1213&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183527&status=done&style=none&taskId=u75a02aa3-688a-4e58-9774-e5506cf14db&title=&width=808.6666666666666)
下载记录：可以用来记录自己的下载，以便于以后想重复查看
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29657726/1658249580375-fadb8c8d-2dfe-47ab-99de-ca6370ae3b64.png#clientId=u8cbf8dc0-1626-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=858&id=u8daec569&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1287&originWidth=663&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219765&status=done&style=none&taskId=u5af1df06-6ab1-4da2-9702-eef0dde1806&title=&width=442)

## 参考：
B站官方视频的Twitter项目
