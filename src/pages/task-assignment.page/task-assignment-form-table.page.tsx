import React, {Component} from "react";
import {connector, PropType} from './connector'
import {TaskAssignmentEditableCell, Item, TaskAssignmentEditableCellProps} from './project-team-editable.cell';
import Form, {FormInstance} from 'antd/lib/form';
import Table, {ColumnType, ColumnGroupType} from 'antd/lib/table';
import {persian} from "src/lib";
import {ProjectTeamType, TaskAssignmentType} from "src/types";
import {Button, Input, Popconfirm, Select, Space} from "antd";
import {DatePicker, TimePicker} from 'antd-jalali';
import {DeleteOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs, {Dayjs} from 'dayjs';

type ProjectTeamColumnsType = (Partial<TaskAssignmentEditableCellProps> & (ColumnGroupType<Item> | ColumnType<Item>))


class ProjectTeamFormTablePage extends Component<PropType, { edit?: number, new: boolean, post?: ProjectTeamType['post'] }> {
    state = {edit: undefined, new: false, post: undefined};
    form = React.createRef<FormInstance>();
    columns: ProjectTeamColumnsType[] = [
        {
            title: 'نام پروژه',
            dataIndex: 'project_obj',
            key: 'project_obj',
            align: 'center',
            editable: true,
        },
        {
            title: 'عنوان فعالیت',
            dataIndex: 'task_obj',
            key: 'task',
            align: 'center',
            editable: true,
            InputNode: <Select options={
                [
                    {label: 'پرسنل', value: 'personnel'},
                    {label: 'پیمانکار', value: 'contractor'},
                    {label: 'کارگر روزمزد', value: 'daily worker'}
                ]
            }
                               onSelect={(value) => {
                                   this.setState({post: (value as ProjectTeamType['post'])})
                               }}
                               placeholder={'سمت'}
            />,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'مسئول',
            dataIndex: 'responsible_obj',
            key: 'responsible',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'وزن مسئول',
            dataIndex: 'weight',
            key: 'weight',
            align: 'center',
            editable: true,
            placeholder: 'وزن مسئول',
            InputNode: <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'} className="persian"/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'شنبه',
            dataIndex: 'sprints',
            key: 'saturday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[0], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'یکشنبه',
            dataIndex: 'sprints',
            key: 'Sunday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[1], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'دوشنبه',
            dataIndex: 'sprints',
            key: 'monday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[2], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'سه شنبه',
            dataIndex: 'sprints',
            key: 'tuesday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[3], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'چهار شنبه',
            dataIndex: 'sprints',
            key: 'wednesday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[4], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'پنج شنبه',
            dataIndex: 'sprints',
            key: 'thursday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[5], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'جمعه',
            dataIndex: 'sprints',
            key: 'friday',
            align: 'center',
            editable: true,
            render: (sprints) => persian(dayjs(sprints[6], 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"--:--"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'یادداشت',
            dataIndex: 'note',
            key: 'note',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"یادداشت"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'پایان کار',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"پایان کار"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'فایل',
            dataIndex: 'file',
            key: 'file',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"پایان کار"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            editable: true,
            render: (id) => <Popconfirm
                title={'آیا از حذف این اسپریت مطمئن هستید؟'}
                onConfirm={() => this.props.task_assignment_action({
                    id,
                    type: 'delete',
                })}
                icon={<DeleteOutlined/>}
                disabled={this.props.task_assignment.DELETE?.status === 'loading'}
                okText='بله'
                cancelText='خیر'
            >
                <Button danger type="primary"
                        title='حذف پروژه'
                        loading={this.props.task_assignment.DELETE?.status === 'loading' && id === +this.props.task_assignment.DELETE?.data!}
                        icon={<DeleteOutlined/>}
                />
            </Popconfirm>,
            InputNode: () => <Space>
                <Button
                    icon={<CheckOutlined/>}
                    loading={[this.props.task_assignment.PATCH?.status, this.props.task_assignment.POST?.status].includes('loading')}
                    title={'ثبت'}
                    onClick={() => this.form.current?.submit()}
                />
                <Button
                    icon={<CloseOutlined/>}
                    danger
                    disabled={[this.props.task_assignment.PATCH?.status, this.props.task_assignment.POST?.status].includes('loading')}
                    title={'انصراف'}
                    onClick={this.cancel.bind(this)}
                />
            </Space>,
            formItemProps: {rules: [{required: true, message: '',}]},
        }
    ]

    componentDidMount() {
        this.props.task_assignment_action({type: 'list'});
    }

    componentDidUpdate(prevProps: Readonly<PropType>) {
        const {task_assignment: {POST, PATCH, LIST}} = this.props;
        if (prevProps.task_assignment.POST?.status === 'loading' && POST!.status === 'ok') {
            const {count, results} = LIST!.data!;
            this.props.set_data('attendance', 'LIST', {count, results: [POST!.data!, ...results]})
            this.cancel()
        }
        if (prevProps.task_assignment.PATCH?.status === 'loading' && PATCH!.status === 'ok') {
            const data = [...LIST!.data!.results];
            const index = data.findIndex(assigner => assigner.id === PATCH!.data!.id);
            data[index] = PATCH!.data!;
            this.props.set_data('attendance', 'LIST', data)
            this.cancel()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }

    listener = (event: KeyboardEvent) => {
        if (event.code === 'Escape')
            this.cancel()
        else if (event.code === 'Enter')
            this.form.current?.submit();
    }

    cancel() {
        window.removeEventListener('keydown', this.listener);
        this.form.current?.resetFields();
        this.setState({edit: undefined, new: false});
    }

    add() {
        this.setState({new: true, edit: 0});
        this.form.current?.setFieldsValue({id: undefined});
        window.addEventListener('keydown', this.listener)

    }

    finish(values: Item) {
        if (values.id !== undefined)
            this.props.task_assignment_action({id: values.id, type: 'edit', data: values});
        else
            this.props.task_assignment_action({type: 'new', data: values});
    }

    onCell(col: ProjectTeamColumnsType, record: Item, index: number): TaskAssignmentEditableCellProps {

        return {
            dataIndex: col.dataIndex as string,
            title: col.title,
            editable: (index === this.state.edit && col.editable!),
            index,
            InputNode: col.InputNode,
            formItemProps: col.formItemProps,
        }
    }


    render() {
        const {task_assignment: {LIST}} = this.props;
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: (record: Item, index: number) => this.onCell(col, record, index),

            }
        })
        return <Form component={false} ref={this.form} onFinish={this.finish.bind(this)}>
            <Table<Item>
                rowKey="id"
                components={{
                    body: {
                        cell: TaskAssignmentEditableCell,
                    }
                }}
                onRow={(record, index) => ({
                    onClick: (event: any) => {
                        if ((!['TD', 'TR'].includes(event.target.tagName) || this.state.edit !== undefined))
                            return void 0;
                        this.setState({edit: index})
                        this.form.current?.setFieldsValue(record)
                        window.addEventListener('keydown', this.listener)
                    },
                    className: 'pointer'
                })}
                dataSource={this.state.new ? [{} as Item, ...(LIST?.data?.results || [])] : LIST?.data?.results}
                pagination={false}
                loading={LIST?.status !== 'ok'}
                columns={columns as any}
            />
            <Button icon={<PlusOutlined/>} type={'primary'}
                    disabled={this.state.edit !== undefined}
                    shape={'circle'}
                    size={"large"}
                    style={{position: 'fixed', left: 50, bottom: 50}}
                    onClick={() => this.add()}
            />
        </Form>
    }


}


export default connector(ProjectTeamFormTablePage);