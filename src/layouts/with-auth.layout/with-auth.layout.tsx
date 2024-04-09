import React from "react";
import {useHistory, Link} from 'react-router-dom';
import {History} from 'history';
import {Col, Form, Image, Layout, Menu, Row, Select, Breadcrumb, Spin} from 'antd';

import * as AntIcon from '@ant-design/icons';
import {convertPathToArray} from "src/lib";
import {RootStateType} from "src/types";
import {connect, ConnectedProps} from "react-redux";
import headerLogo from 'src/assets/images/logo/logo_7.png';
import sidebarLogo from 'src/assets/images/logo/why-logo.png';
import {logoutAction, selectCompanyAction, companySelectAction} from "src/store/action";
import first_sidebar_item, {Parent} from './first-sidebar.layout';
import second_sidebar_item, {Item} from './second-sidebar.layout';

const mapStateToProps = (state: RootStateType) => ({
    user: state.authReducer.user!,
    companies: state.tablesReducer.select_companies,
    selected_company: state.authReducer.company,
    permissions: state.authReducer.permissions,
});

const connector = connect(mapStateToProps, {
    logout: logoutAction,
    select_companies: selectCompanyAction,
    select_company: companySelectAction
});

type PropType =
    {
        history: History
    }
    & ConnectedProps<typeof connector>;


type StateType = {
    collapse1: boolean,
    collapse2: boolean,
    path: string[],
    sidebar1?: Parent[],
    sidebar2?: Item[]
};


const sidebarWidth = 210;
const sidebarCollapseWidth = 80;

class WithAuth extends React.Component<PropType, StateType> {
    state: StateType = {collapse1: false, collapse2: false, path: [], sidebar1: undefined, sidebar2: undefined}
    unregister_history_listen?: CallableFunction;
    sidebar1?: Parent[];
    item_in_sidebar1: string[] = [];
    sidebar2?: Item[];

    componentDidMount() {
        const {companies, select_companies, history, permissions} = this.props;
        const path = convertPathToArray(history.location.pathname);

        if (companies.LIST?.status === undefined)
            select_companies();

        this.unregister_history_listen = history.listen((location) => {
            this.setState({path: convertPathToArray(location.pathname)});
        });

        if (permissions) {
            this.add_to_first_sidebar(second_sidebar_item)
            this.setState({sidebar1: this.sidebar1});
            this.change_first_sidebar({key: path[0]});

        } else if (history.location.pathname !== "")
            history.replace("/");
        this.setState({path});
    }

    componentDidUpdate(prevProps: Readonly<PropType>, prevState: Readonly<StateType>, snapshot?: any) {
        const {select_company, selected_company, companies} = this.props;
        if (selected_company === undefined && companies.LIST?.status === 'ok' && companies.LIST.data!.length === 1)
            select_company(companies.LIST.data![0].id)
    }

    componentWillUnmount() {
        if (this.unregister_history_listen)
            this.unregister_history_listen()
    }

    add_to_first_sidebar(items: Item[], first: boolean = false) {
        const {permissions} = this.props;
        items.find(item => {
            if (item.key in permissions!) {
                if (!this.item_in_sidebar1.includes(item.parent)) {
                    const parent = first_sidebar_item.find(parent => parent.key === item.parent)
                    if (this.sidebar1 && parent)
                        this.sidebar1.push(parent)
                    else if (parent)
                        this.sidebar1 = [parent];
                    this.item_in_sidebar1.push(parent!.key);
                }
            } else if (item.children && !this.item_in_sidebar1.includes(item.parent))
                this.add_to_first_sidebar(item.children, true);
            if (first)
                return true;
        });
    }

    change_first_sidebar = (info: { key: React.Key, [key: string]: any }): void => {
        const {permissions} = this.props;
        const key = info.key;
        const sidebar2: Item[] = [];

        second_sidebar_item.forEach(item => {
            if (item.parent === key) {
                if ((!(item.key in permissions!)) && (!item.children))
                    return;
                if (item.key in permissions!)
                    sidebar2.push(item);
                else {
                    const new_item = {...item};
                    new_item.children = item.children?.filter(obj => obj.key in permissions!)
                    sidebar2.push(new_item);
                }

            }
        });
        const path = [...this.state.path];
        if (path.length)
            path[0] = key as string;
        this.setState({sidebar2: sidebar2.length ? sidebar2 : undefined, path});
    }


