import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container} from 'Components/Modals'
import {Button, Form, message, Steps} from 'antd'
import {actions as enginsActions} from 'Resources/EnginsResource'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import I18n from 'I18n'
import axios from 'axios'
import {baseURL} from 'Resources'
import {GeneralReparationForm} from 'Components/Modals/ReparationModal/index'
import Etape2Form from 'Components/Modals/ReparationModal/Etape2Form'
import Etape3Form from "Components/Modals/ReparationModal/Etape3Form";
import Etape4Form from "Components/Modals/ReparationModal/Etape4Form";
import moment from 'moment';

const ReparationModal = ({
                             reparation,
                             visible,
                             okText,
                             title,
                             onCancel,
                             onOk,
                             actions,

                         }) => {
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 19,
        },
    }

    const [current, setCurrent] = useState(0)
    const {Step} = Steps
    const [temporaryReparation, setTemporaryReparation] = useState({})
// récupération des valeurs des champs surveillés

    const [general] = Form.useForm()
    const immatriculation = Form.useWatch('immatriculation', general)
    const carrosserie = Form.useWatch('carrosserie', general)
    const idEngin = Form.useWatch('idEngin', general)
    const idStatut = Form.useWatch('idStatut', general)
    const tech = Form.useWatch('tech', general)

    const [etape2] = Form.useForm()
    const dateE = Form.useWatch('dateE', etape2)
    const raison = Form.useWatch('raison', etape2)
    const intervenant = Form.useWatch('intervenant', etape2)


    const [etape3] = Form.useForm()
    const moteur = Form.useWatch('moteur', etape3)
    const km = Form.useWatch('km', etape3)
    const hr = Form.useWatch('hr', etape3)


    const [etape4] = Form.useForm()
    const designation = Form.useWatch('designation', etape4)
    const date = Form.useWatch('date', etape4)


    const [engins, setEngins] = useState([])

    const [immatriculations, setImmatriculations] = useState([])
    const [carrosseries, setCarrosseries] = useState([])

    const [dateEn, setDateE] = useState([])
    const [raisons, setRaisons] = useState([])
    const [intervenants, setIntervenants] = useState([])

    const [moteurs, setMoteur] = useState([])
    const [kms, setKms] = useState([])
    const [hrs, setHrs] = useState([])


    const [designations, setDesignations] = useState([])
    const [dates, setDates] = useState([])

    const [immatriculationsValues, setImmatriculationsValues] = useState([])
    const [carrosserieValues, setCarrosserieValues] = useState([])

    const [loadingEngin, setLoadingEngin] = useState(false)


    /**
     * Récupération de la liste des types d'engins.
     */
    const getEngin = () => {
        setLoadingEngin(true)
        actions
            .getEngins()
            .then(({body: value}) => {
                setEngins(value.results)
                setLoadingEngin(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.engin.fetch`))
            })
    }

    /*
     * Récupération des données au lancement de la modale
     */
    useEffect(() => {
        getEngin()
    }, [])

    const doCancel = () => {
        general.resetFields()
        etape2.resetFields()
        onCancel()
        setCurrent(0)
    }
    //----------------------------------------------------------------------------
    /*
     * sauvegarde des infos lors du changement d'onglet
     */
    const doNext = () => {
        switch (current) {
            case 0:
                general
                    .validateFields(['immatriculation', 'carrosserie', 'idEngin', 'idStatut', 'tech'])
                    .then(() => {
                        temporaryReparation.id_engin = idEngin
                        temporaryReparation.carrosserie = carrosserie
                        temporaryReparation.immatriculation = immatriculation
                        temporaryReparation.tech = tech

                        temporaryReparation.id_statut = idStatut

                        setTemporaryReparation(temporaryReparation)
                        setCurrent(1)
                    })
                    .catch(() => message.error(I18n.t(`errors.form`)))
                break
            case 1:
                etape2
                    .validateFields(['dateE', 'raison', 'intervenant'])
                    .then(() => {
                        temporaryReparation.dateE = dateE
                        temporaryReparation.raison = raison
                        temporaryReparation.intervenant = intervenant

                        setTemporaryReparation(temporaryReparation)
                        setCurrent(2)
                    })
                    .catch(() => message.error(I18n.t(`errors.form`)))
                break

            case 2:
                const fields = ['moteurs', 'hr', 'km'];
                for (let i = 0; i < (moteur?.length || 0); i++) {
                    fields.push(['moteurs', i, 'km']);
                    fields.push(['moteurs', i, 'hr']);
                }
                etape3
                    .validateFields(fields)
                    .then(() => {
                        temporaryReparation.moteur = moteur;
                        temporaryReparation.hr = hr;
                        temporaryReparation.km = km;
                        setTemporaryReparation(temporaryReparation);
                        setCurrent(3);
                    })
                    .catch((e) => {
                        console.log(e);
                        message.error(I18n.t(`errors.form`));
                    });
                break

            default:
                break
        }
    }

    //----------------------------------------------------------------------------
    /*
     * creation d'un reparation
     */
    const createReparation = (formData) => {
        axios
            .post(`${baseURL}/reparation/`, formData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    app: 'BO',
                },
                withCredentials: true,
            })
            .then(() => {
                message.success(I18n.t(`success.reparation.create`))
                onOk()
            })
            .catch((e) => {
                console.log(e),
                    message.error(I18n.t(`errors.reparation.create`))
            })
    }

    /*
     * modification d'un produit
     */
    const updateReparation = (formData) => {
        axios
            .put(`${baseURL}/reparation/${reparation.id_reparation}/`, formData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    app: 'BO',
                },
                withCredentials: true,
            })
            .then(() => {
                message.success(I18n.t(`success.reparation.update`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.reparation.update`))
            })
    }

    /*
     * validation du 2e formulaire et déclenchement de l'update / create
     */
    const sendForm = () => {
        etape4
            .validateFields(['date', 'designation',])
            .then(() => {
                // Création du formulaire à envoyer
                const formData = new FormData()
                formData.append('id_engin', temporaryReparation.id_engin) // Ajouter cette ligne
                formData.append('id_statut', temporaryReparation.id_statut) // Ajouter cette ligne
                formData.append('immatriculation', temporaryReparation.immatriculation)
                formData.append('carrosserie', temporaryReparation.carrosserie)
                formData.append('d_entree', moment(temporaryReparation.dateE).format('YYYY-MM-DD'))
                formData.append('desc_raison_entree', temporaryReparation.raison)
                formData.append('id_intervenant', temporaryReparation.intervenant)
                formData.append('hdm_moteur_reception', temporaryReparation.hr)
                formData.append('km_reception', temporaryReparation.km)
                formData.append('date', moment(date).format('YYYY-MM-DD'))
                formData.append('designation', designation)

                if (reparation != null) {
                    if (
                        temporaryReparation.id_engin != reparation.id_engin ||
                        temporaryReparation.id_statut != reparation.id_statut ||
                        temporaryReparation.immatriculation != reparation.immatriculation ||
                        temporaryReparation.carrosserie != reparation.carrosserie ||
                        temporaryReparation.dateE != reparation.d_entree ||
                        temporaryReparation.raison != reparation.desc_raison_entree ||
                        temporaryReparation.hr != reparation.hdm_moteur_reception ||
                        temporaryReparation.km != reparation.km_reception ||
                        designation != reparation.id_garantie.nom ||
                        date != reparation.id_garantie.d_echeance
                    ) {
                        updateReparation(formData)
                    } else {
                        doCancel()
                    }

                } else createReparation(formData)
            })
            .catch((e) => {
                console.log(e), message.error(I18n.t(`errors.form`))
            })
    }

    //----------------------------------------------------------------------------
    // Footer du modal
    const footer =
        current === 3 /*|| (current === 5 && (reparation && reparation.id_engin))*/ ? (
            <div>
                <Button
                    key="previous"
                    onClick={() => {
                        setCurrent(current - 1)
                    }}
                    type="primary"
                    style={{float: 'left'}}
                >
                    {I18n.t(`common.previous`)}
                </Button>
                <Button key="cancel" onClick={doCancel}>
                    {I18n.t(`common.cancel`)}
                </Button>
                <Button key="validate" type="primary" onClick={() => sendForm()}>
                    {I18n.t(`common.ok`)}
                </Button>
            </div>
        ) : (
            <div>
                {current !== 0 && (
                    <Button
                        key="previous"
                        onClick={() => {
                            setCurrent(current - 1)
                        }}
                        type="primary"
                        style={{float: 'left'}}
                    >
                        {I18n.t(`common.previous`)}
                    </Button>
                )}
                <Button key="cancel" onClick={doCancel}>
                    {I18n.t(`common.cancel`)}
                </Button>
                <Button
                    key="next"
                    type="primary"
                    onClick={() => {
                        doNext()
                    }}
                >
                    {I18n.t(`common.next`)}
                </Button>
            </div>
        )

    //----------------------------------------------------------------------------
    return (
        <Container
            visible={visible}
            okText={okText}
            title={title}
            footer={footer}
            onCancel={doCancel}
            onOk={() => {
            }}
            width={1000}
        >

            <div>
                <Steps
                    progressDot
                    current={current}
                    size="small"
                    style={{marginBottom: '20px'}}

                >
                    <Step title={I18n.t(`modals.reparation.step.general`)} onClick={() => setCurrent(0)}/>
                    <Step title={I18n.t(`modals.reparation.step.raison`)} onClick={() => setCurrent(1)}/>
                    <Step title={I18n.t(`modals.reparation.step.motor`)} onClick={() => setCurrent(2)}/>
                    <Step title={I18n.t(`modals.reparation.step.garantis`)} onClick={() => setCurrent(3)}/>
                    {/* {reparation && reparation.id_engin ? null : (
                        <Step title={I18n.t(`modals.reparation.step.equipement`)} onClick={() => setCurrent(4)}/>
                    )}
                    <Step title={I18n.t(`modals.reparation.step.dimension`)}
                          onClick={() => setCurrent(reparation && reparation.id_engin ? 4 : 5)}/>
                    <Step
                        title={I18n.t(reparation && reparation.id_engin ? "modals.reparation.step.sic" : "modals.reparation.step.file")}
                        onClick={() => setCurrent(reparation && reparation.id_engin ? 5 : 6)}/>*/}

                </Steps>
                {current === 0 && (
                    <GeneralReparationForm
                        formItemLayout={formItemLayout}
                        reparation={reparation}
                        form={general}
                        immatriculation={immatriculations}
                        immatriculationValue={immatriculationsValues}
                        carrosserie={carrosseries}
                        carrosserieValue={carrosserieValues}

                    />
                )}
                {current === 1 && (
                    <Etape2Form
                        formItemLayout={formItemLayout}
                        form={etape2}
                        reparation={reparation}
                        raison={raisons}
                        dateE={dateEn}
                        intervenant={intervenants}

                    />
                )}
                {current === 2 && (
                    <Etape3Form
                        formItemLayout={formItemLayout}
                        form={etape3}
                        reparation={reparation}
                        moteurs={moteurs}
                        km={kms}
                        hr={hrs}
                    />
                )}
                {current === 3 && (
                    <Etape4Form
                        formItemLayout={formItemLayout}
                        form={etape4}
                        reparation={reparation}
                        date={dates}
                        designation={designations}


                    />
                )}
                {/*  {current === 4 && (!reparation || !reparation.id_engin) && (
                    <Etape5Form
                        formItemLayout={formItemLayout}
                        reparation={reparation}
                        form={etape5}
                        equipement={equipement}
                        equipementValues={equipements}
                        selectedEquipement={selectedEquipement}
                        montage={montages}
                        montageValues={montageValues}
                    />
                )}
                {((current === 5 && !(reparation && reparation.id_engin)) || (current === 4 && (reparation && reparation.id_engin))) && (
                    <Etape6Form
                        formItemLayout={formItemLayout}
                        reparation={reparation}
                        form={etape6}
                        place={places}
                        placeValues={placeValues}
                        puissance={puissances}
                        puissanceValues={puissanceValues}
                        prix={price}
                        prixValues={prixValues}
                        longueur={longueurs}
                        longueurValues={longueurValues}
                        largeur={largeurs}
                        largeurValues={largeurValues}
                        hauteur={hauteurs}
                        hauteurValues={hauteurValues}
                        vitesse={speed}
                        vitesseValues={vitesseValues}
                        ptac={poids}
                        ptacValues={ptacValues}
                    />
                )}
                {((current === 6 && !(reparation && reparation.id_engin)) || (current === 5 && (reparation && reparation.id_engin))) && (
                    <Etape7Form
                        formItemLayout={formItemLayout}
                        reparation={reparation}
                        form={etape7}
                        cle={cles}
                        cleValues={cleValues}
                        titre={titres}
                        titreValues={titreValues}
                        dateFin={dateValidite}
                        dateFinValues={dateFinValues}
                        file={files}
                        fileValues={fileValues}
                        rfgi={rfgis}
                        tag={codeTag}
                        tracteur={tracteurs}

                    />
                )}*/}
            </div>
        </Container>
    )
}

ReparationModal.propTypes = {
    reparation: PropTypes.object,
    visible: PropTypes.bool,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    okText: PropTypes.string,
    actions: PropTypes.object,
    id_engin: PropTypes.object,

}

ReparationModal.defaultProps = {
    okText: 'Ok',
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            ...enginsActions


        },
        dispatch
    ),
})

export default connect(null, mapDispatchToProps)(ReparationModal)
