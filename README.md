# Xiaomi Fitness Server (For Mi Watch S3) iOS

通过ShadowRocket连接Fiddler利用FiddlerScript进行流量转发连接到伪造的表盘下载服务器，并提供自定义的表盘bin或表盘工程文件分发功能

## 如何使用
1. 自己去谷歌搜教程，让你的iOS设备信任Fiddler的SSL证书
2. 往Fiddler Script里丢这个脚本（如果里面已经有内容，可以做个备份，然后直接清空，使用下面提供的脚本替换）：
```csharp
import System.Windows.Forms;
import System;
import System.IO;
import Fiddler;
import System.Text.RegularExpressions;
        
class Handlers
{
    static function OnBeforeRequest(oSession: Session){
        var serveraddr = "http://localhost:3819/"
        if(oSession.fullUrl.Contains("https://cdn.cnbj1.fds.api.mi-img.com/hlth-operate/watch_face/") && oSession.fullUrl.Contains(".zip")){
            oSession.fullUrl = oSession.fullUrl.Replace("https://cdn.cnbj1.fds.api.mi-img.com/hlth-operate/watch_face/", serveraddr)
        }
    }

};
```
3. 在ShadowRocket（这是一个AppStore外区付费软件）里添加HTTP代理，填写你电脑的ip和fiddler端口（默认8888），然后作为一个VPN进行连接
4. 安装nodejs，在此工程目录下`npm install`，然后`node .`启动此项目
5. 对这个工程的wf文件夹进行自定义操作，你可以把你自己的表盘工程文件覆盖上去以安装自定义工程文件，或者把你的表盘bin改名成resource.bin并替换wf文件夹里的resource.bin以安装自定义表盘bin
6. 保持ShadowRocket开启，在小米运动健康的表盘市场里随便挑一个表盘安装，即可成功
7. 完成操作后关闭ShadowRocket和电脑上的Fiddler，你也不想让你的手机流量经过电脑转一圈吧？
