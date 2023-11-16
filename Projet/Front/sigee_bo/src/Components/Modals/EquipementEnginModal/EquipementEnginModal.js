import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {DatePicker, Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as EquipementsEnginsActions} from 'Resources/EquipementsEnginRessources';
import {actions as EnginsActions} from 'Resources/EnginsResource';
import {actions as EquipementsActions} from 'Resources/EquipementsRessources';

import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";
import axios from "axios";
import {baseURL} from "Resources";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/en_US';

const EquipementEnginModal = ({
                                  visible,
                                  loading,
                                  headerText,
                                  title,
                                  onCancel,
                                  equipementEngins,
                                  actions,
                                  onOk,
                                  engin
                              }) => {
    const formItemLayout = {
        labelCol: {
            span: 9,
        },
        wrapperCol: {
            span: 19,
        },
    };

    const [form] = Form.useForm(); // Crée une instance du formulaire Ant Design
    const immatriculation = Form.useWatch('id_engin', form); // Surveille la valeur du champ 'id_engin'
    const equipement = Form.useWatch('id_equipement', form); // Surveille la valeur du champ 'id_equipement'
    const limite = Form.useWatch('d_limite_utilisation', form); // Surveille la valeur du champ 'd_limite_utilisation'
    const action = Form.useWatch('action', form); // Surveille la valeur du champ 'action'
    const montage = Form.useWatch('date_montage', form); // Surveille la valeur du champ 'date_montage'
    const verification = Form.useWatch('date_verification', form); // Surveille la valeur du champ 'date_verification'
    const [enginValues, setEnginValues] = useState([]); // État local pour stocker les valeurs des engins
    const [equipementValues, setEquipementValues] = useState([]); // État local pour stocker les valeurs des équipements

    useEffect(() => form.resetFields(), [equipementEngins]); // Réinitialise le formulaire lorsque les valeurs de 'equipementEngins' changent

    const doCancel = () => {
        onCancel(); // Appelle la fonction 'onCancel' pour fermer la modal
        form.resetFields(); // Réinitialise le formulaire
    };

    const handleOk = () => {
        form
            .validateFields([
                'id_engin',
                'id_equipement',
                'action',
                'd_limite_utilisation',
                'date_montage',
                'date_verification',
            ])
            .then(async () => {
                // Création du formulaire à envoyer
                const data = {
                    id_equipement: equipement,
                    action: action,
                    d_limite_utilisation: moment(limite).format('YYYY-MM-DD'),
                    date_montage: moment(montage).format('YYYY-MM-DD'),
                    date_verification: moment(verification).format('YYYY-MM-DD'),
                };

                if (engin?.id_engin) {
                    data.id_engin = engin.id_engin;
                } else {
                    data.id_engin = immatriculation;
                }

                if (equipementEngins != null) {
                    if (
                        immatriculation !== equipementEngins.id_engin.id_engin ||
                        equipement !== equipementEngins.id_equipement.id_equipement ||
                        action !== equipementEngins.action ||
                        limite !== equipementEngins.d_limite_utilisation ||
                        montage !== equipementEngins.date_montage ||
                        verification !== equipementEngins.date_verification
                    ) {
                        await updateEquipementsEngins(data); // Met à jour les données des équipements d'engins
                        form.resetFields(); // Réinitialise le formulaire
                    }
                } else {
                    await createEquipementsEngins(data); // Crée de nouvelles données des équipements d'engins
                    form.resetFields(); // Réinitialise le formulaire
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e)); // Affiche un message d'erreur en cas d'échec de validation du formulaire
            });
    };

    // Fonction pour créer un nouvel équipement d'engin dans la base de données
    const createEquipementsEngins = (data) => {
        return new Promise((resolve, reject) => {
            actions
                .createEquipementsEngin(data) // Appelle l'action 'createEquipementsEngin' pour créer les données des équipements d'engins
                .then(() => {
                    message.success(I18n.t(`success.equipementE.create`)); // Affiche un message de succès pour la création réussie
                    onOk(); // Appelle la fonction 'onOk' pour confirmer l'action
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.equipementE.create`)); // Affiche un message d'erreur en cas d'échec de la création
                    reject();
                });
        });
    };

    // Fonction pour mettre à jour les données des équipements d'engins dans la base de données
    const updateEquipementsEngins = (data) => {
        return new Promise((resolve, reject) => {
            actions
                .updateEquipementEnginEquipementsEngin({
                    id: equipementEngins.idengins_equipements,
                    id_engin: equipementEngins.id_engin.id_engin,
                    id_equipement: data.id_equipement,
                    action: data.action,
                    d_limite_utilisation: data.d_limite_utilisation,
                    date_montage: data.date_montage,
                    date_verification: data.date_verification,
                }) // Appelle l'action 'updateEquipementEnginEquipementsEngin' pour mettre à jour les données des équipements d'engins
                .then(() => {
                    message.success(I18n.t(`success.equipementE.update`)); // Affiche un message de succès pour la mise à jour réussie
                    onOk(); // Appelle la fonction 'onOk' pour confirmer l'action
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.equipementE.update`)); // Affiche un message d'erreur en cas d'échec de la mise à jour
                    reject();
                });
        });
    };
    const [data, setEngin] = useState([]);

    // Récupère les données des engins à partir de l'API lorsque le composant est monté
    useEffect(() => {
        axios.get(`${baseURL}/engins/`)
            .then((response) => {
                setEngin(response.data.results); // Met à jour l'état 'enginValues' avec les valeurs des engins obtenues depuis l'API
            })
            .catch(() => {
                message.error(I18n.t(`errors.engin.fetch `)); // Affiche un message d'erreur en cas d'échec de récupération des données des engins
            });

    }, []);

    // Récupère les données des équipements à partir de l'API lorsque le composant est monté

    const [equipements, setEquipement] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}/equipements/`)
            .then((response) => {
                    setEquipement(response.data.results);// Met à jour l'état 'equipementValues' avec les valeurs des équipements obtenues depuis l'API
                }
            ).catch(() => {
            message.error(I18n.t(`errors.equipement.fetch `))// Affiche un message d'erreur en cas d'échec de récupération des données des équipements
        });

    }, []);
    const getEquipementData = () => {
        actions
            .getEquipements()
            .then(({body: value}) => {
                setEquipementValues(value.results)
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipement.fetch`))// Affiche un message d'erreur en cas d'échec de récupération des données des équipements
            })

    }
    // Fonction pour récupérer les données des engins depuis l'API en fonction de l'état actuel du 'engin'
    const getEnginData = () => {
        if (engin?.id_engin) {
            actions
                .getOneEngins({id: engin.id_engin}) // Appelle l'action 'getOneEngins' pour obtenir les données d'un engin spécifique
                .then(({body: value}) => {
                    setEnginValues(value.results); // Met à jour l'état 'enginValues' avec les valeurs de l'engin spécifique obtenu depuis l'API
                })
                .catch(() => {
                    message.error(I18n.t(`errors.engin.fetch`)); // Affiche un message d'erreur en cas d'échec de récupération des données de l'engin spécifique
                });
        } else {
            actions
                .getEngins()
                .then(({body: value}) => {
                    setEnginValues(value.results); // Met à jour l'état 'enginValues' avec les valeurs de tous les engins obtenues depuis l'API
                })
                .catch(() => {
                    message.error(I18n.t(`errors.engin.fetch`)); // Affiche un message d'erreur en cas d'échec de récupération des données des engins
                });
        }
    };

    // Récupère les données des engins depuis l'API lorsque le composant est monté ou que l'état de 'engin' change
    useEffect(() => {
        getEnginData();
        getEquipementData()
    }, []);
    // Fonction pour afficher le champ de sélection d'engin ou d'afficher l'immatriculation si un engin est sélectionné
    const enginSelector = () => {
        if (engin?.id_engin || (equipementEngins && equipementEngins.id_engin)) {
            return (
                <Input
                    key={engin?.id_engin || equipementEngins.id_engin}
                    value={`${engin?.immatriculation || equipementEngins?.immatriculation}`}
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
    // Fonction pour afficher le champ de sélection d'équipement
    const equipementSelector = () => {
        return (
            <Select placeholder={I18n.t("fields.classification.placeholderLibelle")}>
                {equipementValues.map((equipement) => {
                    return (
                        <Select.Option key={equipement.libelle} value={equipement.idequipements}>
                            {I18n.t(`${equipement.libelle}`)}
                        </Select.Option>
                    )
                })}
            </Select>
        )
    }

    // Rendu du composant de modal contenant le formulaire
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
                initialValues={{
                    ['id_engin']: engin?.id_engin ? engin.immatriculation : equipementEngins?.id_engin?.immatriculation,
                    ['id_equipement']: equipementEngins?.id_equipement?.libelle || null,
                    ['action']: equipementEngins?.action || null,
                    ['d_limite_utilisation']: equipementEngins?.d_limite_utilisation,
                    ['date_montage']: equipementEngins?.date_montage,
                    ['date_verification']: equipementEngins?.date_verification,
                }}
            >
                {/* Champ de sélection d'un engin */}
                <Form.Item
                    name={'id_engin'}
                    label={I18n.t(`pages.engin.table.registration`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.engin.requiredMessageRegistration`),
                        },
                    ]}
                >
                    {enginSelector()}
                </Form.Item>
                {/* Champ de sélection d'un équipement */}
                <Form.Item
                    name={'id_equipement'}
                    label={I18n.t(`pages.equipement.table.libelle`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipement.requiredMessage`),
                        },
                    ]}
                >
                    {equipementSelector()}
                </Form.Item>
                {/* Champ pour l'action */}
                <Form.Item
                    name={'action'}
                    label={I18n.t(`pages.equipementE.table.action`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipementE.requiredMessageAction`),
                        },
                        {
                            pattern: "^[a-zA-Z0-9/\-\s]+$",
                            message: I18n.t(`fields.equipementE.patternAction`),
                        },
                    ]}
                >
                    <Input
                        placeholder={I18n.t(`fields.equipementE.placeholderAction`)}
                    />
                </Form.Item>
                {/* Champ pour la date limite d'utilisation */}
                <Form.Item
                    name={'d_limite_utilisation'}
                    label={I18n.t(`pages.equipementE.table.utilisation`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipementE.requiredMessageUtilisation`),
                        },
                    ]}
                    valuePropName={'date'}
                >
                    <DatePicker defaultValue={moment(limite)} locale={locale} format="yyyy-MM-DD"/>
                </Form.Item>
                {/* Champ pour la date de montage */}
                <Form.Item
                    name={'date_montage'}
                    label={I18n.t(`pages.equipementE.table.montage`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipementE.requiredMessageMontage`),
                        },
                    ]}
                    valuePropName={'date'}
                >
                    <DatePicker defaultValue={moment(montage)} locale={locale} format="yyyy-MM-DD"/>
                </Form.Item>
                {/* Champ pour la date de vérification */}
                <Form.Item
                    name={'date_verification'}
                    label={I18n.t(`pages.equipementE.table.verification`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipementE.requiredMessageVerification`),
                        },
                    ]}
                    valuePropName={'date'}
                >
                    <DatePicker defaultValue={moment(verification)} locale={locale} format="yyyy-MM-DD"/>
                </Form.Item>
            </Form>
        </Container>
    );
};

// Définition des types de propriétés attendues par le composant
EquipementEnginModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    equipementEngins: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Définition des valeurs par défaut des propriétés
EquipementEnginModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

// Fonction pour mapper les actions Redux aux propriétés du composant
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipementsEnginsActions, ...EnginsActions, ...EquipementsActions}, dispatch),
});

// Exporte le composant connecté au Redux avec les actions mappées aux propriétés
export default connect(null, mapDispatchToProps)(EquipementEnginModal);
