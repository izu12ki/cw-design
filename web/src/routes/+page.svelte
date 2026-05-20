<script lang="ts">
  const designs = [
    {
      id: 'a',
      name: 'Classic Chatwork',
      description: '情報密度重視。3ペイン構成でビジネス向けにフィット。',
      accent: '#1B4F8B',
      preview: 'border-l-4 border-[#1B4F8B] bg-white'
    },
    {
      id: 'b',
      name: 'Modern Workspace',
      description: 'モダンで広めの余白。ダークサイドバー + 2ペイン。',
      accent: '#7C3AED',
      preview: 'bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] text-white'
    },
    {
      id: 'c',
      name: 'Friendly Minimal',
      description: '柔らかい配色と丸み。タブレット優先のシンプル構成。',
      accent: '#FF8A65',
      preview: 'bg-[#FFF8F3] border border-[#FF8A65]/30'
    }
  ];
</script>

<div class="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8">
  <header class="text-center mb-12">
    <h1 class="text-4xl font-bold text-neutral-900 mb-3">Chat App デザイン比較</h1>
    <p class="text-neutral-600">3つのデザイン案からお選びください</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
    {#each designs as d (d.id)}
      <a
        href={`/design-${d.id}/login`}
        class="block rounded-xl border border-neutral-200 bg-white hover:shadow-lg transition-shadow overflow-hidden"
      >
        <div class={`h-40 ${d.preview} flex items-center justify-center`}>
          <span class="text-2xl font-bold" style={`color: ${d.accent}`}>Design {d.id.toUpperCase()}</span>
        </div>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{d.name}</h2>
          <p class="text-sm text-neutral-600">{d.description}</p>
        </div>
      </a>
    {/each}
  </div>
</div>
