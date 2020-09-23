import { User } from './user.model';

export interface Payload {
	success: true;
	message?: string;
	payload: User;
}
