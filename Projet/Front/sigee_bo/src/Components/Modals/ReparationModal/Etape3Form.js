import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from 'antd';
import I18n from 'I18n';
import 'moment/locale/zh-cn';

const Etape3Form = ({
                        formItemLayout,
                        form,
                        reparation,
                        moteurs,
                    }) => {
    // Les props reparation et moteurs contiennent les données nécessaires pour pré-remplir le formulaire.

    console.log("equipement", moteurs); // Affiche les données des moteurs (pour le débogage).
    console.log("engin", reparation); // Affiche les données de la réparation (pour le débogage).

    return (
        <Form
            form={form}
            initialValues={{
                'moteurs': [
                    {
                        // On pré-remplit le premier moteur avec les données de la réparation (s'il y en a).
                        ['hr']: reparation?.id_reparation ? reparation.hdm_moteur_reception : reparation?.id_reparation.hdm_moteur_reception,
                        ['km']: reparation?.id_reparation ? reparation.km_reception : reparation?.id_reparation.km_reception,
                    }
                ]
            }}
        >
            {/* Champ "Heures de fonctionnement" */}
            <Form.Item
                label={I18n.t(`pages.reparation.table.hr`)}
                name={'hr'}
                rules={[
                    {
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageHr`),
                    },
                    {
                        pattern: /^[0-9]+$/,
                        message: I18n.t('fields.reparation.patternHr')
                    },
                ]}
            >
                <Input
                    placeholder={I18n.t('fields.reparation.placeholderHr')}
                />
            </Form.Item>

            {/* Champ "Kilométrage" */}
            <Form.Item
                label={I18n.t(`pages.reparation.table.km`)}
                name={'km'}
                rules={[
                    {
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageKm`),
                    },
                    {
                        pattern: /^[0-9]+$/,
                        message: I18n.t('fields.reparation.patternKm')
                    },
                ]}
            >
                <Input
                    placeholder={I18n.t('fields.reparation.placeholderKm')}
                />
            </Form.Item>
        </Form>
    );
};

Etape3Form.propTypes = {
    formItemLayout: PropTypes.object, // Configuration pour le placement des éléments dans le formulaire.
    form: PropTypes.any, // Objet du formulaire géré par Ant Design Form.
    reparation: PropTypes.object, // Données de la réparation (s'il y en a).
    moteurs: PropTypes.array, // Données des moteurs (s'il y en a).
};

export default Etape3Form;
