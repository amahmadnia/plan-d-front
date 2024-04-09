import React from 'react';
import {Link, RouteChildrenProps} from 'react-router-dom';
import dayjs from 'dayjs';
import {Button, Progress, Space, Table, Layout, PageHeader, Popconfirm} from 'antd';
import {EditFilled, CloseOutlined, PlusCircleFilled} from "@ant-design/icons";
import {DailyReportHistoryType, RootStateType} from "src/types";
import {DateViewFormat, persian} from "src/lib";
import {connect, ConnectedProps} from "react-redux";
import {dailyReportHistoryCRUDAction, dailyReportProjectListGetAction} from "src/store/action";
import {FilterValue, SorterResult} from "antd/es/table/interface";

const mapStateToProps = (state: RootStateType) => {
    const permissions = state.authReducer.permissions!["daily-report"];
    const list = state.tablesReducer.daily_report_history.LIST;
    const del = state.tablesReducer.daily_report_history.DELETE;
    const project = state.tablesReducer.daily_report_project.LIST;
    return ({
        list,
        del,
        project,
        permissions,
    });
};

const mapDispatchToProps = {
    daily_report_history_action: dailyReportHistoryCRUDAction,
    project_action: dailyReportProjectListGetAction
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps;
type StateType = { note?: string, table_list: TableInterface[] };

interface TableInterface extends DailyReportHistoryType {
    index: number;
}


class DailyReportTablePage extends React.Component<PropsType, StateType> {
    state = {note: undefined, table_list: []};
    date_render = (date: string) => persian(dayjs(date).format(DateViewFormat));
    progress_render = (progress: string | number) => <Progress type={'dashboard'} percent={Math.round(+progress)}
                                                               width={50}/>

    componentDidMount() {
        this.props.daily_report_history_action({type: 'list'});
        this.props.project_action();
    }

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if (prevProps.list?.status === 'loading' && this.props.list!.status === 'ok') {
            const table_list: TableInterface[] = [];
            this.props.list!.data!.results.forEach((report, index) => {
                table_list.push({...report, index: index + 1});
            })
            this.setState({table_list});
        }
    }

    changeTable = (_: any,
                   filter: Record<string, FilterValue | null>,
                   sort: SorterResult<TableInterface> | SorterResult<TableInterface>[]
    ) => {
        if (!Array.isArray(sort) && sort.columnKey === 'index')
            return
        let s: undefined | string = undefined

        if (!Array.isArray(sort) && sort.order)
            s = (sort.order === 'ascend' ? '' : '-') + sort.columnKey;
        this.props.daily_report_history_action({type: 'list', filter: filter, sort: s})
    }

    render() {
        const {list, project, permissions, daily_report_history_action, del} = this.props;
        return (
            <Layout>
                <Layout.Header>
                    <PageHeader
                        title="ثبت گزارش روزانه"
                        extra={
                            <Link type="primary" to="/project-management/form/daily-report"
                                  style={{marginBottom: 16}}
                                  className="ant-btn ant-btn-primary ant-btn-rtl">
                                <PlusCircleFilled style={{marginLeft: 5}}/>
                                ثبت گزارش
                            </Link>
                        }
                    />

                </Layout.Header>
                <Layout.Content>
                    <Table<TableInterface>
                        dataSource={this.state.table_list}
                        onRow={(record) => ({
                            onClick: (event) => {
                                // @ts-ignore
                                if ((!['TD', 'TR'].includes(event.target.tagName)))
                                    return void 0;
                                this.props.history.push(`/project-management/form/daily-report/history/${record.id}`)
                            },
                            className: 'pointer'
                        })}
                        pagination={false}
                        loading={list?.status === 'loading'}
                        onChange={this.changeTable}
                    >

                        <Table.Column<TableInterface>
                            title="شماره"
                            dataIndex="index"
                            key="index"
                            align="center"
                            sorter={(a, b) => b.index - a.index}
                            render={persian}
                        />
                        <Table.Column
                            title="پروژه"
                            dataIndex="project"
                            key="project"
                            align="center"
                            sorter={true}
                            filters={project?.data?.map(p => ({text: p.name, value: p.id}))}
                        />
                        <Table.Column
                            title="فعالیت"
                            dataIndex="task"
                            key="task"
                            align="center"
                            sorter={true}
                        />


                        <Table.Column
                            title="پیشرفت روزانه"
                            dataIndex="today_progress"
                            key="today_progress"
                            align="center"
                            render={this.progress_render}
                            sorter={true}
                        />

                        {
                            permissions.view !== 'all_user' ? null :
                                <Table.Column
                                    title="مسئول"
                                    dataIndex="responsible"
                                    key="responsible"
                                    align="center"
                                    sorter={true}
                                />
                        }
                        <Table.Column
                            title="تاریخ"
                            dataIndex="date"
                            key="date"
                            align="center"
                            render={this.date_render}
                            sorter={true}
                        />

                        <Table.Column

                            title="جزئیات بیشتر"
                            dataIndex="id"
                            key="id"
                            align="center"
                            render={(id) => (
                                <Space>
                                    <Button
                                        type="primary"
                                        title='ویرایش'
                                        icon={<EditFilled/>}
                                        onClick={() => {
                                            this.props.history.push(`/project-management/form/daily-report/history/${id}/edit`)
                                        }}
                                    />
                                    <Popconfirm title={'آیا از حذف این خط مبنا مطمئن هستید؟'}
                                                onConfirm={() => daily_report_history_action({
                                                    id,
                                                    type: 'delete',
                                                })}
                                                icon={<CloseOutlined/>}
                                                disabled={del?.status === 'loading' && id === del?.data!}
                                                okText='بله'
                                                cancelText='خیر'
                                    >
                                        <Button danger type="primary"
                                                title='حذف خط مبنا'
                                                loading={del?.status === 'loading' && id === del?.data!}
                                                icon={<CloseOutlined/>}
                                        />
                                    </Popconfirm>
                                </Space>
                            )}
                        />

                    </Table>
                </Layout.Content>
            </Layout>);
    }
}


export default connector(DailyReportTablePage);


