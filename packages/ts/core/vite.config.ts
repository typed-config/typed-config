import type { UserConfig } from "vite";

export default {
    build: {
        lib: {
            name: "TypedConfig",
            entry: "./src/index.ts",
            formats: ["es", "cjs", "umd", "iife", "system"],
            fileName: (format, file) => {
                return `${file}.${format}.js`;
            },
        },
    },
} satisfies UserConfig;
