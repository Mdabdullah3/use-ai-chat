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
exports.GeminiProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
class GeminiProvider {
    constructor(apiKey) {
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    }
    chat(messages, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.genAI.getGenerativeModel({
                model: (options === null || options === void 0 ? void 0 : options.model) || "gemini-pro",
            });
            const chat = model.startChat({
                history: messages.map((m) => ({
                    role: m.role === "assistant" ? "model" : m.role,
                    parts: [{ text: m.content }],
                })),
            });
            const result = yield chat.sendMessage(messages[messages.length - 1].content);
            const response = yield result.response;
            return {
                role: "assistant",
                content: response.text(),
            };
        });
    }
    complete(prompt, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.genAI.getGenerativeModel({
                model: (options === null || options === void 0 ? void 0 : options.model) || "gemini-pro",
            });
            const result = yield model.generateContent(prompt);
            const response = yield result.response;
            return response.text();
        });
    }
}
exports.GeminiProvider = GeminiProvider;
