import {Checkbox, DatePicker, Form, Input} from 'antd'
import I18n from 'I18n'

import React from 'react'
import PropTypes from 'prop-types'
import UploadFile from "Components/Values/UploadFile";

//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 7/7)
 * fichier/SIC
 */
const Etape7Form = ({
                        formItemLayout,
                        engin,
                        form,
                        cle,
                        titre,
                        dateFin,
                        rfgi,
                        tag,
                        tracteur,
                        setFile


                    }) => {

    return (
        <Form
            encType="multipart/form-data"
            autoComplete="off"
            form={form}
            initialValues={{
                ['cle']: engin?.cle,
                ['titre']: engin?.titre,
                ['dateFin']: engin?.dateFin,
                ['lien']: engin?.id_document.lien,
                ['rfgi']: engin?.id_engin ? engin.id_radio?.rfgi : engin?.id_engin.id_radio,
                ['tag']: engin?.id_engin ? engin.code_tag : engin?.id_engin.code_tag,
                ['tracteur']: engin?.id_engin ? engin?.tracteur : engin?.id_engin.tracteur,

            }}
        >
            <Form.Item
                name='cle'
                label={I18n.t(`pages.engin.table.cle`)}
                valuePropName="checked"
            >
                <Checkbox>{I18n.t(`fields.engin.cle`)}</Checkbox>
            </Form.Item>
            {/*Titre*/}
            {(engin && engin.id_engin) ? null : (
                <>
                    <Form.Item
                        label={I18n.t(`pages.engin.table.titre`)}
                        name="titre"
                        rules={[
                            {
                                pattern: /^[a-zA-Z0-9\-\s]+$/,
                                message: I18n.t(`fields.engin.patternTitre`),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t(`fields.engin.placeholderTitre`)}/>
                    </Form.Item>

                    <Form.Item
                        label={I18n.t(`pages.engin.table.dateFin`)}
                        name="dateFin"
                    >
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item
                        label={I18n.t(`pages.engin.table.file`)}
                        name="lien"
                    >
                        <UploadFile elementName={engin?.id_document?.lien} setFile={setFile} maxCount={1}/>
                    </Form.Item>
                </>
            )}
            {engin?.id_engin && (
                <>
                    <Form.Item
                        label={I18n.t(`pages.engin.table.rfgi`)}
                        name="rfgi"
                        rules={[
                            {
                                pattern: /^[0-9\-\s]+$/,
                                message: I18n.t(`fields.engin.patternRfgi`),
                            },
                        ]}
                    >
                        {
                            engin?.id_engin ? (
                                engin?.id_radio?.rfgi ? (
                                    <Input
                                        value={engin.id_radio.rfgi}
                                        disabled
                                    />
                                ) : (

                                    <Input placeholder={I18n.t(`fields.engin.placeholderRfgi`)}/>
                                )
                            ) : (
                                <Input placeholder={I18n.t(`fields.engin.placeholderRfgi`)}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        label={I18n.t(`pages.engin.table.codeTag`)}
                        name="tag"
                        rules={[
                            {
                                pattern: /^[0-9\-\s]+$/,
                                message: I18n.t(`fields.engin.patternCodeTag`),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t(`fields.engin.placeholderCodeTag`)}/>
                    </Form.Item>
                    <Form.Item
                        label={I18n.t(`pages.engin.table.tracteur`)}
                        name="tracteur"
                        valuePropName="checked"

                    >
                        <div className="row">
                            <div className="col-lg-3">
                            </div>
                            <div className="col-lg-6">
                                <Checkbox
                                    defaultChecked={engin.tracteur === 1}>{I18n.t('fields.engin.tracteur')}</Checkbox>
                            </div>
                            <div className="col-lg-4">
                            </div>
                        </div>
                    </Form.Item>

                </>
            )}


        </Form>
    )
}

Etape7Form.propTypes = {
    formItemLayout: PropTypes.object,
    engin: PropTypes.object,
    form: PropTypes.any,
    cle: PropTypes.array,
    titre: PropTypes.array,
    dateFin: PropTypes.array,
}

export default Etape7Form
