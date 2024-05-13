const http = require('http');
const fs = require('fs');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 检查请求是否为视频文件请求
  if (req.url === '/video') {
    // 设置响应头，告诉浏览器返回的是视频文件
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
    });

    // 读取视频文件
    const videoPath = '/server/src/public/index.mp4';
    const videoStream = fs.createReadStream(videoPath);

    // 将视频文件流通过响应发送给客户端
    videoStream.pipe(res);
  } else {
    // 如果请求的不是视频文件，则返回404 Not Found错误
    res.writeHead(404);
    res.end();
  }
});

// 监听端口
const PORT = 23100;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
