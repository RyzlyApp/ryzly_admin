interface IOptions {
    isJSON: boolean;
}

class StorageClass {
    public getValue<T>(key: string, { isJSON = false }: IOptions): T | null {
        if (typeof window !== "undefined") {
            const value = localStorage.getItem(key);
            if (!value) return null;
            if (isJSON) {
                try {
                    return JSON.parse(value);
                } catch {
                    return null;
                }
            }
            return value as T;
        }
        return null;
    }

    public setValue(key: string, value: string) {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, value);
        }
    }
}

export default new StorageClass();
