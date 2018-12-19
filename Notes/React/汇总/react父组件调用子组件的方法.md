html：

```html
<div id="app"></div>
```

jsx：

```react
// js
class Parent extends React.Component {
	render () {
  	return (
        <div>
            <div onClick={this.showChildMethod}>this is Parent</div>
            <Child ref={ref => this.ele = ref}/>
        </div>
    )
  }
  showChildMethod = () => {
  	this.ele.childMethod1()
  }
}

class Child extends React.Component {
  render () {
     return <div>this is Child</div>
  }
  childMethod1 () {
  	alert('this is child1 method')
  }
}
ReactDOM.render(<Parent />, document.querySelector("#app"))
```

