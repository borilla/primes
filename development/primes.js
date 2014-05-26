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
		var rem6 = n % 6;
		if (rem6 != 1 && rem6 != 5) {
			return n != 2 && n != 3;
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
		for (var i = 2, l = primes.length; i < l; ++i) {
			var prime = primes[i];
			if (prime == n) {
				return true;
			}
			if (prime > n) {
				break;
			}
		}
		return false;
	}

	function primesContainsFactorOf(n, max) {
		max = max || MathCeil(MathSqrt(n));
		for (var i = 2, l = primes.length; i < l; ++i) {
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
		max = max || Number.MAX_VALUE;
		var n = calculatedTo;
		if (n < max) {
			while (n += 2 <= max) {
				var rem6 = n % 6;
				if (rem6 == 1 || rem6 == 5) {
					if (!primesContainsFactorOf(n)) {
						primes.push(n);
						return maxPrime = calculatedTo = n;
					}
				}
			}
			calculatedTo = n - 2;
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
		return primes.slice(0, primes.length);
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

	function sortArray(arr) {
		return arr.sort(function(a, b) {
			return (a < b) ? -1 : (a == b) ? 0 : 1;
		});
	}

	function getAllFactors(n, sort) {
		var primes = getPrimeFactors(n, true);
		var factors = getFactorCombinations(primes);
		return (sort) ? sortArray(factors) : factors;
	}

	function countFactors(n) {
		var primes = getPrimeFactors(n, true);
		return primes.reduce(function(total, current) {
			return total * current.length;
		}, 1);
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
		info: info,
		reset: init,
		isPrime: isPrime,
		getPrimesTo: getPrimesTo,
		getPrimeFactors: getPrimeFactors,
		getAllFactors: getAllFactors,
		countFactors: countFactors
	};
}());
