import {faker} from '@faker-js/faker';

export class ArticleBuilder {
    constructor() {
        this.article = {
            title: `adil - ${faker.lorem.sentence(2)}`,
            description: faker.lorem.sentence(5),
            text: faker.lorem.paragraph(5),
            tag: faker.lorem.word(),
        }
    }

    async setTitle(title){
        this.article.title = title || `adil - ${faker.lorem.sentence(2)}`;
        return this
    }

    async setDescription(description){
        this.article.description = description || faker.lorem.sentence(5);
        return this
    }

    async setText(text){
        this.article.text = text || faker.lorem.paragraph(5);
        return this
    }

    async setTag(tag){
        this.article.tag = tag || faker.lorem.word();
        return this
    }

    async build(){
        return this.article;
    }
}