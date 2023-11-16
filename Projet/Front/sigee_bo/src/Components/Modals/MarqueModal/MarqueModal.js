import React, {useEffect, useState} from 'react'
import {Container} from 'Components/Modals'
import PropTypes from 'prop-types'
import {Form, Input, message, Upload, Button} from 'antd'
import I18n from 'I18n'
import {TagsOutlined, UploadOutlined} from '@ant-design/icons'
import {actions as MarquesActions} from 'Resources/MarquesRessources'
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const MarqueModal = ({
                        visible,
                        loading,
                        headerText,
                        title,
                        onCancel,
                        marque,
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
    const nom = Form.useWatch('nom', form)

    useEffect(() => form.resetFields(), [marque])

    const doCancel = () => {
        onCancel()
        form.resetFields()
    }

    const handleOk = () => {
        form
            .validateFields(['nom'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    nom: nom,
                }

                if (marque != null) {
                    if (nom !== marque.nom) {
                        updateMarques(data)
                    } else {
                        doCancel()
                    }
                } else {
                    createMarques(data)
                    form.resetFields()
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.forme`), console.log(e))
            })
    }
    /*
     * creation d'un proprietaires en base de données
     */
    const createMarques = (data) => {
        actions
            .createMarques(data)
            .then(() => {
                message.success(I18n.t(`success.marque.create`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.marque.create`))
            })
    }

    /*
     * update d'une catégorie en base de données
     */
    const updateMarques = (data) => {
        actions
            .updateMarqueMarques({
                id: marque.id_marque,
                nom: data.nom,

            })
            .then(() => {
                message.success(I18n.t(`success.marque.update`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.marque.update`))
            })
    }

    return visible &&(
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
                    ['nom']: marque?.nom,
                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'nom'}
                    label={I18n.t(`pages.marque.name`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.marque.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s.]+$/,
                            message: I18n.t(`fields.marque.pattern`),
                        },
                    ]}
                >
                    <Input
                        prefix={<TagsOutlined/>}
                        placeholder={I18n.t(`fields.marque.placeholder`)}
                    />
                </Form.Item>

            </Form>
        </Container>
    )
}
MarqueModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    marque: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,

}

MarqueModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...MarquesActions }, dispatch),
})

export default connect(null, mapDispatchToProps)(MarqueModal)
