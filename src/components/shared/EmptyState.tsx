import Link from 'next/link';

export function EmptyState({ icon: Icon, title, description, action }: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mb-4">
        <Icon size={24} className="text-ink-500" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-200 mb-1">{title}</h3>
      <p className="text-[13px] text-ink-500 max-w-sm">{description}</p>
      {action && (
        <Link href={action.href} className="mt-4 text-[13px] text-cinnamon hover:underline">{action.label}</Link>
      )}
    </div>
  );
}