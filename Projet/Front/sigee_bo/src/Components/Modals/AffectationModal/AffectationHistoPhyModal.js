// Importations des modules nécessaires
import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as AffectationHistoPhyActions} from 'Resources/AffectationHistoPhyRessources';
import {actions as EnginsActions} from 'Resources/EnginsResource';
import {actions as AffectationsActions} from 'Resources/AffectationsRessource';
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";
import axios from "axios";
import {baseURL} from "Resources";

// Définition du composant AffectationsHistoPhyModal
const AffectationsHistoPhyModal = ({
                                       visible,
                                       loading,
                                       headerText,
                                       title,
                                       onCancel,
                                       affectationPhys,
                                       actions,
                                       onOk,
                                       engin
                                   }) => {
    // Configuration du layout du formulaire
    const formItemLayout = {
        labelCol: {
            span: 9,
        },
        wrapperCol: {
            span: 19,
        },
    }

    // Initialisation du formulaire
    const [form] = Form.useForm();

    // Utilisation des "watchers" pour obtenir les valeurs de certains champs du formulaire
    const immatriculation = Form.useWatch('id_engin', form);
    const affectation = Form.useWatch('id_affec_phy', form);

    // États pour stocker les valeurs des listes déroulantes (engin et affectation)
    const [enginValues, setEnginValues] = useState([]);
    const [affectationValues, setAffectationValues] = useState([]);

    // Effet pour réinitialiser le formulaire lorsque la prop "affectationPhys" change
    useEffect(() => form.resetFields(), [affectationPhys]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        onCancel();
        form.resetFields();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleOk = () => {
        form.validateFields(['id_engin', 'id_affec_phy'])
            .then(async () => {
                // Création du formulaire à envoyer
                const data = {
                    id_affec_phy: affectation,
                };
                if (engin?.id_engin) {
                    data.id_engin = engin.id_engin;
                } else {
                    data.immatriculation = immatriculation;
                }

                if (affectationPhys != null) {
                    if (
                        immatriculation !== affectationPhys.id_engin ||
                        affectation !== affectationPhys.id_affec_phy
                    ) {
                        await updateAffectationHistoPhy(data);
                        form.resetFields();
                    }
                } else {
                    await createAffectationHistoPhy(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e))
            });
    }

    // Fonction pour créer une affectation physique en base de données
    const createAffectationHistoPhy = (data) => {
        return new Promise((resolve, reject) => {
            actions.createAffectationHistoPhy(data)
                .then(() => {
                    message.success(I18n.t(`success.affectPhy.create`));
                    onOk();
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.affectPhy.create`));
                    reject();
                })
        });
    }

    // Fonction pour mettre à jour une affectation physique en base de données
    const updateAffectationHistoPhy = (data) => {
        return new Promise((resolve, reject) => {
            console.log(actions);
            actions.updateAffectationHistoPhyAffectationHistoPhy({
                id: affectationPhys.id_histo_phy,
                id_engin: data.id_engin,
                id_affec_phy: data.id_affec_phy,
            })
                .then(() => {
                    message.success(I18n.t(`success.affectPhy.update`));
                    onOk();
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.affectPhy.update`));
                    reject();
                })
        });
    }

    // Récupération des données des engins depuis l'API
    const [data, setEngin] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}/engins/`)
            .then((response) => {
                setEngin(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.engin.fetch`));
            });

    }, []);

    // Si l'engin possède un id, affiche son immatriculation, sinon affiche tous les engins
    const getEnginData = () => {
        if (engin?.id_engin) {
            actions.getOneEngins({id: engin.id_engin})
                .then(({body: value}) => {
                    setEnginValues(value.results);
                })
                .catch(() => {
                    message.error(I18n.t(`errors.engin.fetch`));
                });
        } else {
            actions.getEngins()
                .then(({body: value}) => {
                    setEnginValues(value.results);
                })
                .catch(() => {
                    message.error(I18n.t(`errors.engin.fetch`));
                });
        }
    }

    useEffect(() => {
        getEnginData();
    }, [])

    // Affichage du sélecteur d'engin
    const enginSelector = () => {
        if (engin?.id_engin) {
            return (
                <Input
                    key={engin.id_engin}
                    value={`${engin.immatriculation} (${engin.id_engin})`}
                    readOnly
                />
            );
        } else {
            return (
                <Select
                    placeholder={I18n.t("fields.engin.placeholderRegistration")}
                >
                    {enginValues.map((engin) => (
                        <Select.Option
                            key={engin.immatriculation}
                            value={engin.id_engin}
                        >
                            {I18n.t(`${engin.immatriculation}`)}
                        </Select.Option>
                    ))}
                </Select>
            );
        }
    };

    // Récupération des données des affectations depuis l'API
    const [affectations, setAffectation] = useState([]);
    const getAffectationData = () => {
        axios
            .get(`${baseURL}/affectations/all/`)
            .then((response) => {
                setAffectation(response.data);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.fetch`));
            });
    };

    useEffect(() => {
        getAffectationData();
    }, [])

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
                {/* Sélection d'un engin */}
                <Form.Item
                    name={'id_engin'}
                    label={I18n.t(`fields.affectPhy.registration`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectPhy.requiredMessageImmat`),
                        },
                    ]}
                    initialValue={engin?.id_engin ? engin.immatriculation : affectationPhys?.id_engin.immatriculation}
                >
                    {enginSelector()}
                </Form.Item>
                {/* Sélection d'une affectation */}
                <Form.Item
                    name={'id_affec_phy'}
                    label={I18n.t(`fields.affectPhy.affectation`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.affectPhy.requiredMessageAffect`),
                        },
                    ]}
                    initialValue={affectationPhys?.id_affec_phy?.libelle}
                >
                    {affectationSelector()}
                </Form.Item>
                {/* Actions */}
            </Form>
        </Container>
    )
}

// Propriétés attendues du composant
AffectationsHistoPhyModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    affectationPhys: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

// Valeurs par défaut pour les props du composant
AffectationsHistoPhyModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

// Connexion du composant au store Redux
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationHistoPhyActions, ...EnginsActions, ...AffectationsActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(AffectationsHistoPhyModal);
