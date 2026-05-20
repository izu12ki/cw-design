# Chat App – 3 Design Proposals

- **Date**: 2026-05-20
- **Status**: Approved (design phase)
- **Stack**: SvelteKit 2, Svelte 5, Tailwind CSS v4, shadcn-svelte (vega style), TypeScript

## 1. Goal

Chatwork ライクなチャットアプリの UI/UX 検証のため、視覚的・構造的に差異のある **3 つのデザイン案** を 1 つの SvelteKit アプリ内で比較可能な形で提供する。バックエンドは持たず、モックデータのみで動作する。

## 2. Target Devices

- PC (1024px+)
- タブレット 最小 8 インチ (768px+)
- スマートフォン (sm) は明示的にサポート対象外。極端な崩れだけ防ぐ

## 3. Design Directions

### Design A: Classic Chatwork

情報密度重視、ビジネス向け。

- レイアウト: 3 ペイン
  - 左アイコンナビ (64px) | チャット一覧 (280px) | 会話エリア (残り)
- 配色: アクセント `#1B4F8B` (深ブルー)、白基調
- メッセージ表示: アバター + ユーザー名 + 本文の縦並び、罫線区切り、コンパクト
- フォントサイズ: 小さめ (text-sm 基調)
- タブレット縦向きは情報密度の都合上想定外（横向き必須）

### Design B: Modern Workspace

モダン、広めの余白、Slack/Discord 寄り。

- レイアウト: 2 ペイン
  - 左ダークサイドバー (260px、チャット一覧を内蔵) | 会話エリア
- 配色: サイドバー `#1A1A2E`、メイン白/薄グレー、アクセント `#7C3AED` (紫)
- メッセージ表示: 大きめアバター、連続発言はグループ化（時刻 + アバターは先頭のみ）
- 設定 / 退会チャットはドロワー / モーダル中心

### Design C: Friendly Minimal

柔らかい配色、丸み、タブレット優先。

- レイアウト: 単一カラム + 折りたたみサイドバー
- 配色: `#FFF8F3` ベース、アクセント `#FF8A65` (コーラル)、`rounded-2xl` 多用
- メッセージ表示: 左右バブル (自分 = 右色付き、相手 = 左白)、影柔らかめ
- タッチターゲット 44px+、タブレット縦でも快適

## 4. Architecture

### 4.1 Routing

```
/                                  # デザイン選択ランディング
/design-{a|b|c}/
├── login                          # ログイン
├── signup                         # 新規会員登録
├── chats                          # チャット一覧
├── chats/[id]                     # チャット画面
├── chats/[id]/settings            # チャット設定（退会含む）
├── archive                        # 退会したチャット一覧 + 再入会
└── settings/
    ├── account                    # アカウント設定 + ログアウト + 通知設定
    ├── contact                    # お問い合わせフォーム
    ├── terms                      # 利用規約
    ├── faq                        # よくあるご質問
    ├── privacy                    # プライバシーポリシー
    └── delete                     # アプリから退会
```

各 `design-{x}/+layout.svelte` でデザイン固有のシェル / CSS 変数 / カラーパレットを適用する。

### 4.2 ファイル構成

```
src/
├── routes/
│   ├── +page.svelte                       # ランディング (3 デザインへの導線)
│   ├── design-a/...                       # 上記ルート構造
│   ├── design-b/...
│   └── design-c/...
├── lib/
│   ├── mock/
│   │   ├── types.ts
│   │   ├── users.ts
│   │   ├── chats.ts
│   │   ├── messages.ts
│   │   └── index.ts
│   ├── stores/
│   │   └── chat-store.svelte.ts           # Svelte 5 $state ベース
│   ├── components/
│   │   ├── ui/                            # shadcn-svelte 取得物
│   │   └── shared/                        # MediaViewer 等、デザイン共通の小物
│   └── utils.ts
```

### 4.3 状態管理

- Svelte 5 の `$state` を用いた軽量ストア (`chat-store.svelte.ts`)
- 内容:
  - `currentUserId`
  - `chats: Chat[]`（`isArchived` で退会済み判定）
  - `messages: Record<chatId, Message[]>`
  - `addMessage(chatId, body)` / `leaveChat(chatId)` / `rejoinChat(chatId)`
