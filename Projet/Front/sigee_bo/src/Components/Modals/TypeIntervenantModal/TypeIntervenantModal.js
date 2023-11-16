import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as TypeIntervenantsActions} from 'Resources/TypeIntervenantRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';

const TypeIntervenantModal = ({
                                  visible,
                                  loading,
                                  headerText,
                                  title,
                                  onCancel,
                                  typeIntervenant,
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
    const categorie = Form.useWatch('categorie', form);

    // Réinitialisation du formulaire lorsque le type d'intervenant change
    useEffect(() => form.resetFields(), [typeIntervenant]);

    // Fonction pour annuler et fermer la modal
    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    // Fonction pour gérer la validation et la soumission du formulaire
    const handleOk = () => {
        form
            .validateFields(['categorie'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    categorie: categorie,
                };
                if (typeIntervenant != null) {
                    if (categorie !== typeIntervenant.categorie) {
                        updateTypeIntervenants(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createTypeIntervenants(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    };

    // Fonction pour créer un type d'intervenant dans la base de données
    const createTypeIntervenants = (data) => {
        actions
            .createTypeIntervenant(data)
            .then(() => {
                message.success(I18n.t(`success.type.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.type.create`));
            });
    };

    // Fonction pour mettre à jour un type d'intervenant dans la base de données
    const updateTypeIntervenants = (data) => {
        actions
            .updateTypeIntervenantTypeIntervenant({
                id: typeIntervenant.id_type_intervenant,
                categorie: data.categorie,
            })
            .then(() => {
                message.success(I18n.t(`success.type.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.type.update`));
            });
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
                <Form {...formItemLayout} form={form} initialValues={{['categorie']: typeIntervenant?.categorie}}>
                    {/* Champ de saisie pour le nom du type d'intervenant */}
                    <Form.Item
                        name={'categorie'}
                        label={I18n.t(`pages.type.table.categorie`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeIntervenant.requiredMessageType`),
                            },
                            {
                                pattern: /^[a-zA-Z0-9\-\s:]+$/,
                                message: I18n.t(`fields.typeIntervenant.patternType`),
                            },
                        ]}
                    >
                        <Input prefix={<TagsOutlined/>} placeholder={I18n.t(`fields.typeIntervenant.placeholderType`)}/>
                    </Form.Item>
                </Form>
            </Container>
        )
    );
};

// Spécification des types de props attendues par le composant TypeIntervenantModal
TypeIntervenantModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    typeIntervenant: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Valeurs par défaut pour certaines props
TypeIntervenantModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

// Connexion du composant au store Redux et mapping des actions
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeIntervenantsActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(TypeIntervenantModal);
