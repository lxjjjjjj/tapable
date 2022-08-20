const { AsyncSeriesLoopHook } = require('tapable');
const hook = new AsyncSeriesLoopHook(['arg1', 'arg2', 'arg3']);

hook.intercept({
  // 每次调用 hook 实例的 tap() 方法注册回调函数时, 都会调用该方法,
  // 并且接受 tap 作为参数, 还可以对 tap 进行修改;
  register: (tapInfo) => {
    console.log(`${tapInfo.name} is doing its job`);
    return tapInfo; // may return a new tapInfo object
  },
  // 通过hook实例对象上的call方法时候触发拦截器
  call: (arg1, arg2, arg3) => {
    console.log('Starting to calculate routes',arg1, arg2, arg3);
  },
  // 在调用被注册的每一个事件函数之前执行
  tap: (tap) => {
    console.log(tap, 'tap');
  },
  // loop类型钩子中 每个事件函数被调用前触发该拦截器方法
  loop: (...args) => {
    console.log(args, 'loop');
  },
});

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
// flag1 is doing its job
// flag2 is doing its job
// Starting to calculate routes 19Qingfeng wang haoyu
// [ '19Qingfeng', 'wang', 'haoyu' ] loop
// { type: 'promise', fn: [Function (anonymous)], name: 'flag1' } tap
// flag1 done: 19Qingfeng wang haoyu
// { type: 'async', fn: [Function (anonymous)], name: 'flag2' } tap
// flag2 done: 19Qingfeng wang haoyu
// [ '19Qingfeng', 'wang', 'haoyu' ] loop
// { type: 'promise', fn: [Function (anonymous)], name: 'flag1' } tap
// flag1 done: 19Qingfeng wang haoyu
// 全部执行完毕 done
// timer: 5.017s
