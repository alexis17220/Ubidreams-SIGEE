import I18n from 'I18n'
import {defaultTo, get, includes, map} from 'lodash'
import {Tag} from 'antd'
import React from 'react'
import rolesColors from 'Components/Values/rolesColors'

const archivedUsersTableData = {
    users: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            fullName: {
                title: I18n.t('pages.users.table.fullname'),
                width: 350,
                key: 'fullname',
                render: (fullname) =>
                    `${defaultTo(get(fullname, 'lastname'), '')} ${defaultTo(
                        get(fullname, 'firstname'),
                        ''
                    )}`,
                sorter: (a, b) => {
                    const fullname = {
                        a: `${defaultTo(get(a, 'lastname'), '')} ${defaultTo(
                            get(a, 'firstname'),
                            ''
                        )}`,
                        b: `${defaultTo(get(b, 'lastname'), '')} ${defaultTo(
                            get(b, 'firstname'),
                            ''
                        )}`,
                    }

                    // Tri par ordre alphabétique
                    return fullname.a.localeCompare(fullname.b)
                },
                sortDirections: ['ascend', 'descend'],
            },
            email: {
                title: I18n.t('pages.users.table.email'),
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) =>
                    defaultTo(get(a, 'email'), '').localeCompare(
                        defaultTo(get(b, 'email'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
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
                dataIndex: 'roles',
                width: 300,
                key: 'roles',
                render: (roles) => {
                    return map(roles, ({name}, index) => (
                        <Tag color={get(rolesColors, name)} key={index}>
                            {I18n.t(`pages.users.table.roles.${name}.title`)}
                        </Tag>
                    ))
                },
                sorter: (a, b) =>
                    defaultTo(get(a, 'roles[0].id'), 0) -
                    defaultTo(get(b, 'roles[0].id'), 0),
                sortDirections: ['ascend', 'descend'],
                filters: [
                    {
                        text: I18n.t('pages.users.table.roles.AMALTIS_ADMIN.title'),
                        value: 'AMALTIS_ADMIN',
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
                        text: I18n.t('pages.users.table.roles.COMPANY_USER.title'),
                        value: 'COMPANY_USER',
                    },
                ],
                onFilter: (role, user) =>
                    includes(map(get(user, 'roles'), 'name'), role),
            },
            affectAcces: {
                title: I18n.t('Affectation Acces'),
                dataIndex: 'affectAccees',
                key: 'affectAccees',
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectAccees'), '').localeCompare(
                        defaultTo(get(b, 'affectAccees'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
            affectPref: {
                title: I18n.t('Affectation Pref'),
                dataIndex: 'affectPref',
                key: 'affectPref',
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectPref'), '').localeCompare(
                        defaultTo(get(b, 'affectPref'), '')
                    ),
                sortDirections: ['ascend', 'descend'],
            },
            dernAcces: {
                title: I18n.t('Dernier Accees'),
                dataIndex: 'dernAccees',
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

export {archivedUsersTableData}
