import React from 'react'
import {Form, Input, Select} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'

const {TextArea} = Input;


//----------------------------------------------------------------------------
/*
 * Formulaire d'informations d'un engin (Form 2/7)
 * vehicule
 */
const Etape2Form = ({
                        form,
                        engin,
                        categories,
                        proprietaires,
                        classifications,
                        gammes,
                        compteur1,
                        compteur2,
                        noDepart,
                        observations

                    }) => {
    /*
     * Modification du select nutrients en fonction de ceux déjà sélectionnés
     */
    return (
        <Form
            form={form}
            initialValues={{
                ['categorie']: engin?.id_engin ? engin.idfamille?.idfamille : engin?.id_engin?.idfamille,
                ['proprietaire']: engin?.id_engin ? engin.idproprietaire?.idproprietaire : engin?.id_engin.idproprietaire,
                ['classification']: engin?.id_engin ? engin.id_type_ops?.id_type_genre?.id_type_genre : engin?.id_engin.id_type_ops,
                ['gamme']: engin?.id_engin ? engin.id_type_engin?.id_type_gamme?.id_type_gamme : engin?.id_engin.id_type_engin,
                ['annee']: engin?.id_engin ? engin.id_type_engin?.annee : engin?.id_engin.id_type_engin,
                ['numero_engin']: engin?.id_engin ? engin.id_type_engin?.numero_engin : engin?.id_engin.id_type_engin,
                ['no_depart']: engin?.id_engin ? engin.no_depart : engin?.id_engin.no_depart,
                ['compteur1']: engin?.id_engin ? engin.compteur1 : engin?.id_engin.compteur1,
                ['compteur2']: engin?.id_engin ? engin.compteur2 : engin?.id_engin.compteur2,
                ['observation']: engin?.id_engin ? engin.observations : engin?.id_engin.observations,

            }}

        >{/*Categorisation Engin*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.categorie`)}
                name="categorie"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageCategorie')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderCategorie`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {categories.map((category) => {
                        return (
                            <Select.Option key={category.libelle_famille} value={category.idfamille}>
                                {category.code_famille} |
                                {category.libelle_famille}

                            </Select.Option>
                        )
                    })}
                </Select>


            </Form.Item>
            {/*Année*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.years`)}
                name="annee"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageYears')
                },
                    {
                        pattern: /^[0-9]+$/,
                        message: I18n.t(`fields.engin.patternYears`),
                    },
                ]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderYears`)} maxLength={4}/>
            </Form.Item>
            {/*Numero*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.number`)}
                name="numero_engin"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageNumber')
                },
                    {
                        pattern: /^[0-9]+$/,
                        message: I18n.t(`fields.engin.patternNumber`),
                    },]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderNumber`)}/>
            </Form.Item>
            {/*Propriétaire Engin*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.proprietaire`)}
                name="proprietaire"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageProprietaire')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderProprietaire`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {proprietaires.map((proprietaire) => {
                        return (
                            <Select.Option key={proprietaire.libelle} value={proprietaire.idproprietaire}>
                                {proprietaire.code_proprietaire} |
                                {proprietaire.libelle}

                            </Select.Option>
                        )
                    })}
                </Select>

            </Form.Item>
            {/*Type Classification*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.classification`)}
                name="classification"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageClassification')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderClassification`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {classifications.map((classification) => {
                        return (
                            <Select.Option key={classification.nom} value={classification.id_type_genre}>
                                {classification.nom}
                            </Select.Option>
                        )
                    })}
                </Select>

            </Form.Item>
            {/*Type Gamme*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.gamme`)}
                name="gamme"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageGamme')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderGamme`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {gammes.map((gamme) => {
                        return (
                            <Select.Option key={gamme.nom} value={gamme.id_type_gamme}>
                                {gamme.nom}
                            </Select.Option>
                        )
                    })}
                </Select>

            </Form.Item>
            {engin?.id_engin && (
                <>
                    <Form.Item
                        label={I18n.t('pages.engin.table.depart')}
                        name="no_depart"
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.engin.requiredMessageDepart')
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: I18n.t('fields.engin.patternDepart')
                            }
                        ]}
                    >
                        <Input placeholder={I18n.t('fields.engin.placeholderDepart')} maxLength={3}/>
                    </Form.Item>
                    <Form.Item
                        label={I18n.t('pages.engin.table.km')}
                        name="compteur1"
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.engin.requiredMessageKm')
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: I18n.t('fields.engin.patternKm')
                            }
                        ]}
                    >
                        <Input placeholder={I18n.t('fields.engin.placeholderKm')}/>
                    </Form.Item>
                    <Form.Item
                        label={I18n.t('pages.engin.table.hr')}
                        name="compteur2"
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.engin.requiredMessageHr')
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: I18n.t('fields.engin.patternHr')
                            }
                        ]}
                    >
                        <Input placeholder={I18n.t('fields.engin.placeholderHr')}/>
                    </Form.Item>
                    <Form.Item
                        label={I18n.t('pages.engin.table.observation')}
                        name="observation"
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.engin.requiredMessageObs')
                            },
                            {
                                pattern: /^[a-zA-Z0-9\/\s-]+$/,
                                message: I18n.t('fields.engin.patternObs')
                            },

                        ]}
                    >
                        <TextArea
                            showCount
                            maxLength={150}
                            style={{
                                height: 50,
                                marginBottom: 12,
                            }}
                            placeholder={I18n.t('fields.engin.placeholderObs')}
                        />
                    </Form.Item>
                </>

            )}

        </Form>
    )
}

Etape2Form.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    categorie: PropTypes.array,
    gamme: PropTypes.array,
    proprietaire: PropTypes.array,
    numero: PropTypes.array,
    classification: PropTypes.array,
    annee: PropTypes.array,


}

export default Etape2Form
