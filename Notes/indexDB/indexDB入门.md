# 1. indexDB 的特点

1. 键值对存储
2. 异步
3. 支持事务，意味着一系列操作步骤之中，只要有异步失败，整个事务就都取消。数据库回滚到事务发生之前的状态，不存在只能改写一部分数据的情况
4. 同源限制
5. 储存空间大，一般来说不少于 250MD，甚至没有上限
6. 支持二进制储存

# 2. 基本概念

* 数据库：IDBDatabase 对象
* 对象仓库：IDBObjectStore 对象
* 索引：IDBIndex 对象
* 事务：IDBTransaction 对象
* 操作请求：IDBRequest 对象
* 指针：IDBCursor 对象
* 主键集合：IDBKeyRange 对象

**1. 数据库：**

数据库是一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库。

IndexedDB 数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。如果要修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成。

**2. 对象仓库：**

每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。

**3. 数据记录：**

对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。主键用来建立默认的索引，必须是不同的，否则会报错。主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号。

**4. 索引：**

为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引。

**5. 事务：**

数据记录的读写和删改，都要通过事务完成。事务对象提供`error`、`abort`和`complete`三个事件，用来监听操作结果。

# 3. 操作流程

##  1. 打开数据库（indexedDB.open(databaseName, version)）

第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为 `1`。

`indexedDB.open()` 方法返回一个 IDBRequest 对象。这个对象通过三种事件 `error`、`success`、`upgradeneeded`，处理打开数据库的操作结果。

```js
let request = window.indexedDB.open(databaseName, version);

// 1. error 事件
// error 事件表示打开数据库失败
request.onerror = function (event) {
    console.log('数据库打开报错');
}

// 2. success 事件
// success 事件表示成功打开数据库
let db;
request.onsuccess = function (event) {
	// 这时可以通过 request.result 属性拿到数据库对象
    db = request.result;
    console.log('数据库打开成功');
}

// 3. upgradeneeded 事件
// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
// 通过事件对象的 target.result 属性，拿到数据库实例
let db;
request.onupgradeneeded = function (event) {
    db = event.target.result;
}
```

## 2. 新建数据库

新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在 `upgradeneeded` 事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
}
```

上面代码中，数据库新建成功以后，新增一张叫做`person`的表格，主键是`id`。

更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。

````js
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}
````

主键（key）是默认建立索引的属性。比如，数据记录是`{ id: 1, name: '张三' }`，那么`id`属性可以作为主键。主键也可以指定为下一层对象的属性，比如`{ foo: { bar: 'baz' } }`的`foo.bar`也可以指定为主键。

如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。

```js
var objectStore = db.createObjectStore(
  'person',
  { autoIncrement: true }
);
```

上面代码中，指定主键为一个递增的整数。

新建对象仓库以后，下一步可以新建索引。

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
}
```

上面代码中，`IDBObject.createIndex()`的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。

## 3. 新增数据

新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。

```javascript
function add() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

add();
```

上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（"只读"或"读写"）。新建事务以后，通过`IDBTransaction.objectStore(name)`方法，拿到 IDBObjectStore 对象，再通过表格对象的`add()`方法，向表格写入一条记录。

写入操作是一个异步操作，通过监听连接对象的`success`事件和`error`事件，了解是否写入成功。

## 4. 读取数据

读取数据也是通过事务完成。

```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
   var request = objectStore.get(1);

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}

read();
```

上面代码中，`objectStore.get()`方法用于读取数据，参数是主键的值。

## 5. 遍历数据

遍历数据表格的所有记录，要使用指针对象 IDBCursor。

```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;

     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       console.log('Age: ' + cursor.value.age);
       console.log('Email: ' + cursor.value.email);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

readAll();
```

上面代码中，新建指针对象的 `openCursor()` 方法是一个异步操作，所以要监听 `success` 事件。

## 6. 更新数据

更新数据要使用`IDBObject.put()`方法。

```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

update();
```

上面代码中，`put()`方法自动更新了主键为`1`的记录。

## 7. 删除数据

`IDBObjectStore.delete()`方法用于删除记录。

```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

remove();
```

## 8. 使用索引

索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对`name`字段建立了索引。

现在，就可以从`name`找到对应的数据记录了。

```javascript
objectStore.createIndex('name', 'name', { unique: false });
```

现在，就可以从`name`找到对应的数据记录了。

```javascript
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```

