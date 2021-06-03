const process =require("process")

//属性会返回一个数组 包含当 Node.js 进程被启动时传入的命令行参数
process.argv.forEach((val, index) => {
    //[0]Node.js 进程的可执行文件的绝对路径。
    //[1]第二个元素是正被执行的 JavaScript 文件的路径
    //[...] 启动命令中传入的参数
    console.log(`${index}: ${val}`);
  });
console.log(`当前工作目录是: ${process.cwd()}`);
console.log(`户环境的对象: ${JSON.stringify(process.env)}`);

process.on('beforeExit', (code) => {
    console.log('进程 beforeExit 事件的退出码: ', code);
  });
  
  process.on('exit', (code) => {
    console.log('进程 exit 事件的退出码: ', code);
  });
  
  console.log('此消息会最先显示');