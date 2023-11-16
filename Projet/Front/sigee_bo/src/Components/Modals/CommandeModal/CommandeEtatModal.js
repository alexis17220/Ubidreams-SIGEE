// Importations des modules nécessaires
import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as CommandeEtatActions} from 'Resources/CommandeEtatRessource';
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

// Définition du composant ClassificationModal
const ClassificationModal = ({
                                 visible,
                                 loading,
                                 headerText,
                                 title,
                                 onCancel,
                                 commandeEtat,
                                 onOk,
                                 actions,
                             }) => {
    // Configuration du layout du formulaire
    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 19,
        },
    }

    // Initialisation du formulaire
    const [form] = Form.useForm();

    // Utilisation du "watcher" pour obtenir la valeur des champs 'nom' et 'couleur2' du formulaire
    const nom = Form.useWatch('nom', form);
    const couleur = Form.useWatch('couleur2', form);

    // Effet pour réinitialiser le formulaire lorsque la prop "commandeEtat" change
    useEffect(() => form.resetFields(), [commandeEtat]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        onCancel();
        form.resetFields();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleOk = () => {
        form.validateFields(['nom', 'couleur2'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                    couleur2: couleur,
                }
                if (commandeEtat != null) {
                    if (nom !== commandeEtat.nom || couleur !== commandeEtat.couleur2) {
                        updateCommandeEtat(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createCommandeEtat(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            })
    }

    /*
     * Création d'une commandeEtat en base de données
     */
    const createCommandeEtat = (data) => {
        actions.createCommandeEtat(data)
            .then(() => {
                message.success(I18n.t(`success.etatCommande.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.etatCommande.create`));
            })
    }

    /*
     * Mise à jour d'une commandeEtat en base de données
     */
    const updateCommandeEtat = (data) => {
        actions.updateCommandeEtatCommandeEtat({
            id: commandeEtat.id,
            nom: data.nom,
            couleur2: data.couleur2,
        })
            .then(() => {
                message.success(I18n.t(`success.etatCommande.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.etatCommande.update`));
            })
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
                initialValues={{
                    ['nom']: commandeEtat?.nom,
                    ['couleur2']: commandeEtat?.couleur2,
                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.etatCommande.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.etatCommande.requiredMessageName`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.etatCommande.patternName`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.etatCommande.placeholderName`)}
                        maxLength={20}
                    />
                </Form.Item>
                {/* Couleur */}
                <Form.Item
                    name={'couleur2'}
                    label={I18n.t(`pages.etatCommande.colors`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.etatCommande.requiredMessageColors`),
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: I18n.t(`fields.etatCommande.patternColors`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.etatCommande.placeholderColors`)}
                        maxLength={20}
                    />
                </Form.Item>
            </Form>
        </Container>
    )
}

// Propriétés attendues du composant
ClassificationModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    commandeEtat: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

// Valeurs par défaut pour les props du composant
ClassificationModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

// Connexion du composant au store Redux
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...CommandeEtatActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(ClassificationModal)
