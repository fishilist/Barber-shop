import {BrowserRouter} from "react-router-dom";
import {createContext} from 'react';
import UserStore from "./store/UserStore";
import ReactDOM from 'react-dom/client';
import App from './App';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Context.Provider value={{
            userStore: new UserStore(),
        }}>
            <App />
        </Context.Provider>
    </BrowserRouter>
);