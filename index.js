const express = require('express');
const app = express();
const archiver = require('archiver');

app.all('*', (req, res) => {
  console.log("流量转发成功：" + req.url)

  // 设置响应头，指定下载的文件名
  res.attachment('wf.zip');

  console.log("创建wf压缩包...")

  // 创建一个压缩包
  const archive = archiver('zip', {
    zlib: { level: 9 } // 设置压缩级别
  });

  console.log("准备pipe压缩包至response流")

  // 将压缩包的输出管道到响应对象
  archive.pipe(res);

  // 添加 wf 文件夹到压缩包
  archive.directory('wf/', 'wf');

  // 完成压缩包的创建
  archive.finalize();

  console.log("Finished! ")
});

const PORT = 3819;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${PORT}`);
});