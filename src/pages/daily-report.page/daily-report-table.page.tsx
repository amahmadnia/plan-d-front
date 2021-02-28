import React from 'react';
import {Link, RouteChildrenProps} from 'react-router-dom';
import dayjs from 'dayjs';
import {Button, Modal, Progress, Space, Table, Layout, PageHeader} from 'antd';
import {EditOutlined, PaperClipOutlined, FileTextOutlined, HistoryOutlined} from "@ant-design/icons";
import {DailyReportType, RootStateType} from "src/types";
import {DateViewFormat, persian} from "src/lib";
import {connect, ConnectedProps} from "react-redux";
import {dailyReportCRUDAction, dailyReportProjectListGetAction} from "src/store/action";
import {FilterValue, SorterResult} from "antd/es/table/interface";

const mapStateToProps = (state: RootStateType) => {
    const permissions = state.authReducer.permissions!["daily-report"];
    const list = state.tablesReducer.daily_report.LIST;
    const project = state.tablesReducer.daily_report_project.LIST;
    return ({
        list,
        project,
        permissions,
    });
};

const mapDispatchToProps = {
    daily_report_action: dailyReportCRUDAction,
    project_action: dailyReportProjectListGetAction
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps;
type StateType = { note?: string, table_list: TableInterface[] };

interface TableInterface extends DailyReportType {
    index: number;
}


class DailyReportTablePage extends React.Component<PropsType, StateType> {
    state = {note: undefined, table_list: []};
    date_render = (date: string) => persian(dayjs(date).format(DateViewFormat));

    componentDidMount() {
        this.props.daily_report_action({type: 'list'});
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

    progress_render = (progress: string | number) => <Progress type={'dashboard'} percent={Math.round(+progress)}
                                                               width={50}/>


    changeTable = (_: any,
                   filter: Record<string, FilterValue | null>,
                   sort: SorterResult<TableInterface> | SorterResult<TableInterface>[]
    ) => {
        if (!Array.isArray(sort) && sort.columnKey === 'index')
            return
        let s: undefined | string = undefined

        if (!Array.isArray(sort) && sort.order)
            s = (sort.order === 'ascend' ? '' : '-') + sort.columnKey;
        this.props.daily_report_action({type: 'list', filter: filter, sort: s})
    }

    render() {
        const {list, project, permissions} = this.props;
        return (
            <Layout>
                <Layout.Header>
                    <PageHeader
                        title="ثبت گزارش روزانه"
                        extra={
                            <Link type="primary" to="/project-management/form/daily-report/history"
                                  style={{marginBottom: 16}}
                                  className="ant-btn ant-btn-primary ant-btn-rtl">
                                <HistoryOutlined style={{marginLeft: 5}}/>
                                تاریخچه گزارش ها
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
                                this.props.history.push(`/project-management/form/daily-report/new/${record.id}`)
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
                            title="تاریخ تحویل"
                            dataIndex="deadline"
                            key="deadline"
                            align="center"
                            render={this.date_render}
                            sorter={true}
                        />
                        <Table.Column
                            title="پیشرفت تا کنون"
                            dataIndex="progress"
                            key="progress"
                            align="center"
                            render={this.progress_render}
                            sorter={true}
                        />
                        {
                            permissions.add !== 'all_user' ? null :
                                <Table.Column
                                    title="مسئول"
                                    dataIndex="responsible"
                                    key="responsible"
                                    align="center"
                                    sorter={true}
                                />
                        }

                        <Table.Column

                            title="جزئیات بیشتر"
                            dataIndex="id"
                            key="id"
                            align="center"
                            render={(id, record: DailyReportType) => (
                                <Space>
                                    <Button type="primary"
                                            title='یاداشت'
                                            icon={<FileTextOutlined/>}
                                            onClick={() => {
                                                this.setState({note: record.note || ''})
                                            }}
                                    />
                                    <Button type="primary"
                                            href={"/" + record?.file}
                                            download
                                            title='فایل'
                                            icon={<PaperClipOutlined/>}

                                    />
                                </Space>
                            )}
                        />

                    </Table>
                    <Modal
                        title={"یاداشت"}
                        visible={this.state.note !== undefined}
                        footer={null}
                        onCancel={() => {
                            this.setState({note: undefined})
                        }}
                    >
                        {
                            this.state.note
                        }
                    </Modal>
                </Layout.Content>
            </Layout>);
    }
}


export default connector(DailyReportTablePage);


