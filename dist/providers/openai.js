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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIProvider {
    constructor(apiKey) {
        this.openai = new openai_1.default({ apiKey });
    }
    chat(messages, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Handle streaming vs non-streaming differently
            if (options === null || options === void 0 ? void 0 : options.stream) {
                throw new Error("Streaming responses not implemented in this example");
            }
            const response = yield this.openai.chat.completions.create({
                model: (options === null || options === void 0 ? void 0 : options.model) || "gpt-3.5-turbo",
                messages: messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
                temperature: (options === null || options === void 0 ? void 0 : options.temperature) || 0.7,
                max_tokens: options === null || options === void 0 ? void 0 : options.maxTokens,
                stream: false, // Explicitly disable streaming for this implementation
            });
            return {
                role: "assistant",
                content: ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "",
            };
        });
    }
    complete(prompt, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield this.openai.completions.create({
                model: (options === null || options === void 0 ? void 0 : options.model) || "text-davinci-003",
                prompt,
                temperature: (options === null || options === void 0 ? void 0 : options.temperature) || 0.7,
                max_tokens: options === null || options === void 0 ? void 0 : options.maxTokens,
            });
            return ((_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.text) || "";
        });
    }
}
exports.OpenAIProvider = OpenAIProvider;
