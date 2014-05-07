var Primes = (function() {

	var primes, calculatedTo, maxPrime;

	function init() {
		primes = [2, 3];
		maxPrime = 3;
		calculatedTo = 3;
	}

	function isPrime(n) {
		if (calculatedTo >= n) {
			return primesContains(n);
		}
		// else
		var max = Math.ceil(Math.sqrt(n));
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
		for (var i = 0, l = primes.length; i < l; ++i) {
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
		max = max || Math.ceil(Math.sqrt(n));
		for (var i = 0, l = primes.length; i < l; ++i) {
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
		max = max || INT_MAX;
		var n = calculatedTo;
		if (n < max) {
			while (n += 2 <= max) {
				if (!primesContainsFactorOf(n)) {
					primes.push(n);
					return maxPrime = calculatedTo = n;
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

	init();

	return {
		reset: init,
		isPrime: isPrime,
		getPrimesTo: getPrimesTo
	};
}());
