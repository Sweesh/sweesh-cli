import fs from 'fs';
class Logger {
    constructor() {
        this.file = 'log.json'
        this.data = { "commands": [] }
        fs.writeFileSync(this.file, JSON.stringify(this.data))
    }
  
    addCommand(command, old_path, new_path) {
        (this.data["commands"]).push({"command": command, "old_path": old_path, "new_path": new_path}) 
        fs.writeFileSync(this.file, JSON.stringify(this.data))
    }

    getCommands() {
        return JSON.stringify(this.data)
    }

    purge() {
        this.data = { "commands": [] }
        fs.writeFileSync(this.file, JSON.stringify(this.data))  
    }
}

// const logger = new Logger()
// logger.addCommand("add test.txt", "test.txt","aria")
// console.log(logger.getCommands())
// logger.purge()
// console.log(logger.getCommands())