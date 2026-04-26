import { Brandmark } from '@/components/brand/Brandmark';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <Brandmark size={32} className="text-ink-500 animate-pulse mb-3" />
      <p className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">{message}</p>
    </div>
  );
}