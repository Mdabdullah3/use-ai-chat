# use-ai-chat-hooks 💬⚛️

![npm](https://img.shields.io/npm/v/use-ai-chat-hooks)
![license](https://img.shields.io/npm/l/use-ai-chat-hooks)
![downloads](https://img.shields.io/npm/dt/use-ai-chat-hooks)
![bundle size](https://img.shields.io/bundlephobia/minzip/use-ai-chat-hooks)

**The simplest way to add AI chat to React apps.** Connect to OpenAI or Gemini with just 3 lines of code.

## Why Choose This?

✔ **Zero boilerplate** - Get chat working in minutes  
✔ **Multi-provider** - Switch between OpenAI/Gemini easily  
✔ **TypeSafe** - Full TypeScript support  
✔ **Tiny** - < 5kb gzipped  
✔ **Modern** - Built for React 18+

```bash
npm install use-ai-chat-hooks
# or
yarn add use-ai-chat-hooks

```

# 60-Second Quickstart

1. Set up provider (pick one):

```

// For OpenAI
import { OpenAIProvider } from 'use-ai-chat-hooks/providers/openai';
const ai = new OpenAIProvider('your-api-key');

// For Gemini
import { GeminiProvider } from 'use-ai-chat-hooks/providers/gemini';
const ai = new GeminiProvider('your-api-key');

```

2. Add chat to your component:

```
import { useAiChat } from 'use-ai-chat-hooks';

export default function ChatBot() {
  const { messages, sendMessage } = useAiChat(ai);

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage("Hello AI!")}>
        Send Message
      </button>
    </div>
  );
}
```

# Key Features ✨

1. Conversational AI Made Simple

```
const { messages, sendMessage } = useAiChat(ai, {
  initialMessages: [
    { role: 'system', content: 'You are a helpful assistant' }
  ]
});

```

2. Streaming Responses

```
const { messages, sendMessage } = useAiChat(ai, {
  stream: true, // Get responses word-by-word
  onChunk: (text) => updateUI(text)
});

```

3. Multiple AI Providers

Feature OpenAI Gemini
Chat ✅ ✅
Text Complete ✅ ✅
Image Support ❌ ✅

4. Full Type Safety

```
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
```

# Real-World Example

```
 function CustomerSupportBot() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useAiChat(ai, {
    initialMessages: [
      {
        role: 'system',
        content: 'You are customer support agent. Be polite and helpful.'
      }
    ]
  });

  return (
    <div className="chat-window">
      {messages.filter(m => m.role !== 'system').map((msg, i) => (
        <MessageBubble key={i} role={msg.role}>
          {msg.content}
        </MessageBubble>
      ))}

      <form onSubmit={(e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Type your question..."
        />
        <button disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
```

# FAQ

Q: Is this production ready?
A: Yes! Used in production by multiple companies.

Q: How do I handle API keys securely?
A: We recommend using:

```
// In Next.js
const ai = new OpenAIProvider(process.env.NEXT_PUBLIC_AI_KEY);

```

# Contributors

👤 Md Abdullah (@Mdabdullah3)

License

MIT © Md Abdullah - Free for commercial use
