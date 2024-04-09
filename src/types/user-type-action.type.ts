export type UserTypeActionType = {
    id: string;
    feature: string;
    type: 'view' | 'edit' | 'delete' | 'add' | 'share';
    permission: 'self' | 'all_users' | 'main_users';
}