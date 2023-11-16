import {Form, Input} from 'antd'
import I18n from 'I18n'

import React from 'react'
import PropTypes from 'prop-types'
//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 6/7)
 * Dimension
 */
const Etape6Form = ({
                        formItemLayout,
                        engin,
                        form,
                        place,
                        puissance,
                        prix,
                        longueur,
                        largeur,
                        hauteur,
                        vitesse,
                        ptac

                    }) => {
    return (
        <div className="container-fluid">
            <Form
                autoComplete="off"
                form={form}
                initialValues={{
                    ['place']: engin?.id_engin ? engin.nb_places_assurance : engin?.id_engin.nb_places_assurance,
                    ['puissance']: engin?.id_engin ? engin.p_fiscale : engin?.id_engin.p_fiscale,
                    ['prix']: engin?.id_engin ? engin.p_achat_chassis : engin?.id_engin.p_achat_chassis,
                    ['longueur']: engin?.id_engin ? engin.longueur : engin?.id_engin.longueur,
                    ['largeur']: engin?.id_engin ? engin.largeur : engin?.id_engin.largeur,
                    ['hauteur']: engin?.id_engin ? engin.hauteur : engin?.id_engin.hauteur,
                    ['vitesse']: engin?.id_engin ? engin.vitesse_max : engin?.id_engin.vitesse_max,
                    ['ptac']: engin?.id_engin ? engin.ptac : engin?.id_engin.ptac,

                }}
            >
                {/*Places assurées*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.place`)}
                    name="place"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessagePlace`),

                    },
                        ...(!engin ? [
                            {
                                max: 2,
                                message: I18n.t(`fields.engin.patternPlaceLong`),
                            },
                            {
                                pattern: /^\d+(\.\d+)?$/,
                                message: I18n.t(`fields.engin.patternPlace`),
                            }] : [])
                    ]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderPlace`)}/>
                </Form.Item>
                {/*Puissance Fiscale*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.puissance`)}
                    name="puissance"

                    rules={[
                        {
                            required: true,
                            message: I18n.t('fields.engin.requiredMessagePuissance'),
                        },
                        ...(!engin ? [
                            {
                                max: 4,
                                message: I18n.t('fields.engin.patternPuissanceLong'),
                            },
                            {
                                pattern: /^\d+(\.\d+)?$/,
                                message: I18n.t('fields.engin.patternPuissance'),
                            }
                        ] : [])
                    ]}>

                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderPuissance`)}/>
                </Form.Item>
                {/*Prix Achat*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.prix`)}
                    name="prix"

                    rules={[
                        {
                            required: true, message: I18n.t(`fields.engin.requiredMessagePrix`),
                        },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: I18n.t(`fields.engin.patternPrix`),
                        },]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderPrix`)}/>
                </Form.Item>
                {/*Longueur (cm)*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.longueur`)}
                    name="longueur"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessageLongueur`),
                    },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: I18n.t(`fields.engin.patternLongueur`),
                        },]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderLongueur`)}/>
                </Form.Item>
                {/*Largeur (cm)*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.largeur`)}
                    name="largeur"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessageLargeur`),
                    },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: I18n.t(`fields.engin.patternLargeur`),
                        },
                    ]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderLargeur`)}

                    />
                </Form.Item>
                {/*Hauteur (cm)*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.hauteur`)}
                    name="hauteur"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessageHauteur`),
                    },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: I18n.t(`fields.engin.patternHauteur`),
                        },]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderHauteur`)}/>
                </Form.Item>
                {/*Vitesse (km/h)*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.vitesse`)}
                    name="vitesse"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessageVitesse`),
                    },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: I18n.t(`fields.engin.patternVitesse`),
                        }]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderVitesse`)}/>
                </Form.Item>
                {/*PTAC (kg)*/}
                <Form.Item
                    label={I18n.t(`pages.engin.table.ptac`)}
                    name="ptac"

                    rules={[{
                        required: true, message: I18n.t(`fields.engin.requiredMessagePtac`),
                    },
                        {
                            pattern: /^[0-9]+$/,
                            message: I18n.t(`fields.engin.patternPtac`),
                        }]}>
                    <Input type="number" placeholder={I18n.t(`fields.engin.placeholderPtac`)}/>
                </Form.Item>
            </Form>
        </div>
    )
}

Etape6Form.propTypes = {
    formItemLayout: PropTypes.object,
    engin: PropTypes.object,
    form: PropTypes.any,
    place: PropTypes.array,
    puissance: PropTypes.array,
    prix: PropTypes.array,
    longueur: PropTypes.array,
    largeur: PropTypes.array,
    hauteur: PropTypes.array,
    vitesse: PropTypes.array,
    ptac: PropTypes.array

}

export default Etape6Form
