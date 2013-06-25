## Introduce Express

_1.expressとは_  
_2.なぜ Node.js + express を使うか_  
_3.Getting started_  
_4.パッケージの追加_
_5.Express + MongoDB_
  

### 1.expressとは

expressは、Node.jsの軽量Webアプリケーションフレームワークで
RubyのSinatraのようなシンプルなフレームワークです。  
Node.jsのHTTPサーバ機能は、プロトコルの仕様にそったローレベルなものであるため、  
WebApplicationを開発しようとした場合、HTTPリクエストの解析から行わなければなりません。  
(Java ServletやRuby Webrickのようなイメージ)  

そのため、WebApplicationFrameWorkが必要となります。
  

### 2.なぜ Node.js + express を使うか

Node.js + express で開発するメリットは何か  

**メリット**

* 開発言語をJavaScriptに統一できる
* ノンブロッキングI/O


**開発言語をJavaScriptに統一できる**

WebアプリケーションはJavaScriptの開発が欠かせなくなっており、
_Java + JavaScript_ や _Ruby + JavaScript_といったスキルセットが
当たり前に求められるようになってきました。

Node.js + express で開発をすると
フロントからバックエンドまで、すべてJavaScriptで統一できます。


**ノンブロッキングI/O**

Node.jsはGoogle Chromのv8エンジンで処理を行っており、
JavaScriptのイベント・ループをベースに非同期処理を行っています。


* DB問い合わせで処理待ちを行わない
* WebSocketのコネクションで待機処理を行わない
  

### 3.Getting started

##### 1) Install

```shell
$ npm install -g express
$ which express
```

##### 2) Generate

```shell
$ express helloWorld
```
生成された`app.js`が処理の中心になっており、依存関係のモジュール定義や環境設定、ルーティングなどを定義します。

![app.js](https://cacoo.com/diagrams/elk3nlNaVeK4Dayy-555AF.png)
  

```shell
$ cd helloWorld
$ npm install
$ tree -C  -I node_modules
 .
 ├── app.js
 ├── package.json
 ├── public
 │   ├── images
 │   ├── javascripts
 │   └── stylesheets
 │       └── style.css
 ├── routes
 │   ├── index.js
 │   └── user.js
 └── views
     ├── index.jade
     └── layout.jade
```
  

##### 3) Hello World

Nodeサーバー起動
```shell
$ node app
```
`http://localhost:3000/`にアクセスすると、indexページが表示される。  
expressの処理の流れは以下の図のようになっています。

![処理の流れ](https://cacoo.com/diagrams/elk3nlNaVeK4Dayy-ED582.png)

トップページに、コントローラから渡された"Hello World"と表示するには
`routes/index.js`を以下のように変更します。

```javascript
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
```
　　　　↓
```javascript
exports.index = function(req, res){
  res.render('index', { title: 'Hello Wold' });
};
```

Nodeサーバー起動
```shell
$ node app
```
再度、`http://localhost:3000/`にアクセスすると、タイトルが変更されていることがわかります。  

  

### 4.パッケージの追加

データの保存/参照機能を追加します。  
今回はDBにMongoDBを使用します。  
Node.jsにはMongoDBのORMの`mongoose`というライブラリがあります。  

Node.jsは、npmとpackage.jsonを使ってパッケージ管理をしています。  
`mongoose`の追加は以下のように行います。

##### 1) package.jsonにmongooseを追加する
```json
{
  "name": "helloWorld",
    "version": "0.0.1",
    "private": true,
    "scripts": {
      "start": "node app.js"
    },
    "dependencies": {
      "express": "3.2.6",
      "jade": "*",
      "mongoose": ">= 1.0.0"
    }
}
```

##### 2) npm install
```shell
$ npm install
```

##### 3) requireして利用する

追加したパッケージを利用するには、利用するファイル内でrequireをします。
```javascript
var db = require('mongoose')
```


### 5.Express + MongoDB

##### 1) DBコネクト
mongooseを追加したので、MongoDBと連携させてみます。
まずは、`routes/user.js`でDBコネクトします。
```javascript
var db = require('mongoose');
db.connect('mongodb://localhost/helloWorld');
```


##### 2) スキーマ定義
`routes/user.js`にschemaを追記します。
```javascript
var schema = new db.Schema({
  id    : { type: String }
 ,name  : { type: String }
 ,age   : { type: Number }
});
```


##### 3) Model定義
スキーマで定義したオブジェクトをModelとして登録します。
```javascript
var User = db.model('User', schema);
```


##### 4) createリクエストの作成
Userデータを作成する画面を追加します。  
まずは`app.js`にルーティングを追加します。
usersでpostされたら、`routse/user.js`のcreateに渡します。
```javascript
app.post('/users', user.create);
```

次に、`routes/user.js`にcreate処理を書いていきます。
createの中で、mongooseのModel.createを使ってデータを保存します。
```javascript
exports.create = function(req, res){
  User.create({
    id   : req.param('id')
   ,name : req.param('name')
   ,age  : req.param('age')
  }, function(err) {
    res.send('created')
  });
};
```

次に、画面を作成します。
既にある`views/index.jade`をコピーして作ります。
```shell
$ cp views/index.jade views/user.jade
```

コピーしたら中身を以下のように書き換えます。
```jade
extends layout

block content
  h1 Add User
    form(action='/users', method='post')
      input(type='text', name="id", placeholder="id")
      br
      input(type='text', name="name", placeholder="name")
      br
      input(type='text', name="age", placeholder="age")
      br
      input(type='submit', value='登録')
```

画面が作成できたので、この画面へのルーティングを設定します。
最初から`routes/user.js`に_user.list_があるので、まずはそこを利用します。
```javascript
exports.list = function(req, res){
    res.render('users');
};
```

ここで、サーバを再起動してみます。
変更の度に何度も再起動するのは手間なので、変更を自動で反映してくれるパッケージを利用すると便利です。
パッケージは`supervisor`です。
```shell
$ npm install -g supervisor
```

supervisorで再起動します。
```shell
$ supervisor app
```

登録が成功すると"created"と表示されます。
(MongoDBのコンソールで確認できます)


##### 5) Userリストを表示する
作成したユーザデータを表示します。
`routes/user.js`のlistを変更して、MongoDBからデータを取得します。
```javascript
exports.list = function(req, res){
  User.find({}, function(err, users) {
      res.render('users', {
        users: users
    });
  })
};
```

次に、リスト表示する画面を作成します。
先ほど登録で使った画面を流用します。
`views/user.js`に以下を追記してください。
```jade

  h1 User Listing
  p ユーザ数: #{users.length}
    table
      tr
        td id
        td name
        td age
  if(users.length > 0)
    each user in users
      tr
        td #{user.id}
        td #{user.name}
        td #{user.age}
```

あとは、ユーザ登録時にこの画面を表示するようにルーティングを変更します。
create処理をした後にリスト表示処理をさせるには、redirectします。
```javascript
exports.create = function(req, res){
  User.create({
    id    : req.param('id')
   ,name  : req.param('name')
   ,age   : req.param('age')
  }, function(err) {
    res.redirect("/users")
  });
};
```

これでページにアクセスすると、ユーザ登録/一覧表示ができるようになっているはずです。
