import { mergeConfig, type UserWorkspaceConfig } from "vitest/config";
import config from "./vite.config";

export default mergeConfig(config, {
    test: {
        include: ["src/**/*.unit.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
} satisfies UserWorkspaceConfig);
