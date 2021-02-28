import React from "react";
import {Button, Col, Drawer, Popconfirm, Row, Spin, Space, Progress, Typography, Table, Descriptions} from 'antd';
import {connect, ConnectedProps} from "react-redux";
import {date_render, persian, TimeFormat,} from "src/lib";
import {DescriptionItem} from 'src/components';
import {RootStateType} from "src/types";
import {RouteChildrenProps} from 'react-router-dom';
import {dailyReportHistoryCRUDAction} from "src/store/action";
import {FileExcelOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import dayjs from "dayjs";

const mapStateToProps = (state: RootStateType) => {
    const one = state.tablesReducer.daily_report_history.GET;
    return ({
        one,
    })
};
const mapDispatchToProps = {daily_report_history_action: dailyReportHistoryCRUDAction};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps<{ id: string }>;

const progress_render = (progress: string | number) => <Progress type={'dashboard'} percent={Math.round(+progress)}
                                                                 width={50}/>
const DailyReportViewPage: React.FC<PropsType> = ({one, history, match, daily_report_history_action}) => {
        const [show, setShow] = React.useState<boolean | null>(null);

        const onClose = () => {
            setShow(false);
            setTimeout(() => {
                history.goBack();
            }, 300)
        };
        React.useEffect(() => {
            if (show === null) {
                setShow(true);
                daily_report_history_action({type: 'one', id: match?.params.id})
            }

        })

        return (
            <Drawer
                placement="left"
                onClose={onClose}
                visible={show!}
                width={"40%"}
                title={
                    <div style={{justifyContent: "space-between", display: 'flex', alignItems: 'center'}}>
                        گزارش روزانه فعالیت {one?.status === 'ok' ? '' : one?.data?.task}
                    </div>
                }
            >
                {one?.status !== 'ok' ?
                    <Row gutter={16}>
                        <Col span={24} style={{
                            textAlign: 'center',
                            display: 'flex',
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                            <Spin style={{margin: "auto"}}/>
                        </Col>
                    </Row> :
                    <Row gutter={[0, 35]}>
                        <Col span={12}>
                            <DescriptionItem title="پروژه" content={one!.data!.project}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="فعالیت" content={one!.data!.task}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="پیشرفت تا کنون"
                                             content={progress_render(one!.data!.progress!)}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="تاریخ تحویل" content={date_render(one!.data!.deadline!)}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="پیشرفت گزارش"
                                             content={progress_render(one!.data!.today_progress)}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="تاریخ" content={date_render(one!.data!.date!)}/>
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={5}>ساعت کارکرد</Typography.Title>
                            <Table dataSource={one!.data!.sheets} pagination={false}>
                                <Table.Column
                                    title={"شروع"}
                                    align={"center"}
                                    dataIndex={"start_time"}
                                    key={"start_time"}
                                    render={(time) => persian(dayjs(time, TimeFormat).format(TimeFormat))}
                                />
                                <Table.Column
                                    title={"پایان"}
                                    align={"center"}
                                    dataIndex={"end_time"}
                                    key={"end_time"}
                                    render={(time) => persian(dayjs(time, TimeFormat).format(TimeFormat))}
                                />
                            </Table>
                        </Col>
                        <Col span={24}>
                            <Descriptions title={"توضیحات"}>
                                <Descriptions.Item>
                                    {
                                        one!.data!.description
                                    }

                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={5}>پیوست</Typography.Title>
                            <Table dataSource={one!.data!.files} pagination={false}>
                                <Table.Column
                                    title={"عنوان"}
                                    align={"center"}
                                    dataIndex={"attachment_title"}
                                    key={"attachment_title"}
                                    render={(time) => persian(dayjs(time, TimeFormat).format(TimeFormat))}
                                />
                                <Table.Column
                                    title={"فایل"}
                                    align={"center"}
                                    dataIndex={"attachment"}
                                    key={"attachment"}
                                    render={(time) => persian(dayjs(time, TimeFormat).format(TimeFormat))}
                                />
                            </Table>
                        </Col>
                    </Row>
                }
            </Drawer>
        )
    }
;


export default connector(DailyReportViewPage);