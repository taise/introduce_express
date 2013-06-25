## Introduce Express

_1.expressとは_  
_2.なぜ Node.js + express を使うか_  
_3.Getting started_  
_4.パッケージの追加_
  

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
$ npm install -g express
$ which express
```

##### 2) Generate

```shell
$ express helloWorld
```
生成された`app.js`が処理の中心になっており、依存関係のモジュール定義や環境設定、ルーティングなどが記載されている。

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
expressの処理の流れは以下の図のようになっている。

![処理の流れ](https://cacoo.com/diagrams/elk3nlNaVeK4Dayy-ED582.png)

トップページに、コントローラから渡された"Hello World"と表示するには
`routes/index.js`を以下のように変更する。

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
再度、`http://localhost:3000/`にアクセスすると、タイトルが変更されていることがわかる。  

  

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

##### 3) 利用するモジュールでrequireする

