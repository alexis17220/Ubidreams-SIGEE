import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {actions as TypeAttelageActions} from 'Resources/TypeAttelageRessources';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';

const TypeAttelageModal = ({
                               visible,
                               loading,
                               headerText,
                               title,
                               onCancel,
                               typeAttelage,
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

    const [form] = Form.useForm();
    const nom = Form.useWatch('nom', form);
    const temoinauteur = Form.useWatch('temoinauteur', form);
    const temoindate = Form.useWatch('temoindate', form);

    useEffect(() => form.resetFields(), [typeAttelage]);

    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    const handleOk = () => {
        form
            .validateFields(['nom', 'temoinauteur', 'temoindate'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                    temoinauteur: temoinauteur,
                    temoindate: new Date(),
                };

                if (typeAttelage != null) {
                    if (
                        nom !== typeAttelage.nom ||
                        temoinauteur !== typeAttelage.temoinauteur ||
                        temoindate !== typeAttelage.temoindate
                    ) {
                        updateTypeAttelage(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createTypeAttelage(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t('errors.form'), console.log(e));
            });
    };

    /*
     * Création d'un typeAttelage en base de données
     */
    const createTypeAttelage = (data) => {
        actions
            .createTypeAttelage(data)
            .then(() => {
                message.success(I18n.t('success.attelage.create'));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t('errors.attelage.create'));
            });
    };

    /*
     * Mise à jour d'un typeAttelage en base de données
     */
    const updateTypeAttelage = (data) => {
        actions
            .updateTypeAttelageTypeAttelage({
                id: typeAttelage.id_type_attelage,
                nom: data.nom,
                temoinauteur: data.temoinauteur,
                temoindate: data.temoindate,
            })
            .then(() => {
                message.success(I18n.t('success.attelage.update'));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t('errors.attelage.update'));
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
            >
                {/* Nom */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t('pages.attelage.table.name')}
                    rules={[
                        {
                            required: true,
                            message: I18n.t('fields.attelage.requiredMessage'),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\s]+$/,
                            message: I18n.t('fields.attelage.pattern'),
                        },
                    ]}
                    initialValue={typeAttelage?.nom}
                >
                    <Input placeholder={I18n.t('fields.attelage.placeholder')}/>
                </Form.Item>

            </Form>
        </Container>
    );
};

TypeAttelageModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    typeAttelage: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

TypeAttelageModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeAttelageActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(TypeAttelageModal);
