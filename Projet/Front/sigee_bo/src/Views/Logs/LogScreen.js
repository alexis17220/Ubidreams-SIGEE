import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {actions as LogActions} from 'Resources/LogRessource';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import {LogTableData} from 'Components/Values/LogsData/LogsTableData';

const LogScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour stocker les données du tableau des Log
    const [tables, setTables] = useState(LogTableData);

    useEffect(() => {
        // Récupération des données des Log
        getLogData();
    }, []);

    /**
     * Récupération des données des Log
     */
    const getLogData = () => {
        setFetching(true);
        actions
            .getLog()
            .then(({body: logs}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    logs: {
                        ...tables.logs,
                        rows: logs,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.log.fetch'));
            });
    };

    // Define the handleSearch function
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
//A Modifier les roles
    return /*map(roles, ({name}) => name) !== 'SIGEE_MANAGER' && map(roles, ({name}) => name) !== 'SIGEE_USER' ?*/ (
        <main className="screen">
            <Card>
                <TableLayout
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    onChangeSearch={handleSearch}

                />
            </Card>
        </main>
    )/* : (
        <NoAccess/>
    );*/
};

LogScreen.propTypes = {
    actions: PropTypes.object,
    Log: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...LogActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(LogScreen));
