import {TestDto} from "../dto/test/TestDto";
import ReduxSagaQuestions from "./ReduxSagaQuestions";
import {UserDto} from "../dto/UserDto";
import ReduxQuestions from "./ReduxQuestions";

const roman: UserDto = {
    id: 1,
    username: "roman"
};

const tests: TestDto[] = [
    {
        id: 1,
        author: roman,
        categories: ['web'].map((name, id) => ({id, name})),
        name: 'CSS',
        questions: [],
        previewImg: "http://sun9-62.userapi.com/impf/c850736/v850736459/86435/WReeg4oZhY4.jpg?size=600x331&quality=96&proxy=1&sign=87406d5087d729048575d1a1f746b250&type=album"
    }, {
        id: 2,
        author: roman,
        categories: ['web', 'programming'].map((name, id) => ({id, name})),
        name: 'JavaScript es6',
        questions: [],
        previewImg: "https://frontendjournal.com/wp-content/uploads/2020/09/Javascript-ES6.jpg"
    }, {
        id: 3,
        author: roman,
        categories: ['web', 'programming'].map((name, id) => ({id, name})),
        name: 'React',
        questions: [],
        previewImg: "https://miro.medium.com/max/3600/1*HSisLuifMO6KbLfPOKtLow.jpeg"
    }, {
        id: 4,
        author: roman,
        categories: ['web', 'programming'].map((name, id) => ({id, name})),
        name: 'Redux',
        questions: ReduxQuestions,
        previewImg: "https://redux.js.org/img/redux-logo-landscape.png"
    }, {
        id: 5,
        author: roman,
        categories: ['web', 'programming'].map((name, id) => ({id, name})),
        name: 'Redux-Saga',
        questions: ReduxSagaQuestions,
        previewImg: "https://tomphill.co.uk/static/3bda91f9b743ba12b4224a77d77dcf2f/01f8d/1419368_4c25_3.jpg"
    }, {
        id: 6,
        author: roman,
        categories: ['devops'].map((name, id) => ({id, name})),
        name: 'Docker',
        questions: [],
        previewImg: "https://habrastorage.org/webt/8w/2q/ga/8w2qgad0hpcszydr-apdn1uib-8.png"
    }
];

const USER_KEY = "user";

const dataStore = {
    getTests(): TestDto[] {
        return tests;
    },
    getTest(id: number): TestDto {
        return tests.find(value => value.id === id) as TestDto;
    },
    getUser(): UserDto | null {
        let user = null;
        const sUser = sessionStorage.getItem(USER_KEY);
        if (sUser) user = JSON.parse(sUser);
        return user;
    },
    setUser(user: UserDto): boolean {
        sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;
    },
    logOut() {
        sessionStorage.removeItem(USER_KEY);
    }
};

export default dataStore;