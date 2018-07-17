declare module '@test/services/test.service' {
	export class TestService {
	    omg(): string;
	}

}
declare module '@test/services/index' {
	export * from '@test/services/test.service';

}
declare module '@test' {
	export class TestModule {
	}
	export * from '@test/services/index';

}
