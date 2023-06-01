export class Message {
    private who:string = ''
    private text:string = ''

    private from:string = ''

    constructor (who:string, text:string) {
        this.who = who
        this.text = text
    }

    getWho() {
        return this.who
    }
    getText() {
        return this.text
    }
    getFrom() {
        return this.from
    }
    setWho(who:string) {
        this.who = who
    }
    setText(text:string) {
        this.text = text
    }
    setFrom(from:string) {
        this.from = from
    }
}