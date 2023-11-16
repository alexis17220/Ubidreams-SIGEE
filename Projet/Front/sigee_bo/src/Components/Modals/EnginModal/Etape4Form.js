import React from 'react'
import {DatePicker, Form, Input, Select} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'

//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 4/7)
 * infrastructure
 */
const Etape4Form = ({
                        formItemLayout,
                        form,
                        physiques,
                        administratives,
                        attributions,
                        reference,
                        num,
                        villes,
                        equipeurs,
                        serie,
                        bcm,
                        catAffect,
                        attelage,
                        dateInventaire,
                        engin,
                    }) => {
    /*
     * Modification du select nutrients en fonction de ceux déjà sélectionnés
     */
    return (
        <Form
            form={form}
            initialValues={{
                ['id_affectation_phy']: engin?.id_engin ? engin.id_affectation_physique?.id_affec_phy?.id_affectation : engin?.id_engin.id_affectation_physique,
                ['id_affectation_adm']: engin?.id_engin ? engin.id_affectation_administrative?.id_affec_adm?.id_affectation : engin?.id_engin.id_affectation_administrative,
                ['reference']: engin?.id_engin ? engin.id_affectation_administrative?.reference : engin?.id_engin.id_affectation_administrative,
                ['numero2']: engin?.id_engin ? engin.no_inventaire_ville2 : engin?.id_engin.no_inventaire_ville2,
                ['inventaire']: engin?.id_engin ? engin.no_inventaire_ville : engin?.id_engin.no_inventaire_ville,
                ['equipeur']: engin?.id_engin ? engin.id_equipeur?.id_equipeur : engin?.id_engin.id_equipeur,
                ['serie']: engin?.id_engin ? engin.no_mine : engin?.no_mine,
                ['bcm']: engin?.id_engin ? engin.no_bcm : engin?.no_bcm,
                ['catAffect']: engin?.id_engin ? engin.id_categorie?.id_categorie : engin?.id_engin.id_categorie,
                ['attelage']: engin?.id_engin ? engin.id_type_attelage?.id_type_attelage : engin?.id_engin.id_type_attelage,
                ['attribution']: engin?.id_engin ? engin.id_histo_gisement?.id_affec?.id_affectation : engin?.id_engin.id_histo_gisement,
                ['dateInventaire']: engin?.id_engin ? engin.d_sortie_inventaire_ville : engin?.id_engin.d_sortie_inventaire_ville,

            }}
        >{/*Affectation Physique*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.affectPhy`)}
                name="id_affectation_phy"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessagePhy')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderPhy`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >

                    {physiques.map((phy) => (
                        <Select.Option key={phy.id_affectation} value={phy.id_affectation}>
                            {phy.libelle} | {phy.libelle_long}
                        </Select.Option>
                    ))}
                </Select>

            </Form.Item>
            {/*Affectation Admininistrative*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.affectAdm`)}
                name="id_affectation_adm"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageAdm')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderAdm`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {administratives && administratives.map((adm) => {
                        return (
                            <Select.Option key={adm.libelle} value={adm.id_affectation}>
                                {adm.libelle} | {adm.libelle_long}
                            </Select.Option>
                        )
                    })}
                </Select>

            </Form.Item>
            {/*Référence*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.reference`)}
                name="reference"

                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageRef')
                },
                    {
                        pattern: /^[a-zA-Z0-9\/\s-°]+$/,
                        message: I18n.t('fields.engin.patternRef')
                    },
                ]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderRef`)}/>
            </Form.Item>
            {/*N°Inventaire Ville*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.invVille`)}
                name="inventaire"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageVille')
                },
                    {
                        pattern: /^[a-zA-Z0-9]+$/,
                        message: I18n.t('fields.engin.patternVille')
                    },
                ]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderVille`)}/>
            </Form.Item>
            {/*Numéro*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.number`)}
                name="numero2"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageNumber')
                },
                    {
                        pattern: /^[0-9]+$/,
                        message: I18n.t('fields.engin.patternNumber')
                    },]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderNumber`)}/>
            </Form.Item>
            {/*Equipeur*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.equipeur`)}
                name="equipeur"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageEquipeur')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderEquipeur`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {equipeurs.map((equipeur) => {
                        return (
                            <Select.Option key={equipeur.nom} value={equipeur.id_equipeur}>
                                {equipeur.nom}

                            </Select.Option>
                        )
                    })}
                </Select>


            </Form.Item>
            {/*N°Série*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.serie`)}
                name="serie"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageMine')
                },
                    {
                        pattern: /^[a-zA-Z0-9\-\s]+$/,
                        message: I18n.t('fields.engin.patternMine')
                    },]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderMine`)}/>
            </Form.Item>
            {/*N°BCM*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.bcm`)}
                name="bcm"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageBCM')
                },
                    {
                        pattern: /^[a-zA-Z0-9\-\s]+$/,
                        message: I18n.t('fields.engin.patternBCM')
                    },
                ]}>
                <Input placeholder={I18n.t(`fields.engin.placeholderBCM`)}/>
            </Form.Item>
            {/*Catégorie Affectation*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.catAffect`)}
                name="catAffect"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageCatAffect')
                },]}>
                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderCatAffect`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {catAffect.map((affect) => {
                        return (
                            <Select.Option key={affect.nom} value={affect.id_categorie}>
                                {affect.nom}

                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            {/*Type Attelage*/}
            <Form.Item
                label={I18n.t(`pages.engin.table.attelage`)}
                name="attelage"
                rules={[{
                    required: true, message: I18n.t('fields.engin.requiredMessageAttelage')
                },]}>

                <Select
                    showSearch
                    placeholder={I18n.t(`fields.engin.placeholderAttelage`)}
                    filterOption={(input, option) => {
                        return (option?.key ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }}
                >
                    {attelage.map((attel) => {
                        return (
                            <Select.Option key={attel.nom} value={attel.id_type_attelage}>
                                {attel.nom}

                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>

            {engin?.id_engin && (
                <>
                    <Form.Item
                        label={I18n.t(`pages.engin.table.attribution`)}
                        name="attribution"
                        rules={[{
                            required: true, message: I18n.t('fields.engin.requiredMessageAttribution')
                        },]}>

                        <Select
                            showSearch
                            placeholder={I18n.t(`fields.engin.placeholderAttribution`)}
                            filterOption={(input, option) => {
                                return (option?.key ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }}
                        >
                            {attributions.map((attri) => {
                                return (
                                    <Select.Option key={attri.libelle} value={attri.id_affectation}>
                                        {attri.libelle} | {attri.libelle_long}

                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'dateInventaire'}
                        label={I18n.t(`pages.engin.table.dateSortInventaire`)}
                    >
                        {
                            engin?.id_engin ? (
                                engin?.d_sortie_inventaire_ville ? (
                                    <Input
                                        value={engin.d_sortie_inventaire_ville}
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

        </Form>
    )
}

Etape4Form.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    affectPhy: PropTypes.array,
    affectAdm: PropTypes.array,
    reference: PropTypes.array,
    inventaire: PropTypes.array,
    num: PropTypes.array,
    equipeur: PropTypes.array,
    serie: PropTypes.array,
    bcm: PropTypes.array,
    catAffect: PropTypes.array,
    attelage: PropTypes.array

}

export default Etape4Form
