import I18n from 'I18n'
import {defaultTo, get, includes, map} from 'lodash'
import {Tag} from 'antd'
import React from 'react'
import rolesColors from 'Components/Values/rolesColors'

const userTableData = {

    users: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            login: {
                title: I18n.t('Login'),
                dataIndex: 'login',
                key: 'login',
                sorter: (a, b) =>
                    defaultTo(get(a, 'login'), '').localeCompare(
                        defaultTo(get(b, 'login'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },

            roles: {
                title: I18n.t('pages.users.table.roles.title'),
                dataIndex: 'droits',
                key: 'roles',

                sorter: (a, b) =>
                    defaultTo(get(a, 'roles[0].id'), 0) -
                    defaultTo(get(b, 'roles[0].id'), 0),
                sortDirections: ['ascend', 'descend'],
                filters: [
                    {
                        text: I18n.t('pages.users.table.roles.ADMIN.title'),
                        value: 'ADMIN',
                    },
                    {
                        text: I18n.t('pages.users.table.roles.AMALTIS_MANAGER.title'),
                        value: 'AMALTIS_MANAGER',
                    },
                    {
                        text: I18n.t('pages.users.table.roles.COMPANY_MANAGER.title'),
                        value: 'COMPANY_MANAGER',
                    },
                    {
                        text: I18n.t('pages.users.table.roles.BMPM.title'),
                        value: 'BMPM',
                    },
                ],
                onFilter: (role, user) =>
                    includes(map(get(user, 'roles'), 'name'), role),
            },
            affectAcces: {
                title: I18n.t('Affectation Acces'),
                dataIndex: 'affecacces',
                key: 'affectAccees',
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectAccees'), '').localeCompare(
                        defaultTo(get(b, 'affectAccees'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
            affectPref: {
                title: I18n.t('Affectation Pref'),
                dataIndex: 'affecpref',
                key: 'affectPref',
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectPref'), '').localeCompare(
                        defaultTo(get(b, 'affectPref'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
            dernAcces: {
                title: I18n.t('Dernier Accees'),
                dataIndex: 'last_access',
                key: 'dernAccees',
                sorter: (a, b) =>
                    defaultTo(get(a, 'dernAccees'), '').localeCompare(
                        defaultTo(get(b, 'dernAccees'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
        },
    },
}

export {userTableData}
