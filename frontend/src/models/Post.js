export default class Post {
    #id;
    #title;
    #previewImageUrl;
    #imageUrl;

    constructor(id, title, previewImageUrl, imageUrl) {
        this.#id = id;
        this.#title = title;
        this.#previewImageUrl = previewImageUrl;
        this.#imageUrl = imageUrl;
    }

    // getter
    get id() {
        return this.#id;
    }
    get title() {
        return this.#title;
    }
    get previewImageUrl() {
        return this.#previewImageUrl;
    }
    get imageUrl() {
        return this.#imageUrl;
    }

    // setter
    set title(value) {
        if (value.trim().length === 0) {
            throw new Error("Title cannot be empty");
        }
        this.#title = value;
    }
    set previewImageUrl(value) {
        if (value.trim().length === 0) {
            throw new Error("PreviewImageUrl cannot be empty");
        }
        this.#previewImageUrl = value;
    }
    set imageUrl(value) {
        if (value.trim().length === 0) {
            throw new Error("ImageUrl cannot be empty");
        }
        this.#imageUrl = value;
    }
    
}