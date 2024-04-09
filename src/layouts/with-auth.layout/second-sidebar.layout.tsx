import {Parent} from './first-sidebar.layout';

export type Item = {
    key: 'user-type' | 'sprint' | 'form' | 'daily-report',
    parent: Parent['key'],
    title: string,
    children?: Array<Item>
}
const items: Item[] = [
    {
        key: 'user-type',
        parent: 'team',
        title: 'مدیریت پروژه',
    },
    {
        key: 'sprint',
        parent: 'project-management',
        title: 'اسپرینت',
    },
    {
        key: 'form',
        parent: 'project-management',
        title: 'فرم',
        children: [
            {
                key: 'daily-report',
                parent: 'project-management',
                title: 'گزارش روزانه',
            }
        ]
    }
];


export default items;