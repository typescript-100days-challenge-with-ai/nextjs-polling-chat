# Next.js Polling Chat Application
(日本語は下部です)

This is a simple web chat application built with Next.js and TanStack Query (React Query), featuring a polling mechanism for real-time message updates.

## Features

- **User Authentication**: Users must enter a name before joining the chat.
- **Real-time Messaging**: Messages are displayed in chronological order.
- **Message Posting**: Users can post new messages to the chat room.
- **Polling Updates**: New messages are automatically fetched and displayed every second using a polling mechanism.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/nextjs-polling-chat.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1.  **Entry Page (`/`)**: The user is prompted to enter their name.
2.  **Chat Page (`/chat`)**: After entering a name, the user is redirected to the chat room.
3.  **API (`/api/messages`)**:
    -   `GET`: Fetches all messages from an in-memory store.
    -   `POST`: Adds a new message to the in-memory store.
4.  **Polling**: The chat page uses `useQuery` from TanStack Query with `refetchInterval: 1000` to poll the API every second for new messages.
5.  **Mutations**: When a user sends a message, `useMutation` is used to post the new message to the API. On success, the message query is invalidated to trigger an immediate refetch.

## File Structure

```
/src
├── app
│   ├── api
│   │   └── messages
│   │       └── route.ts  // API endpoint for messages
│   ├── chat
│   │   └── page.tsx      // The main chat room component
│   ├── layout.tsx        // Root layout with QueryClientProvider
│   └── page.tsx          // The initial name entry page
├── components
│   └── Providers.tsx     // TanStack Query (React Query) provider setup
└── lib
    └── store.ts          // In-memory message store
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

# Next.js ポーリングチャットアプリケーション

これは、Next.jsとTanStack Query（React Query）を使用して構築された、リアルタイムメッセージ更新のためのポーリング機能を備えたシンプルなWebチャットアプリケーションです。

## 機能

- **ユーザー認証**: チャットに参加する前に名前を入力する必要があります。
- **リアルタイムメッセージング**: メッセージが時系列で表示されます。
- **メッセージ投稿**: チャットルームに新しいメッセージを投稿できます。
- **ポーリング更新**: ポーリング機能により、新しいメッセージが1秒ごとに自動的に取得・表示されます。

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) (App Router)
- **データ取得**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)

## はじめに

ローカル環境でプロジェクトを立ち上げるには、以下の手順に従ってください。

### 前提条件

- Node.js (v18.x 以降)
- npm, yarn, または pnpm

### インストール

1. リポジトリをクローンします
   ```sh
   git clone https://github.com/your_username/nextjs-polling-chat.git
   ```
2. NPMパッケージをインストールします
   ```sh
   npm install
   ```

### アプリケーションの実行

開発サーバーを起動します:

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## 仕組み

1.  **エントリーページ (`/`)**: ユーザーに名前の入力を求めます。
2.  **チャットページ (`/chat`)**: 名前を入力すると、チャットルームにリダイレクトされます。
3.  **API (`/api/messages`)**:
    -   `GET`: インメモリストアからすべてのメッセージを取得します。
    -   `POST`: インメモリストアに新しいメッセージを追加します。
4.  **ポーリング**: チャットページでは、TanStack Queryの`useQuery`と`refetchInterval: 1000`オプションを使用して、1秒ごとにAPIをポーリングし、新しいメッセージを取得します。
5.  **ミューテーション**: ユーザーがメッセージを送信すると、`useMutation`がAPIに新しいメッセージをPOSTします。成功すると、メッセージのクエリが無効化され、即時再取得がトリガーされます。

## ファイル構成

```
/src
├── app
│   ├── api
│   │   └── messages
│   │       └── route.ts  // メッセージ用APIエンドポイント
│   ├── chat
│   │   └── page.tsx      // メインのチャットルームコンポーネント
│   ├── layout.tsx        // QueryClientProviderを含むルートレイアウト
│   └── page.tsx          // 初期の名前入力ページ
├── components
│   └── Providers.tsx     // TanStack Query (React Query) のプロバイダー設定
└── lib
    └── store.ts          // インメモリのメッセージストア

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。
