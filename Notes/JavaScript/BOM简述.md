# 获取滚动条滚动距离

```javascript
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
```

# 查看可视窗口尺寸

```javascript
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') { //怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else { //标准模式
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
```

# 查看元素的几何尺寸

- domEle.getBoundingClientRect();
  - 兼容性比较好
  - 该方法返回一个对象，对象里面有left，top，right，bottom等属性。left和top代表该元素左上角的X和Y坐标，right和bottom代表元素右下角的X和Y坐标
  - height和width属性老版本IE并未实现
  - 返回的结果并不是实时的
- dom.offsetWidth,dom.offsetHeight

# 查看元素的位置

- dom.offsetLeft,dom.offsetTop
  - 对于无定位父级的元素，返回相对文档的坐标。对于有定位父级的返回相对于最近的有定位的父级的坐标。
- dom.offsetParent
  - 返回最近的有定位的父级，如无，返回body，body.offsetParent返回null

# 让滚动条滚动

- window上有三个方法
- scroll(x,y),scrollTo(x,y),scrollBy(x,y)
- 三个方法功能类似，用法都是将x，y坐标传入。即实现滚动轮滚动到当前位置。
- 区别：scrollBy会在之前的数据基础之上做累加。

