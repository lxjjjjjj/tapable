const { SyncHook } = require('tapable');

const hooks = new SyncHook();

hooks.tap(
  {
    name: 'flag1',
  },
  () => {
    console.log('This is flag1 function.');
  }
);

hooks.tap(
  {
    name: 'flag2',
    // flag2 事件函数会在flag1之前进行执行
    before: 'flag1',
  },
  () => {
    console.log('This is flag2 function.');
  }
);

hooks.call();

// result
// This is flag2 function.
// This is flag1 function.