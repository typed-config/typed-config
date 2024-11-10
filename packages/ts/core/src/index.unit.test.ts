import { describe, expect, it } from "vitest";
import { createConfig, type SchemaValidator } from ".";

function createSchemaValidator<TSchema, TIsAsync extends boolean = false>(
    validator: (schema: unknown) => boolean,
): SchemaValidator<TSchema, TIsAsync> {
    return ((schema, _isAsync) => {
        if (!validator(schema)) {
            return {
                success: false,
                issues: [
                    {
                        path: "",
                        errors: ["Invalid schema"],
                    },
                ],
                output: schema,
            };
        }

        return {
            success: true,
            issues: undefined as never,
            output: schema as TSchema,
        };
    }) as SchemaValidator<TSchema, TIsAsync>;
}

type TestSchema = {
    a: string;
    b: number;
};

describe("createConfig", () => {
    it("should create a config when validator returns true", () => {
        const conf = createConfig({
            validate: createSchemaValidator<TestSchema>((_schema) => true),
            config: {},
        });

        expect(conf).not.toBeNull();
    });

    it("should error when validator returns false", () => {
        const conf = () =>
            createConfig({
                validate: createSchemaValidator<TestSchema>((_schema) => false),
                config: {},
            });

        expect(conf).toThrow();
    });

    it("should not allow access to server only config when isRunningOnServer is false", () => {
        const conf = createConfig({
            validate: createSchemaValidator<TestSchema>((_schema) => true),
            config: {
                a: "a",
                b: 1,
            },
            isServerConfig: true,
            isRunningOnServer: false,
        });

        expect(() => conf.a).toThrow();
        expect(() => conf.b).toThrow();
    });

    it("should allow access to server only config when isRunningOnServer is true", () => {
        const conf = createConfig({
            validate: createSchemaValidator<TestSchema>((_schema) => true),
            config: {
                a: "a",
                b: 1,
            },
            isServerConfig: true,
            isRunningOnServer: true,
        });

        expect(conf.a).toBeTypeOf("string");
        expect(conf.b).toBeTypeOf("number");
    });
});
