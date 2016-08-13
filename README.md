>## react 日历组件


>### 用法

```
npm install
npm start
open http://localhost:3000
```

>### 常用配置
    
    defaultType: 'date', //默认类型，目前只有date这一种类型
    fullscreen: true, //是否全屏。
    prefixCls: 'rc-calendar',//样式名称前缀
    visible:true //是否可见
    value:now  //当前年月。传递一个moment对象，比如new moment()
    handleDayClick:func  //单击日期单元格回调事件
    triggerRule: false  //如果不在当前月份，是否触发handleDayClick事件
    datas:[{},{}]//数据对象

### 例子见examples/basic  
