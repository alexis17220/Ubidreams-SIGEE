import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as TypeServActions} from 'Resources/TypeServRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';

const TypeServModal = ({
                           visible,
                           loading,
                           headerText,
                           title,
                           onCancel,
                           typeServ,
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

    // Réinitialisation du formulaire lorsque le type de service change
    useEffect(() => form.resetFields(), [typeServ]);

    // Fonction pour annuler et fermer la modal
    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    // Fonction pour gérer la validation et la soumission du formulaire
    const handleOk = () => {
        form
            .validateFields(['nom'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                };

                if (typeServ != null) {
                    if (nom !== typeServ.nom) {
                        updateTypeServ(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createTypeServ(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    };

    // Fonction pour créer un type de service dans la base de données
    const createTypeServ = (data) => {
        actions
            .createTypeServ(data)
            .then(() => {
                message.success(I18n.t(`success.typeServ.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeServ.create`));
            });
    };
    // Fonction pour mettre à jour un type de service dans la base de données
    const updateTypeServ = (data) => {
        actions
            .updateTypeServTypeServ({
                id: typeServ.id_type_serv,
                nom: data.nom,
            })
            .then(() => {
                message.success(I18n.t(`success.typeServ.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeServ.update`));
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
                <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        ['nom']: typeServ?.nom,
                    }}
                >
                    {/* Champ de saisie pour le nom du type de service */}
                    <Form.Item
                        name={'nom'}
                        label={I18n.t(`pages.typeServ.table.name`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.typeServ.requiredMessageName`),
                            },
                            {
                                max: 10,
                                message: I18n.t(`fields.typeServ.patternLength`),
                            },
                            {
                                pattern: /^[a-zA-Z0-9\-\s]+$/,
                                message: I18n.t(`fields.typeServ.patternName`),
                            },
                        ]}
                    >
                        <Input
                            prefix={<TagsOutlined/>}
                            placeholder={I18n.t(`fields.typeServ.placeholderName`)}
                        />
                    </Form.Item>
                </Form>
            </Container>
        )
    );
};

// Spécification des types de props attendues par le composant TypeServModal
TypeServModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    typeServ: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Valeurs par défaut pour certaines props
TypeServModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

// Connexion du composant au store Redux et mapping des actions
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeServActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(TypeServModal);
