import React, {useEffect} from 'react';
import {Container} from 'Components/Modals'; // Import du composant Container (probablement une modal)
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd'; // Import des composants de formulaire et de message de la bibliothèque antd (Ant Design)
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {TagsOutlined} from '@ant-design/icons'; // Import de l'icône TagsOutlined de la bibliothèque antd
import {actions as EquipeursActions} from 'Resources/EquipeursRessource'; // Actions liées aux équipeurs
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const EquipeurModal = ({
                           visible,
                           loading,
                           headerText,
                           title,
                           onCancel,
                           equipeur,
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

    useEffect(() => form.resetFields(), [equipeur]); // Remise à zéro des champs du formulaire lorsque 'equipeur' change

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

                if (equipeur != null) {
                    // Si un équipeur est déjà sélectionné pour édition
                    if (nom !== equipeur.nom) {
                        updateEquipeurs(data); // Met à jour les données de l'équipeur
                    } else {
                        doCancel(); // Annule l'action si les valeurs du formulaire n'ont pas changé
                    }
                } else {
                    createEquipeurs(data); // Crée un nouvel équipeur avec les données du formulaire
                    form.resetFields(); // Remet à zéro les champs du formulaire après création
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.forme`), console.log(e)); // Affiche un message d'erreur si la validation échoue
            });
    };

    /*
     * Création d'un équipeur en base de données
     */
    const createEquipeurs = (data) => {
        actions
            .createEquipeurs(data) // Appelle l'action 'createEquipeurs' pour créer un nouvel équipeur
            .then(() => {
                message.success(I18n.t(`success.equipeur.create`)); // Affiche un message de succès après la création de l'équipeur
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipeur.create`)); // Affiche un message d'erreur en cas d'échec de création de l'équipeur
            });
    };

    /*
     * Mise à jour d'un équipeur en base de données
     */
    const updateEquipeurs = (data) => {
        actions
            .updateEquipeurEquipeurs({
                id: equipeur.id_equipeur, // ID de l'équipeur à mettre à jour
                nom: data.nom,
            })
            .then(() => {
                message.success(I18n.t(`success.equipeur.update`)); // Affiche un message de succès après la mise à jour de l'équipeur
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipeur.update`)); // Affiche un message d'erreur en cas d'échec de mise à jour de l'équipeur
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
                    ['nom']: equipeur?.nom,
                }}
            >
                {/* Champ de saisie du nom de l'équipeur */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.equipeur.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipeur.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s.]+$/,
                            message: I18n.t(`fields.equipeur.pattern`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.equipeur.placeholder`)}
                    />
                </Form.Item>
            </Form>
        </Container>
    );
};

EquipeurModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    equipeur: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

EquipeurModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipeursActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(EquipeurModal);
