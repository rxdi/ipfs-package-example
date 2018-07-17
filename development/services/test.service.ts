import { Service } from "@rxdi/core";

@Service()
export class TestService {
    omg() {
        return 'it works!';
    }
}