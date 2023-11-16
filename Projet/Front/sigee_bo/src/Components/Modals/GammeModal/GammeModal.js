import React, {useEffect} from 'react';
import {Container} from 'Components/Modals'; // Import du composant Container (probablement une modal)
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd'; // Import des composants de formulaire et de message de la bibliothèque antd (Ant Design)
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {TagsOutlined} from '@ant-design/icons'; // Import de l'icône TagsOutlined de la bibliothèque antd
import {actions as GammesActions} from 'Resources/GammesRessources'; // Actions liées aux gammes
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const GammeModal = ({
                        visible,
                        loading,
                        headerText,
                        title,
                        onCancel,
                        gamme,
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

    useEffect(() => form.resetFields(), [gamme]); // Remise à zéro des champs du formulaire lorsque 'gamme' change

    const doCancel = () => {
        onCancel();
        form.resetFields(); // Annule l'action en cours et remet à zéro les champs du formulaire
    };

    const handleOk = () => {
        form
            .validateFields(['nom']) // Vérification du champ 'nom'
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                };

                if (gamme != null) {
                    // Si une gamme est déjà sélectionnée pour édition
                    if (nom !== gamme.nom) {
                        updateGammes(data); // Met à jour les données de la gamme
                    } else {
                        doCancel(); // Annule l'action si les valeurs du formulaire n'ont pas changé
                    }
                } else {
                    createGammes(data); // Crée une nouvelle gamme avec les données du formulaire
                    form.resetFields(); // Remet à zéro les champs du formulaire après création
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.forme`), console.log(e)); // Affiche un message d'erreur si la validation échoue
            });
    };

    /*
     * Création d'une gamme en base de données
     */
    const createGammes = (data) => {
        actions
            .createGammes(data) // Appelle l'action 'createGammes' pour créer une nouvelle gamme
            .then(() => {
                message.success(I18n.t(`success.gamme.create`)); // Affiche un message de succès après la création de la gamme
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.gamme.create`)); // Affiche un message d'erreur en cas d'échec de création de la gamme
            });
    };

    /*
     * Mise à jour d'une gamme en base de données
     */
    const updateGammes = (data) => {
        actions
            .updateGammeGammes({
                id: gamme.id_type_gamme, // ID de la gamme à mettre à jour
                nom: data.nom,
            })
            .then(() => {
                message.success(I18n.t(`success.gamme.update`)); // Affiche un message de succès après la mise à jour de la gamme
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.gamme.update`)); // Affiche un message d'erreur en cas d'échec de mise à jour de la gamme
            });
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
                    ['nom']: gamme?.nom,
                }}
            >
                {/* Champ de saisie du nom de la gamme */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.gamme.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.gamme.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.gamme.pattern`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.gamme.placeholder`)}
                    />
                </Form.Item>
            </Form>
        </Container>
    );
};

GammeModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    gamme: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

GammeModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...GammesActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(GammeModal);
