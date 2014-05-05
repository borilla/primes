var Primes = (function() {

	var primes, calculatedTo, maxPrime;

	function init() {
		primes = [2, 3];
		calculatedTo = 3;
		maxPrime = 3;
	}

	function isPrime(n) {
		if (calculatedTo >= n) {
			return primesContains(n);
		}
		// else
		var sqrt = Math.sqrt(n);
		calculatePrimesTo(sqrt);
		return !primesContainsFactorOf(n);
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

	function primesContainsFactorOf(n, sqrt) {
		sqrt = sqrt || Math.sqrt(n);
		for (var i = 0, l = primes.length; i < l; ++i) {
			var prime = primes[i];
			if (n % prime == 0) {
				return true;
			}
			if (prime > sqrt) {
				break;
			}
		}
		return false;
	}

	function calculatePrimesTo(n) {
		if (n > calculatedTo) {
			var start = Date.now();
			n = Math.ceil(n);
			while (calculatedTo < n) {
				calculatedTo += 2;
				if (!primesContainsFactorOf(calculatedTo)) {
					primes.push(calculatedTo);
					maxPrime = calculatedTo;
				}
			}
			var t = Date.now() - start;
			console.log('calculated primes to ' + n + ': ' + primes.length + ' primes (' + t + 'ms)');
		}
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
