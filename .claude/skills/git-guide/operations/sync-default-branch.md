# sync-default-branch operation

## 設定
- デフォルトブランチ指定: （ここにブランチ名を記載。未指定なら空のまま）

## 動作ルール
1. 上記「デフォルトブランチ指定」に値がある場合は、そのブランチを対象にする。
4. 上記「デフォルトブランチ指定」に値がない場合は、優先順位（`develop` > `dev` > `main`）で存在するブランチを特定する。
5. 特定したブランチへ移動する: `git checkout <branch_name>`
6. 最新情報を反映する: `git fetch origin` および `git pull origin <branch_name>`
7. `git pull origin <branch_name>` でコンフリクトになった場合は中断し、「自動マージできないため、エンジニアに連絡してください」と案内する。
