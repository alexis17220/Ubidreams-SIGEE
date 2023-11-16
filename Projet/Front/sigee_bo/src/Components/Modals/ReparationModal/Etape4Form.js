import React from 'react';
import {DatePicker, Form, Input} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import locale from "antd/es/locale/en_US";

//----------------------------------------------------------------------------

const Etape4Form = ({
                        formItemLayout,
                        form,
                        reparation,
                        date,
                        designation
                    }) => {

    return (
        <Form
            form={form}
            initialValues={{
                ['date']: reparation?.id_reparation ? reparation.id_garantie.d_echeance : reparation?.id_reparation.id_garantie,
                ['designation']: reparation?.id_reparation ? reparation.id_garantie.nom : reparation?.id_reparation.id_garantie,
            }}
        >
            {/* Champ "Date" */}
            <Form.Item
                label={I18n.t(`pages.reparation.table.date`)}
                name={'date'}
                rules={[
                    {
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageDate`),
                    },
                ]}
            >
                <DatePicker
                    locale={locale}
                    format="YYYY-MM-DD"
                />
            </Form.Item>

            {/* Champ "Désignation" */}
            <Form.Item
                label={I18n.t(`pages.reparation.table.designation`)}
                name={'designation'}
                rules={[
                    {
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageDesignation`),
                    },
                    {
                        pattern: /^[a-zA-Z0-9\/\s-]+$/,
                        message: I18n.t('fields.engin.patternDesignation')
                    },
                ]}
            >
                <Input placeholder={I18n.t(`fields.reparation.placeholderDesignation`)}/>
            </Form.Item>
        </Form>
    )
}

Etape4Form.propTypes = {
    formItemLayout: PropTypes.object, // Configuration pour le placement des éléments dans le formulaire.
    form: PropTypes.any, // Objet du formulaire géré par Ant Design Form.
    reparation: PropTypes.object, // Données de la réparation (s'il y en a).
    date: PropTypes.array, // Date (s'il y en a).
    designation: PropTypes.any, // Désignation (s'il y en a).
}

export default Etape4Form;
