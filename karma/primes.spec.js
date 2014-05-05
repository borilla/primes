describe('Primes', function() {

	var sandbox;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		Primes.reset();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should have an isPrime function', function() {
		expect(Primes.isPrime).is.a('function');
	});

	it('should return true for prime numbers', function() {
		assert(Primes.isPrime(2) == true, '2 is a prime number');
		assert(Primes.isPrime(3) == true, '3 is a prime number');
		assert(Primes.isPrime(104729) == true, '104729 is a prime number');
		assert(Primes.isPrime(5) == true, '5 is a prime number');
		assert(Primes.isPrime(7) == true, '7 is a prime number');
		assert(Primes.isPrime(11) == true, '11 is a prime number');
		assert(Primes.isPrime(9967) == true, '9967 is a prime number');
	});

	it('should return false for non-prime numbers', function() {
		assert(Primes.isPrime(1) == false, '1 is not a prime number');
		assert(Primes.isPrime(4) == false, '4 is not a prime number');
		assert(Primes.isPrime(21) == false, '21 is not a prime number');
		assert(Primes.isPrime(100000000) == false, '1000 is not a prime number');
		assert(Primes.isPrime(104730) == false, '104730 is not a prime number');
	});

	it('should have a getPrimesTo function', function() {
		expect(Primes.getPrimesTo).is.a('function');
	});

	it('should be able to return primes up to a value', function() {
		this.timeout(30000); // allow some time for tests!
		expect(Primes.getPrimesTo(1)).to.deep.equal([]);
		expect(Primes.getPrimesTo(2)).to.deep.equal([2]);
		expect(Primes.getPrimesTo(3)).to.deep.equal([2,3]);
		expect(Primes.getPrimesTo(10)).to.deep.equal([2,3,5,7]);
		expect(Primes.getPrimesTo(30)).to.deep.equal([2,3,5,7,11,13,17,19,23,29]);
		assert(Primes.getPrimesTo(1000000).length == 78498, 'There are 78498 primes less than 1M');
	});
});
