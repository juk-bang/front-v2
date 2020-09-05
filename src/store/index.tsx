import { createStore } from "redux";

import rootReducer from "./modules";

//리덕스 저장소 생성
const store = createStore(rootReducer);

export default store;
