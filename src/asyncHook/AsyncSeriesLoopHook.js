const { AsyncSeriesLoopHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesLoopHook(['arg1', 'arg2', 'arg3']);

console.time('timer');
let flag = 3
// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  return new Promise((resolve, reject) => {
    console.log('flag1 done:', arg1, arg2, arg3);
    setTimeout(() => {
        if(flag === 4) {
            reject()
        }else {
            resolve();
        }
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  setTimeout(() => {
    console.log('flag2 done:', arg1, arg2, arg3);
    flag++
    callback('', ()=>{
        return flag
    });
  }, 3000);
});

hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});

// 执行结果
// flag1 done: 19Qingfeng wang haoyu
// flag2 done: 19Qingfeng wang haoyu
// flag1 done: 19Qingfeng wang haoyu
// 全部执行完毕 done
// timer: 5.020s
