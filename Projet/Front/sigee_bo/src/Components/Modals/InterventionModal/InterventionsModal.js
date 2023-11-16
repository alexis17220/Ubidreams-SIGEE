import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals'; // Import du composant Container (probablement une modal)
import PropTypes from 'prop-types';
import {DatePicker, Form, Input, message, Select} from 'antd'; // Import des composants de formulaire, de message et de sélection de la bibliothèque antd (Ant Design)
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {actions as InterventionsActions} from 'Resources/InterventionEnginRessources'; // Actions liées aux interventions
import {actions as IntervenantActions} from 'Resources/IntervenantRessources'; // Actions liées aux intervenants
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";
import axios from "axios";
import {baseURL} from "Resources";
import moment from 'moment'; // Bibliothèque pour manipuler les dates et heures
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/en_US';

const {TextArea} = Input;

const InterventionsModal = ({
                                visible,
                                loading,
                                headerText,
                                title,
                                onCancel,
                                interventions,
                                actions,
                                onOk,
                                reparation
                            }) => {
    const formItemLayout = {
        labelCol: {
            span: 9,
        },
        wrapperCol: {
            span: 19,
        },
    };

    const [form] = Form.useForm(); // Initialisation du formulaire (avec les valeurs des champs contrôlées par le formulaire)
    const intervenant = Form.useWatch('id_intervenant', form); // Surveillance des changements du champ 'id_intervenant'
    const nature = Form.useWatch('nature_travaux', form); // Surveillance des changements du champ 'nature_travaux'
    const observation = Form.useWatch('observation_chef', form); // Surveillance des changements du champ 'observation_chef'
    const date = Form.useWatch('d_fin_prev', form); // Surveillance des changements du champ 'd_fin_prev'
    const dateS = Form.useWatch('d_clos', form); // Surveillance des changements du champ 'd_clos'
    const atelier = Form.useWatch('nb_heure_atelier', form); // Surveillance des changements du champ 'nb_heure_atelier'
    const [intervenantValues, setIntervenantValues] = useState([]); // État pour stocker les valeurs des intervenants
    const [interventionValues, setInterventionValues] = useState([]); // État pour stocker les valeurs des interventions

    useEffect(() => form.resetFields(), [interventions]); // Remise à zéro des champs du formulaire lorsque 'interventions' change

    const doCancel = () => {
        onCancel();
        form.resetFields(); // Annule l'action en cours et remet à zéro les champs du formulaire
    };

    const handleOk = () => {
        form
            .validateFields([
                'id_intervenant',
                'nature_travaux',
                'observation_chef',
                'd_fin_prev',
                'nb_heure_atelier',
                'd_clos'
            ])
            .then(async () => {
                // Création du formulaire à envoyer
                const data = {
                    id_reparation: reparation.id_reparation,
                    id_intervenant: intervenant,
                    nature_travaux: nature,
                    observation_chef: observation,
                    nb_heure_atelier: atelier,
                };
                if (date) {
                    data.d_fin_prev = moment(date).format('YYYY-MM-DD');
                }

                if (dateS) {
                    data.d_clos = moment(dateS).format('YYYY-MM-DD');
                }

                if (reparation?.id_intervention) {
                    data.id_intervenant = reparation.id_intervention?.id_intervenant?.id_intervenant;
                } else {
                    data.id_intervenant = intervenant;
                }

                if (interventions !== null) {
                    if (
                        intervenant !== interventions?.id_intervenant ||
                        nature !== interventions?.nature_travaux ||
                        observation !== interventions?.observation_chef ||
                        atelier !== interventions?.nb_heure_atelier ||
                        date !== interventions?.d_fin_prev ||
                        dates !== interventions?.d_clos
                    ) {
                        await updateIntervention(data);
                        form.resetFields();
                    }
                } else {
                    await createIntervention(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t('errors.form'), console.log(e));
            });
    };

    /*
     * Création d'une intervention en base de données
     */
    const createIntervention = (data) => {
        return new Promise((resolve, reject) => {
            actions
                .createInterventionEngins(data)
                .then(() => {
                    message.success(I18n.t(`success.intervention.create`));
                    onOk();
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.intervention.create`));
                    reject();
                });
        });
    };

    /*
     * Mise à jour d'une intervention en base de données
     */
    const updateIntervention = (data) => {
        return new Promise((resolve, reject) => {
            actions
                .updateInterventionEnginInterventionEngins({
                    id: interventions.id_intervention,
                    id_reparation: data.id_reparation,
                    nature_travaux: data.nature_travaux,
                    observation_chef: data.observation_chef,
                    id_intervenant: data.id_intervenant,
                    d_fin_prev: data.d_fin_prev,
                    d_clos: data.d_clos,
                    nb_heure_atelier: data.nb_heure_atelier,
                })
                .then(() => {
                    message.success(I18n.t(`success.intervention.update`));
                    onOk();
                    resolve();
                })
                .catch(() => {
                    message.error(I18n.t(`errors.intervention.update`));
                    reject();
                });
        });
    };

    const [data, setIntervenant] = useState([]);

    useEffect(() => {
        // Récupération des données des intervenants depuis l'API
        axios.get(`${baseURL}/intervenant/`)
            .then((response) => {
                setIntervenant(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t('errors.intervenant.fetch'));
            });
    }, []);

    const getIntervenantData = () => {
        if (interventions?.id_intervenant) {
            // Si une intervention est associée à un intervenant, on récupère uniquement les détails de cet intervenant
            actions
                .getOneIntervenants({id: interventions.id_intervenant.id_intervenant})
                .then(({body: value}) => {
                    setIntervenantValues(value.results);
                })
                .catch(() => {
                    message.error(I18n.t('errors.intervenant.fetch'));
                });
        } else {
            // Sinon, on récupère la liste complète des intervenants
            actions
                .getIntervenants()
                .then(({body: value}) => {
                    setIntervenant(value.results);
                })
                .catch(() => {
                    message.error(I18n.t('errors.intervenant.fetch'));
                });
        }
    };

    useEffect(() => {
        getIntervenantData();
    }, []);

    const intervenantSelector = () => {
        // Affichage du champ 'id_intervenant' en tant que liste déroulante de tous les intervenants disponibles
        return (
            <Select placeholder={I18n.t('fields.intervention.placeholderIntervenant')}>
                {data.map((inter) => (
                    <Select.Option key={inter.id_intervenant} value={inter.id_intervenant}>
                        {inter.nom}
                    </Select.Option>
                ))}
            </Select>
        );
    };

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
                    ['id_intervenant']: interventions?.id_intervenant ? interventions.id_intervenant.id_intervenant : interventions?.id_intervenant,
                    ['d_fin_prev']: interventions?.id_intervenant ? interventions?.d_fin_prev : interventions?.id_intervention?.d_fin_prev,
                    ['d_clos']: interventions?.id_intervenant ? interventions?.d_clos : interventions?.id_intervention?.d_clos,
                    ['nature_travaux']: interventions?.id_intervenant ? interventions?.nature_travaux : interventions?.id_intervention?.nature_travaux,
                    ['observation_chef']: interventions?.id_intervenant ? interventions?.observation_chef : interventions?.id_intervention?.observation_chef,
                    ['nb_heure_atelier']: interventions?.id_intervenant ? interventions?.nb_heure_atelier : interventions?.id_intervention?.nb_heure_atelier,
                }}
            >
                {/* Sélection d'un intervenant */}
                {!interventions?.id_intervenant ? (
                    <Form.Item
                        name={'id_intervenant'}
                        label={I18n.t('pages.interventionR.table.intervenant')}
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.intervention.requiredMessageIntervenant'),
                            },
                        ]}
                    >
                        {intervenantSelector()}
                    </Form.Item>
                ) : (
                    <Form.Item
                        name={'id_intervenant'}
                        label={I18n.t('pages.interventionR.table.intervenant')}
                    >
                        <Input value={interventions.id_intervenant.nom} disabled/>
                        <input type="hidden" value={interventions.id_intervenant.id_intervenant}/>
                    </Form.Item>
                )}

                {/* Champ pour la nature des travaux */}
                <Form.Item
                    name={'nature_travaux'}
                    label={I18n.t(`pages.interventionR.table.nature`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.intervention.requiredMessageNature`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\/\s-]+$/,
                            message: I18n.t('fields.intervention.patternNature')
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
                        placeholder={I18n.t('fields.intervention.placeholderNature')}
                    />
                </Form.Item>

                {/* Champ pour l'observation du chef */}
                <Form.Item
                    name={'observation_chef'}
                    label={I18n.t(`pages.interventionR.table.observation`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.intervention.requiredMessageObs`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\/\s-]+$/,
                            message: I18n.t('fields.intervention.patternObs')
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
                        placeholder={I18n.t('fields.intervention.placeholderObs')}
                    />
                </Form.Item>

                {/* Champ pour la date de fin prévue */}
                <Form.Item
                    name={'d_fin_prev'}
                    label={I18n.t(`pages.interventionR.table.datePrev`)}
                    valuePropName={'d_fin_prev'}
                >
                    {interventions?.d_fin_prev ? (
                        <Input
                            value={interventions?.d_fin_prev}
                            disabled
                        />
                    ) : (
                        <DatePicker
                            locale={locale}
                            format="YYYY-MM-DD"
                        />
                    )}
                </Form.Item>

                {/* Champ pour la date de clôture */}
                <Form.Item
                    name={'d_clos'}
                    label={I18n.t(`pages.interventionR.table.dateS`)}
                    valuePropName={'d_clos'}
                >
                    {interventions?.d_clos ? (
                        <Input
                            value={interventions?.d_clos}
                            disabled
                        />
                    ) : (
                        <DatePicker
                            locale={locale}
                            format="YYYY-MM-DD"
                        />
                    )}
                </Form.Item>

                {/* Champ pour le nombre d'heures à l'atelier */}
                <Form.Item
                    name={'nb_heure_atelier'}
                    label={I18n.t(`pages.interventionR.table.atelier`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.intervention.requiredMessageAtelier`),
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: I18n.t('fields.intervention.patternAtelier')
                        },
                    ]}
                >
                    <Input
                        placeholder={I18n.t('fields.intervention.placeholderAtelier')}
                    />
                </Form.Item>
            </Form>
        </Container>
    )
}

InterventionsModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    reparation: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

InterventionsModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...InterventionsActions, ...IntervenantActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(InterventionsModal);
