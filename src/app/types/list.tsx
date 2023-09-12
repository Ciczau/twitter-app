import { User } from './user';

export interface List {
    id: string;
    name: string;
    desc: string;
    creator: User;
    members: Array<string>;
    followers: Array<string>;
}
