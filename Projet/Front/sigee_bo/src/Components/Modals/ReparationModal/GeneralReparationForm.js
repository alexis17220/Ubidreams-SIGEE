import React, {useState} from 'react';
import {AutoComplete, Form, Input} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import 'moment/locale/zh-cn';
import {actions as enginsActions} from 'Resources/EnginsResource'; // Update this import statement
import {withNavigation} from "@react-navigation/core";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {baseURL} from "Resources";

const GeneralReparationForm = ({
                                   formItemLayout,
                                   form,
                                   reparation,
                               }) => {

    // State pour gérer les options de l'AutoComplete
    const [options, setOptions] = useState([]);
    const [selectedCarrosserie, setSelectedCarrosserie] = useState("");
    const [selectedImmatriculation, setSelectedImmatriculation] = useState("");
    const [selectedAffectationAdm, setSelectedAffectationAdm] = useState("");
    const [selectedAffectationPhy, setSelectedAffectationPhy] = useState("");
    const [selectedStatutTech, setSelectedStatutTech] = useState("");
    const [selectedIdEngin, setSelectedIdEngin] = useState("");
    const [selectedIdStatut, setSelectedIdStatut] = useState("");

    // Gère le changement de la valeur dans l'AutoComplete
    const handleInputChange = (value) => {
        setSelectedCarrosserie(value);
    };

    // Effectue une recherche en fonction de la valeur saisie dans l'AutoComplete
    const handleSearch = (value) => {
        fetch(`${baseURL}/engins/?search=${value}`)
            .then((response) => response.json())
            .then((data) => {
                const results = data.results;
                const newOptions = results.map((result) => {
                    return {
                        value: result.carrosserie,
                        label: result.carrosserie,
                        carrosserie: result.carrosserie,
                        id_engin: result.id_engin, // Ajout de l'ID de l'engin
                        immatriculation: result.immatriculation,
                        administrative: result.id_affectation_administrative.id_affec_adm.libelle,
                        physique: result.id_affectation_physique.id_affec_phy.libelle,
                        statutTech: result.id_statut_tech.libelle,
                        id_statut: result.id_statut_tech.id_statut, // Ajout de l'ID de l'engin
                    };
                });
                setOptions(newOptions);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    // Sélectionne une option dans l'AutoComplete
    const onSelect = (value, option) => {
        setSelectedCarrosserie(option.carrosserie);
        setSelectedImmatriculation(option.immatriculation)
        setSelectedAffectationAdm(option.administrative)
        setSelectedAffectationPhy(option.physique)
        setSelectedStatutTech(option.statutTech)
        setSelectedIdEngin(option.id_engin)
        setSelectedIdStatut(option.id_statut)

        // Met à jour les valeurs dans les champs du formulaire avec les valeurs sélectionnées
        form.setFieldsValue({immatriculation: option.immatriculation});
        form.setFieldsValue({adm: option.administrative});
        form.setFieldsValue({phy: option.physique});
        form.setFieldsValue({tech: option.statutTech});
        form.setFieldsValue({idEngin: option.id_engin});
        form.setFieldsValue({idStatut: option.id_statut});
    };

    return (
        <div className="container-fluid">
            <Form
                {...formItemLayout}
                form={form}
                initialValues={{
                    ['idEngin']: reparation?.id_reparation ? selectedIdEngin : reparation?.id_engin,
                    ['immatriculation']: reparation?.id_reparation ? selectedImmatriculation : reparation?.id_engin,
                    ['carrosserie']: reparation?.id_reparation ? reparation.id_engin.carrosserie : reparation?.id_engin,
                    ['adm']: reparation?.id_reparation ? selectedAffectationAdm : reparation?.id_engin,
                    ['phy']: reparation?.id_reparation ? selectedAffectationPhy : reparation?.id_engin,
                    ['tech']: reparation?.id_reparation ? selectedStatutTech : reparation?.id_engin,
                    ['idStatut']: reparation?.id_reparation ? selectedIdStatut : reparation?.id_engin,
                }}
            >

                {/* Carrosserie */}
                <Form.Item
                    name={'carrosserie'}
                    label={I18n.t(`pages.reparation.table.carrosserie`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.reparation.requiredMessageCarrosserie`),
                        },
                    ]}
                >
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        style={{width: 300}}
                        options={options}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                        maxLength={10}
                        value={selectedCarrosserie}
                    >
                        <Input.Search
                            size="medium"
                            placeholder={I18n.t(`fields.reparation.placeholderCarrosserie`)}
                            enterButton
                            value={selectedCarrosserie}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </AutoComplete>
                </Form.Item>

                {/* Immatriculation */}
                <Form.Item
                    label={I18n.t(`pages.reparation.table.registration`)}
                    name={'immatriculation'}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.reparation.requiredMessageRegistration`),
                        },
                    ]}
                >
                    <Input
                        placeholder={I18n.t('fields.reparation.placeholderRegistration')}
                        disabled
                    />
                </Form.Item>

                {/*Affectation Administrative*/}
                <Form.Item
                    label={I18n.t(`pages.reparation.table.affectationAdm`)}
                    name={'adm'}
                    rules={[{
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageAdm`),
                    },]}>
                    <Input placeholder={I18n.t(`fields.reparation.placeholderAdm`)} disabled/>
                </Form.Item>

                {/*Affectation Physique*/}
                <Form.Item
                    label={I18n.t(`pages.reparation.table.affectationPhy`)}
                    name={'phy'}
                    rules={[{
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessagePhy`),
                    },]}>
                    <Input placeholder={I18n.t(`fields.reparation.placeholderPhy`)} disabled/>
                </Form.Item>

                {/*Statut Technique*/}
                <Form.Item
                    label={I18n.t(`pages.reparation.table.statutTech`)}
                    name={'tech'}
                    rules={[{
                        required: true,
                        message: I18n.t(`fields.reparation.requiredMessageStatutTech`),
                    },]}>
                    <Input placeholder={I18n.t(`fields.reparation.placeholderStatutTech`)} disabled/>
                </Form.Item>

                {/* Champs cachés pour stocker les ID des engins et statuts */}
                <Form.Item
                    name={'idEngin'}>
                    <Input disabled hidden/>
                </Form.Item>
                <Form.Item
                    name={'idStatut'}>
                    <Input disabled hidden/>
                </Form.Item>
            </Form>
        </div>
    )
}

GeneralReparationForm.propTypes = {
    formItemLayout: PropTypes.object, // Configuration pour le placement des éléments dans le formulaire.
    product: PropTypes.object,
    form: PropTypes.any, // Objet du formulaire géré par Ant Design Form.
    setImage: PropTypes.func,
    categories: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {...enginsActions},
        dispatch
    ),
})

export default withNavigation(connect(null, mapDispatchToProps)(GeneralReparationForm));
