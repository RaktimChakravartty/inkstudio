'use client';

import { useState, useEffect } from 'react';
import { Key, Save, Check, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function SettingsPage() {
  const [repKey, setRepKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [supabaseOk, setSupabaseOk] = useState(false);
  const [hfStatus, setHfStatus] = useState<'checking' | 'ok' | 'missing'>('checking');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRepKey(localStorage.getItem('ink_api_replicate') || '');
      setSupabaseOk(isSupabaseConfigured());

      // Check if HF_TOKEN is configured server-side by pinging the API
      fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: '' }),
      })
        .then((res) => res.json())
        .then((data) => {
          // If we get "prompt is required" instead of "HF_TOKEN is not configured",
          // the token is set
          if (data.error?.includes('HF_TOKEN')) {
            setHfStatus('missing');
          } else {
            setHfStatus('ok');
          }
        })
        .catch(() => setHfStatus('missing'));
    }
  }, []);

  const handleSave = () => {
    if (repKey.trim()) {
      localStorage.setItem('ink_api_replicate', repKey.trim());
    } else {
      localStorage.removeItem('ink_api_replicate');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-white">Settings</h1>
        <p className="text-ink-400 mt-1">API keys, storage, and configuration</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Connection Status */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Connection Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-300">Supabase</span>
              {supabaseOk ? (
                <Badge variant="success">Connected</Badge>
              ) : (
                <Badge variant="warning">Using Local Storage</Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-300">Hugging Face API</span>
                <span className="text-[10px] text-ink-500">(server-side)</span>
              </div>
              {hfStatus === 'checking' ? (
                <Badge>Checking...</Badge>
              ) : hfStatus === 'ok' ? (
                <Badge variant="success">Connected</Badge>
              ) : (
                <Badge variant="warning">Not Configured</Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-300">Replicate API</span>
              {repKey ? (
                <Badge variant="success">Key Set</Badge>
              ) : (
                <Badge>Not Configured</Badge>
              )}
            </div>
          </div>
        </div>

        {/* HF Info */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Zap size={16} /> Hugging Face (Live Generation)
          </h2>
          {hfStatus === 'ok' ? (
            <div className="space-y-2">
              <p className="text-xs text-emerald-400">
                HF_TOKEN is configured. Live generation is active.
              </p>
              <div className="text-xs text-ink-400 space-y-1">
                <p><strong>Primary model:</strong> FLUX.1-schnell (fast, ~10s)</p>
                <p><strong>Fallback model:</strong> Stable Diffusion XL (auto-fallback if primary fails)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-ink-400">
                To enable live generation, set <code className="text-amber bg-ink-800 px-1 rounded">HF_TOKEN</code> in your <code className="text-amber bg-ink-800 px-1 rounded">.env.local</code> file:
              </p>
              <pre className="text-xs text-ink-400 bg-ink-950 rounded-lg p-3 font-mono">
{`HF_TOKEN=hf_your_token_here`}
              </pre>
              <p className="text-[10px] text-ink-600">
                Get a free token at huggingface.co/settings/tokens
              </p>
            </div>
          )}
        </div>

        {/* Additional API Keys */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Key size={16} /> Additional API Keys
          </h2>
          <p className="text-xs text-ink-500">
            Optional keys stored in your browser for additional model access.
          </p>

          <Input
            label="Replicate API Token"
            value={repKey}
            onChange={(e) => setRepKey(e.target.value)}
            placeholder="r8_..."
            type="password"
          />
          <p className="text-[10px] text-ink-600 -mt-2">
            $5 free credits — enables FLUX.1-schnell via Replicate
          </p>

          <Button onClick={handleSave}>
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved!' : 'Save API Keys'}
          </Button>
        </div>

        {/* Supabase Config */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <AlertCircle size={16} /> Supabase Configuration
          </h2>
          <p className="text-xs text-ink-400">
            To connect Supabase, set these environment variables in <code className="text-amber bg-ink-800 px-1 rounded">.env.local</code>:
          </p>
          <pre className="text-xs text-ink-400 bg-ink-950 rounded-lg p-3 font-mono">
{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
          </pre>
          <p className="text-xs text-ink-500">
            Without Supabase, the app uses browser local storage for all data.
            This works perfectly for single-user use.
          </p>
        </div>

        {/* Storage Info */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Storage</h2>
          <p className="text-xs text-ink-400">
            {supabaseOk
              ? 'Images are stored in Supabase Storage. Data persists across devices.'
              : 'Images are stored as data URLs in local storage. Data is browser-specific.'}
          </p>
          <Button
            variant="danger"
            size="sm"
            className="mt-3"
            onClick={() => {
              if (confirm('Clear all local data? This cannot be undone.')) {
                localStorage.removeItem('ink_generations');
                localStorage.removeItem('ink_palettes');
                localStorage.removeItem('ink_styles');
                window.location.reload();
              }
            }}
          >
            Clear Local Data
          </Button>
        </div>
      </div>
    </div>
  );
}
