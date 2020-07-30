<div align="center">
<img src="https://user-images.githubusercontent.com/48976713/86219488-3f186d80-bbbd-11ea-8830-04b9c838d19a.png" alt="Nataku" title="Nataku">
</div>

# Nataku(ナタク)とは
テキストを使わないチャットアプリケーションです。  
テキストの代わりに画像を用います。  
[Nataku](https://nataku.cloud)

Firebaseや画像配信API、そのほか使用したことのないツールに触れるためにNatakuを制作しました。

# 使用している主なライブラリやツール
- TypeScript
- データベース（Cloud Firestore)
- API（Cloud Functions for Firebase）
- ストレージ（Cloud Storage for Firebase）
- ホスティング（Firebase Hosting）
- アニメーション（React Transition Group）
- テスト（Cypress）
- ビルド・デプロイ（CircleCI）
- UI カタログ（Storybook）

# 使い方
![demo](https://user-images.githubusercontent.com/48976713/86241223-80b91080-bbdd-11ea-8215-92efa02107ee.gif)

## 1. 画面最下部のテキストフォームにキーワードを入力します。
![1](https://user-images.githubusercontent.com/48976713/86224692-2cedfd80-bbc4-11ea-966b-43e588ca40ab.jpg)

GiphyボタンとTenorボタンを押すことで、画像の取得元を選択できます。  
画像の取得元は下記の通りです。
- Giphyボタン: [Giphy](https://giphy.com/)
- Tenorボタン: [Tenor](https://tenor.com/)

## 2. キーワードに沿った画像が一覧として表示されます。
![2](https://user-images.githubusercontent.com/48976713/86224691-2bbcd080-bbc4-11ea-971f-5f9795c5b8a5.jpg)

一覧をドラッグすることで、取得した画像を確認できます。

## 3. 一覧の内の画像をクリックすることで、画像がチャットに投稿されます。
![3](https://user-images.githubusercontent.com/48976713/86224687-2a8ba380-bbc4-11ea-9050-e5317a025343.jpg)

また、画面最下部のテキストフォームの右端にあるUploadボタンを押すことで、ローカルの画像ファイルを投稿できます。

---

サインアップおよびサインインした状態で投稿すると、投稿した画像にアカウントのアバターと名前を添えて表示します。  
![4](https://user-images.githubusercontent.com/48976713/86226157-34aea180-bbc6-11ea-9410-7940c4416816.jpg)
