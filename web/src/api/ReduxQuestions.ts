import { TestItemDto } from "@skill-test/data/dto/test/TestItemDto";

const ReduxQuestions: TestItemDto[] = [
  {
    // https://goshakkk.name/redux-side-effect-approaches/
    id: 1,
    question: "What is a side-effect?",
    answers: [
      "Calling to the server",
      "Accessing local storage",
      "Recording analytics events",
      "All of them.",
      "None of them.",
    ].map((answer, index) => ({
      id: index,
      answer,
      correct: answer === "All of them.",
    })),
    info: `Calling to the server, accessing local storage, recording analytics events, or something else entirely. 
        That process of calling into the real world is what side-effects are. 
        They are a way of bridging the pure Redux world with the outside world.`,
  },
  {
    id: 2,
    question: "Common features of Side-effects?",
    answers: [
      `Side-effects can happen in response to Redux actions. For example, when a user clicks “Save,” you may want to fire off an AJAX request.`,
      `Side-effects may dispatch Redux actions. Like when the save process finishes successfully, you may want to dispatch SAVE_SUCCEEDED; or when it failed, SAVE_FAILED.`,
      `Side-effects also may not dispatch anything: if you are doing analytics tracking based on Redux actions, you would track things in response to Redux actions, but you will not dispatch anything.`,
      "All of them.",
      "None of them.",
    ].map((answer, index) => ({
      id: index,
      answer,
      correct: answer === "All of them.",
    })),
  },
  {
    id: 3,
    question: "What kinds of approaches are there to handling Side-effects?",
    answers: [
      `Inside action creators. It is pretty barebones but often is just enough. You make a smart action creator which performs your side-effect and may dispatch an action multiple times.`,
      `Have some code on the side respond to user actions. Action creators are still pure, but you now have some piece of code that can listen for a specific action, perform whatever it needs to, and maybe dispatch another action.`,
      `Specialized middleware. Some side-effects are common enough, there exist very specific Redux middlewares. You don’t perform a fetch yourself; you don’t even have a smart action creator. Typically, you’d just dispatch a special action that has the request data, and the middleware takes care of the rest.`,
      "All of them.",
      "None of them.",
    ].map((answer, index) => ({
      id: index,
      answer,
      correct: answer === "All of them.",
    })),
    info: ` 
        There are three primary ways of performing side-effects:
        <p>1. Inside action creators. It is pretty barebones but often is just enough. You make a smart action creator 
        which performs your side-effect and may dispatch an action multiple times.</p>
        <dl>
            <dt>Pros:</dt>
            <dd>simple</dd>
            <dd>no new concepts, no mental overhead</dd>
            
            <dt>Cons:</dt>
            <dd>action creator is no longer pure</dd>
            <dd>harder to test</dd>
            <dd>can get messy if a certain action involves several side-effects</dd>
            <dd>can only respond to actions, can’t dispatch by itself</dd>
            <dd>spreads logic across dozens of files, interleaving with regular action creators</dd>
            
            <dt>Example implementations:</dt>
            <dd>passing <i>dispatch</i> manually</dd>
            <dd>redux-thunk</dd>
        </dl>
                
        <p>2. Have some code on the side respond to user actions. Action creators are still pure, 
        but you now have some piece of code that can listen for a specific action, perform whatever it needs to, and maybe dispatch another action.</p>
            Pros:
                depending on implementation, can be easier to test
                allows having several independent listeners on one action
                depending on implementation, can issue actions by itself
                allows grouping side-effectful logic
            Cons:
                several drastically different implementations of the concept
                available approaches typically have a learning curve with new concepts
            Example implementations:
                redux-saga
                redux-observable
                redux-cycles
        3. Specialized middleware. Some side-effects are common enough, there exist very specific Redux middlewares. You don’t perform a fetch yourself; you don’t even have a smart action creator. Typically, you’d just dispatch a special action that has the request data, and the middleware takes care of the rest.
            Pros:
                keeps the action creator super-simple and pure
            Cons:
                generally limited to one kind of side-effects — HTTP requests
            Example implementations:
                redux-promise
        `,
  },
];

export default ReduxQuestions;
