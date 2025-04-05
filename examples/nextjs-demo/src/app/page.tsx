// examples/nextjs-demo/app/page.tsx
'use client';
import { useAiChat } from 'use-ai-chat';
import { OpenAIProvider } from 'use-ai-chat/providers/openai';
import { useState } from 'react';

export default function ChatDemo() {
  const { messages, sendMessage, isLoading } = useAiChat(
    new OpenAIProvider(process.env.NEXT_PUBLIC_OPENAI_KEY!),
    [{ role: 'system', content: 'You are a helpful assistant.' }]
  );

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              padding: '10px',
              background: msg.role === 'user' ? '#f0f0f0' : '#e3f2fd',
              margin: '5px 0',
              borderRadius: '5px'
            }}
          >
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          style={{ flex: 1, padding: '8px' }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: '8px 15px', background: '#0070f3', color: 'white', border: 'none' }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}