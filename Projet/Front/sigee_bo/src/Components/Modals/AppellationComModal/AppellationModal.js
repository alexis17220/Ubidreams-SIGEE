// Importations des modules nécessaires
import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as AppellationsActions} from 'Resources/AppellationComRessources';
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

// Définition du composant AppellationModal
const AppellationModal = ({
                              visible,
                              loading,
                              headerText,
                              title,
                              onCancel,
                              appellation,
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

    // Utilisation des "watchers" pour obtenir les valeurs de certains champs du formulaire
    const nom = Form.useWatch('nom', form);

    // Effet pour réinitialiser le formulaire lorsque la prop "appellation" change
    useEffect(() => form.resetFields(), [appellation]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        onCancel();
        form.resetFields();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleOk = () => {
        form.validateFields(['nom'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                }

                if (appellation != null) {
                    if (nom !== appellation.nom) {
                        updateAppellations(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createAppellations(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    }

    /*
     * Création d'une appellation en base de données
     */
    const createAppellations = (data) => {
        actions.createAppellations(data)
            .then(() => {
                message.success(I18n.t(`success.appellation.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`error.appellation.create`));
            });
    }

    /*
     * Mise à jour d'une appellation en base de données
     */
    const updateAppellations = (data) => {
        actions.updateAppellationAppellations({
            id: appellation.id_appellation,
            nom: data.nom,
        })
            .then(() => {
                message.success(I18n.t(`success.appellation.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`error.appellation.update`));
            });
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
                    ['nom']: appellation?.nom,
                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.appellation.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.appellation.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s.]+$/,
                            message: I18n.t(`fields.appellation.pattern`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.appellation.placeholder`)}
                    />
                </Form.Item>
            </Form>
        </Container>
    )
}

// Propriétés attendues du composant
AppellationModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    appellation: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

// Valeurs par défaut pour les props du composant
AppellationModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

// Connexion du composant au store Redux
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AppellationsActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(AppellationModal);
