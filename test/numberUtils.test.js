const {
  factorial,
  isPrime,
  clamp
} = require('../src/numberUtils');

describe('numberUtils', () => {

  describe('factorial()', () => {

    it('devuelve el factorial correctamente', () => {
      expect(factorial(5)).toBe(120);
    });

    it('devuelve 1 cuando n es 0', () => {
      expect(factorial(0)).toBe(1);
    });

    it('lanza RangeError para números negativos', () => {
      expect(() => factorial(-2)).toThrow(RangeError);
    });

    it('lanza TypeError para números decimales', () => {
      expect(() => factorial(3.5)).toThrow(TypeError);
    });

  });

  describe('isPrime()', () => {

    it('devuelve true para números primos', () => {
      expect(isPrime(7)).toBe(true);
    });

    it('devuelve false para números no primos', () => {
      expect(isPrime(8)).toBe(false);
    });

    it('devuelve false para 0 y 1', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    it('devuelve false para números negativos', () => {
      expect(isPrime(-5)).toBe(false);
    });

  });

  describe('clamp()', () => {

    it('devuelve el valor si está dentro del rango', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('devuelve min si el valor es menor', () => {
      expect(clamp(-2, 1, 10)).toBe(1);
    });

    it('devuelve max si el valor es mayor', () => {
      expect(clamp(20, 1, 10)).toBe(10);
    });

    it('funciona cuando min y max son iguales', () => {
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('lanza RangeError si min es mayor que max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });

  });

});