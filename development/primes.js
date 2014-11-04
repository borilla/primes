var Primes = (function() {

	var primes, calculatedTo, maxPrime;
	var MathSqrt = Math.sqrt;
	var MathCeil = Math.ceil;
	var MathFloor = Math.floor;

	function init() {
		primes = [2, 3];
		maxPrime = 3;
		calculatedTo = 3;
	}

	function isPrime(n) {
		if ((n & 1) == 0) {
			return n == 2;
		}
		// else
		if (calculatedTo >= n) {
			return primesContains(n);
		}
		// else
		var max = MathCeil(MathSqrt(n));
		if (primesContainsFactorOf(n, max)) {
			return false;
		}
		// else
		var prime;
		while (prime = calculateNext(max)) {
			if (n % prime == 0) {
				return false;
			}
		}
		return true;
	}

	function primesContains(n) {
		return binaryIndexOf(primes, n) != -1;
	}

	function primesContainsFactorOf(n, max) {
		max = max || MathCeil(MathSqrt(n));
		for (var i = 1, l = primes.length; i < l; ++i) {
			var prime = primes[i];
			if (n % prime == 0) {
				return true;
			}
			if (prime > max) {
				break;
			}
		}
		return false;
	}

	function calculateNext(max) {
		max = (max || Number.MAX_VALUE) - 2;
		var n = calculatedTo;
		while (n <= max) {
			n += 2;
			if (!primesContainsFactorOf(n)) {
				primes.push(n);
				return maxPrime = calculatedTo = n;
			}
		}
		// return undefined;
	}

	function calculatePrimesTo(n) {
		while (calculateNext(n));
	}

	function getPrimesTo(n) {
		calculatePrimesTo(n);
		if (maxPrime > n) {
			for (var i = 0, l = primes.length; i < l; ++i) {
				var prime = primes[i];
				if (prime > n) {
					return primes.slice(0, i);
				}
			}
		}
		// else
		return primes.slice(0);
	}

	function getPrimeFactors(n, includePowers) {
		var factors = [];
		var remainder = n;
		var prime;
		var tryFactor = (includePowers) ? tryFactorPowers : tryFactorUnique;

		function tryFactorUnique(factor) {
			if (remainder % factor == 0) {
				factors.push(factor);
				do {
					remainder /= factor;
					if (remainder == 1) {
						return;
					}
				}
				while (remainder % factor == 0);
			}
		}

		function tryFactorPowers(factor) {
			if (remainder % factor == 0) {
				var power = 1;
				var powers = [1];
				do {
					power *= factor;
					powers.push(power);
					remainder /= factor;
				}
				while (remainder % factor == 0);
				factors.push(powers);
			}
		}

		for (var i = 0, l = primes.length; i < l; ++i) {
			tryFactor(primes[i]);
			if (remainder == 1) {
				return factors;
			}
		}
		var max = MathFloor(n / maxPrime);
		while (prime = calculateNext(max)) {
			tryFactor(prime);
			if (remainder == 1) {
				return factors;
			}
		}
		factors.push(includePowers ? [1,remainder] : remainder);
		return factors;
	}

	function getFactorCombinations(primes) {
		var powers = primes[0];
		var factors = powers ? powers.slice() : [1];
		if (primes.length > 1) {
			var combinations = getFactorCombinations(primes.slice(1));
			powers.forEach(function(power) {
				combinations.forEach(function(x) {
					if (x != 1) {
						factors.push(x * power);
					}
				});
			});
		}
		return factors;
	}

	function getAllFactors(n) {
		var primes = getPrimeFactors(n, true);
		var factors = getFactorCombinations(primes);
	}

	function countFactors(n) {
		var primes = getPrimeFactors(n, true);
		return primes.reduce(function(total, current) {
			return total * current.length;
		}, 1);
	}

	function binaryIndexOf(array, search) {
		var iMin = 0;
		var iMax = array.length - 1;
		while (iMax >= iMin) {
			var i = (iMin + iMax) >> 1;
			var value = array[i];
			if (search > value) {
				iMin = i + 1;
			}
			else if (search < value) {
				iMax = i - 1;
			}
			else {
				return i;
			}
		}
		return -1;
	}

	function info() {
		return {
			primes: primes.slice(),
			maxPrime: maxPrime,
			calculatedTo: calculatedTo
		}
	}

	init();

	return {
		binaryIndexOf: binaryIndexOf,
		calculateNext: calculateNext,
		countFactors: countFactors,
		getAllFactors: getAllFactors,
		getPrimeFactors: getPrimeFactors,
		getPrimesTo: getPrimesTo,
		info: info,
		isPrime: isPrime,
		reset: init
	};
}());
