run:	
	@npm run start
test:
	@npm run test
test-cover:
	@npx jest --coverage	
lint:
	npx eslint .	

.PHONY: run test test-cover lint

