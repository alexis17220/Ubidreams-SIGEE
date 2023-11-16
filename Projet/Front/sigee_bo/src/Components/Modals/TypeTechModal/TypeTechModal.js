import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as TypeTechActions} from 'Resources/TypeTechRessources';
import {actions as GammesActions} from 'Resources/GammesRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseURL} from 'Resources';

const TypeTechModal = ({
                           visible,
                           loading,
                           headerText,
                           title,
                           onCancel,
                           typeTech,
                           onOk,
                           actions,
                       }) => {
    // Mise en place de la mise en page des éléments du formulaire
    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 19,
        },
    };

    // Utilisation du hook useState pour gérer l'état du formulaire
    const [form] = Form.useForm();
    const nom = Form.useWatch('nom', form);
    const libelle = Form.useWatch('libelle', form);
    const gamme = Form.useWatch('id_type_gamme', form);
    const [gammeValues, setGammeValues] = useState([]);

    // Réinitialisation du formulaire lorsque le type de technologie change
    useEffect(() => form.resetFields(), [typeTech]);

    // Fonction pour annuler et fermer la modal
    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    // Fonction pour gérer la validation et la soumission du formulaire
    const handleOk = () => {
        form
            .validateFields(['nom', 'id_type_gamme', 'libelle'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                    id_type_gamme: gamme,
                    libelle: libelle,
                };

                if (typeTech != null) {
                    if (
                        nom !== typeTech.nom ||
                        gamme !== typeTech.id_type_gamme ||
                        libelle !== typeTech.libelle
                    ) {
                        updateTypeTech(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createTypeTech(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    };

    // Fonction pour créer un type de technologie dans la base de données
    const createTypeTech = (data) => {
        actions
            .createTypeTech(data)
            .then(() => {
                message.success(I18n.t(`success.typeTech.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeTech.create`));
            });
    };

    // Fonction pour mettre à jour un type de technologie dans la base de données
    const updateTypeTech = (data) => {
        actions
            .updateTypeTechTypeTech({
                id: typeTech.id_type_tech,
                nom: data.nom,
                id_type_gamme: data.id_type_gamme,
                libelle: data.libelle,
            })
            .then(() => {
                message.success(I18n.t(`success.typeTech.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeTech.update`));
            });
    };

    // Récupération des données de la liste des gammes depuis l'API
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`${baseURL}/gammes/`)
            .then((response) => {
                setData(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.gamme.fetch`));
            });
    }, []);

    // Récupération des données de la liste des gammes depuis le Redux Store
    const getGammeData = () => {
        actions
            .getGammes()
            .then(({body: value}) => {
                setGammeValues(value.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.gamme.fetch`));
            });
    };

    useEffect(() => {
        getGammeData();
    }, []);

    // Affichage du sélecteur pour la gamme de la technologie
    const gammeSelector = () => {
        return (
            <Select placeholder={I18n.t('fields.gamme.placeholder')}>
                {gammeValues.map((gamme) => {
                    return (
                        <Select.Option key={gamme.nom} value={gamme.id_type_gamme}>
                            {I18n.t(`${gamme.nom}`)}
                        </Select.Option>
                    );
                })}
            </Select>
        );
    };

    return (
        // Affichage de la modal si visible est true
        visible && (
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
                        ['nom']: typeTech?.nom,
                        ['id_type_gamme']: typeTech?.id_type_gamme.nom,
                        ['libelle']: typeTech?.libelle,
                    }}
                >
                    {/* Champ de saisie pour le nom de la technologie */}
                    <Form.Item
                        name={'nom'}
                        label={I18n.t(`pages.typeTech.table.name`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeTech.requiredMessageName`),
                            },
                            {
                                max: 20,
                                message: I18n.t(`fields.typeTech.patternLength`),
                            },
                            {
                                pattern: /^[a-zA-Z0-9\-\s]+$/,
                                message: I18n.t(`fields.typeTech.patternName`),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t('Nom')}/>
                    </Form.Item>

                    {/* Champ de saisie pour le libellé de la technologie */}
                    <Form.Item
                        name={'libelle'}
                        label={I18n.t(`pages.typeTech.table.libelle`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeTech.requiredMessageLibelle`),
                            },
                            {
                                pattern: /^[a-zA-Z0-9\-\s+]+$/,
                                message: I18n.t(`fields.typeTech.patternLibelle`),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t('Libellé')}/>
                    </Form.Item>

                    {/* Sélecteur pour la gamme de la technologie */}
                    <Form.Item
                        name={'id_type_gamme'}
                        label={I18n.t(`pages.typeTech.table.gamme`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeTech.requiredMessageGamme`),
                            },
                        ]}
                    >
                        {gammeSelector()}
                    </Form.Item>
                </Form>
            </Container>
        )
    );
};

// Spécification des types de props attendues par le composant TypeTechModal
TypeTechModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    typeTech: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Valeurs par défaut pour certaines props
TypeTechModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

// Connexion du composant au store Redux et mapping des actions
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeTechActions, ...GammesActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(TypeTechModal);
