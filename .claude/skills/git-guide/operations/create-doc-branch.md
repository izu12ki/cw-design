# create-doc-branch operation

## 動作ルール
1. 必須ステップ: 先に `sync-default-branch` operation を実行し、最新状態であることを保証する.
4. 現在時刻を `yyyyMMddHHmmss` 形式で取得する。
5. サフィックス確認: 「ブランチ名の末尾に文字列を追加しますか？（例: `_fix-typo`）追加する場合は入力してください。不要な場合はそのままEnterを押してください。」と確認する。
6. 入力があれば `doc/<yyyyMMddHHmmss>_<suffix>`、なければ `doc/<yyyyMMddHHmmss>` を作成する。
7. ブランチ作成して切り替える: `git checkout -b <new_branch_name>`
