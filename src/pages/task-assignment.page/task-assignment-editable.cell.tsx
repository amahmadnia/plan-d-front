import React from 'react';
import {Form, FormItemProps} from 'antd';
import {TaskAssignmentType} from "src/types";
import {persian} from "src/lib";

export interface Item extends TaskAssignmentType {
}

export interface TaskAssignmentEditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editable: boolean;
    dataIndex: string;
    title: any;
    index: number;
    children?: React.ReactNode;
    formItemProps?: FormItemProps;
    InputNode: React.ReactNode;
}


export const TaskAssignmentEditableCell: React.FC<TaskAssignmentEditableCellProps> = (props) => {
    const {dataIndex, index, editable, title, children, InputNode, formItemProps, ...restProps} = props;

    if (dataIndex === 'no')
        return <td {...restProps}>{persian(index + 1)}</td>;
    else if (editable)
        return <td {...restProps}>
            <Form.Item
                name={dataIndex}
                style={{margin: 0}}
                rules={[
                    {
                        required: true,
                        message: title,
                    },
                ]}
                {...formItemProps}
            >
                {
                    typeof InputNode === 'function' ? InputNode() : InputNode
                }
            </Form.Item>
        </td>
    return (
        <td {...restProps}>
            {children}
        </td>
    );
};