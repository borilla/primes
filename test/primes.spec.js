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

	test('should be able to return prime factors of a number', function() {
		deepEqual(Primes.getPrimeFactorsOf(1), [], 'Prime factors of 1');
		deepEqual(Primes.getPrimeFactorsOf(2), [2], 'Prime factors of 2');
		deepEqual(Primes.getPrimeFactorsOf(3), [3], 'Prime factors of 3');
		deepEqual(Primes.getPrimeFactorsOf(6), [2,3], 'Prime factors of 6');
		deepEqual(Primes.getPrimeFactorsOf(12), [2,3], 'Prime factors of 12');
		deepEqual(Primes.getPrimeFactorsOf(15), [3,5], 'Prime factors of 15');
		deepEqual(Primes.getPrimeFactorsOf(24), [2,3], 'Prime factors of 24');
		deepEqual(Primes.getPrimeFactorsOf(101), [101], 'Prime factors of 101');
		deepEqual(Primes.getPrimeFactorsOf(700), [2,5,7], 'Prime factors of 700');
		deepEqual(Primes.getPrimeFactorsOf(701), [701], 'Prime factors of 701');
	});

	test('should be able to return all multiples of prime factors of a number', function() {
		deepEqual(Primes.getPrimeFactorsOf(1, true), [], 'Prime factor multiples of 1');
		deepEqual(Primes.getPrimeFactorsOf(2, true), [[1,2]], 'Prime factor multiples of 2');
		deepEqual(Primes.getPrimeFactorsOf(3, true), [[1,3]], 'Prime factor multiples of 3');
		deepEqual(Primes.getPrimeFactorsOf(6, true), [[1,2],[1,3]], 'Prime factor multiples of 6');
		deepEqual(Primes.getPrimeFactorsOf(12, true), [[1,2, 4],[1,3]], 'Prime factor multiples of 12');
		deepEqual(Primes.getPrimeFactorsOf(15, true), [[1,3],[1,5]], 'Prime factor multiples of 15');
		deepEqual(Primes.getPrimeFactorsOf(24, true), [[1,2,4,8],[1,3]], 'Prime factor multiples of 24');
		deepEqual(Primes.getPrimeFactorsOf(101, true), [[1,101]], 'Prime factor multiples of 101');
		deepEqual(Primes.getPrimeFactorsOf(700, true), [[1,2,4],[1,5,25],[1,7]], 'Prime factor multiples of 700');
		deepEqual(Primes.getPrimeFactorsOf(701, true), [[1,701]], 'Prime factor multiples of 701');
	});

	test('should be able to return all factors of a number', function() {
		deepEqual(Primes.getAllFactorsOf(1, true), [1], 'All factors of 1');
		deepEqual(Primes.getAllFactorsOf(2, true), [1,2], 'All factors of 2');
		deepEqual(Primes.getAllFactorsOf(3, true), [1,3], 'All factors of 3');
		deepEqual(Primes.getAllFactorsOf(6, true), [1,2,3,6], 'All factors of 6');
		deepEqual(Primes.getAllFactorsOf(12, true), [1,2,3,4,6,12], 'All factors of 12');
		deepEqual(Primes.getAllFactorsOf(15, true), [1,3,5,15], 'All factors of 15');
		deepEqual(Primes.getAllFactorsOf(24, true), [1,2,3,4,6,8,12,24], 'All factors of 24');
		deepEqual(Primes.getAllFactorsOf(101, true), [1,101], 'All factors of 101');
		deepEqual(Primes.getAllFactorsOf(700, true), [1,2,4,5,7,10,14,20,25,28,35,50,70,100,140,175,350,700], 'All factors of 700');
		deepEqual(Primes.getAllFactorsOf(701, true), [1,701], 'All factors of 701');
	});
}());
