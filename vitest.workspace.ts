import type { WorkspaceProjectConfiguration } from "vitest/config";

export default [
    "./**/vitest.config.{unit,integration,e2e}.ts",
] satisfies WorkspaceProjectConfiguration[];
