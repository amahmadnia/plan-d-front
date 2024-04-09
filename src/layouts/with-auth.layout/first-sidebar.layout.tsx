import React from 'react';
import {ClusterOutlined, TeamOutlined} from '@ant-design/icons';


export type Parent = {
    icon: React.ReactNode,
    key: 'project-management' | 'team',
    title: string;
}

const parents: Parent[] = [
    {
        icon: <ClusterOutlined className="b_icon"/>,
        key: 'project-management',
        title: 'مدیریت پروژه',
    },
    {
        icon: <TeamOutlined className="b_icon"/>,
        key: 'team',
        title: 'تیم',
    }
];

export default parents;