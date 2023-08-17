import { describe, it, expect } from 'vitest';

function suma(a, b) {
    return a + b;
}

describe("SUMA", () => {
    it("suma de 2 + 2", () => {
        expect(suma(2, 4), 6);
    })
});