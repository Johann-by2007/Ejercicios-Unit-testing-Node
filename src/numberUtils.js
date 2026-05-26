function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Se esperaba un entero.');
  }

  if (n < 0) {
    throw new RangeError('No se permiten números negativos.');
  }

  if (n === 0) {
    return 1;
  }

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

function isPrime(n) {
  if (n < 2) {
    return false;
  }

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('El mínimo no puede ser mayor que el máximo.');
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

module.exports = {
  factorial,
  isPrime,
  clamp
};