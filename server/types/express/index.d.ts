// https://stackoverflow.com/questions/61563813/why-occured-property-user-does-not-exist-on-type-requestparamsdictionary-an

declare namespace Express {
    interface Request {
        user: any;
    }
}