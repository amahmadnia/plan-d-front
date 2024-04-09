import React, {Component} from "react";
import {connector, FormType, PropType, StateType} from './connector'
import {TaskAssignmentEditableCell, Item, TaskAssignmentEditableCellProps} from './task-assignment-editable.cell';
import Form, {FormInstance} from 'antd/lib/form';
import Table, {ColumnType, ColumnGroupType} from 'antd/lib/table';
import {DateFormat, DateViewFormat, minutesToDayjs, persian, TimeFormat} from "src/lib";
import {
    Button,
    Input,
    InputNumber,
    Popconfirm,
    Select,
    Space,
    PageHeader,
    Radio,
    Layout,
    RadioChangeEvent,
    message
} from "antd";
import {DatePicker, TimePicker} from 'antd-jalali';
import {
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    PlusOutlined,
    PaperClipOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import dayjs, {Dayjs} from 'dayjs';
import fa_IR from 'antd/lib/locale/fa_IR';
import {SorterResult} from "antd/lib/table/interface";

type TaskAssignmentColumnsType = (Partial<TaskAssignmentEditableCellProps> & (ColumnGroupType<Item> | ColumnType<Item>))


class TaskAssignmentFormTablePage extends Component<PropType, StateType> {
    state: StateType = {
        edit: undefined,
        new: false,
        post: undefined,
        project: undefined,
        date: dayjs().weekday(6),
        sort: undefined,
        maxDeadline: undefined,
        task: undefined,
    };
    form = React.createRef<FormInstance>();
    file = React.createRef<Input>();
    columns: TaskAssignmentColumnsType[] = [
        {
            title: 'نام پروژه',
            dataIndex: 'project_obj',
            key: 'project_obj',
            align: 'center',
            editable: true,
            width: 150,
            render: (project) => project?.name,
            InputNode: () => <Select
                options={this.props.projects.LIST?.data?.map(project => ({label: project.name, value: project.id}))}
                loading={this.props.projects.LIST?.status === 'loading'}
                onChange={this.projectChange}
                placeholder="نام پروژه"
            />,
            sorter: true,
            ellipsis: true
        },
        {
            title: 'عنوان فعالیت',
            dataIndex: 'task_obj',
            key: 'task_obj',
            align: 'center',
            editable: true,
            InputNode: () => <Select
                options={this.props.task.LIST?.data?.map(task => ({label: task.title, value: task.id}))}
                loading={this.props.task.LIST?.status === 'loading'}
                disabled={this.state.project === undefined}
                onChange={this.onChangeTask}
                placeholder={'عنوان فعالیت'}
            />,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 200,
            render: (task) => task?.title,
            sorter: true,
        },
        {
            title: 'مسئول',
            dataIndex: 'responsible_obj',
            key: 'responsible_obj',
            align: 'center',
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 150,
            render: (responsible) => responsible?.name,
            editable: true,
            InputNode: () => <Select
                options={this.props.staff.LIST?.data?.map(staff => ({
                    label: `${staff.first_name} ${staff.last_name}`,
                    value: staff.id
                }))}
                loading={this.props.staff.LIST?.status === 'loading'}
                disabled={this.state.project === undefined}
                placeholder={'مسئول'}
            />,
            sorter: true,
        },
        {
            title: 'وزن مسئول',
            dataIndex: 'weight',
            key: 'weight',
            align: 'center',
            placeholder: 'وزن مسئول',
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 200,
            render: persian,
            editable: true,
            InputNode: <InputNumber placeholder="وزن مسئول" className="persian" step={0.00} min={0} max={1}/>
        },
        {
            title: () => <>شنبه<br/> {persian(this.state.date.weekday(6).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'saturday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[0]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}/>,
        },
        {
            title: () => <>یکشنبه<br/> {persian(this.state.date.weekday(7).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'sunday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[1]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}/>,
        },
        {
            title: () => <>دوشنبه<br/> {persian(this.state.date.weekday(8).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'monday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[2]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}
            />,
        },
        {
            title: () => <>سه شنبه<br/> {persian(this.state.date.weekday(9).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'tuesday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[3]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}
            />,

        },
        {
            title: () => <>چهارشنبه<br/> {persian(this.state.date.weekday(10).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'wednesday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[4]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}
            />,
        },
        {
            title: () => <>پنجشنبه<br/> {persian(this.state.date.weekday(11).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'thursday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[5]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}
            />,
        },
        {
            title: () => <>جمعه<br/> {persian(this.state.date.weekday(12).format(DateViewFormat))}</>,
            dataIndex: 'sprints',
            key: 'friday',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (sprints) => persian(minutesToDayjs(sprints?.[6]?.minutes).format(TimeFormat)),
            InputNode: <TimePicker
                placeholder={"--:--"}
                className={'persian'}
                format="HH:mm"
                suffixIcon={null}
            />,
        },
        {
            title: 'یادداشت',
            dataIndex: 'note',
            key: 'note',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"یادداشت"} className={'persian'}/>,
            formItemProps: {rules: [{required: false, message: ''}]},
            width: 400
        },
        {
            title: 'پایان کار',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (deadline) => persian(dayjs(deadline).format(DateViewFormat)),
            InputNode: () => <DatePicker
                disabled={!this.state.maxDeadline}
                className={"persian"}
                placeholder={"پایان کار"}
                suffixIcon={null}
                disabledDate={(day: Dayjs) => day.isAfter(this.state.date)}
            />,
            sorter: true,
        },
        {
            title: 'فایل',
            dataIndex: 'file',
            key: 'file',
            align: 'center',
            editable: true,
            formItemProps: {rules: [{required: true, message: ''}]},
            width: 120,
            render: (file) => <Button
                href={"/" + file}
                type={"primary"}
                icon={<DownloadOutlined/>} download={true}
                target={'_blank'}/>,
            InputNode: () => <Input
                placeholder={"فایل"}
                className={'persian'}
                contentEditable={"false"}
                prefix={<PaperClipOutlined/>}
                onFocus={this.focusFile}
            />
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            style: {backgroundColor: 'red'},
            width: 100,
            editable: true,
            render: (id) => <Popconfirm
                title={'آیا از حذف این اسپرینت مطمئن هستید؟'}
                onConfirm={() => {
                    this.props.task_assignment_action({
                        id,
                        type: 'delete',
                    });
                    message.loading({content: `عملیات حذف اسپرینت ${id} در حال انجام `, key: 'assignment', duration: 0})
                }}
                icon={<DeleteOutlined/>}
                disabled={this.props.task_assignment.DELETE?.status === 'loading'}
                okText='بله'
                cancelText='خیر'
            >
                <Button danger type="primary"
                        title='حذف اسپرینت'
                        loading={this.props.task_assignment.DELETE?.status === 'loading' && id === this.props.task_assignment.DELETE?.data!}
                        icon={<DeleteOutlined/>}
                />
            </Popconfirm>,
            InputNode: () => <Space>
                <Button
                    icon={<CheckOutlined/>}
                    loading={[this.props.task_assignment.PATCH?.status, this.props.task_assignment.POST?.status, this.props.file.POST?.status].includes('loading')}
                    title={'ثبت'}
                    onClick={() => this.form.current?.submit()}
                />
                <Button
                    icon={<CloseOutlined/>}
                    danger
                    disabled={[this.props.task_assignment.PATCH?.status, this.props.task_assignment.POST?.status, this.props.file.POST?.status].includes('loading')}
                    title={'انصراف'}
                    onClick={this.cancel.bind(this)}
                />
            </Space>,
            formItemProps: {rules: [{required: false, message: '',}]},
        }
    ]

    componentDidMount() {
        this.listRequest();
        this.props.projects_action();
    }

    componentDidUpdate(prevProps: Readonly<PropType>) {
        const {task_assignment: {POST, PATCH, LIST, DELETE}, file, task} = this.props;
        if (prevProps.task_assignment.POST?.status === 'loading' && POST!.status === 'ok') {
            const id = POST!.data!.id!;
            this.props.file_action(id, this.file.current!.input!.files![0]);
        }
        if (prevProps.task_assignment.PATCH?.status === 'loading' && PATCH!.status === 'ok') {
            const data = [...LIST!.data!.results];
            const index = data.findIndex(assigner => assigner.id === PATCH!.data!.id);
            data[index] = PATCH!.data!;
            this.props.set_data('attendance', 'LIST', data)
            this.cancel()
        }
        if (prevProps.task.LIST?.status === 'loading' && task.LIST!.status === 'ok' && this.state.task) {
            const end_date = task.LIST!.data!.find(t => t.id === this.state.task)!.end_date
            this.setState({maxDeadline: dayjs(end_date)});
        }
        if (prevProps.file.POST?.status === 'loading' && file.POST!.status === 'ok') {
            this.cancel()
            message.success({content: "عملیات با موفقیت انجام شد", key: 'assignment'})
            this.listRequest();
        }
        if (prevProps.task_assignment.DELETE?.status === 'loading' && DELETE!.status === 'ok') {
            message.success({content: "عملیات حذف با موفقیت انجام شد", key: 'assignment'});
            this.listRequest();
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
        this.form.current?.setFieldsValue({
            id: undefined,
            project_obj: undefined,
            saturday: dayjs("00:00", "HH:mm"),
            sunday: dayjs("00:00", "HH:mm"),
            monday: dayjs("00:00", "HH:mm"),
            tuesday: dayjs("00:00", "HH:mm"),
            wednesday: dayjs("00:00", "HH:mm"),
            thursday: dayjs("00:00", "HH:mm"),
            friday: dayjs("00:00", "HH:mm")
        });
        this.setState({edit: 0, new: true, project: undefined});
        window.addEventListener('keydown', this.listener)

    }

    finish(values: FormType) {
        const {
            id,
            deadline,
            responsible_obj,
            task_obj,
            weight,
            monday,
            sunday,
            friday,
            saturday,
            thursday,
            tuesday,
            wednesday,
            note
        } = values;
        const {date} = this.state;
        const data: Item = {
            sprints: [
                {
                    date: date.weekday(6).calendar('gregory').format(DateFormat),
                    minutes: saturday.hour() * 60 + saturday.minute(),
                },
                {
                    date: date.weekday(7).calendar('gregory').format(DateFormat),
                    minutes: sunday.hour() * 60 + sunday.minute(),
                },
                {
                    date: date.weekday(8).calendar('gregory').format(DateFormat),
                    minutes: monday.hour() * 60 + monday.minute(),
                },
                {
                    date: date.weekday(9).calendar('gregory').format(DateFormat),
                    minutes: tuesday.hour() * 60 + tuesday.minute(),
                },
                {
                    date: date.weekday(10).calendar('gregory').format(DateFormat),
                    minutes: wednesday.hour() * 60 + wednesday.minute(),
                },
                {
                    date: date.weekday(11).calendar('gregory').format(DateFormat),
                    minutes: thursday.hour() * 60 + thursday.minute(),
                },
                {
                    date: date.weekday(12).calendar('gregory').format(DateFormat),
                    minutes: friday.hour() * 60 + friday.minute(),
                }
            ],
            deadline: deadline.calendar('gregory').format(DateFormat),
            note,
            weight,
            staff: responsible_obj,
            baseline_task: task_obj,
        }
        if (values.id !== undefined)
            this.props.task_assignment_action({id: values.id, type: 'edit', data: data});
        else {
            this.props.task_assignment_action({type: 'new', data});
            message.loading({content: "عملیات در حال انجام", key: "assignment", duration: 0})
        }
    }

    onCell(col: TaskAssignmentColumnsType, record: Item, index: number): TaskAssignmentEditableCellProps {
        return {
            KEY: col.key!,
            dataIndex: col.dataIndex as string,
            title: col.title,
            editable: (index === this.state.edit && col.editable!),
            index,
            InputNode: col.InputNode,
            formItemProps: col.formItemProps,
        }
    }

    onRowClick = (event: any, record: Item, index?: number) => {
        if ((!['TD', 'TR'].includes(event.target.tagName) || this.state.edit !== undefined))
            return void 0;
        const project_id = record.project_obj!.id;
        this.setState({edit: index});
        const file = record.file!.split(/\//g)
        const new_record: FormType = {
            ...record,
            project_obj: project_id,
            task_obj: record.task_obj!.id,
            responsible_obj: record.responsible_obj!.id,
            deadline: dayjs(record.deadline),
            saturday: minutesToDayjs(record.sprints[0]?.minutes),
            sunday: minutesToDayjs(record.sprints[1]?.minutes),
            monday: minutesToDayjs(record.sprints[2]?.minutes),
            tuesday: minutesToDayjs(record.sprints[3]?.minutes),
            wednesday: minutesToDayjs(record.sprints[4]?.minutes),
            thursday: minutesToDayjs(record.sprints[5]?.minutes),
            friday: minutesToDayjs(record.sprints[6]?.minutes),
            file: file[file.length - 1]
        };
        this.form.current?.setFieldsValue(new_record)
        this.setState({project: project_id, task: new_record.task_obj});
        this.props.staff_action(project_id);
        this.props.task_action(project_id);
        window.addEventListener('keydown', this.listener);
    }

    projectChange = (value: string | undefined) => {
        this.props.task_action(value!);
        this.props.staff_action(value!);
        this.setState({project: value});
        this.form.current?.setFieldsValue({task_obj: undefined, responsible_obj: undefined});
    }

    changeWeek = (e: RadioChangeEvent) => {
        const date = dayjs().weekday(6 + 7 * e.target.value);
        this.setState({date}, this.listRequest);
    }

    changeSort = (_: any, __: any, sort: SorterResult<Item> | SorterResult<Item>[], ___: any) => {
        if (Array.isArray(sort))
            return
        if (!sort.order)
            this.setState({sort: undefined}, this.listRequest);
        else {

            const order = sort.order === "ascend" ? '' : '-';
            this.setState(
                {sort: order + (sort.columnKey as string).replace(/_obj/g, "")},
                this.listRequest
            );
        }


    }

    listRequest = () => {
        const task_assignment_action = this.props.task_assignment_action;
        const {sort, date} = this.state;
        task_assignment_action(
            {
                type: 'list',
                filter: {
                    sprints_date_gt: date.calendar("gregory").format(DateFormat),
                    sprints_date_lt: date.weekday(12).calendar("gregory").format(DateFormat)
                },
                sort
            });

    }
    focusFile = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.blur();
        this.file.current?.input.click();
    }
    changeFile = () => {
        let name: string | undefined = this.file.current?.input.files?.[0]?.name;
        if (!(name || this.state.new)) {
            const file = this.props.task_assignment.LIST!.data!.results[this.state.edit!].file!.split('/');
            name = file[file.length - 1];
        }
        this.form.current?.setFieldsValue({file: name});

    }
    onChangeTask = (value: string) => {
        const end_date = dayjs(this.props.task!.LIST!.data!.find(t => t.id === value)!.end_date);
        this.setState({maxDeadline: end_date});
        this.form.current?.setFieldsValue({deadline: end_date})
    }

    render() {
        const {task_assignment: {LIST, POST, PATCH, DELETE}} = this.props;
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: (record: Item, index: number) => this.onCell(col, record, index),

            }
        })
        return <Layout className="task-assignment-page">
            <Layout.Header>
                <PageHeader
                    title={'اسپرینت'}
                    extra={[
                        <Radio.Group
                            optionType="button"
                            buttonStyle={"solid"}
                            defaultValue={0}
                            onChange={this.changeWeek}
                            disabled={[PATCH?.status, POST?.status, DELETE?.status, this.props.file.POST?.status].includes('loading')}
                            options={
                                [
                                    {label: 'هفته قبل', value: -1},
                                    {label: 'هفته جاری', value: 0},
                                    {label: 'هفته بعد', value: 1}
                                ]
                            }

                        />
                    ]}
                    style={{height: '100%'}}
                />
            </Layout.Header>
            <Layout.Content>
                <Input
                    type={"file"}
                    ref={this.file}
                    onChange={this.changeFile}
                    hidden
                />
                <Form component={false} ref={this.form} onFinish={this.finish.bind(this)}>


                    <Table<Item>
                        rowKey="id"
                        scroll={{x: 2500}}
                        size={"middle"}
                        components={{
                            body: {
                                cell: TaskAssignmentEditableCell,
                            }
                        }}
                        locale={fa_IR.Table}
                        onRow={(record, index) => ({
                            onClick: (event: any) => this.onRowClick(event, record, index),
                            className: 'pointer'
                        })}
                        dataSource={this.state.new ? [{} as Item, ...(LIST?.data?.results || [])] : LIST?.data?.results}
                        pagination={{
                            size: 'small',
                            hideOnSinglePage: true,
                            total: LIST?.data?.count || 0,
                            current: 1,
                            style: {direction: 'ltr'},
                            locale: fa_IR.Pagination

                        }}
                        loading={LIST?.status !== 'ok' || [PATCH?.status, POST?.status, DELETE?.status, this.props.file.POST?.status].includes('loading')}
                        columns={columns as any}
                        onChange={this.changeSort}
                    />
                    <Button icon={<PlusOutlined/>} type={'primary'}
                            disabled={this.state.edit !== undefined}
                            shape={'circle'}
                            size={"large"}
                            style={{position: 'fixed', left: 50, bottom: 50}}
                            onClick={() => this.add()}
                    />
                </Form>
            </Layout.Content>
        </Layout>
    }


}


export default connector(TaskAssignmentFormTablePage)