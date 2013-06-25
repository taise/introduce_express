## Introduce Express

_1.expressとは_  
_2.なぜ Node.js + express を使うか_  
_3.Getting started_
  

### 1.expressとは

expressは、軽量Webアプリケーションフレームワークで
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
当たり前に求められるようになってきた

Node.js + express で開発をすると
フロントからバックエンドまで、すべてJavaScriptで統一できる


**ノンブロッキングI/O**

Node.jsはGoogle Chromのv8エンジンで処理を行っており、
JavaScriptのイベント・ループをベースに非同期処理を行っている


* DB問い合わせで処理待ちを行わない
* WebSocketのコネクションで待機処理を行わない
  

### 3.Getting started

##### 1) Install

```shell
npm install -g express
which express
```

##### 2) Generate

```shell
express helloWorld
cd helloWorld
npm install
tree -C  -I node_modules
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
node app
```
`http://localhost:3000/`にアクセスすると、indexページが表示されていることがわかる。  

次に`routes/index.js`を以下のように変更する

_変更前_

```javascript
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
```

_変更後_

```javascript
exports.index = function(req, res){
  res.render('index', { title: 'Hello Wold' });
};
```

Nodeサーバー起動
```shell
node app
```
再度、`http://localhost:3000/`にアクセスすると、タイトルが変更されていることがわかる。  
