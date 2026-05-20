export type NotifyPermission = 'default' | 'granted' | 'denied' | 'unsupported';

export function currentPermission(): NotifyPermission {
	if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
	return Notification.permission as NotifyPermission;
}

export async function requestNotificationPermission(): Promise<NotifyPermission> {
	if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
	const result = await Notification.requestPermission();
	return result as NotifyPermission;
}

export function sendTestNotification(title = '新しいメッセージ', body = 'テスト通知です') {
	if (currentPermission() !== 'granted') return false;
	new Notification(title, { body });
	return true;
}