    setCollapse1 = () => {
        this.setState({collapse1: !this.state.collapse1});
    }

    setCollapse2 = () => {
        this.setState({collapse2: !this.state.collapse2});
    }

    render() {
        const {
            children,
            logout,
            user,
            companies,
        } = this.props;
        const {collapse1, collapse2, path, sidebar1, sidebar2} = this.state;

        const companies_list = companies.LIST?.data || []
        return (
            <Layout>

                <Layout.Sider collapsed={collapse1}
                              onCollapse={this.setCollapse1}
                              className="layout__with-auth__sidebar"
                              collapsedWidth={sidebarCollapseWidth}
                              width={sidebarWidth}
                >
                    <div className="sidebar__logo">
                        <Image
                            src={sidebarLogo}
                            className="logo__image"
                            preview={false}/>
                    </div>
                    <Row className="sidebar__company" hidden={companies_list.length < 2}>
                        <Col span={18} offset={3}>
                            <Form.Item label="پروژه" colon={false}>
                                <Select>
                                    {
                                        companies_list.map(company => (
                                            <Select.Option key={company.id} value={company.id} children={company.name}/>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Menu mode="vertical"
                          selectable={false}
                          selectedKeys={path}
                          className="sidebar__menu"
                          theme={'light'}
                          onClick={this.change_first_sidebar}

                    >
                        {
                            sidebar1 ? sidebar1.map(parent => (
                                <Menu.Item
                                    key={parent.key}
                                    icon={parent.icon}
                                    className="menu__item"
                                >
                                    {parent.title}
                                </Menu.Item>
                            )) : <Spin/>
                        }


                    </Menu>
                    <div className="sidebar__footer">
                        <Image src={headerLogo}/>
                    </div>


                </Layout.Sider>

                {sidebar2 ?
                    <Layout.Sider collapsed={collapse2}
                                  onCollapse={this.setCollapse2}
                                  className="layout__with-auth__second-sidebar"
                                  collapsedWidth={sidebarCollapseWidth}
                                  width={sidebarWidth}
                    >
                        <Menu mode={"inline"}
                              selectedKeys={path}
                              className="sidebar__menu"
                              theme={'light'}
                        >


                            {
                                sidebar2.map(item => (
                                    item.children ?
                                        <Menu.SubMenu title={item.title} key={item.key} className="sub__menu">
                                            {item.children.map(child => (
                                                <Menu.Item key={child.key} className="menu__item">
                                                    <Link
                                                        to={`/${item.parent}/${item.key}/${child.key}`}>
                                                        {child.title}
                                                    </Link>
                                                </Menu.Item>
                                            ))

                                            }
                                        </Menu.SubMenu> :
                                        <Menu.Item key={item.key} className="menu__item">
                                            <Link to={`/${item.parent}/${item.key}`}>{item.title}</Link>
                                        </Menu.Item>
                                ))
                            }

                        </Menu>
                    </Layout.Sider> : null
                }


                <Layout style={{marginRight: collapse1 ? sidebarCollapseWidth : sidebarWidth * 2}}
                        className="layout__with_auth__inner">
                    <Layout.Header className="inner__header">

                        <Breadcrumb separator={<AntIcon.LeftOutlined size={10}/>}>
                            <Breadcrumb.Item key='home'>
                                <Link to="/">سلام</Link>
                            </Breadcrumb.Item>

                            <Breadcrumb.Item key='a'>
                                <Link to="/">فعلا خدا حافظ</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Layout.Header>

                    <Layout.Content className="inner__content">
                        {
                            children
                        }
                    </Layout.Content>
                </Layout>


            </Layout>
        )
    }
}

const HistoryConnector = (props: { [key in Exclude<keyof PropType, 'history'>]: PropType[key] }) => {
    const history = useHistory();
    return <WithAuth history={history} {...props}/>
}

export default connector(HistoryConnector)