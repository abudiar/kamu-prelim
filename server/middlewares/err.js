class Err extends Error {
    constructor({ name, status, message, err }) {
        super(message)
        this.name = name;
        this.status = status;
        this.err = err;
    }

    get json() {
        if (this.err)
            return this.err;
        else
            return {
                name: this.name,
                message: this.message
            };
    }

    static handler(err, req, res, next) {
        console.error(err.message);
        switch (err.name) {
            case 'SequelizeValidationError':
                res.status(400).json(err.json || err);
                break;
            case "JsonWebTokenError":
                res.status(401).json(err.json || err);
                break;
            default:
                res.status(err.status || 500).json(err.json || err || 'Internal Server Error');
                break;
        }
    }
}

module.exports = Err;