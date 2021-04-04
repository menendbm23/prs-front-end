import { SearchUserPipe } from './search-user.pipe';

describe('SearchUserPipe', () => {
    it('create and instance', () => {
        const pipe = new SearchUserPipe();
        expect(pipe).toBeTruthy();
    });
});