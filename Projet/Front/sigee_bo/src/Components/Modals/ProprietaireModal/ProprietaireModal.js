import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {TagsOutlined} from '@ant-design/icons';
import {actions as ProprietaireActions} from 'Resources/ProprietairesRessource';
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const PropritaireModal = ({
                              visible,
                              loading,
                              headerText,
                              title,
                              onCancel,
                              proprietaires,
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
    }

    const [form] = Form.useForm()
    const code = Form.useWatch('code_proprietaire', form)
    const libelle = Form.useWatch('libelle', form)

    useEffect(() => form.resetFields(), [proprietaires])

    const doCancel = () => {
        onCancel()
        form.resetFields()
    }

    const handleOk = () => {
        form
            .validateFields(['code_proprietaire', 'libelle'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    code_proprietaire: code,
                    libelle: libelle,

                }

                if (proprietaires != null) {
                    if (code !== proprietaires.code_proprietaire || libelle !== proprietaires.libelle) {
                        updateProprietaire(data)
                    } else {
                        doCancel()
                    }
                } else {
                    createProprietaire(data)
                    form.resetFields()
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e))
            })
    }

    /*
     * Création d'une proprietaire en base de données
     */
    const createProprietaire = (data) => {
        actions
            .createProprietaires(data)
            .then(() => {
                message.success(I18n.t(`success.proprietaire.create`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.proprietaire.create`))
            })
    }

    /*
     * Mise à jour d'une proprietaire en base de données
     */
    const updateProprietaire = (data) => {
        actions
            .updateProprietaireProprietaires({
                id: proprietaires.idproprietaire,
                code_proprietaires: data.code,
                libelle: data.libelle,

            })
            .then(() => {
                message.success(I18n.t(`success.proprietaire.update`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.proprietaire.update`))
            })
    }

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
                    ['code_proprietaire']: proprietaires?.code_proprietaire,
                    ['libelle']: proprietaires?.libelle,

                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'code_proprietaire'}
                    label={I18n.t(`pages.proprietaire.table.code`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.proprietaire.requiredMessageCode`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s.]+$/,
                            message: I18n.t(`fields.proprietaire.patternCode`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.proprietaire.placeholderCode`)}
                    />
                </Form.Item>
                <Form.Item
                    name={'libelle'}
                    label={I18n.t(`pages.proprietaire.table.libelle`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.proprietaire.requiredMessageLibelle`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s.]+$/,
                            message: I18n.t(`fields.proprietaire.patternLibelle`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.proprietaire.placeholderLibelle`)}
                    />
                </Form.Item>
            </Form>
        </Container>
    )
}

PropritaireModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    proprietaires: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

PropritaireModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ProprietaireActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(PropritaireModal);
