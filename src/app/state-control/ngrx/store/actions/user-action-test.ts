import * as fromUserActions from './user.actions';


describe('User Actions', () => {
  it('should create loadUser action', () => {
    const action = fromUserActions.loadUser();
    expect(action.type).toBe('[User] Load User');
  });

  it('should carry payload in loadUserSuccess', () => {
    const user = { id: 1, name: 'Alice' };
    const action = fromUserActions.loadUserSuccess({ user });
    expect(action.user).toEqual(user);
  });
});
