import { describe, expect, it } from "vitest";

import { valibotValidator } from ".";
import * as v from "valibot";
import { createConfig } from "@typed-config-js/core";

const schema = v.object({
    a: v.string(),
    b: v.number(),
});

describe("valibotValidator", () => {
    it("should return a validate a config schema", () => {
        const conf = createConfig({
            validate: valibotValidator(schema),
            config: {
                a: "a",
                b: 1,
            },
        });

        expect(conf.a).toBeTypeOf("string");
        expect(conf.b).toBeTypeOf("number");
    });
});
