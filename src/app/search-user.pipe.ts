import { Pipe, PipeTransform} from '@angular/core';
import { User } from './user/user.class';

@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(users: User[], searchCriteria: string): User[] {
        let selectedUsers: User[] = [];
        if(searchCriteria.length == 0) {
            return users;
        }
        for(let user of users) {
            if(
                user.id.toString().includes(searchCriteria.toLowerCase())
                || user.userName.toLowerCase().includes(searchCriteria.toLowerCase())
                || user.firstName.toLowerCase().includes(searchCriteria.toLowerCase())
                || user.lastName.toLowerCase().includes(searchCriteria.toLowerCase())
                
                || (user.email != null &&
                user.email.toLowerCase().includes(searchCriteria.toLowerCase()))

                || (user.phone != null &&
                user.email.toLowerCase().includes(searchCriteria.toLowerCase()))
            ) {
                selectedUsers.push(user);
            }
        }
        return selectedUsers;
    }
}