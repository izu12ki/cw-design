# commit-and-push-workflow operation

## 動作ルール
1. 安全確認: 編集箇所（Modified/Untracked）が10箇所以上なら「変更が10箇所以上ありますが、全て対象にしてよろしいですか？」と確認する。
2. 競合回避: `git pull --rebase origin <current_branch>` を実行する。
3. 除外条件: `.DS_Store` はコミット対象に含めない。
4. ステージング: `git add .` の後に `git reset -- .DS_Store '**/.DS_Store'` を実行する。
5. コミットメッセージ確認: 「コミットメッセージを入力してください。空欄の場合は現在時刻（yyyyMMddHHmm）を使用します。」と確認し、入力がなければ現在時刻を使う。
6. コミット: `git commit -m "<message_or_timestamp>"`
7. プッシュ: `git push origin <current_branch>`
8. PR URL表示（以下の優先順で）:
   - **ghコマンド利用可の場合**: `gh pr view $(git branch --show-current)` で既存PRを確認。存在すれば そのPR URL を表示。存在しなければ PR作成URL を表示。
   - **ghコマンド利用不可の場合**: `git push` の出力に `[new branch]` が含まれているか判定。含まれていれば PR作成URL、含まれなければ「更新済み（既存PR）」と案内し、リポジトリURL を表示。
