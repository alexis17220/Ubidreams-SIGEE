import React, {useState, useEffect} from 'react'
import {Card, message, Row, Col, Button, Badge, Tabs} from 'antd'
import {ToolOutlined, UserOutlined} from '@ant-design/icons'
import I18n from 'I18n'
import TableLayout from "Components";
import {bindActionCreators} from 'redux'

import DashboardAlertes from "Views/Dashboard/DashboardAlertes";
import axios from "axios";
import {baseURL} from "Resources";
import PropTypes from "prop-types";
import {defaultTo, get} from "lodash";
import {withNavigation} from "@react-navigation/core";
import {connect} from "react-redux";

import DashboardReparation from "Views/Dashboard/DashboardReparation";
import DashboardDetail from "Views/Dashboard/DashboardDetail";
import {actions as enginsActions} from 'Resources/EnginsResource'


const DashboardScreen = () => {
    const [activeTab, setActiveTab] = useState('details')
    const [fetching, setFetching] = useState(true)
    const [count, setCount] = useState(0);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [paginationEngin, setPaginationEngin] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
        sortOrder: 'asc'

    });

    let {searchText, pageSize, current} = paginationEngin;
    const searchValue = searchText;
    const [options, setOptions] = useState([]);
    const [totalCountEngin, setTotalCountEngin] = useState(0);
    const [totalCountUser, setTotalCountUser] = useState(0);

    const getEnginsData = async () => {
        try {
            const response = await fetch(`${baseURL}/engins/`);
            const data = await response.json();
            const results = data.results;
            const count = results.length;
            setTotalCountEngin(count);

            const newOptions = results.map((result) => {
                return {
                    value: result.id_engin,
                    label: result.id_engin,
                    count: result.count
                };
            });

            setOptions(newOptions);
        } catch (error) {
            message.error(I18n.t(`errors.engin.fetch`))
        }
    };
    const getUserData = async () => {
        try {
            const response = await fetch(`${baseURL}/users/`);
            const data = await response.json();
            const results = data.results;
            const count = results.length;
            setTotalCountUser(count);

            const newOptions = results.map((result) => {
                return {
                    value: result.id_engin,
                    label: result.id_engin,
                    count: result.count
                };
            });

            setOptions(newOptions);
        } catch (error) {
            message.error(I18n.t(`errors.users.fetch`))
        }
    };


    useEffect(() => {
        getEnginsData().then(r => {});
    }, []);
    useEffect(() => {
        getUserData().then(r => {});
    }, []);


    return (<main className="screen dashboard">
        <header>
            <Row gutter={16}>
                {/*{roleUser == true && (*/}
                <>
                    {/*
                    <Col span={roleUser === true ? 6 : 12}>
*/}
                    <Col span={12}>
                        <Card style={{marginBottom: '16px'}}>
                            <h3>
                                <UserOutlined style={{marginRight: '2vh'}}/>
                                {totalCountUser}
                                {I18n.t(`pages.dashboard.user_count.user_count`)}
                            </h3>
                        </Card>
                    </Col>
                </>
                {/*)}*/}
                <Col span={12}>
                    <Card style={{marginBottom: '16px'}}>
                        <h3>
                            <ToolOutlined style={{marginRight: '2vh'}}/>
                            {I18n.t(`pages.dashboard.engin_count`)}
                            {totalCountEngin}


                        </h3>
                    </Card>
                </Col>
            </Row>
        </header>
        <Card>
            <Tabs
                defaultActiveKey="alerte"
                onChange={(value) => setActiveTab(value)}
                items={[{
                    key: 'alerte',
                    label: I18n.t(`pages.dashboard.alerte`),
                    children: <DashboardAlertes/>,
                }, {
                    key: 'administrative', label: I18n.t(`pages.dashboard.rep/int`), children: (<main>
                        <DashboardReparation loading={fetching}/>
                    </main>),
                }, {
                    key: 'con/lev', label: I18n.t(`pages.dashboard.detail`), children: (<main>
                        <DashboardDetail loading={fetching}/>
                    </main>),
                }
                ]}
            />
        </Card>
    </main>)
}

DashboardScreen.propTypes = {
    actions: PropTypes.object,
    roles: PropTypes.array,
    navigation: PropTypes.object,
}

DashboardScreen.defaultProps = {
    roles: [],
}

const mapStateToProps = (state) => {
    return {
        roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {...enginsActions},
        dispatch
    ),
})

export default withNavigation(
    connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
)
