# tokens.json 出力フォーマット（Token Studio for Figma）

`DESIGN.md` を保存した直後、`Write` ツールでカレントディレクトリに `tokens.json` を生成する。

## フォーマット仕様

- **Token Studio for Figma** 互換JSON
- 6つのトークンセット: `primitive` / `semantic` / `typography` / `spacing` / `borderRadius` / `shadow`
- セマンティックトークンはプリミティブを `{primitive.color.primary.500}` 形式で参照する
- **数値はすべて単位なし文字列**で記述する（例: `"16"` not `"16px"`）

## 構造テンプレート

```json
{
  "primitive": {
    "color": {
      "primary": {
        "100": {
          "value": "[Hex]",
          "type": "color",
          "description": "背景ティント・ホバー背景"
        },
        "300": {
          "value": "[Hex]",
          "type": "color",
          "description": "非活性・placeholder"
        },
        "500": { "value": "[Hex]", "type": "color", "description": "ベース" },
        "700": {
          "value": "[Hex]",
          "type": "color",
          "description": "ホバー・押下状態"
        },
        "900": {
          "value": "[Hex]",
          "type": "color",
          "description": "最暗・特殊強調"
        }
      },
      "secondary": { "（同上5段階）": "" },
      "neutral": {
        "100": {
          "value": "[Hex]",
          "type": "color",
          "description": "Background"
        },
        "200": { "value": "[Hex]", "type": "color", "description": "Surface" },
        "400": {
          "value": "[Hex]",
          "type": "color",
          "description": "Disabled・境界線"
        },
        "600": {
          "value": "[Hex]",
          "type": "color",
          "description": "Medium Emphasis テキスト"
        },
        "900": {
          "value": "[Hex]",
          "type": "color",
          "description": "High Emphasis テキスト"
        }
      },
      "state": {
        "success": { "value": "[Hex]", "type": "color" },
        "error": { "value": "[Hex]", "type": "color" },
        "warning": { "value": "[Hex]", "type": "color" }
      },
      "gradient": {
        "start": {
          "value": "[Hex]",
          "type": "color",
          "description": "グラデーション開始色"
        },
        "end": {
          "value": "[Hex]",
          "type": "color",
          "description": "グラデーション終了色"
        }
      }
    }
  },
  "semantic": {
    "color": {
      "primary": {
        "value": "{primitive.color.primary.500}",
        "type": "color",
        "description": "メインボタン・アクティブ状態"
      },
      "primary-hover": {
        "value": "{primitive.color.primary.700}",
        "type": "color",
        "description": "ホバー・押下時のPrimary"
      },
      "primary-tint": {
        "value": "{primitive.color.primary.100}",
        "type": "color",
        "description": "ホバー背景・ハイライト"
      },
      "secondary": {
        "value": "{primitive.color.secondary.500}",
        "type": "color",
        "description": "強調バッジ・アクセント"
      },
      "on-primary": {
        "value": "[Hex（白または暗色）]",
        "type": "color",
        "description": "Primary上のテキスト・アイコン"
      },
      "background": {
        "value": "{primitive.color.neutral.100}",
        "type": "color",
        "description": "全画面の背景色"
      },
      "surface": {
        "value": "{primitive.color.neutral.200}",
        "type": "color",
        "description": "カード・モーダル・ボトムシート"
      },
      "text-high": {
        "value": "{primitive.color.neutral.900}",
        "type": "color",
        "description": "見出し・メインテキスト"
      },
      "text-medium": {
        "value": "{primitive.color.neutral.600}",
        "type": "color",
        "description": "サブテキスト・ラベル"
      },
      "text-disabled": {
        "value": "{primitive.color.neutral.400}",
        "type": "color",
        "description": "非活性テキスト・境界線"
      },
      "success": {
        "value": "{primitive.color.state.success}",
        "type": "color"
      },
      "error": { "value": "{primitive.color.state.error}", "type": "color" },
      "warning": {
        "value": "{primitive.color.state.warning}",
        "type": "color"
      },
      "gradient-start": {
        "value": "{primitive.color.gradient.start}",
        "type": "color",
        "description": "グラデーション開始色（採用時のみ）"
      },
      "gradient-end": {
        "value": "{primitive.color.gradient.end}",
        "type": "color",
        "description": "グラデーション終了色（採用時のみ）"
      }
    }
  },
  "typography": {
    "fontFamily": {
      "heading": {
        "value": "[フォント名]",
        "type": "fontFamilies",
        "description": "見出し・ボタン"
      },
      "body": {
        "value": "[フォント名]",
        "type": "fontFamilies",
        "description": "本文・日本語"
      }
    },
    "fontSize": {
      "h1": { "value": "24", "type": "fontSizes" },
      "h2": { "value": "20", "type": "fontSizes" },
      "body1": { "value": "16", "type": "fontSizes" },
      "body2": { "value": "14", "type": "fontSizes" },
      "caption": { "value": "12", "type": "fontSizes" },
      "button": { "value": "16", "type": "fontSizes" }
    },
    "fontWeight": {
      "regular": { "value": "400", "type": "fontWeights" },
      "bold": { "value": "700", "type": "fontWeights" },
      "extraBold": { "value": "800", "type": "fontWeights" }
    },
    "lineHeight": {
      "tight": { "value": "1.2", "type": "lineHeights" },
      "normal": { "value": "1.5", "type": "lineHeights" },
      "relaxed": { "value": "1.6", "type": "lineHeights" }
    },
    "scale": {
      "h1": {
        "value": {
          "fontFamily": "{typography.fontFamily.heading}",
          "fontWeight": "{typography.fontWeight.extraBold}",
          "fontSize": "{typography.fontSize.h1}",
          "lineHeight": "{typography.lineHeight.tight}"
        },
        "type": "typography",
        "description": "画面タイトル"
      },
      "h2": {
        "value": {
          "fontFamily": "{typography.fontFamily.heading}",
          "fontWeight": "{typography.fontWeight.bold}",
          "fontSize": "{typography.fontSize.h2}",
          "lineHeight": "{typography.lineHeight.tight}"
        },
        "type": "typography",
        "description": "セクションタイトル"
      },
      "body1": {
        "value": {
          "fontFamily": "{typography.fontFamily.body}",
          "fontWeight": "{typography.fontWeight.regular}",
          "fontSize": "{typography.fontSize.body1}",
          "lineHeight": "{typography.lineHeight.relaxed}"
        },
        "type": "typography",
        "description": "本文"
      },
      "body2": {
        "value": {
          "fontFamily": "{typography.fontFamily.body}",
          "fontWeight": "{typography.fontWeight.regular}",
          "fontSize": "{typography.fontSize.body2}",
          "lineHeight": "{typography.lineHeight.relaxed}"
        },
        "type": "typography",
        "description": "補足テキスト"
      },
      "caption": {
        "value": {
          "fontFamily": "{typography.fontFamily.body}",
          "fontWeight": "{typography.fontWeight.regular}",
          "fontSize": "{typography.fontSize.caption}",
          "lineHeight": "{typography.lineHeight.normal}"
        },
        "type": "typography",
        "description": "タイムスタンプ・ラベル"
      },
      "button": {
        "value": {
          "fontFamily": "{typography.fontFamily.heading}",
          "fontWeight": "{typography.fontWeight.extraBold}",
          "fontSize": "{typography.fontSize.button}",
          "lineHeight": "1"
        },
        "type": "typography",
        "description": "ボタン内テキスト"
      }
    }
  },
  "spacing": {
    "xs": {
      "value": "4",
      "type": "spacing",
      "description": "アイコンとテキストの隙間"
    },
    "sm": {
      "value": "8",
      "type": "spacing",
      "description": "リストアイテム内の要素間"
    },
    "md": {
      "value": "16",
      "type": "spacing",
      "description": "画面左右Padding・カード内Padding"
    },
    "lg": {
      "value": "24",
      "type": "spacing",
      "description": "セクション間の余白"
    },
    "xl": {
      "value": "32",
      "type": "spacing",
      "description": "大きく区切る場合"
    }
  },
  "borderRadius": {
    "button": {
      "value": "[値]",
      "type": "borderRadius",
      "description": "ピル型ボタン"
    },
    "input": {
      "value": "[値]",
      "type": "borderRadius",
      "description": "テキスト入力フォーム"
    },
    "card": {
      "value": "[値]",
      "type": "borderRadius",
      "description": "カード・コンテナ"
    },
    "modal": {
      "value": "[値]",
      "type": "borderRadius",
      "description": "モーダル・ボトムシート（上辺のみ）"
    },
    "badge": {
      "value": "32",
      "type": "borderRadius",
      "description": "バッジ・チップ（完全ピル型）"
    }
  },
  "shadow": {
    "card": {
      "value": [
        {
          "x": "0",
          "y": "4",
          "blur": "12",
          "spread": "0",
          "color": "rgba([R],[G],[B],0.08)",
          "type": "dropShadow"
        }
      ],
      "type": "boxShadow",
      "description": "カード・コンテナ"
    },
    "modal": {
      "value": [
        {
          "x": "0",
          "y": "8",
          "blur": "24",
          "spread": "0",
          "color": "rgba([R],[G],[B],0.12)",
          "type": "dropShadow"
        }
      ],
      "type": "boxShadow",
      "description": "モーダル・ダイアログ"
    },
    "button-primary": {
      "value": [
        {
          "x": "0",
          "y": "4",
          "blur": "8",
          "spread": "0",
          "color": "rgba([Primary R],[Primary G],[Primary B],0.30)",
          "type": "dropShadow"
        }
      ],
      "type": "boxShadow",
      "description": "Primary Buttonのカラーシャドウ"
    }
  }
}
```

shadow の `rgba()` の RGB値は、採用したカラーの実際の RGB を使うこと（neutral-900 系をベースに使うか、Primary の色をベースにする）。
