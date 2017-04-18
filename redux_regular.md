##基于Redux+Regular实践

>Redux 是当前非常流行一种优秀技术，它的设计思想非常值得学习和借鉴，本文将介绍Redux的一些入门概念，并配合一个实例，来描述如何用Redux和Regular来实现一个完整的组件

###主要内容  
>什么是Redux  
>Action介绍  
>Reducer介绍  
>Store介绍  
>结合框架使用  
>总结

###什么是Redux
首先我们应该先来说说Flux，Flux 是一种架构思想，它跟MVC 架构是同一类东西，但是更加简单和清晰。Flux将一个应用分成四个部分：

* View： 视图层
* Action（动作）：视图层发出的消息（比如mouseClick）
* Dispatcher（派发器）：用来接收Actions、执行回调函数
* Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面



Redux 是 facebook 提出的 Flux 架构的一种优秀实现，它跟react没有必然的联系，可以跟任何框架结合使用；Redux主要用来管理State的状态,所有的操作都需要经过Redux来操作。它主要由Action，Reducer，Store三部分组成。

###Action
Actions 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。用法是通过 store.dispatch() 把 action 传到 store。

在 Redux 中 ，Action 是一个普通的对象，并且约定使用一个字符串类型的type 字段来表示将要执行的动作。另外Action可以用来存放一些想要操作的数据，一个典型的Action结构如下：
	
	{
		type:'ADD_ITEM',
		text:"new item"
	}
在实际应用中，我们需要一个函数来创建一个Action，像这样：
	function addItem(text) {
		return {
			type:'ADD_ITEM',
			text:text
		}
	}

###Reducer
Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。那么 reducer 是来做这个事情的。

在Redux 中，Reducer 是一个普通的回调函数，当它被 Redux调用的时候会为它传递两个参数 State 和 Action。Reducer会根据Action的type 和它需要处理的数据对旧的state更新操作，然后返回新的state。类似于：

	let createItem = (state = [] ,action)  => {
		switch(action.type) {
			case 'ADD_ITEM':
			return [action.text,...state]
			//一定要返回新的state，不能直接修改state
		}
	}
	
真正开发项目的时候，在一个Reducer处理所有逻辑会非常混乱，所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分State数据，然后通过combineReducers来生成一个主rootReducers来专门管理这些小Reducer

###Store
我们已经知道用 Action 来描述“发生来的事情” ，用Reduce来更具Action的来源更新数据，那么Store就是用来讲它们联系在一起的对象，在使用过程中，一个应用只能有一个Store。Store有以下职责：  

* 维持应用的state；
* 提供getState()方法获取 state；
* 提供dispatch(action)方法更新state；
* 通过subscribe(listener)注册监听器；

创建Store比较简单，通过redux 提供的createStore方法旧可以来创建一个store了，createStore接受两个参数，一个是Reducer ,另一个是初始化值

	let store = Redux.createStore(Reducer,initialState);

创建的store对象有以下四个方法：

* getState： 获取应用当前State。
* subscribe：添加一个变化监听器。
* dispatch：分发 action。修改State。
* replaceReducer：替换 store 当前用来处理 state 的 reducer。
	
最后我们再用一张流程图来描述一下整个redux使用流程
<center>
![流程图](https://raw.githubusercontent.com/CTlihaoliang/reduxTodo/master/res/redux.png)
</center>
###结合框架使用
上面已经简单的介绍了什么是Redux,以及Redux中非常重要的几个概念，那么下面我们再来说说Redux如何结合MVVM框架来使用：
既然Redux已经来帮我们管理好了数据，这些数据当然要交给组件来使用啦，当然组件也应该具有触发修改数据的能力，那么我们就需要在Redux和Component之间搭建一个桥梁，一般情况下我们需要根据不同框架实现一个Provider组件和一个connect组件的接口。
####Provider
Provider用来保存store给需要connect的组件使用，看起来应该像这样：

	<Provider store={store}>
		<Component></Component>
	</Provider>
你还应该在这个组件里实现几个功能：

* 添加store的监听器，监听store中state数据发生变化后去更新组件数据的操作
* 绑定store作用域，可以把store的dispatch权限交给Component;

大体实现应该像这样：
	
	const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      //拿到数据之后更新数据，这里是拿到所有数据
      //这里你可以实现一个mapState()方法取出你想要的数据
    });
    //可以把store的dispatch方法交给组件
    Componnet.dispatch = store.dispatch.bind(store);
   
      
####Connect
Connect用来把Redux最后产出的state传递给Component组件，大体实现也应该像这样：
	
	return function ({mapState}) {
	    return function (component) {
	    	//执行mapState()方法得到新的数据，并返回新数据
	       return component;
	    };
  	}

###总结：
Redux 真正的灵魂在于其思想，同时给我们开发复杂项目提供了很好的一个选择，但不可滥用，要看钉子选锤子，否则反而增加项目开发的复杂度。当然在享受Redux带来好处的同时，我们也应该遵循一些准则：

* 使用基本对象与数组来描述应用状态
* 使用基本的对象来描述系统变化
* 使用纯函数来处理系统中的业务逻辑

基于上面描述的这些理论，方便更好的理解，写了一个Redux + Regular 的todoMVC的demo，点击下面的链接可以查看文件和在线浏览项目：

[github项目地址](https://github.com/CTlihaoliang/reduxTodo)  
[项目在线预览](https://ctlihaoliang.github.io/reduxTodo/)

###资料参考：

>[Redux中文文档](http://cn.redux.js.org/docs/recipes/reducers/InitializingState.html)  
>[深入浅出Redux](https://github.com/berwin/Blog/issues/4)  
>[深入到源码：解读 redux 的设计思路与用法](https://github.com/Lucifier129/Lucifier129.github.io/issues/9)



	




