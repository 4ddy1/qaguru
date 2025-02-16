import {faker} from '@faker-js/faker';

export class UserBuilder {
    constructor() {
        this.user = {
            email: faker.internet.email(),
            name: faker.internet.username(),
            password: faker.internet.password(10),
        }
    }

    async setEmail(email){
        this.user.email = email || faker.internet.email();
        return this
    }
    async setName(name){
        this.user.name = name || faker.internet.username();
        return this
    }
    async setPassword(password){
        this.user.password = password || faker.internet.password();
        return this
    }

    async build(){
        return this.user;
    }
}