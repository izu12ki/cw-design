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

<div class="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-8">
	<header class="mb-12 text-center">
		<h1 class="mb-3 text-4xl font-bold text-neutral-900">Chat App デザイン比較</h1>
		<p class="text-neutral-600">3つのデザイン案からお選びください</p>
	</header>

	<div class="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
		{#each designs as d (d.id)}
			<a
				href={`/design-${d.id}/login`}
				class="block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
			>
				<div class={`h-40 ${d.preview} flex items-center justify-center`}>
					<span class="text-2xl font-bold" style={`color: ${d.accent}`}
						>Design {d.id.toUpperCase()}</span
					>
				</div>
				<div class="p-6">
					<h2 class="mb-2 text-xl font-semibold">{d.name}</h2>
					<p class="text-sm text-neutral-600">{d.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
