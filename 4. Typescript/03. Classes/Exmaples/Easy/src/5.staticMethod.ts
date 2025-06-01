class MathUtils {
    static isEven(n: number) {
        if (n % 2 === 0) return true;
        return false;
    }
}

console.log(MathUtils.isEven(10));
console.log(MathUtils.isEven(5));
