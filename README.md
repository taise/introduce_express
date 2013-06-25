## expressとは
## なぜ Node.js + express を使うか
## Getting started
  

### 1.expressとは

Node.jsのWebApplicationFrameWorkです。

expressは、軽量Webアプリケーションフレームワークで
RubyのSinatraのようなシンプルなフレームワークです。  


Node.jsのHTTPサーバ機能は、プロトコルの仕様にそったローレベルなものであるため、
WebApplicationを開発しようとした場合、HTTPリクエストの解析から行わなければなりません。
(Java ServletやRuby Webrickのようなイメージ)

そのため、WebApplicationFrameWorkが必要となります。
  

### 2.なぜ Node.js + express を使うか

Node.js + express で開発するメリットは何か


_メリット_

* 開発言語をJavaScriptに統一できる
* ノンブロッキングI/O


_開発言語をJavaScriptに統一できる_

Webアプリケーションの開発にはJavaScriptが欠かせない  
Java + JavaScript や Ruby + JavaScriptといったスキルセットが
当たり前に求められるようになってきた



Node.js + express で開発をすると
フロントからバックエンドまで、すべてJavaScriptで統一できる


_ノンブロッキングI/O_

Node.jsはGoogle Chromのv8エンジンで処理を行っており、
JavaScriptのイベント・ループをベースに非同期処理を行っている

* DB問い合わせで処理待ちを行わない
* WebSocketのコネクションで待機処理を行わない
  

### 3.Getting started

1. Install

```shell
npm install -g express
which express
```

2. Generate

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

3. Hello World

```shell
node app
```

_変更前_
```js:routes/index.js
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
```

_変更後_
```js:routes/index.js
exports.index = function(req, res){
  res.render('index', { title: 'Hello Wold' });
};
```

```shell
node app
```
