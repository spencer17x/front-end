> 生命周期函数指在某一个时刻组件会自动调用执行的函数

# Initialization

setup props and state

# Mounting

componentWillMount —> render —> componentDidMount

componentWillMount：在组件即将被挂载到页面的时刻自动执行

componentDidMount：在组件被挂载到页面之后自动执行

# Updation

props：componentWillReceiveProps —> shouldComponentUpdate —> componentWillUpdate —> render —> componentDidUpdate

states：shouldComponentUpdate —> componentWillUpdate —> render —> componentDidUpdate

componentWillReceiveProps：当一个组件从父组件接受参数，只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行，如果这个组件第一次存在于父组件中不会执行，如果这个组件之前已经存在于父组件中才会执行

shouldComponentUpdate：组件被更新之前自动执行，需返回一个布尔值，true为要更新，false为不更新，不更新则其后的生命周期函数则不会执行

componentWillUpdate：组件被更新之前自动执行，shouldComponentUpdate返回true它才执行，shouldComponentUpdate返回false它不执行

componentDidUpdate：组件更新完成之后它会被执行

# Unmounting

componentWillUnmount：当这个组件即将被从页面中剔除时会被执行

