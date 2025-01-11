export default class User {
    #fullName;
    #username;
    #email;
    #password;

    constructor(fullName, username, email, password) {
        this.#fullName = fullName;
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    // getter
    get fullName() {
        return this.#fullName;
    }
    get username() {
        return this.#username;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }

    // setter
    set fullName(value) {
        if (value.trim().length === 0) {
            throw new Error("Full name cannot be empty");
        }
        this.#fullName = value;
    }
    set username(value) {
        if (value.trim().length === 0) {
            throw new Error("username cannot be empty");
        }
        value.replace(/\s/g, "");
        this.#username = value;
    }
    set email(value) {
        if (value.trim().length === 0) {
            throw new Error("email cannot be empty");
        }
        value.replace(/\s/g, "");
        this.#email = value;
    }
    
}
