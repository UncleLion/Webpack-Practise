export default class Post {
    constructor(title, img ) {
        this.title = title
        this.img = img
        this.date = new Date()
    }


    toString() {
       return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        }, null, 2)//null це replacer-замінник , 2-кількість пробілів які нам потрібно зберегти= готовий об'єкт
    }

    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}