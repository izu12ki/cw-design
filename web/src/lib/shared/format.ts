export function formatTime(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateLabel(iso: string): string {
	const d = new Date(iso);
	const today = new Date();
	if (d.toDateString() === today.toDateString()) return '今日';
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	if (d.toDateString() === yesterday.toDateString()) return '昨日';
	return d.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
}

export function formatChatListTime(iso: string): string {
	const d = new Date(iso);
	const today = new Date();
	if (d.toDateString() === today.toDateString()) return formatTime(iso);
	return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
}
