import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals'; // Import du composant Container (probablement une modal)
import PropTypes from 'prop-types';
import {Form, Input, message, Select} from 'antd'; // Import des composants de formulaire, de message et de sélection de la bibliothèque antd (Ant Design)
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {TagsOutlined} from '@ant-design/icons'; // Import de l'icône TagsOutlined de la bibliothèque antd
import {actions as IntervenantsActions} from 'Resources/IntervenantRessources'; // Actions liées aux intervenants
import {actions as TypeIntervenantsActions} from 'Resources/TypeIntervenantRessources'; // Actions liées aux types d'intervenants
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";
import axios from "axios";
import {baseURL} from "Resources";

const IntervenantModal = ({
                              visible,
                              loading,
                              headerText,
                              title,
                              onCancel,
                              intervenant,
                              onOk,
                              actions,
                          }) => {
    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 19,
        },
    };

    const [form] = Form.useForm(); // Initialisation du formulaire (avec les valeurs des champs contrôlées par le formulaire)
    const nom = Form.useWatch('nom', form); // Surveillance des changements du champ 'nom'
    const id_type_intervenant = Form.useWatch('id_type_intervenant', form); // Surveillance des changements du champ 'id_type_intervenant'
    const [typeIntervenantValues, setTypeIntervenantValues] = useState([]); // État pour stocker les valeurs des types d'intervenants

    useEffect(() => form.resetFields(), [intervenant]); // Remise à zéro des champs du formulaire lorsque 'intervenant' change

    const doCancel = () => {
        onCancel();
        form.resetFields(); // Annule l'action en cours et remet à zéro les champs du formulaire
    };

    const handleOk = () => {
        form
            .validateFields(['nom', 'id_type_intervenant']) // Vérification des champs 'nom' et 'id_type_intervenant'
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                    id_type_intervenant: id_type_intervenant,
                };

                if (intervenant != null) {
                    // Si un intervenant est déjà sélectionné pour édition
                    if (nom !== intervenant.nom || id_type_intervenant !== intervenant.id_type_intervenant) {
                        updateIntervenants(data); // Met à jour les données de l'intervenant
                    } else {
                        doCancel(); // Annule l'action si les valeurs du formulaire n'ont pas changé
                    }
                } else {
                    createIntervenants(data); // Crée un nouvel intervenant avec les données du formulaire
                    form.resetFields(); // Remet à zéro les champs du formulaire après création
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e)); // Affiche un message d'erreur si la validation échoue
            });
    };

    /*
     * Création d'un intervenant en base de données
     */
    const createIntervenants = (data) => {
        actions
            .createIntervenants(data)
            .then(() => {
                message.success(I18n.t(`success.intervenant.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.intervenant.create`));
            });
    };

    /*
     * Mise à jour d'un intervenant en base de données
     */
    const updateIntervenants = (data) => {
        actions
            .updateIntervenantIntervenants({
                id: intervenant.id_intervenant,
                nom: data.nom,
                id_type_intervenant: data.id_type_intervenant,
            })
            .then(() => {
                message.success(I18n.t(`success.intervenant.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.intervenant.update`));
            });
    };

    // Récupère les données des types d'intervenants à partir de l'API
    useEffect(() => {
        axios.get(`${baseURL}/typeIntervenant/`)
            .then((response) => {
                setTypeIntervenantValues(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    }, []);

    // Fonction pour récupérer les données des types d'intervenants en utilisant les actions Redux
    const getTypeIntervenantData = () => {
        actions
            .getTypeIntervenant()
            .then(({body: value}) => {
                setTypeIntervenantValues(value.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeIntervenant.fetch`));
            });
    };

    // Appelle la fonction pour récupérer les données des types d'intervenants lors du chargement du composant
    useEffect(() => {
        getTypeIntervenantData();
    }, []);

    // Composant de sélection pour les types d'intervenants
    const TypeIntervenantSelector = () => {
        return (
            <Select placeholder={I18n.t(`fields.intervenant.placeholderType`)}>
                {typeIntervenantValues.map((typeIntervenants) => {
                    return (
                        <Select.Option key={typeIntervenants.categorie} value={typeIntervenants.id_type_intervenant}>
                            {I18n.t(`${typeIntervenants.categorie}`)}
                        </Select.Option>
                    );
                })}
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
                    ['nom']: intervenant?.nom,
                    ['id_type_intervenant']: intervenant?.id_type_intervenant.id_type_intervenant,
                }}
            >
                {/* Champ de saisie du nom de l'intervenant */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.intervenant.table.nom`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.intervenant.requiredMessageNom`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.intervenant.patternNom`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.intervenant.placeholderNom`)}
                    />
                </Form.Item>
                {/* Sélection d'un type d'intervenant */}
                <Form.Item
                    name={'id_type_intervenant'}
                    label={I18n.t(`pages.intervenant.table.intervenant`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.intervenant.requiredMessageType`),
                        },
                    ]}
                >
                    {TypeIntervenantSelector()}
                </Form.Item>
            </Form>
        </Container>
    );
};

IntervenantModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    intervenant: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

IntervenantModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...IntervenantsActions, ...TypeIntervenantsActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(IntervenantModal);
