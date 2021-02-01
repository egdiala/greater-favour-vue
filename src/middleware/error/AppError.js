class AppError extends Error {
    constructor(config){
        super(config.message)
        this.name = config.name
        this.code = config.code
    }
}

export default AppError