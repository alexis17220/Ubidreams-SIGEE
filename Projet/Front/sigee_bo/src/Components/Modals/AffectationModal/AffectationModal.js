// Importations des modules nécessaires
import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as AffectationsActions} from 'Resources/AffectationsRessource';
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";
import axios from "axios";
import {baseURL} from "Resources";
import {TagsOutlined} from "@ant-design/icons";

// Définition du composant AffectationsModal
const AffectationsModal = ({
                               visible,
                               loading,
                               headerText,
                               title,
                               onCancel,
                               affectation,
                               actions,
                               onOk,
                           }) => {
    // Configuration du layout du formulaire
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 19,
        },
    }

    // Initialisation du formulaire
    const [form] = Form.useForm();

    // Utilisation des "watchers" pour obtenir les valeurs de certains champs du formulaire
    const code_centre = Form.useWatch("code_centre", form);
    const libelle = Form.useWatch("libelle", form);
    const libelle_long = Form.useWatch("libelle_long", form);
    const affectationAdm = Form.useWatch('id_pere_adm', form);

    // Effet pour réinitialiser le formulaire lorsque la prop "affectation" change
    useEffect(() => form.resetFields(), [affectation]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        form.resetFields();
        onCancel();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleOk = () => {
        form.validateFields(['code_centre', 'libelle', 'libelle_long', 'id_pere_adm'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    code_centre: code_centre,
                    libelle: libelle,
                    libelle_long: libelle_long,
                    id_pere_adm: affectationAdm,
                }

                if (affectation != null) {
                    if (code_centre !== affectation.code_centre || libelle !== affectation.libelle || libelle_long !== affectation.libelle_long || affectationAdm !== affectation.id_pere_adm) {
                        updateAffectation(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createAffectation(data);
                    form.resetFields();
                }
            })
            .catch(() => {
                message.error(I18n.t(`errors.form`));
            });
    }

    /*
     * Création d'une affectation en base de données
     */
    const createAffectation = (data) => {
        actions.createAffectations(data)
            .then(() => {
                message.success(I18n.t(`success.affectation.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.create`));
            });
    }

    /*
     * Mise à jour d'une affectation en base de données
     */
    const updateAffectation = (data) => {
        console.log(affectation)
        actions.updateAffectationsAffectations({
            id_affectation: affectation.id_affectation,
            libelle: data.libelle,
            libelle_long: data.libelle_long,
            code_centre: data.code_centre,
            id_pere_adm: data.id_pere_adm,
        })
            .then(() => {
                message.success(I18n.t(`success.affectation.update`));
                onOk();
            })
            .catch((e) => {
                console.log(e);
                message.error(I18n.t(`errors.affectation.update`));
            });
    }

    // Récupération des données des affectations depuis l'API
    const [affectations, setAffectations] = useState([]);
    const getAffectationData = () => {
        axios.get(`${baseURL}/affectations/all/`)
            .then((response) => {
                setAffectations(response.data);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.fetch`));
            });
    };

    useEffect(() => {
        getAffectationData();
    }, []);

    // Affichage du sélecteur d'affectation
    const affectationSelector = () => {
        return (
            <Select placeholder={I18n.t("fields.affectation.placeholderAffect")}>
                {affectations.map((aff) => (
                    <Select.Option key={aff.libelle} value={aff.id_affectation}>
                        {I18n.t(`${aff.libelle}`)} | {I18n.t(`${aff.libelle_long}`)}
                    </Select.Option>
                ))}
            </Select>
        )
    }

    // Rendu du composant
    return visible && (
        <Container
            visible={visible}
            loading={loading}
            title={title}
            headerText={headerText}
            onCancel={doCancel}
            onOk={handleOk}
        >
            <Form
                {...formItemLayout}
                form={form}
            >
                <Form.Item
                    name={'code_centre'}
                    label={I18n.t(`pages.affectation.table.code`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectation.requiredMessageCode`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s.]+$/,
                            message: I18n.t(`fields.affectation.patternCode`),
                        },
                    ]}
                    initialValue={affectation?.code_centre}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.affectation.placeholderCode`)}
                    />
                </Form.Item>
                <Form.Item
                    name={'libelle'}
                    label={I18n.t(`pages.affectation.table.libelle`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectation.requiredMessageLibelle`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s.]+$/,
                            message: I18n.t(`fields.affectation.patternLibelle`),
                        },
                    ]}
                    initialValue={affectation?.libelle}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.affectation.placeholderLibelle`)}
                    />
                </Form.Item>
                <Form.Item
                    name={'libelle_long'}
                    label={I18n.t(`pages.affectation.table.description`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectation.requiredMessageDescription`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s.]+$/,
                            message: I18n.t(`fields.affectation.patternDescription`),
                        },
                    ]}
                    initialValue={affectation?.libelle_long}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.affectation.placeholderDescription`)}
                    />
                </Form.Item>
                {/* Sélection d'une affectation */}
                <Form.Item
                    name={'id_pere_adm'}
                    label={I18n.t(`pages.affectation.table.affectation`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectation.requiredMessageAffect`),
                        },
                    ]}
                    initialValue={affectation?.id_pere_adm}
                >
                    {affectationSelector()}
                </Form.Item>
            </Form>
        </Container>
    )
}

// Propriétés attendues du composant
AffectationsModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    affectation: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

// Valeurs par défaut pour les props du composant
AffectationsModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

// Connexion du composant au store Redux
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationsActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(AffectationsModal);
