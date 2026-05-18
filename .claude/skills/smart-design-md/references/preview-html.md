# プレビューHTML生成仕様

3案をテキストで提示した直後、以下の手順でビジュアルプレビューを生成する：

1. `Write` ツールでカレントディレクトリに `design-preview.html` を保存する
2. `Bash` ツールで `open design-preview.html` を実行してブラウザで自動起動する

## design-preview.html の要件

アプリ固有の画面モックではなく、**全トークンが視覚化される固定レイアウトのデザインシステム・ショーケース**を生成する。

- **自己完結型**（CDN参照のみ・外部ファイル依存なし）
- **Google Fonts CDN** で各案のフォントを読み込む（`<link>` タグ）
- **タブ切り替え**（案A / 案B / 案C）でテーマを即時切り替え。タブのアクティブ色はそのテーマのPrimaryを使う
- **ページ背景色**はテーマのBackgroundに連動させる（ダーク系テーマはページ全体が暗くなる）
- JavaScriptはインラインで完結させ、タブ切り替え時にCSS変数を差し替える方式を使う

## ページの固定レイアウト構成

ページは以下の**4セクション固定**で構成する。アプリ名・内容は問わず常に同じ構造で出力する。

---

**Section 1: Color Tokens**

全セマンティックカラーをスウォッチで一覧表示する。

- 横並びスウォッチ（64×64px・角丸16px・カラーコードとトークン名を下に表示）
- 表示するトークン: Primary / Secondary / Background / Surface / On Primary / Text High / Text Medium / Text Disabled / Success / Error / Warning

---

**Section 2: Typography**

全タイプスケールを実際のフォントでレンダリングする。

- Heading 1（24px ExtraBold）〜 Caption（12px Regular）の6段階を縦に並べる
- 各行に「スタイル名 / サイズ / ウェイト」を小さく添える
- 実際のフォント・テキストカラー（Text High）を適用する

---

**Section 3: Components**

以下のコンポーネントを固定で描画する。すべて推論済みのトークン値を実際に適用する。

- **Buttons行**: Primary Button（通常）・Primary Button（Disabled）・Secondary Button（アウトライン）・Gradient Button（グラデーション採用案のみ）
- **Input行**: 通常状態・フォーカス状態（Primary枠）・エラー状態（Error枠 + エラーメッセージ）
- **Cards行**: カード×2（Surface色・角丸・シャドウ。タイトル + 説明文を入れる）
- **Badges行**: Primary Badge・Secondary Badge・Neutral Badge・Success chip・Error chip
- **Progress行**: Primaryカラーのプログレスバー（60%の状態）

---

**Section 4: Bottom Navigation**

実寸に近い横幅のBottomNavバーを表示する。

- 4アイテム（ホーム・一覧・通知・設定）、アイコンはUnicode絵文字
- アクティブアイテムは Primary カラー・非アクティブは Text Disabled カラー

---

## CSS変数の切り替え方式

```javascript
const themes = {
  A: {
    label: '案A：[コンセプト名]', desc: '[説明]',
    primary: '#XXXXXX', secondary: '#XXXXXX',
    bg: '#XXXXXX', surface: '#XXXXXX',
    textHigh: '#XXXXXX', textMed: '#XXXXXX', textDis: '#XXXXXX',
    onPrimary: '#XXXXXX',
    success: '#XXXXXX', error: '#XXXXXX', warning: '#XXXXXX',
    radiusBtn: 'Xpx', radiusCard: 'Xpx',
    fontHeading: "'Font Name', sans-serif",
    fontBody: "'Font Name', sans-serif",
    pageBg: '#XXXXXX', pageTextSub: '#XXXXXX',
    gradientStart: '#XXXXXX', gradientEnd: '#XXXXXX', // グラデーション非採用の場合は null
  },
  B: { ... },
  C: { ... }
};

function switchTheme(key) {
  const t = themes[key];
  const r = document.documentElement.style;
  r.setProperty('--primary', t.primary);
  r.setProperty('--secondary', t.secondary);
  r.setProperty('--bg', t.bg);
  r.setProperty('--surface', t.surface);
  r.setProperty('--text-high', t.textHigh);
  r.setProperty('--text-med', t.textMed);
  r.setProperty('--text-dis', t.textDis);
  r.setProperty('--on-primary', t.onPrimary);
  r.setProperty('--success', t.success);
  r.setProperty('--error', t.error);
  r.setProperty('--warning', t.warning);
  r.setProperty('--radius-btn', t.radiusBtn);
  r.setProperty('--radius-card', t.radiusCard);
  r.setProperty('--font-heading', t.fontHeading);
  r.setProperty('--font-body', t.fontBody);
  r.setProperty('--page-bg', t.pageBg);
  // タブのactive色も更新する
}
```

## ユーザーへの案内メッセージ

HTMLを開いた後、以下を伝える：

> 「`design-preview.html` をブラウザで開きました。タブで3案を切り替えて雰囲気を確認してください。
> A・B・Cのいずれかを選ぶか、「AのカラーにBのフォント」のような組み合わせも可能です。修正したい値があればあわせて教えてください。」

ユーザーの回答を受けて最終的なデザイン仕様を確定する。
