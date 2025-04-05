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
exports.useAiCompletion = useAiCompletion;
const react_1 = require("react");
function useAiCompletion(provider) {
    const [completion, setCompletion] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const complete = (0, react_1.useCallback)((prompt, options) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield provider.complete(prompt, options);
            setCompletion(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to complete text");
        }
        finally {
            setIsLoading(false);
        }
    }), [provider]);
    return { completion, complete, isLoading, error };
}
