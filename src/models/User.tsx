import IUser from '../interfaces/IUser';

export class User implements IUser {

    id = 0;
    username = '';
    email = '';
    role = '';

    constructor(user: IUser) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.email;
    }

}