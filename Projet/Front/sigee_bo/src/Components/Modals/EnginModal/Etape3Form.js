import React from 'react'
import {Form, Input, Select} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'

//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 7/7)
 * enregistrement
 */
const Etape3Form = ({
                        formItemLayout,
                        form,
                        marques,
                        appellations,
                        etats,
                        typeOps,
                        typeServ,
                        typeTech,
                        dossier,
                        folio,
                        positions,
                        statutOps,
                        statutTech,
                        engin
                    }) => {
    /*
     * Modification du select nutrients en fonction de ceux déjà sélectionnés
     */
    return (<Form
        form={form}
        initialValues={{
            ['marque']: engin?.id_engin ? engin.id_marque?.id_marque : engin?.id_engin.id_marque,
            ['etat']: engin?.id_engin ? engin.idetat_engin?.idetat_engin : engin?.id_engin.idetat_engin,
            ['appellation']: engin?.id_engin ? engin.id_appellation?.id_appellation : engin?.id_engin.id_appellation,
            ['typeOps']: engin?.id_engin ? engin.id_type_ops?.id_type_ops : engin?.id_engin.id_type_ops,
            ['typeTech']: engin?.id_engin ? engin.id_type_tech?.id_type_tech : engin?.id_engin.id_type_tech,
            ['typeServ']: engin?.id_engin ? engin.id_type_engin?.id_type_serv?.id_type_serv : engin?.id_engin.id_type_engin,
            ['dossier']: engin?.id_engin ? engin.no_dossier : engin?.id_engin.no_dossier,
            ['folio']: engin?.id_engin ? engin.no_folio : engin?.id_engin.no_folio,
            ['statutOps']: engin?.id_engin ? engin.id_statut_ops?.id_statut : engin?.id_engin.id_statut_ops,
            ['statutTech']: engin?.id_engin ? engin.id_statut_tech?.id_statut : engin?.id_engin.id_statut_tech,
            ['position']: engin?.id_engin ? engin.id_type_engin?.gisement_reel?.id_affectation : engin?.id_engin.id_type_engin,


        }}
    >{/*Marque*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.marque`)}
            name="marque"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageMarque')
            },]}>

            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderMarque`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {marques.map((marque) => {
                    return (
                        <Select.Option key={marque.nom} value={marque.id_marque}>
                            {marque.nom}
                        </Select.Option>
                    )
                })}
            </Select>

        </Form.Item>
        {/*Appellation Commerciale*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.appellation`)}
            name="appellation"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageAppellation')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderAppellation`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {appellations.map((appellation) => {
                    return (
                        <Select.Option key={appellation.nom} value={appellation.id_appellation}>
                            {appellation.nom}
                        </Select.Option>
                    )
                })}
            </Select>


        </Form.Item>
        {/*Etat EnginScreen*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.etatEngin`)}
            name="etat"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageEtatEngin')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderEtatEngin`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {etats.map((etat) => {
                    return (
                        <Select.Option key={etat.libelle} value={etat.idetat_engin}>
                            {etat.code_etat} | {etat.libelle}

                        </Select.Option>
                    )
                })}
            </Select>

        </Form.Item>
        {/*Type OPS*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.typeOps`)}
            name="typeOps"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageTypeOps')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderTypeOps`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {typeOps.map((typeops) => {
                    return (
                        <Select.Option key={typeops.nom} value={typeops.id_type_ops}>
                            {typeops.nom}

                        </Select.Option>
                    )
                })}
            </Select>

        </Form.Item>
        {engin?.id_engin && (
            <>

                <Form.Item
                    label={I18n.t('pages.engin.table.position')}
                    name="position"
                    rules={[
                        {
                            required: true,
                            message: I18n.t('fields.engin.requiredMessagePosition')
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder={I18n.t('fields.engin.placeholderPosition')}
                        filterOption={(input, option) =>
                            option?.key.toLowerCase().includes(input.toLowerCase())
                        }>
                        {positions &&
                            positions.map((pos) => (
                                <Select.Option key={pos.libelle} value={pos.id_affectation}>
                                    {pos.libelle} | {pos.libelle_long}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>

            </>
        )}

        {/*Type Technique*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.typeTech`)}
            name="typeTech"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageTypeTech')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderTypeTech`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {typeTech.map((typetech) => {
                    return (
                        <Select.Option key={typetech.nom} value={typetech.id_type_tech}>
                            {typetech.nom}

                        </Select.Option>
                    )
                })}
            </Select>

        </Form.Item>
        {/*Type Servitude*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.typeServ`)}
            name="typeServ"
            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageTypeServ')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderTypeServ`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {typeServ.map((typeserv) => {
                    return (
                        <Select.Option key={typeserv.nom} value={typeserv.id_type_serv}>
                            {typeserv.nom}

                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>
        {/*Numero Dossier*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.dossier`)}
            name="dossier"

            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageDossier')
            },
                {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: I18n.t('fields.engin.patternDossier')
                },]}>
            <Input placeholder={I18n.t(`fields.engin.placeholderDossier`)}/>
        </Form.Item>
        {/*Numero Folio*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.folio`)}
            name="folio"

            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageFolio')
            },
                {
                    pattern: /^[a-zA-Z0-9\/\s-]+$/,
                    message: I18n.t('fields.engin.patternFolio')
                },]}>
            <Input placeholder={I18n.t(`fields.engin.placeholderFolio`)}/>
        </Form.Item>
        {/*Statut Tech*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.statutTech`)}
            name="statutTech"

            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageStatutTech')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderStatutTech`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {statutTech.map((statutech) => {
                    return (
                        <Select.Option key={statutech.libelle_long} value={statutech.id_statut}>
                            {statutech.libelle_long}

                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>
        {/*Statut OPS*/}
        <Form.Item
            label={I18n.t(`pages.engin.table.statutOps`)}
            name="statutOps"

            rules={[{
                required: true, message: I18n.t('fields.engin.requiredMessageStatutOps')
            },]}>
            <Select
                showSearch
                placeholder={I18n.t(`fields.engin.placeholderStatutOps`)}
                filterOption={(input, option) => {
                    return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }}
            >
                {statutOps.map((statutops) => {
                    return (
                        <Select.Option key={statutops.libelle_long} value={statutops.id_statut}>
                            {statutops.libelle_long}

                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>

    </Form>)
}

Etape3Form.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    marque: PropTypes.array,
    appellation: PropTypes.array,
    etatEngin: PropTypes.array,
    typeOps: PropTypes.array,
    typeTech: PropTypes.array,
    typeServ: PropTypes.array,
    dossier: PropTypes.array,
    folio: PropTypes.array,
    statutTech: PropTypes.array,
    statutOps: PropTypes.array,

}

export default Etape3Form
