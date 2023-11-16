import {DatePicker, Form, Input, Radio} from 'antd'
import I18n from 'I18n'

import React from 'react'
import PropTypes from 'prop-types'
import 'moment/locale/zh-cn';
//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 1/7)
 * Général
 */
const GeneralForm = ({
                         formItemLayout,
                         engin,
                         form,
                         immatriculation,
                         carrosserie,
                         dateService,
                         datePrem,
                         finValidite,
                         finAssure,
                         type,
                         vie
                     }) => {

    return (
        <div className="container-fluid">
            <Form
                {...formItemLayout}
                form={form}
                initialValues={{
                    ['immatriculation']: engin?.id_engin ? engin.immatriculation : engin?.id_engin.immatriculation,
                    ['carrosserie']: engin?.id_engin ? engin.carrosserie : engin?.id_engin.carrosserie,
                    ['dateService']: engin?.id_engin ? engin.d_entree_service : engin?.id_engin.d_entree_service,
                    ['finValidite']: engin?.id_engin ? engin.d_fvadministrative : engin?.id_engin.d_fvadministrative,
                    ['finAssure']: engin?.id_engin ? engin.d_fvassurance : engin?.id_engin.d_fvassurance,
                    ['datePrem']: engin?.id_engin ? engin.d_mise_circulation : engin?.id_engin.d_mise_circulation,
                    ['type']: engin?.id_engin ? engin.type_deplacement : engin?.id_engin.type_deplacement,
                    ['vie']: engin?.id_engin ? engin.duree_vie_theorique : engin?.id_engin.duree_vie_theorique,

                }}
            >
                {/*Type*/}
                <Form.Item
                    name={'type'}
                    label={I18n.t(`pages.engin.table.type`)}
                    rules={[{
                        required: true,
                        message: I18n.t(`fields.engin.requiredMessageType`),

                    },]}>
                    <div className="row">
                        <div className="col-lg-3">
                        </div>
                        <div className="col-lg-6">
                            <Radio.Group
                                defaultValue={engin?.type_deplacement ? engin.type_deplacement.toString() : ""}>
                                {engin?.id_engin ? (
                                    <>
                                        <Radio value="1" disabled>
                                            Terrestre
                                        </Radio>
                                        <Radio value="2" disabled>
                                            Nautique
                                        </Radio>
                                    </>
                                ) : (
                                    <>
                                        <Radio value="1">Terrestre</Radio>
                                        <Radio value="2">Nautique</Radio>
                                    </>
                                )}
                            </Radio.Group>
                        </div>
                        <div className="col-lg-4">
                        </div>
                    </div>
                </Form.Item>
                {/* Date 1er circulation */}

                <Form.Item
                    name={'datePrem'}
                    label={I18n.t(`pages.engin.table.dateCircu`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.engin.requiredMessageDate1er`),
                        },
                    ]}
                >
                    {
                        engin?.id_engin ? (
                            <Input
                                value={engin?.d_mise_circulation}
                                disabled
                            />
                        ) : (
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        )
                    }
                </Form.Item>
                {/* Date d'entrée en service */}
                <Form.Item
                    valuePropName={'dateServ'}
                    name={'dateServ'}
                    label={I18n.t(`pages.engin.table.dateEntre`)}
                    rules={
                        engin?.id_engin
                            ? undefined // Si id_engin existe, pas de règles de validation
                            : [
                                {
                                    required: true,
                                    message: I18n.t(`fields.engin.requiredMessageDateEntre`),
                                },
                            ]
                    }
                >
                    {
                        engin?.id_engin ? (
                            <Input
                                value={engin?.d_entree_service}
                                disabled
                            />
                        ) : (
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        )
                    }
                </Form.Item>
                {/* Date de fin de validité Admin */}
                <Form.Item
                    valuePropName={'finValidite'}
                    name={'finValidite'}
                    label={I18n.t(`pages.engin.table.dateEnd`)}

                >{
                    engin?.id_engin ? (
                        engin?.d_fvadministrative ? (
                            <Input
                                value={engin.d_fvadministrative}
                                disabled
                            />
                        ) : (

                            <DatePicker format="YYYY-MM-DD"/>
                        )
                    ) : (
                        <DatePicker format="YYYY-MM-DD"/>
                    )
                }

                </Form.Item>

                {engin?.id_engin && (
                    <>
                        <Form.Item
                            name={'finAssure'}
                            label={I18n.t(`pages.engin.table.d_fvassurance`)}
                        >
                            {
                                engin?.id_engin ? (
                                    engin?.d_fvassurance ? (
                                        <Input
                                            value={engin.d_fvassurance}
                                            disabled
                                        />
                                    ) : (

                                        <DatePicker format="YYYY-MM-DD"/>
                                    )
                                ) : (
                                    <DatePicker format="YYYY-MM-DD"/>
                                )
                            }
                        </Form.Item>
                    </>
                )}

                {/*Durée de vie théorique*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.dureeVie`)}
                    name="vie"

                    rules={[{
                        required: true,
                        message: I18n.t(`fields.engin.requiredMessageDuree`),
                    },
                        {
                            pattern: /^[0-9]+$/,
                            message: I18n.t(`fields.engin.patternDuree`),
                        },
                    ]}>
                    {
                        engin?.id_engin ? (
                            <Input
                                value={engin?.duree_vie_theorique}
                                disabled
                            />
                        ) : (
                            <Input placeholder={I18n.t(`fields.engin.placeholderDuree`)}/>

                        )
                    }
                </Form.Item>
                {/*Immatriculation*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.registration`)}
                    name="immatriculation"

                    rules={[{
                        required: true,
                        message: I18n.t(`fields.engin.requiredMessageRegistration`),
                    },
                        {
                            max: 15,
                            message: I18n.t(`fields.engin.patternRegistrationMessage`),
                        },
                        {
                            pattern: /^[A-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.engin.patternRegistration`),
                        },
                    ]}>
                    {
                        engin?.id_engin ? (
                            <Input
                                value={engin?.immatriculation}
                                disabled
                            />
                        ) : (
                            <Input placeholder={I18n.t(`fields.engin.placeholderRegistration`)} minLength={7}
                                   maxLength={15}/>

                        )
                    }

                </Form.Item>
                {/*Carrosserie*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.bodywork`)}
                    name="carrosserie"

                    rules={[{
                        required: true,
                        message: I18n.t(`fields.engin.requiredMessageCarrosserie`),
                    },
                        {
                            pattern: /^[a-zA-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.engin.patternCarrosserie`),
                        },]}>
                    {
                        engin?.id_engin ? (
                            <Input
                                value={engin?.carrosserie}
                                disabled
                            />
                        ) : (
                            <Input placeholder={I18n.t(`fields.engin.placeholderCarrosserie`)}/>

                        )
                    }
                </Form.Item>
            </Form>
        </div>
    )
}

GeneralForm.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    immatriculation: PropTypes.array,
    carrosserie: PropTypes.array,
    datePrem: PropTypes.array,
    dateServ: PropTypes.array,
    finValidite: PropTypes.array,
    vie: PropTypes.array,
    type: PropTypes.array,


}

export default GeneralForm
