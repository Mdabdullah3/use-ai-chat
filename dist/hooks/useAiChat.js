"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAiChat = useAiChat;
const react_1 = require("react");
function useAiChat(provider, initialMessages = []) {
    const [messages, setMessages] = (0, react_1.useState)(initialMessages);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const sendMessage = (0, react_1.useCallback)((content, options) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            // Add user message
            const userMessage = { role: "user", content };
            setMessages((prev) => [...prev, userMessage]);
            // Get AI response
            const aiResponse = yield provider.chat([...messages, userMessage], options);
            setMessages((prev) => [...prev, aiResponse]);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send message");
        }
        finally {
            setIsLoading(false);
        }
    }), [messages, provider]);
    const clearMessages = (0, react_1.useCallback)(() => {
        setMessages(initialMessages);
    }, [initialMessages]);
    return { messages, sendMessage, isLoading, error, clearMessages };
}
