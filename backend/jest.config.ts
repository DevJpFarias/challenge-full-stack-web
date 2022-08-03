export default {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testMatch: [
		'**/*.spec.ts'
	]
}