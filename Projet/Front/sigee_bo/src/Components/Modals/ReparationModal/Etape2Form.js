import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Select} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import locale from "antd/es/locale/en_US";
import {baseURL} from "Resources";

//----------------------------------------------------------------------------
const {TextArea} = Input;

const Etape2Form = ({
                        formItemLayout,
                        reparation,
                        form,
                        dateE,
                        raison,
                    }) => {
    // Déclaration de l'état local "options" pour stocker les options d'intervenants
    const [options, setOptions] = useState([]);

    // Fonction pour récupérer les intervenants depuis l'API
    const getIntervenant = () => {
        fetch(`${baseURL}/intervenant/`)
            .then((response) => response.json())
            .then((data) => {
                const results = data.results;
                // Transformation des données pour créer les options pour le Select
                const newOptions = results.map((result) => ({
                    value: result.id_intervenant,
                    label: result.nom,
                    nom: result.nom,
                    intervenant: result.id_type_intervenant.categorie,
                }));
                // Mise à jour de l'état "options" avec les nouvelles options
                setOptions(newOptions);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    // Utilisation de useEffect pour exécuter getIntervenant au chargement du composant
    useEffect(() => {
        getIntervenant();
    }, []);

    return (
        <Form
            form={form}
            initialValues={{
                // Initialisation des valeurs du formulaire à partir des données de "reparation"
                ['dateE']: reparation?.id_reparation ? reparation.d_entree : reparation?.id_reparation.d_entree,
                ['raison']: reparation?.id_reparation ? reparation.desc_raison_entree : reparation?.id_reparation.desc_raison_entree,
            }}
        >
            {/*Categorisation Engin*/}
            <Form.Item
                label={I18n.t(`pages.reparation.table.dateE`)}
                name="dateE"
                rules={[{
                    required: true,
                    message: I18n.t(`fields.reparation.requiredMessageDateE`)
                },]}
            >
                <DatePicker
                    locale={locale}
                    format="YYYY-MM-DD"
                />
            </Form.Item>
            <Form.Item
                label={I18n.t('pages.reparation.table.raison')}
                name="raison"
                rules={[
                    {
                        required: true,
                        message: I18n.t('fields.reparation.requiredMessageRaison')
                    },
                    {
                        pattern: /^[a-zA-Z0-9\/\s-]+$/,
                        message: I18n.t('fields.reparation.patternRaison')
                    },
                ]}
            >
                <TextArea
                    showCount
                    maxLength={150}
                    style={{
                        height: 50,
                        marginBottom: 12,
                    }}
                    placeholder={I18n.t('fields.reparation.placeholderRaison')}
                />
            </Form.Item>
            <Form.Item
                label={I18n.t('pages.reparation.table.intervenant')}
                name="intervenant"
                rules={[
                    {
                        required: true,
                        message: I18n.t('fields.reparation.requiredMessageIntervenant')
                    },
                ]}
            >
                {/* Utilisation du Select pour sélectionner les intervenants */}
                <Select
                    mode="multiple" // Mode multiple pour permettre la sélection de plusieurs intervenants
                    placeholder={I18n.t('fields.reparation.placeholderIntervenant')}
                    optionLabelProp="label"
                    options={options} // Utilisation de l'état "options" pour les options du Select
                >
                    {/* Affichage des options d'intervenants */}
                    {options.map((option) => (
                        <Select.Option key={option.value} value={option.value} label={option.label}>
                            {option.label} | {option.intervenant}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

// Définition des types de props attendues par le composant
Etape2Form.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    dateE: PropTypes.array,
    reparation: PropTypes.array,
    raison: PropTypes.any,
    setSelectedNutrients: PropTypes.func,
};

export default Etape2Form;
