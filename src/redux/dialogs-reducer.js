const ADD_MESSAGE = "sandbox_network/dialogs/ADD-MESSAGE";

let initialState = {
    messagesData: [
        { id: 1, content: "Hi", myMessage: true },
        { id: 2, content: "how is the dude himself? =))", myMessage: true },
        { id: 3, content: "Hi dude, what's new? 0_0", myMessage: false },
        { id: 4, content: "Where is my donut?", myMessage: false },
        { id: 5, content: "Did you looked at Naruto?", myMessage: false },
        { id: 6, content: "I like cars", myMessage: true },
        { id: 7, content: "You need JOJO anime", myMessage: false },
    ],
    dialogsData: [
        { id: 1, name: "Andrey" },
        { id: 2, name: "Viktor" },
        { id: 3, name: "Stepan" },
        { id: 4, name: "Viktoria" },
        { id: 5, name: "Tolik" },
    ]
};

let dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messagesData.length + 1,
                content: action.newMessageText,
                myMessage: true,
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
};
//ActionCreator
export const addMessage = (newMessageText) => ({ type: ADD_MESSAGE, newMessageText });

export default dialogsReducer;
