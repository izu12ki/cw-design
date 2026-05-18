# DESIGN.md 出力フォーマット

`Write` ツールでカレントディレクトリに `DESIGN.md` として保存する。

## プリミティブカラートークンの自動生成ルール

DESIGN.md生成時に、確定した Primary・Secondary・Neutral（Background/Surface系）の3色について、**5段階のシェードスケール**をAIが自動計算して含める。ユーザーには確認不要。

### 計算方法（HSLベース）

各ベース色を HSL に変換し、Lightness を以下の値に固定してシェードを生成する：

| シェード | Lightness（目安） | 用途                     |
| -------- | ----------------- | ------------------------ |
| 100      | 93〜96%           | 背景ティント・ホバー背景 |
| 300      | 70〜75%           | 非活性・placeholder      |
| 500      | ベース色そのまま  | semantic tokenと同値     |
| 700      | 35〜42%           | ホバー・押下状態         |
| 900      | 12〜18%           | 最暗・特殊強調           |

- Hue（色相）はベース色から変えない
- Saturation（彩度）は100/900で若干下げて自然に見せる（-5〜10%程度）
- Neutralスケールは彩度を0〜8%程度に抑えたグレー系で生成する

## テンプレート

```markdown
# [アプリ名] Design Guidelines for AI Agents

> **採用デザイン案:** [案名・コンセプト名]
> **対象プラットフォーム:** [プラットフォーム名]
> **生成日:** [YYYY-MM-DD]

## AIエージェントへの絶対命令 (Core Directives)

- **NO HARDCODING:** UIコンポーネント内でHex値・フォントサイズを直接ハードコードしないこと。必ず本ドキュメントのTokenを参照すること。
- **NO GUESSING:** シャドウ・角丸・余白の値は推測せず、本ドキュメントのルールに従うこと。
- **CONSISTENCY:** 新しい画面を作成する際は、既存の共通コンポーネントを最優先で再利用すること。
- **ACCESSIBILITY:** すべてのテキストはWCAG AA（コントラスト比4.5:1以上）を満たすこと。
- **PLATFORM:** [プラットフォーム名] 向けの実装を前提とする。
- **TOKEN HIERARCHY:** コンポーネント実装ではセマンティックトークンを使うこと。プリミティブトークンを直接参照しないこと。

---

## 0. プリミティブカラートークン (Primitive Color Tokens)

<!-- AIが自動生成したカラースケール。デザイナーが更新する際の基準パレット。 -->
<!-- コンポーネント実装では直接使用せず、セクション1のセマンティックトークン経由で参照すること。 -->

### Primary Scale

- `primary-100`: `[Hex]` — 背景ティント・ホバー背景
- `primary-300`: `[Hex]` — 非活性・placeholder
- `primary-500`: `[Hex]` — ベース（セマンティックの Primary と同値）
- `primary-700`: `[Hex]` — ホバー・押下状態
- `primary-900`: `[Hex]` — 最暗・特殊強調

### Secondary Scale

- `secondary-100`: `[Hex]`
- `secondary-300`: `[Hex]`
- `secondary-500`: `[Hex]` — ベース（セマンティックの Secondary と同値）
- `secondary-700`: `[Hex]`
- `secondary-900`: `[Hex]`

### Neutral Scale

- `neutral-100`: `[Hex]` — 最も明るい背景（セマンティックの Background と同値）
- `neutral-200`: `[Hex]` — Surface系
- `neutral-400`: `[Hex]` — Disabled・境界線
- `neutral-600`: `[Hex]` — Medium Emphasis テキスト
- `neutral-900`: `[Hex]` — High Emphasis テキスト（セマンティックの TextHigh と同値）

---

## 1. セマンティックカラートークン (Semantic Color Tokens)

<!-- 実装時は直接Hex値を使わず、フレームワークのTheme経由で参照すること -->
<!-- 例（Flutter）: Theme.of(context).colorScheme.primary -->

### ライトモード

- **Primary:** `[Hex]` — メインボタン・アクティブ状態
- **Secondary:** `[Hex]` — 強調バッジ・アクセント
- **Background:** `[Hex]` — 画面背景
- **Surface:** `[Hex]` — カード・モーダル・シート
- **On Primary（Primary上のテキスト）:** `[Hex]` — コントラスト比: [X.X]:1
- **テキスト:**
  - High Emphasis: `[Hex]` — on Background: [X.X]:1
  - Medium Emphasis: `[Hex]`
  - Disabled: `[Hex]`
- **セマンティック:**
  - Success: `[Hex]`
  - Error: `[Hex]`
  - Warning: `[Hex]`

[ダークモード対応の場合のみ追加]

### ダークモード

- **Background:** `[Hex]`
- **Surface:** `[Hex]`
- **High Emphasis テキスト:** `[Hex]`

---

## 2. タイポグラフィ (Typography)

<!-- フォントファミリー: [フォント名] -->

| スタイル  | サイズ | ウェイト | 用途                   |
| :-------- | :----: | :------- | :--------------------- |
| Heading 1 |  24px  | Bold     | 画面タイトル           |
| Heading 2 |  20px  | SemiBold | セクションタイトル     |
| Body 1    |  16px  | Regular  | 本文                   |
| Body 2    |  14px  | Regular  | 補足テキスト           |
| Caption   |  12px  | Regular  | タイムスタンプ・ラベル |
| Button    |  16px  | Bold     | ボタン内テキスト       |

---

## 3. スペーシングとレイアウト (Spacing & Layout)

<!-- すべての余白・サイズは基準単位の倍数で設計すること -->

- **基準単位:** [X]px
- **xs:** [値]px — アイコンとテキストの隙間
- **sm:** [値]px — リストアイテム内の要素間
- **md:** [値]px — 画面左右Padding・カード内Padding
- **lg:** [値]px — セクション間の余白
- **xl:** [値]px — 大きく区切る場合

---

## 4. 形状とエフェクト (Shapes & Effects)

- **Border Radius:**
  - ボタン・入力フォーム: `[値]px`
  - カード・モーダル: `[値]px`
  - チップ・バッジ: `[値]px`（ピル型）
- **Shadow:**
  - カード: `blur [値]px, y-offset [値]px, rgba(0,0,0,[opacity])`
  - モーダル: `blur [値]px, y-offset [値]px, rgba(0,0,0,[opacity])`
- **Gradient（採用した場合のみ）:**
  - 開始色: `[Hex]` / 終了色: `[Hex]`
  - 方向: `[例: to right, 135deg]`
  - 用途: [CTAボタン・アクセント装飾など限定箇所を明記]

---

## 5. コンポーネントルール (Component Rules)

### Primary Button

- 背景色: `Primary` / 文字色: `On Primary`
- 高さ: 48px以上（モバイルアクセシビリティ基準）
- 角丸: [ボタン角丸値]
- 非活性: `Disabled` カラー・透明度38%

### Text Input

- フォーカスボーダー: `Primary`
- 通常ボーダー: Medium Emphasis カラー
- エラーボーダー: `Error` + エラーメッセージを下部に表示
- 高さ: 48px以上

### Bottom Navigation

- アクティブアイコン: `Primary`
- 非アクティブアイコン: `Disabled`
- ラベル: Caption スタイル

---

## 6. WCAGコントラスト比 検証済みカラー

<!-- smart-design-mdスキルによる自動検証結果 -->

| 組み合わせ                  |  比率   | WCAG AA | 用途             |
| :-------------------------- | :-----: | :-----: | :--------------- |
| High Emphasis on Background | [X.X]:1 |   pass  | 本文テキスト     |
| High Emphasis on Surface    | [X.X]:1 |   pass  | カード内テキスト |
| On Primary on Primary       | [X.X]:1 |   pass  | ボタンテキスト   |
| Primary on Background       | [X.X]:1 |   pass  | アイコン・枠線   |

---

## 備考

- 参考・競合アプリ: [あれば記載、なければ省略]
- 上記ルールに定義されていない値が必要な場合、実装を止めてユーザーに確認を求めること。
- デザインを変更する場合は本ファイルを更新し、AIに再読み込みを指示すること。
```
