function findPrimes(limit) {
  const primes = new Array(limit).fill(true);

  primes[0] = primes[1] = false;

  for (let p = 2; p * p < limit; p++) {
    if (primes[p] === true) {
      for (let i = p * p; i < limit; i += p)
        primes[i] = false;
    }
  }

  const primeNumbers = [];
  for (let p = 2; p < limit; p++) {
    if (primes[p]) {
      primeNumbers.push(p);
    }
  }

  return primeNumbers;
}

function findMedian(limit) {
  const arr = findPrimes(limit)
  let medianIdx = Math.floor(arr.length / 2)
  if (arr.length % 2 === 0) {
    return [arr[medianIdx-1], arr[medianIdx]]
  } 
  return [arr[medianIdx]]
}



export { findMedian }