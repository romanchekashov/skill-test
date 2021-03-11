import {TestEntity} from "../data/TestEntity";
import ReduxSagaQuestions from "./ReduxSagaQuestions";
import {UserEntity} from "../data/UserEntity";
import ReduxQuestions from "./ReduxQuestions";

const tests: TestEntity[] = [
    {
        id: 1,
        categories: ['web'],
        name: 'CSS',
        questions: [],
        previewImg: "http://sun9-62.userapi.com/impf/c850736/v850736459/86435/WReeg4oZhY4.jpg?size=600x331&quality=96&proxy=1&sign=87406d5087d729048575d1a1f746b250&type=album"
    }, {
        id: 2,
        categories: ['web', 'programming'],
        name: 'JavaScript es6',
        questions: [],
        previewImg: "https://frontendjournal.com/wp-content/uploads/2020/09/Javascript-ES6.jpg"
    }, {
        id: 3,
        categories: ['web', 'programming'],
        name: 'React',
        questions: [],
        previewImg: "https://miro.medium.com/max/3600/1*HSisLuifMO6KbLfPOKtLow.jpeg"
    }, {
        id: 4,
        categories: ['web', 'programming'],
        name: 'Redux',
        questions: ReduxQuestions,
        previewImg: "https://redux.js.org/img/redux-logo-landscape.png"
    }, {
        id: 5,
        categories: ['web', 'programming'],
        name: 'Redux-Saga',
        questions: ReduxSagaQuestions,
        previewImg: "https://tomphill.co.uk/static/3bda91f9b743ba12b4224a77d77dcf2f/01f8d/1419368_4c25_3.jpg"
    }, {
        id: 6,
        categories: ['devops'],
        name: 'Docker',
        questions: [],
        previewImg: "https://habrastorage.org/webt/8w/2q/ga/8w2qgad0hpcszydr-apdn1uib-8.png"
    }
];

let user!: UserEntity | null;

const dataStore = {
    getTests(): TestEntity[] {
        return tests;
    },
    getTest(id: number): TestEntity {
        return tests.find(value => value.id === id) as TestEntity;
    },
    getUser(): UserEntity | null {
        if (user) return user;

        const username = localStorage.getItem("username");
        if (!username) return null;

        return user = {
            id: 1,
            username,
            email: ""
        };
    },
    setUser(username: string): UserEntity {
        localStorage.setItem("username", username);
        return user = {
            id: 1,
            username,
            email: ""
        };
    },
    logOut() {
        localStorage.removeItem("username");
        user = null;
    }
};

export default dataStore;