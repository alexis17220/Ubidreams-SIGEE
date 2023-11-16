import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as TypeOpsActions} from 'Resources/TypeOpsRessources';
import {actions as ClassificationsActions} from 'Resources/ClassificationRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseURL} from 'Resources';

const TypeOPSModal = ({
                          visible,
                          loading,
                          headerText,
                          title,
                          onCancel,
                          typeOps,
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
    const genre = Form.useWatch('id_type_genre', form);
    const [genreValues, setGenreValues] = useState([]);

    // Réinitialisation du formulaire lorsque le type d'OPS change
    useEffect(() => form.resetFields(), [typeOps]);

    // Fonction pour annuler et fermer la modal
    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    // Fonction pour gérer la validation et la soumission du formulaire
    const handleOk = () => {
        form
            .validateFields(['nom', 'id_type_genre'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                    id_type_genre: genre,
                };

                if (typeOps != null) {
                    if (nom !== typeOps.nom || genre !== typeOps.id_type_genre) {
                        updateTypeOps(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createTypeOps(data);
                    form.resetFields();
                }
            })
            .catch(() => {
                message.error(I18n.t(`errors.form`));
            });
    };

    // Fonction pour créer un type d'OPS dans la base de données
    const createTypeOps = (data) => {
        actions
            .createTypeOPS(data)
            .then(() => {
                message.success(I18n.t(`success.typeOps.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeOps.create`));
            });
    };

    // Fonction pour mettre à jour un type d'OPS dans la base de données
    const updateTypeOps = (data) => {
        actions
            .updateTypeOpsTypeOPS({
                id: typeOps.id_type_ops,
                nom: data.nom,
                id_type_genre: data.id_type_genre,
            })
            .then(() => {
                message.success(I18n.t(`success.typeOps.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeOps.update`));
            });
    };

    // Utilisation du hook useEffect pour récupérer les données des classifications depuis l'API
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`${baseURL}/classifications/`)
            .then((response) => {
                setData(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.fetch`));
            });
    }, []);

    // Utilisation du hook useEffect pour récupérer les genres disponibles depuis l'API
    const getGenreData = () => {
        actions
            .getClassifications()
            .then(({body: value}) => {
                setGenreValues(value.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.fetch`));
            });
    };
    useEffect(() => {
        getGenreData();
    }, []);

    // Affichage du selector de classification
    const genreSelector = () => {
        return (
            <Select placeholder={I18n.t('fields.typeOps.placeholderGenre')}>
                {genreValues.map((genre) => {
                    return (
                        <Select.Option key={genre.nom} value={genre.id_type_genre}>
                            {I18n.t(`${genre.nom}`)}
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
                        ['nom']: typeOps?.nom,
                        ['id_type_genre']: typeOps?.id_type_genre.nom,
                    }}
                >
                    {/* Champ de saisie pour le nom du type d'OPS */}
                    <Form.Item
                        name={'nom'}
                        label={I18n.t(`pages.typeOps.table.name`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeOps.requiredMessageName`),
                            },
                            {
                                pattern: /^[a-zA-Z0-9\-\s.]+$/,
                                message: I18n.t(`fields.typeOps.patternName`),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t(`fields.typeOps.placeholderName`)}/>
                    </Form.Item>
                    {/* Sélecteur pour la classification */}
                    <Form.Item
                        name={'id_type_genre'}
                        label={I18n.t(`fields.typeOps.placeholderGenre`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeOps.requiredMessageGenre`),
                            },
                        ]}
                    >
                        {genreSelector()}
                    </Form.Item>
                </Form>
            </Container>
        )
    );
};

// Spécification des types de props attendues par le composant TypeOPSModal
TypeOPSModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    typeOps: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Valeurs par défaut pour certaines props
TypeOPSModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

// Connexion du composant au store Redux et mapping des actions
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeOpsActions, ...ClassificationsActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(TypeOPSModal);
