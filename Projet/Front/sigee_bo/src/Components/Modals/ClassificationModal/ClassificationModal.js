// Importations des modules nécessaires
import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as ClassificationsActions} from 'Resources/ClassificationRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';

// Définition du composant ClassificationModal
const ClassificationModal = ({
                                 visible,
                                 loading,
                                 headerText,
                                 title,
                                 onCancel,
                                 classification,
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

    // Utilisation du "watcher" pour obtenir la valeur du champ 'nom' du formulaire
    const nom = Form.useWatch('nom', form);

    // Effet pour réinitialiser le formulaire lorsque la prop "classification" change
    useEffect(() => {
        form.resetFields();
    }, [classification]);

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

                if (classification != null) {
                    if (nom !== classification.nom) {
                        updateClassifications(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createClassifications(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    }

    /*
     * Création d'une classification en base de données
     */
    const createClassifications = (data) => {
        actions.createClassifications(data)
            .then(() => {
                message.success(I18n.t(`success.classification.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.create`));
            });
    }

    /*
     * Mise à jour d'une classification en base de données
     */
    const updateClassifications = (data) => {
        actions.updateClassificationClassifications({
            id: classification.id_type_genre,
            nom: data.nom,
        })
            .then(() => {
                message.success(I18n.t(`success.classification.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.update`));
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
                    ['nom']: classification?.nom,
                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.classification.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.classification.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s]+$/,
                            message: I18n.t(`fields.classification.pattern`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.classification.placeholder`)}
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
    classification: PropTypes.object,
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
    actions: bindActionCreators({...ClassificationsActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(ClassificationModal)