- ページリロードでリセット（永続化なし）

### 4.4 デザイン切替の仕組み

- 各 `design-{x}/+layout.svelte` が
  1. ルート要素に `data-design="a|b|c"` を付与
  2. CSS 変数 (`--accent`, `--bg`, `--radius` 等) を上書き
  3. 独自のシェル (サイドバー / ナビ / ヘッダー) を `<slot />` でラップ
- shadcn-svelte の primitives は共通利用、見た目は CSS 変数 + ラッパーコンポーネントで吸収

## 5. Mock Data

### 5.1 型定義

```ts
type User = {
	id: string;
	nickname: string;
	avatarUrl: string;
	birthDate: string; // YYYY-MM-DD
	email: string;
};

type Chat = {
	id: string;
	name: string;
	iconUrl: string;
	memberIds: string[];
	lastMessageAt: string; // ISO
	unreadCount: number;
	isArchived: boolean; // true = 退会済み
};

type Message = {
	id: string;
	chatId: string;
	senderId: string;
	createdAt: string; // ISO
	type: 'text' | 'image' | 'video';
	body: string; // text 本文 or メディア URL
	thumbnailUrl?: string; // video 用
};
```

### 5.2 ボリューム

- ユーザー: 10 名 (自分 + 9 名)
- チャット: 8 件（うち 2 件は `isArchived: true`）
- メッセージ: 各チャット 15〜30 件、type は text / image / video を混在
- 画像: `https://picsum.photos/seed/{n}/600/400`
- 動画: パブリックなサンプル動画 URL (big_buck_bunny 等)

## 6. Features

### 6.1 メッセージ表示

- **テキスト**: 改行保持、URL 自動リンク化なし（要件外）
- **画像**: `<img>` インライン表示、クリックでモーダル等倍プレビュー
- **動画**: `<video controls>` で埋め込み再生
- **入力**: 単純な textarea + 送信ボタンのみ。入力補助なし
- 編集 / リアクション / 引用 / メンション / 絵文字 / ファイル添付 / URL プレビュー: **すべて除外**

### 6.2 プッシュ通知（モック）

- `settings/account` に「通知を有効にする」トグル
  - クリック時 `Notification.requestPermission()` を呼ぶ
  - 許可済み / 拒否済み / 未設定 をバッジ表示
- 「テスト通知を送る」ボタンを設置し、`new Notification(...)` を発火
- バックエンド連携なし

### 6.3 チャット退会 / 再入会

- チャット設定画面に「このチャットから退会する」ボタン
- 確認ダイアログ後、`leaveChat(chatId)` → `isArchived = true`
- `archive` 画面で一覧表示、「再入会」ボタンで `rejoinChat(chatId)` → `isArchived = false`

### 6.4 アプリから退会

- `settings/delete` で確認後、`alert('退会処理が完了しました')` 程度（モック）

### 6.5 認証

- ログイン / 新規登録フォームは UI のみ
- submit は `alert()` でモック挙動、その後 `/design-{x}/chats` へ遷移

## 7. Required shadcn-svelte Components

button, input, textarea, label, avatar, card, dialog, drawer, separator, scroll-area, dropdown-menu, switch, tabs, badge, sheet, alert, alert-dialog

## 8. Out of Scope

- 認証実装、DB 接続、Better Auth、Drizzle
- 検索機能
- エンドユーザーによるチャットグループ作成
- 編集 / リアクション / 引用 / ブックマーク / タスク / URL 発行
- メンション / 絵文字 / ファイル添付 / ビデオ通話 / info バー / URL プレビュー
- QR コード読み取り
- スマートフォン (< 768px) 対応

## 9. Success Criteria

- `/` から 3 つのデザインに導線があり、それぞれ全画面（12 ルート）が破綻なく表示できる
- 各デザインで Chatwork ライクなチャット体験（一覧 → 会話 → メッセージ閲覧 / 送信 → 設定）が動作する
- 画像・動画メッセージがそれぞれの表示形式で再生 / 表示できる
- 退会 → 退会済み一覧 → 再入会 の往復が機能する
- 通知トグルが Notification API を呼び、テスト通知が実際に表示される
- PC・タブレット 8 インチで主要画面が崩れずに表示できる
