function add(a: number, b: number): number {
    return a + b;
}

describe('add function', () => {
    it('should add two numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
})