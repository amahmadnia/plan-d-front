import React from 'react';
import {
    PercentageOutlined,
    CalendarFilled,
    MinusCircleOutlined,
    PlusOutlined,
    ClockCircleFilled,
    PaperClipOutlined
} from '@ant-design/icons';
import {
    Button,
    Drawer,
    Form,
    Row,
    Col,
    Space,
    Spin,
    Divider,
    Progress, Input, Typography,

} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {DailyReportHistoryType, RootStateType} from "src/types";
import {connect, ConnectedProps} from "react-redux";
import {dailyReportHistoryCRUDAction, dailyReportCRUDAction, dailyReportHistoryFileAction} from "src/store/action";
import {RouteChildrenProps} from "react-router-dom";
import {DatePicker, TimePicker} from 'antd-jalali';
import dayjs, {Dayjs} from "dayjs";
import {DescriptionItem, InputFile} from "src/components";
import {date_render, TimeFormat, DateFormat} from "src/lib";


const mapStateToProps = (state: RootStateType) => {
    const post = state.tablesReducer.daily_report_history.POST;
    const one = state.tablesReducer.daily_report.GET;
    const file = state.tablesReducer.daily_report_history_file.POST;
    return {one, post, file}
};

const mapDispatchToProps = {
    daily_report_history_action: dailyReportHistoryCRUDAction,
    file_action: dailyReportHistoryFileAction,
    daily_report_action: dailyReportCRUDAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps<{ id: string }>;


interface FormType extends Omit<DailyReportHistoryType, 'date' | 'sheets'> {
    date: Dayjs;
    sheets: Array<{ end_time: Dayjs, start_time: Dayjs }>;
}

class ProjectNewPage extends React.PureComponent<PropsType, { show: boolean }> {
    today = dayjs();
    form = React.createRef<FormInstance>();
    state = {show: false};
    onClose = (replace?: string) => {
        if (this.props.post?.status === 'loading')
            return
        this.setState({show: false})
        setTimeout(() => {
            if (replace)
                this.props.history.replace(replace);
            else
                this.props.history.goBack();
        }, 300)
    }

    onFinish = (values: FormType) => {
        this.props.daily_report_history_action({
            data: {
                description: values.description,
                date: values.date.calendar('gregory').format(DateFormat),
                today_progress: values.today_progress,
                sheets: values.sheets.map(sheet => ({
                    start_time: sheet.start_time.format(TimeFormat),
                    end_time: sheet.end_time.format(TimeFormat)
                }))
            }, type: 'new',
            id: this.props.match?.params.id
        });
    }

    Footer = () => (
        <Space>
            <Button onClick={() => this.onClose()}
                    disabled={this.props.post?.status === 'loading'}
            >
                لغو
            </Button>
            <Button loading={this.props.post?.status === 'loading'}
                    type="primary"
                    onClick={() => this.form.current?.submit()}
            >
                ثبت
            </Button>
        </Space>
    )

    componentDidMount() {
        this.setState({show: true});
        this.props.daily_report_action({type: "one", id: this.props.match?.params.id})
    }

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if (prevProps.post?.status === 'loading' && this.props.post!.status === 'ok') {
            const files: Array<{ attachment_title: string, document: File }> = this.form.current?.getFieldValue('files');
            // @ts-ignore
            const file = document.getElementById('files_0_document')?.files[0]
            this.props.file_action(this.props.post!.data!.id!, file, files[0].attachment_title);

        }
        if (prevProps.file?.status === 'loading' && this.props.file!.status === 'ok') {
            this.onClose(`/project-management/form/daily-report/history/${this.props.post!.data!.id!}`);
        }
    }


    render() {
        const {one} = this.props;
        return (<Drawer
            title="ثبت گزارش روزانه"
            width={"40%"}
            onClose={() => this.onClose()}
            visible={this.state.show}
            footer={<this.Footer/>}
            placement={'left'}
        >
            <Form layout="vertical"
                  hideRequiredMark ref={this.form}
                  onFinish={this.onFinish}
            >
                {one?.status !== 'ok' ? <Row gutter={16}>
                    <Col span={24} style={{
                        textAlign: 'center',
                        display: 'flex',
                        position: "absolute",
                        left: 0,
                        right: 0,
                    }}>
                        <Spin style={{margin: "auto"}}/>
                    </Col>
                </Row> : <Row>
                    <Col span={12}>
                        <DescriptionItem title={"پروژه"} content={one!.data!.project}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title={"فعالیت"} content={one!.data!.task}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title={"پیشرفت تاکنون"}
                                         content={<Progress
                                             type={'dashboard'}
                                             percent={Math.round(one!.data!.progress)}
                                             width={50}/>}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title={"تاریخ تحویل"} content={date_render(one!.data!.deadline)}/>
                    </Col>
                </Row>
                }
                <Divider/>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="today_progress"
                            rules={[{
                                required: true,
                                message: 'لطفا میزان پیشرفت را وارد کنید',
                            }]}
                        >
                            <Input type={'number'} max={100} min={0} placeholder={"پیشرفت گزارش"}
                                   suffix={<PercentageOutlined/>} size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            rules={[{
                                required: true,
                                message: 'لطفا تاریخ را انتخاب کنید',
                            }]}
                        >
                            <DatePicker size={'large'} suffixIcon={<CalendarFilled/>} style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={5}>ساعت کارکرد</Typography.Title>
                        <Form.List
                            name="sheets"
                            initialValue={[{start_time: undefined, end_time: undefined}]}
                        >
                            {(fields, {add, remove}) =>
                                <React.Fragment>
                                    {
                                        fields.map((field, index) =>
                                            <Row key={field.key} gutter={10}>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'start_time']}
                                                        fieldKey={[field.fieldKey, 'start_time']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'لطفا زمان شروع  را انتخاب کنید'
                                                        }]}
                                                        label={index === 0 ? 'شروع' : undefined}
                                                        labelCol={{span: 24, style: {textAlign: "center"}}}
                                                    >
                                                        <TimePicker
                                                            style={{width: '100%'}}
                                                            suffixIcon={<ClockCircleFilled/>}
                                                            format={TimeFormat}
                                                            placeholder={"- - : - -"}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'end_time']}
                                                        fieldKey={[field.fieldKey, 'end_time']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'لطفا زمان پایان را انتخاب کنید'
                                                        }]}
                                                        label={index === 0 ? "پایان" : undefined}
                                                        labelCol={{span: 24, style: {textAlign: "center"}}}
                                                    >
                                                        <TimePicker
                                                            style={{width: '100%'}}
                                                            suffixIcon={<ClockCircleFilled/>}
                                                            format={TimeFormat}
                                                            placeholder={"- - : - -"}

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <Button
                                                        hidden={index === 0}
                                                        type={'link'}
                                                        danger
                                                        icon={<MinusCircleOutlined/>}
                                                        onClick={() => remove(field.name)}/>
                                                </Col>
                                            </Row>
                                        )}
                                    <Button type="dashed" onClick={() => add()} block
                                            icon={<PlusOutlined/>}>
                                        اضافه کردن بازه زمانی
                                    </Button>
                                </React.Fragment>
                            }
                        </Form.List>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            rules={[{
                                required: false,
                                message: 'لطفا توضیحات را وارد کنید',
                            }]}
                        >
                            <Input.TextArea placeholder={"توضیحات ..."}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={5}>پیوست</Typography.Title>
                        <Form.List
                            name="files"
                            initialValue={[{attachment_title: undefined, document: undefined}]}
                        >
                            {(fields, {add, remove}) =>
                                <React.Fragment>
                                    {
                                        fields.map((field, index) =>
                                            <Row key={field.key} gutter={10}>
                                                <Col span={13}>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'attachment_title']}
                                                        fieldKey={[field.fieldKey, 'attachment_title']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'لطفا عنوان را وارد کنید'
                                                        }]}
                                                        label={index === 0 ? 'عنوان' : undefined}
                                                        labelCol={{span: 24, style: {textAlign: "center"}}}
                                                    >
                                                        <Input
                                                            placeholder={"عنوان"}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={9}>
                                                    <InputFile
                                                        inputProps={{accept: '*.csv'}}
                                                        buttonProps={{style: {margin: "7px 0"}, icon: null}}
                                                        formItemProps={{
                                                            name: [field.name, "document"],
                                                            fieldKey: [field.fieldKey, 'document'],
                                                            rules: [{
                                                                required: true,
                                                                message: 'لطفا فایل را انتخاب کنید'
                                                            }],
                                                            label: index === 0 ? 'عنوان' : undefined,
                                                            labelCol: {span: 24, style: {textAlign: 'center'}}

                                                        }}
                                                        placeholder={<>فایل<PaperClipOutlined/></>}
                                                    />
                                                </Col>
                                                <Col span={2}>
                                                    <Button
                                                        hidden={index === 0}
                                                        type={'link'}
                                                        danger
                                                        icon={<MinusCircleOutlined/>}
                                                        onClick={() => remove(field.name)}/>
                                                </Col>
                                            </Row>
                                        )}
                                    {/*<Button type="dashed" onClick={() => add()} block*/}
                                    {/*        icon={<PlusOutlined/>}>*/}
                                    {/*    اضافه کردن بازه زمانی*/}
                                    {/*</Button>*/}
                                </React.Fragment>
                            }
                        </Form.List>
                    </Col>
                </Row>
            </Form>
        </Drawer>)
    }

}


export default connector(ProjectNewPage);