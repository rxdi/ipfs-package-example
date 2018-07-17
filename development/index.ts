import { Module } from "@rxdi/core";
import { TestService } from "./services/test.service";

@Module({
    services: [TestService]
})
export class TestModule {}

export * from './services/index';