# tapable
tapable学习

其他执行例子参考
https://juejin.cn/post/7040982789650382855

### 使用注意事项
1.需要额外注意的是当存在多个参数时，通过 SyncWaterfallHook 仅能修改第一个参数的返回值。

2.如果同时使用 before 和 stage 时，优先会处理 before ，在满足 before 的条件之后才会进行 stage 的判断。