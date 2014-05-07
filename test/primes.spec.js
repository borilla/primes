(function() {
	module('Primes');

	QUnit.testStart(function() {
	});

	QUnit.testDone(function() {
		Primes.reset();
	});

	test('should return true for prime numbers', function() {
		equal(Primes.isPrime(2), true, '2 is a prime number');
		equal(Primes.isPrime(3), true, '3 is a prime number');
		equal(Primes.isPrime(104729), true, '104729 is a prime number');
		equal(Primes.isPrime(5), true, '5 is a prime number');
		equal(Primes.isPrime(7), true, '7 is a prime number');
		equal(Primes.isPrime(11), true, '11 is a prime number');
		equal(Primes.isPrime(9967), true, '9967 is a prime number');
	});

	test('should return false for non-prime numbers', function() {
		equal(Primes.isPrime(1), false, '1 is not a prime number');
		equal(Primes.isPrime(4), false, '4 is not a prime number');
		equal(Primes.isPrime(21), false, '21 is not a prime number');
		equal(Primes.isPrime(100000000), false, '1000 is not a prime number');
		equal(Primes.isPrime(104730), false, '104730 is not a prime number');
	});

	test('should be able to return primes up to a value', function() {
		deepEqual(Primes.getPrimesTo(1), [], 'Primes to 1');
		deepEqual(Primes.getPrimesTo(2), [2], 'Primes to 2');
		deepEqual(Primes.getPrimesTo(3), [2,3], 'Primes to 3');
		deepEqual(Primes.getPrimesTo(10), [2,3,5,7], 'Primes to 10');
		deepEqual(Primes.getPrimesTo(30), [2,3,5,7,11,13,17,19,23,29], 'Primes to 30');
		equal(Primes.getPrimesTo(1000000).length, 78498, 'There are 78498 primes less than 1M');
	});
}());
