import type { Message } from './types';

const img = (seed: number) => `https://picsum.photos/seed/${seed}/600/400`;
const VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_THUMB = 'https://picsum.photos/seed/video/600/400';

const make = (
  chatId: string,
  senderId: string,
  body: string,
  offsetMinutes: number,
  type: 'text' | 'image' | 'video' = 'text',
  thumbnailUrl?: string,
): Message => ({
  id: `${chatId}-${senderId}-${offsetMinutes}`,
  chatId,
  senderId,
  createdAt: new Date(Date.parse('2026-05-20T10:00:00+09:00') - offsetMinutes * 60_000).toISOString(),
  type,
  body,
  thumbnailUrl,
});

export const messages: Message[] = [
  // c-1: プロジェクト Aurora (active)
  make('c-1', 'u-1', 'おはようございます。今日のリリース、最終確認お願いします。', 240),
  make('c-1', 'u-2', '了解です。手元のチェックリスト上げます。', 235),
  make('c-1', 'u-2', img(11), 230, 'image'),
  make('c-1', 'u-me', '確認しました。問題なさそうです。', 225),
  make('c-1', 'u-3', 'デモ動画も置いておきます。', 60, 'text'),
  make('c-1', 'u-3', VIDEO, 58, 'video', VIDEO_THUMB),
  make('c-1', 'u-1', 'ありがとうございます！\n夕方にリリース回します。', 30),
  make('c-1', 'u-me', 'よろしくお願いします。', 10),

  // c-2: デザインチーム
  make('c-2', 'u-4', '新しいトンマナ案、共有します。', 180),
  make('c-2', 'u-4', img(21), 178, 'image'),
  make('c-2', 'u-6', 'いい感じですね。色味もう少し落ち着いてもいいかも。', 175),
  make('c-2', 'u-8', '私も同意です。', 170),
  make('c-2', 'u-me', '了解です。木曜までに差し戻します。', 165),

  // c-3: 社内お知らせ
  make('c-3', 'u-1', '【全社】来週の総会、会場が変更になりました。', 360),
  make('c-3', 'u-2', '了解しました。', 355),
  make('c-3', 'u-5', '新しい会場の地図をお願いします。', 350),
  make('c-3', 'u-1', img(31), 345, 'image'),

  // c-4: 田中 美咲 (DM)
  make('c-4', 'u-2', 'お疲れさまです、ちょっと相談したいことが。', 200),
  make('c-4', 'u-me', 'もちろん。何かありました？', 198),
  make('c-4', 'u-2', '実は来週の発表資料で…', 196),
  make('c-4', 'u-2', img(41), 194, 'image'),
  make('c-4', 'u-me', '画面共有しながら話しましょう。', 190),

  // c-5: ランチ会
  make('c-5', 'u-5', '今日のランチどこにします？', 500),
  make('c-5', 'u-7', '駅前のラーメンどうですか', 498),
  make('c-5', 'u-9', '賛成', 496),
  make('c-5', 'u-me', 'いいですね、12:00に集合で', 494),

  // c-6: 読書クラブ
  make('c-6', 'u-6', '今月の課題本、決めました', 1200),
  make('c-6', 'u-8', '楽しみです', 1195),
  make('c-6', 'u-6', img(61), 1190, 'image'),

  // c-7: 旧プロジェクト Beta (archived)
  make('c-7', 'u-1', 'プロジェクト終了お疲れさまでした', 30000),
  make('c-7', 'u-me', 'ありがとうございました', 29998),

  // c-8: 退会した雑談部屋 (archived)
  make('c-8', 'u-4', 'お元気でしたか？', 50000),
  make('c-8', 'u-me', 'ぼちぼちです', 49998),
];
