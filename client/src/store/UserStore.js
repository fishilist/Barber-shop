import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuthorazed = false
        this._user = {}
        makeAutoObservable(this) // Следит за объектом и при их изменении компоненты будут заново рендериться
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get getUser() {
        return this._user
    }
}
