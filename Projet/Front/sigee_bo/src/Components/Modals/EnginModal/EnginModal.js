import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container} from 'Components/Modals'
import {Button, Form, message, Steps} from 'antd'
import {actions as categoriesActions} from 'Resources/CategoriesResource'
import {actions as proprietaireActions} from 'Resources/ProprietairesRessource'
import {actions as classificationActions} from 'Resources/ClassificationRessources'
import {actions as gammeActions} from 'Resources/GammesRessources'
import {actions as marqueActions} from 'Resources/MarquesRessources'
import {actions as appellationActions} from 'Resources/AppellationComRessources'
import {actions as etatActions} from 'Resources/EtatEnginRessources'
import {actions as typeOpsActions} from 'Resources/TypeOpsRessources'
import {actions as typeTechActions} from 'Resources/TypeTechRessources'
import {actions as typeServActions} from 'Resources/TypeServRessources'
import {actions as statutOpsActions} from 'Resources/StatutOpsRessources'
import {actions as statutTechActions} from 'Resources/StatutTechRessources'
import {actions as affectationActions} from 'Resources/AffectationAllRessource'
import {actions as equipeurActions} from 'Resources/EquipeursRessource'
import {actions as attelageActions} from 'Resources/TypeAttelageRessources'
import {actions as categorieAffactationActions} from 'Resources/CategorieAffectation'
import {actions as equipementActions} from 'Resources/EquipementsRessources'


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import I18n from 'I18n'
import axios from 'axios'
import {baseURL} from 'Resources'
import {GeneralForm} from 'Components/Modals/EnginModal/index'
import Etape2Form from 'Components/Modals/EnginModal/Etape2Form'
import Etape3Form from "Components/Modals/EnginModal/Etape3Form";
import Etape4Form from "Components/Modals/EnginModal/Etape4Form";
import Etape5Form from "Components/Modals/EnginModal/Etape5Form";
import Etape6Form from "Components/Modals/EnginModal/Etape6Form";
import Etape7Form from "Components/Modals/EnginModal/Etape7Form";
import moment from 'moment';

const EnginModal = ({
                        engin,
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
    const [temporaryEngin, setTemporaryEngin] = useState({})
// récupération des valeurs des champs surveillés

    const [general] = Form.useForm()
    const immatriculation = Form.useWatch('immatriculation', general)
    const type = Form.useWatch('type', general)
    const datePrem = Form.useWatch('datePrem', general)
    const dateServ = Form.useWatch('dateServ', general)
    const finValidite = Form.useWatch('finValidite', general)
    const finAssure = Form.useWatch('finAssure', general)
    const vie = Form.useWatch('vie', general)
    const carrosserie = Form.useWatch('carrosserie', general)

    const [etape2] = Form.useForm()
    const category = Form.useWatch('categorie', etape2)
    const annee = Form.useWatch('annee', etape2)
    const numero = Form.useWatch('numero_engin', etape2)
    const proprietaire = Form.useWatch('proprietaire', etape2)
    const classification = Form.useWatch('classification', etape2)
    const gamme = Form.useWatch('gamme', etape2)
    const no_depart = Form.useWatch('no_depart', etape2)
    const compteur1 = Form.useWatch('compteur1', etape2)
    const compteur2 = Form.useWatch('compteur2', etape2)
    const observation = Form.useWatch('observation', etape2)

    const [etape3] = Form.useForm()
    const marque = Form.useWatch('marque', etape3)
    const appellation = Form.useWatch('appellation', etape3)
    const etat = Form.useWatch('etat', etape3)
    const typeOps = Form.useWatch('typeOps', etape3)
    const pos = Form.useWatch('position', etape3)
    const typeTech = Form.useWatch('typeTech', etape3)
    const typeServ = Form.useWatch('typeServ', etape3)
    const dossier = Form.useWatch('dossier', etape3)
    const folio = Form.useWatch('folio', etape3)
    const statutOps = Form.useWatch('statutOps', etape3)
    const statutTech = Form.useWatch('statutTech', etape3)

    const [etape4] = Form.useForm()
    const phy = Form.useWatch('id_affectation_phy', etape4)
    const adm = Form.useWatch('id_affectation_adm', etape4)
    const ref = Form.useWatch('reference', etape4)
    const attrib = Form.useWatch('attribution', etape4)
    const inventaire = Form.useWatch('inventaire', etape4)
    const date_inventaire = Form.useWatch('dateInventaire', etape4)

    const numero2 = Form.useWatch('numero2', etape4)
    const equipeur = Form.useWatch('equipeur', etape4)
    const serie = Form.useWatch('serie', etape4)
    const bcm = Form.useWatch('bcm', etape4)
    const catAffec = Form.useWatch('catAffect', etape4)
    const attelage = Form.useWatch('attelage', etape4)

    const [etape5] = Form.useForm()
    const equipement = Form.useWatch(['equipements'], etape5);
    const montage = Form.useWatch(['equipements', 0, 'date_montage'], etape5);

    const [selectedEquipement, setSelectedEquipement] = useState(new Map())

    const [etape6] = Form.useForm()
    const place = Form.useWatch('place', etape6)
    const puissance = Form.useWatch('puissance', etape6)
    const prix = Form.useWatch('prix', etape6)
    const longueur = Form.useWatch('longueur', etape6)
    const largeur = Form.useWatch('largeur', etape6)
    const hauteur = Form.useWatch('hauteur', etape6)
    const vitesse = Form.useWatch('vitesse', etape6)
    const ptac = Form.useWatch('ptac', etape6)

    const [etape7] = Form.useForm()
    const cle = Form.useWatch('cle', etape7)
    const titre = Form.useWatch('titre', etape7)
    const dateFin = Form.useWatch('dateFin', etape7)
    const rfgi = Form.useWatch('rfgi', etape7)
    const tag = Form.useWatch('tag', etape7)
    const tracteur = Form.useWatch('tracteur', etape7)


    const [immatriculations] = useState([])
    const [types] = useState([])
    const [datePremM] = useState([])
    const [dateService] = useState([])
    const [finValiditeAd] = useState([])
    const [finAssureAd] = useState([])
    const [vies] = useState([])
    const [carrosseries] = useState([])

    const [categories, setCategories] = useState([])
    const [years, setYears] = useState([])
    const [numeros, setNumero] = useState([])
    const [proprietaires, setProprietaire] = useState([])
    const [classifications, setClassification] = useState([])
    const [gammes, setGamme] = useState([])
    const [observations, setObservation] = useState([])

    const [marques, setMarque] = useState([])
    const [appellations, setAppellation] = useState([])
    const [etats, setEtat] = useState([])
    const [TypeOps, setTypeOps] = useState([])
    const [NoDepart, setNoDepart] = useState([])
    const [Compteur1, setCompteur1] = useState([])
    const [Compteur2, setCompteur2] = useState([])
    const [position, setPosition] = useState([])
    const [TypeTech, setTypeTech] = useState([])
    const [TypeServ, setTypeServ] = useState([])
    const [dossiers, setDossier] = useState([])
    const [folios, setFolio] = useState([])
    const [StatutOps, setStatutOps] = useState([])
    const [StatutTech, setStatutTech] = useState([])

    const [physique, setPhysique] = useState([])
    const [administrative, setAdministrative] = useState([])
    const [attribution, setAttribution] = useState([])
    const [reference, setReference] = useState([])
    const [dateInventaire, setDateInventaire] = useState([])
    const [ville, setVille] = useState([])
    const [num, setNum] = useState([])
    const [equipeurs, setEquipeurs] = useState([])
    const [series, setMines] = useState([])
    const [bcms, setBcm] = useState([])
    const [cateAffect, setCatAffect] = useState([])
    const [attelages, setAttelages] = useState([])

    const [equipements, setEquipement] = useState([])
    const [montages, setMontage] = useState([])

    const [places, setPlace] = useState([])
    const [puissances, setPuissance] = useState([])
    const [price, setPrice] = useState([])
    const [longueurs, setLongueur] = useState([])
    const [largeurs, setLargeurs] = useState([])
    const [hauteurs, setHauteur] = useState([])
    const [speed, setSpeed] = useState([])
    const [poids, setPoids] = useState([])

    const [cles, setCle] = useState([])
    const [titres, setTitre] = useState([])
    const [dateValidite, setDateValidite] = useState([])
    const [file, setFile] = useState(null);
    const [rfgis, setRfgi] = useState([])
    const [codeTag, setCodeTag] = useState([])
    const [tracteurs, setTracteur] = useState([])

    const [typeValues, setTypeValues] = useState([])
    const [immatriculationsValues, setImmatriculationsValues] = useState([])
    const [carrosserieValues, setCarrosserieValues] = useState([])
    const [datePremValues, setDatePremValues] = useState([])
    const [dateServiceValues, setDateServiceValues] = useState([])
    const [finValiditeValues, setFinValiditeValues] = useState([])
    const [vieValues, setVieValues] = useState([])

    const [categorieValues, setCategorieValues] = useState([])
    const [yearsValues, setYearsValues] = useState([])
    const [numeroValues, setNumeroValues] = useState([])
    const [gammeValues, setGammeValues] = useState([])

    const [proprietaireValues, setProprietaireValues] = useState([])
    const [marqueValues, setMarqueValues] = useState([])
    const [appellationValues, setAppellationValues] = useState([])
    const [etatValues, setEtatValues] = useState([])
    const [typeOpsValues, setTypeOpsValues] = useState([])
    const [noDepartValues, setNoDepartValues] = useState([])
    const [positionValues, setPositionValues] = useState([])
    const [typeTechValues, setTypeTechValues] = useState([])
    const [typeServValues, setTypeServValues] = useState([])
    const [dossierValues, setDossierValues] = useState([])
    const [folioValues, setFolioValues] = useState([])
    const [statutTechValues, setStatutTechValues] = useState([])
    const [statutOpsValues, setStatutOpsValues] = useState([])
    const [classificationValues, setClassificationValues] = useState([])

    const [phyValues, setPhyValues] = useState([])
    const [admValues, setAdmValues] = useState([])
    const [attrValues, setAttrValues] = useState([])
    const [refValues, setRefValues] = useState([])
    const [villeValues, setVilleValues] = useState([])
    const [numValues, setNumValues] = useState([])
    const [equipeurValues, setEquipeurValues] = useState([])
    const [serieValues, setMineValues] = useState([])
    const [bcmValues, setBcmValues] = useState([])
    const [catAffectValues, setCatAffectValues] = useState([])
    const [attelageValues, setAttelageValues] = useState([])

    const [equipementValues, setEquipementValues] = useState([])
    const [montageValues, setMontageValues] = useState([])

    const [placeValues, setPlaceValues] = useState([])
    const [puissanceValues, setPuissanceValues] = useState([])
    const [prixValues, setPrixValues] = useState([])
    const [longueurValues, setLongueurValues] = useState([])
    const [largeurValues, setLargeurValues] = useState([])
    const [hauteurValues, setHauteurValues] = useState([])
    const [vitesseValues, setVitesseValues] = useState([])
    const [ptacValues, setPtacValues] = useState([])

    const [cleValues, setCleValues] = useState([])
    const [titreValues, settitreValues] = useState([])
    const [dateFinValues, setDateFinValues] = useState([])
    const [fileValues, setFileValues] = useState([])

    const [loadingCategories, setLoadingCategories] = useState(false)
    const [loadingProprietaire, setLoadingProprietaire] = useState(false)

    const [loadingClassification, setLoadingClassification] = useState(false)
    const [loadingGamme, setLoadingGamme] = useState(false)
    const [loadingMarque, setLoadingMarque] = useState(false)
    const [loadingAppellation, setLoadingAppellation] = useState(false)
    const [loadingEtat, setLoadingEtat] = useState(false)
    const [loadingTypeOps, setLoadingTypeOps] = useState(false)
    const [loadingTypeTech, setLoadingTypeTech] = useState(false)
    const [loadingTypeServ, setLoadingTypeServ] = useState(false)
    const [loadingStatutOps, setLoadingStatutOps] = useState(false)
    const [loadingStatutTech, setLoadingStatutTech] = useState(false)

    const [loadingPhysique, setLoadingPhysique] = useState(false)
    const [loadingAdministrative, setLoadingAdministrative] = useState(false)
    const [loadingAttribution, setLoadingAttribution] = useState(false)
    const [loadingEquipeur, setLoadingEquipeur] = useState(false)
    const [loadingCatAffect, setLoadingCatAffect] = useState(false)
    const [loadingAttelage, setLoadingAttelage] = useState(false)

    const [loadingEquipement, setLoadingEquipement] = useState(false)
    const [loadingGisment, setLoadingGisement] = useState(false)

    /*
     * Récupère la liste des catégories en BD
     */

    const getCategories = () => {
        setLoadingCategories(true)
        actions
            .getCategories()
            .then(({body: value}) => {
                setCategories(value.results)
                setLoadingCategories(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.categories.fetch`))
            })
    }
    /**
     * recuperation liste proprietaire
     */
    const getProprietaires = () => {
        setLoadingProprietaire(true)
        actions
            .getProprietaires()
            .then(({body: value}) => {
                setProprietaire(value.results)
                setLoadingProprietaire(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.proprietaire.fetch`))
            })
    }

    /**
     * recuperation liste classification
     */
    const getClassifications = () => {
        setLoadingClassification(true)
        actions
            .getClassifications()
            .then(({body: value}) => {
                setClassification(value.results)
                setLoadingClassification(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.fetch`))
            })
    }
    /**
     * recuperation liste gamme
     */
    const getGammes = () => {
        setLoadingGamme(true)
        actions
            .getGammes()
            .then(({body: value}) => {
                setGamme(value.results)
                setLoadingGamme(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.gamme.fetch`))
            })
    }
    /**
     * recuperation liste marque
     */
    const getMarques = () => {
        setLoadingMarque(true)
        actions
            .getMarques()
            .then(({body: value}) => {
                setMarque(value.results)
                setLoadingMarque(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.marque.fetch`))
            })
    }
    /**
     * recuperation liste appellation
     */
    const getAppellation = () => {
        setLoadingAppellation(true)
        actions
            .getAppellations()
            .then(({body: value}) => {
                setAppellation(value.results)
                setLoadingAppellation(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.appellation.fetch`))
            })
    }
    /**
     * recuperation liste etatEngin
     */
    const getEtatEngin = () => {
        setLoadingEtat(true)
        actions
            .getEtatengin()
            .then(({body: value}) => {
                setEtat(value.results)
                setLoadingEtat(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.etatEngin.fetch`))
            })
    }
    /**
     * recuperation liste type ops
     */
    const getTypeOps = () => {
        setLoadingTypeOps(true)
        actions
            .getTypeOPS()
            .then(({body: value}) => {
                setTypeOps(value.results)
                setLoadingTypeOps(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeOps.fetch`))
            })
    }
    /**
     * recuperation liste type tech
     */
    const getTypeTech = () => {
        setLoadingTypeTech(true)
        actions
            .getTypeTech()
            .then(({body: value}) => {
                setTypeTech(value.results)
                setLoadingTypeTech(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeTech.fetch`))
            })
    }
    /**
     * recuperation liste type serv
     */
    const getTypeServ = () => {
        setLoadingTypeServ(true)
        actions
            .getTypeServ()
            .then(({body: value}) => {
                setTypeServ(value.results)
                setLoadingTypeServ(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeServ.fetch`))
            })
    }
    /**
     * recuperation liste statut ops
     */
    const getStatutOps = () => {
        setLoadingStatutOps(true)
        actions
            .getStatutOps()
            .then(({body: value}) => {
                setStatutOps(value.results)
                setLoadingStatutOps(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.statutOps.fetch`))
            })
    }
    /**
     * recuperation liste statut tech
     */
    const getStatutTech = () => {
        setLoadingStatutTech(true)
        actions
            .getStatutTech()
            .then(({body: value}) => {
                setStatutTech(value.results)
                setLoadingStatutTech(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.statutTech.fetch`))
            })
    }
    /**
     * recuperation liste affectation phy
     */
    const getPhysique = () => {
        setLoadingPhysique(true)
        actions
            .getAffectations()
            .then(({body: value}) => {
                setPhysique(value)
                setLoadingPhysique(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectPhy.fetch`))
            })
    }


    /**
     * recuperation liste affectation adm
     */
    const getAdministrative = () => {
        setLoadingAdministrative(true)
        actions
            .getAffectations()
            .then(({body: value}) => {
                setAdministrative(value)
                setLoadingAdministrative(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectAdm.fetch`))
            })
    }

    /**
     * recuperation liste affectation Gisement
     */
    const getGisement = () => {
        setLoadingGisement(true)
        actions
            .getAffectations()
            .then(({body: value}) => {
                setPosition(value)
                setLoadingGisement(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.fetch`))
            })
    }

    /**
     * recuperation liste affectation Attribution
     */
    const getAttribution = () => {
        setLoadingAttribution(true)
        actions
            .getAffectations()
            .then(({body: value}) => {
                setAttribution(value)
                setLoadingAttribution(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.fetch`))
            })
    }
    /**
     * recuperation liste equipeur
     */
    const getEquipeur = () => {
        setLoadingEquipeur(true)
        actions
            .getEquipeurs()
            .then(({body: value}) => {
                setEquipeurs(value.results)
                setLoadingEquipeur(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipeur.fetch`))
            })
    }
    /**
     * recuperation liste categorie affectation
     */
    const getCatAffect = () => {
        setLoadingCatAffect(true)
        actions
            .getCategorieAffectation()
            .then(({body: value}) => {
                setCatAffect(value.results)
                setLoadingCatAffect(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.catAffect.fetch`))
            })
    }
    /**
     * recuperation liste type Attelage
     */
    const getAttelage = () => {
        setLoadingAttelage(true)
        actions
            .getTypeAttelage()
            .then(({body: value}) => {
                setAttelages(value.results)
                setLoadingAttelage(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.attelage.fetch`))
            })
    }
    /**
     * recuperation liste equipement
     */
    const getEquipement = () => {
        setLoadingEquipement(true)
        actions
            .getEquipements()
            .then(({body: value}) => {
                setEquipement(value.results)
                setLoadingEquipement(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipement.fetch`))
            })
    }
    /*
     * Récupération des données au lancement de la modale
     */
    useEffect(() => {
        getCategories()
        getProprietaires()
        getClassifications()
        getGammes()
        getMarques()
        getAppellation()
        getEtatEngin()
        getTypeOps()
        getTypeTech()
        getTypeServ()
        getStatutOps()
        getStatutTech()
        getPhysique()
        getAdministrative()
        getEquipeur()
        getCatAffect()
        getAttelage()
        getEquipement()
        getGisement()
        getAttribution()
    }, [])

    const doCancel = () => {
        general.resetFields()
        etape2.resetFields()
        etape3.resetFields()
        etape4.resetFields()
        etape5.resetFields()
        etape6.resetFields()
        etape7.resetFields()

        onCancel()
        setCurrent(0)
    }
    //----------------------------------------------------------------------------


    const doNext = () => {
        switch (current) {
            case 0:
                general
                    .validateFields(['type', 'datePrem', 'dateServ', 'finValidite', 'finAssure', 'vie', 'immatriculation', 'carrosserie'])
                    .then(() => {
                        temporaryEngin.type = type;
                        temporaryEngin.datePrem = moment(datePrem).format('YYYY-MM-DD');
                        temporaryEngin.dateServ = moment(dateServ).format('YYYY-MM-DD');
                        temporaryEngin.finValidite = moment(finValidite).format('YYYY-MM-DD');
                        temporaryEngin.vie = vie;
                        temporaryEngin.carrosserie = carrosserie;
                        temporaryEngin.immatriculation = immatriculation;
                        if (engin?.id_engin) {
                            temporaryEngin.finAssure = finAssure;
                        }

                        setTemporaryEngin(temporaryEngin);
                        setCurrent(1);
                    })
                    .catch((e) => {
                        message.error(I18n.t('errors.form'));
                        console.log('Erreur lors de la validation des champs:', e);
                    });
                break
            case 1:
                etape2
                    .validateFields(['categorie', 'annee', 'numero_engin', 'proprietaire', 'classification', 'gamme', 'no_depart', 'compteur1', 'compteur2', 'observation'])
                    .then(() => {

                        temporaryEngin.category = category
                        temporaryEngin.annee = annee
                        temporaryEngin.numero = numero
                        temporaryEngin.proprietaires = proprietaire
                        temporaryEngin.classification = classification
                        temporaryEngin.gamme = gamme
                        if (engin?.id_engin) {
                            temporaryEngin.no_depart = no_depart
                            temporaryEngin.compteur1 = compteur1
                            temporaryEngin.compteur2 = compteur2
                            temporaryEngin.observation = observation

                        }
                        setTemporaryEngin(temporaryEngin)
                        setCurrent(2)
                    })
                    .catch(() => message.error(I18n.t(`errors.form`)))
                break

            case 2:
                etape3
                    .validateFields(['marque', 'appellation', 'etat', 'typeOps', 'position', 'typeTech', 'typeServ', 'dossier', 'folio', 'statutOps', 'statutTech'])
                    .then(() => {
                        temporaryEngin.marque = marque
                        temporaryEngin.appellation = appellation
                        temporaryEngin.etat = etat
                        temporaryEngin.typeOps = typeOps
                        if (engin?.id_engin) {
                            temporaryEngin.position = pos;
                        }
                        temporaryEngin.typeTech = typeTech
                        temporaryEngin.typeServ = typeServ
                        temporaryEngin.dossier = dossier
                        temporaryEngin.folio = folio
                        temporaryEngin.statutOps = statutOps
                        temporaryEngin.statutTech = statutTech
                        setTemporaryEngin(temporaryEngin)
                        setCurrent(3)
                    })
                    .catch(() => message.error(I18n.t(`errors.form`)))
                break
            case 3:
                etape4
                    .validateFields(['id_affectation_phy', 'id_affectation_adm', 'reference', 'numero2', 'inventaire', 'date_inventaire', 'equipeur', 'serie', 'bcm', 'catAffect', 'attelage', 'attribution'])
                    .then(() => {
                        temporaryEngin.affectPhy = phy
                        temporaryEngin.affectAdm = adm
                        temporaryEngin.ref = ref
                        temporaryEngin.num = numero2
                        temporaryEngin.inventaire = inventaire
                        temporaryEngin.equipeur = equipeur
                        temporaryEngin.serie = serie
                        temporaryEngin.bcm = bcm
                        temporaryEngin.catAffect = catAffec
                        temporaryEngin.attelage = attelage
                        if (engin?.id_engin) {
                            temporaryEngin.attribution = attrib;
                            temporaryEngin.dateInventaire = date_inventaire;
                        }
                        setTemporaryEngin(temporaryEngin)
                        if (!engin || !engin.id_engin) {
                            setCurrent(4);
                        } else {
                            setCurrent(4);
                        }

                    })
                    .catch(() => message.error(I18n.t(`errors.form`)))
                break
            case 4:
                if (!engin || !engin.id_engin) {

                    const fields = ['equipements'];
                    for (let i = 0; i < (equipement?.length || 0); i++) {
                        fields.push(['equipements', i, 'id_equipement']);
                        fields.push(['equipements', i, 'date_montage']);
                    }

                    etape5
                        .validateFields(fields)
                        .then(() => {
                            temporaryEngin.equipement = equipement.map((item) => {
                                return {
                                    id_equipement: item.id_equipement,
                                    date_montage: moment(item.date_montage).format('YYYY-MM-DD')
                                };
                            });
                            setTemporaryEngin(temporaryEngin);
                            console.log("temporaryEngin.equipement", temporaryEngin.equipement);

                            setCurrent(5);
                        })
                        .catch((e) => {
                            console.log(JSON.stringify(e));
                            message.error(I18n.t('errors.form'));
                        });
                } else {
                    etape6
                        .validateFields(['place', 'puissance', 'prix', 'longueur', 'largeur', 'hauteur', 'vitesse', 'ptac'])
                        .then(() => {
                            temporaryEngin.place = place
                            temporaryEngin.puissance = puissance
                            temporaryEngin.prix = prix
                            temporaryEngin.longueur = longueur
                            temporaryEngin.largeur = largeur
                            temporaryEngin.hauteur = hauteur
                            temporaryEngin.vitesse = vitesse
                            temporaryEngin.ptac = ptac
                            setTemporaryEngin(temporaryEngin)
                            setCurrent(5)

                        })
                        .catch(() => message.error(I18n.t(`errors.form`)))
                }


                break;
            case 5:
                if (!engin || !engin.id_engin) {

                    etape6
                        .validateFields(['place', 'puissance', 'prix', 'longueur', 'largeur', 'hauteur', 'vitesse', 'ptac'])
                        .then(() => {
                            temporaryEngin.place = place
                            temporaryEngin.puissance = puissance
                            temporaryEngin.prix = prix
                            temporaryEngin.longueur = longueur
                            temporaryEngin.largeur = largeur
                            temporaryEngin.hauteur = hauteur
                            temporaryEngin.vitesse = vitesse
                            temporaryEngin.ptac = ptac
                            setTemporaryEngin(temporaryEngin)
                            setCurrent(6)

                        })
                        .catch(() => message.error(I18n.t(`errors.form`)))
                    break
                } else {
                    break;
                }
            default:
                break
        }
    }

    //----------------------------------------------------------------------------
    /*
     * creation d'un engin
     */
    const createEngin = (formData) => {
        axios
            .post(`${baseURL}/engins/`, formData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    app: 'BO',
                },
                withCredentials: true,
            })
            .then(() => {
                message.success(I18n.t(`success.engin.create`))
                onOk()
            })
            .catch((e) => {
                console.log(e),
                    message.error(I18n.t(`errors.engin.create`))
            })
    }

    /*
     * modification d'un produit
     */
    const updateEngin = (formData) => {
        axios
            .put(`${baseURL}/engins/${engin.id_engin}/`, formData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    app: 'BO',
                },
                withCredentials: true,
            })
            .then(() => {
                message.success(I18n.t(`success.engin.update`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.engin.update`))
            })
    }

    /*
     * validation du 2e formulaire et déclenchement de l'update / create
     */

    const sendForm = () => {
        etape7
            .validateFields(['cle', 'titre', 'dateFin', 'lien', 'rfgi', 'tag', 'tracteur'])
            .then(() => {
                // Création du formulaire à envoyer
                const formData = new FormData()

                formData.append('type_deplacement', temporaryEngin.type)
                formData.append('d_mise_circulation', temporaryEngin.datePrem)
                formData.append('d_entree_service', temporaryEngin.dateServ)
                if (temporaryEngin.finValidite) {
                    const dateFinValidite = new Date(temporaryEngin.finValidite);
                    if (!isNaN(dateFinValidite.getTime())) {
                        const formattedDate = dateFinValidite.toISOString().slice(0, 10);
                        formData.append('d_fvadministrative', formattedDate);
                    }
                }

                formData.append('duree_vie_theorique', temporaryEngin.vie)
                formData.append('immatriculation', temporaryEngin.immatriculation)
                formData.append('carrosserie', temporaryEngin.carrosserie)
                formData.append('idfamille', temporaryEngin.category)
                formData.append('annee', temporaryEngin.annee)
                formData.append('numero_engin', temporaryEngin.numero)
                formData.append('idproprietaire', temporaryEngin.proprietaires)
                formData.append('id_type_genre', temporaryEngin.classification)
                formData.append('id_type_gamme', temporaryEngin.gamme)
                formData.append('id_marque', temporaryEngin.marque)
                formData.append('id_appellation', temporaryEngin.appellation)
                formData.append('idetat_engin', temporaryEngin.etat)
                formData.append('id_type_ops', temporaryEngin.typeOps)
                if (engin?.id_engin) {
                    formData.append('no_depart', temporaryEngin.no_depart);
                    formData.append('gisement_reel', temporaryEngin.position);
                    formData.append('compteur1', temporaryEngin.compteur1);
                    formData.append('compteur2', temporaryEngin.compteur2);
                    formData.append('id_histo_gisement.id_affec', temporaryEngin.attribution);
                    if (temporaryEngin.dateInventaire) {
                        const dateInventaireVille = new Date(temporaryEngin.dateInventaire);
                        if (!isNaN(dateInventaireVille.getTime())) {
                            const formattedDate = dateInventaireVille.toISOString().slice(0, 10);
                            formData.append('d_sortie_inventaire_ville', formattedDate);
                        }
                    }
                    if (temporaryEngin.finAssure) {
                        const dateFinAssure = new Date(temporaryEngin.finAssure);
                        if (!isNaN(dateFinAssure.getTime())) {
                            const formattedDate = dateFinAssure.toISOString().slice(0, 10);
                            formData.append('d_fvassurance', formattedDate);
                        }
                    }
                    formData.append('code_tag', tag)
                    formData.append('tracteur', tracteur)
                    formData.append('observations', temporaryEngin.observation);
                    formData.append('id_radio.rfgi', rfgi);

                }
                formData.append('id_type_tech', temporaryEngin.typeTech)
                formData.append('id_type_serv', temporaryEngin.typeServ)
                formData.append('no_dossier', temporaryEngin.dossier)
                formData.append('no_folio', temporaryEngin.folio)
                formData.append('id_statut_ops', temporaryEngin.statutOps)
                formData.append('id_statut_tech', temporaryEngin.statutTech)
                formData.append('id_affectation_phy.id_affec_phy', temporaryEngin.affectPhy)
                formData.append('id_affectation_adm.id_affec_adm', temporaryEngin.affectAdm)
                formData.append('reference', temporaryEngin.ref)
                formData.append('no_inventaire_ville', temporaryEngin.inventaire)
                formData.append('no_inventaire_ville2', temporaryEngin.num)
                formData.append('id_equipeur', temporaryEngin.equipeur)
                formData.append('no_mine', temporaryEngin.serie)
                formData.append('no_bcm', temporaryEngin.bcm)
                formData.append('id_categorie', temporaryEngin.catAffect)
                formData.append('id_type_attelage', temporaryEngin.attelage)
                formData.append('id_equipement', JSON.stringify(temporaryEngin.equipement));
                formData.append('nb_places_assurance', temporaryEngin.place)
                formData.append('p_fiscale', temporaryEngin.puissance)
                formData.append('p_achat_chassis', temporaryEngin.prix)
                formData.append('longueur', temporaryEngin.longueur)
                formData.append('largeur', temporaryEngin.largeur);
                formData.append('hauteur', temporaryEngin.hauteur)
                formData.append('vitesse_max', temporaryEngin.vitesse)
                formData.append('ptac', temporaryEngin.ptac)
                formData.append('double_clef', cle ? 1 : 0)
                formData.append('titre', titre)
                if (dateFin) {
                    const date_fv = new Date(dateFin);
                    if (!isNaN(date_fv.getTime())) {
                        const formattedDate = date_fv.toISOString().slice(0, 10);
                        formData.append('dateFin', formattedDate);
                    }
                }
                formData.append("lien", file)
                if (engin != null) {
                    if (
                        temporaryEngin.type != engin.type_deplacement ||
                        temporaryEngin.immatriculation != engin.immatriculation ||
                        temporaryEngin.datePrem != engin.d_mise_circulation ||
                        temporaryEngin.dateServ != engin.d_entree_service ||
                        temporaryEngin.finValidite != engin.d_fvadministrative ||
                        temporaryEngin.finAssure != engin.d_fvassurance ||
                        temporaryEngin.carrosserie != engin.carrosserie ||
                        temporaryEngin.vie != engin.duree_vie_theorique ||
                        temporaryEngin.category != engin.idfamille.idfamille ||
                        temporaryEngin.annee != engin.id_type_engin.annee ||
                        temporaryEngin.numero != engin.id_type_engin.numero ||
                        temporaryEngin.proprietaires != engin.idproprietaire.idproprietaire ||
                        temporaryEngin.classification != engin.id_type_ops.id_type_genre.id_type_genre ||
                        temporaryEngin.gamme != engin.id_type_engin.id_type_gamme.id_type_gamme ||
                        temporaryEngin.marque != engin.id_marque.id_marque ||
                        temporaryEngin.appellation != engin.id_appellation.id_appellation ||
                        temporaryEngin.etat != engin.idetat_engin.idetat_engin ||
                        temporaryEngin.typeOps != engin.id_type_ops.id_type_ops ||
                        temporaryEngin.no_depart != engin.no_depart ||
                        temporaryEngin.position != engin.id_type_engin.gisement_reel.id_affectation ||
                        temporaryEngin.compteur1 != engin.compteur1 ||
                        temporaryEngin.compteur2 != engin.compteur2 ||
                        temporaryEngin.observation != engin.observations ||
                        temporaryEngin.typeTech != engin.id_type_tech.id_type_tech ||
                        temporaryEngin.typeServ != engin.id_type_engin.id_type_serv.id_type_serv ||
                        temporaryEngin.dossier != engin.no_dossier ||
                        temporaryEngin.folio != engin.no_folio ||
                        temporaryEngin.statutTech != engin.id_statut_tech.id_statut ||
                        temporaryEngin.statutOps != engin.id_statut_ops.id_statut ||
                        temporaryEngin.affectPhy != engin.id_affectation_physique.id_affec_phy.id_affectation ||
                        temporaryEngin.affectAdm != engin.id_affectation_administrative.id_affec_adm.id_affectation ||
                        temporaryEngin.attribution != engin.id_histo_gisement.id_affec ||
                        temporaryEngin.ref != engin.id_affectation_administrative.reference ||
                        temporaryEngin.inventaire != engin.no_inventaire_ville ||
                        temporaryEngin.dateInventaire != engin.d_sortie_inventaire_ville ||
                        temporaryEngin.numero2 != engin.no_inventaire_ville2 ||
                        temporaryEngin.equipeur != engin.id_equipeur.id_equipeur ||
                        temporaryEngin.serie != engin.no_mine ||
                        temporaryEngin.bcm != engin.no_bcm ||
                        temporaryEngin.catAffect != engin.id_categorie.id_categorie ||
                        temporaryEngin.attelage != engin.id_type_attelage.id_type_attelage ||
                        temporaryEngin.equipement != engin.equipements ||
                        temporaryEngin.place != engin.nb_places_assurance ||
                        temporaryEngin.puissance != engin.p_fiscale ||
                        temporaryEngin.prix != engin.p_achat_chassis ||
                        temporaryEngin.longueur != engin.longueur ||
                        temporaryEngin.largeur != engin.largeur ||
                        temporaryEngin.hauteur != engin.hauteur ||
                        temporaryEngin.vitesse != engin.vitesse_max ||
                        temporaryEngin.ptac != engin.ptac ||
                        cle != engin.cle ||
                        titre != engin.id_document.titre ||
                        dateFin != engin.id_document.dateFin ||
                        file != engin.id_document.lien ||
                        rfgi != engin.id_radio.rfgi ||
                        tag != engin.code_tag ||
                        tracteur != engin.tracteur
                    ) {
                        updateEngin(formData)
                    } else {
                        doCancel()
                    }

                } else createEngin(formData)
            })
            .catch((e) => {
                console.log(e), message.error(I18n.t(`errors.form`))
            })
    }

    //----------------------------------------------------------------------------
    // Footer du modal
    const footer =
        current === 6 || (current === 5 && (engin && engin.id_engin)) ? (
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
            loading={loadingCategories || loadingProprietaire || loadingClassification || loadingGamme || loadingMarque || loadingGisment}
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
                    <Step title={I18n.t(`modals.engin.step.general`)} onClick={() => setCurrent(0)}/>
                    <Step title={I18n.t(`modals.engin.step.vehicule`)} onClick={() => setCurrent(1)}/>
                    <Step title={I18n.t(`modals.engin.step.register`)} onClick={() => setCurrent(2)}/>
                    <Step title={I18n.t(`modals.engin.step.infrastructure`)} onClick={() => setCurrent(3)}/>
                    {engin && engin.id_engin ? null : (
                        <Step title={I18n.t(`modals.engin.step.equipement`)} onClick={() => setCurrent(4)}/>
                    )}
                    <Step title={I18n.t(`modals.engin.step.dimension`)}
                          onClick={() => setCurrent(engin && engin.id_engin ? 4 : 5)}/>
                    <Step title={I18n.t(engin && engin.id_engin ? "modals.engin.step.sic" : "modals.engin.step.file")}
                          onClick={() => setCurrent(engin && engin.id_engin ? 5 : 6)}/>

                </Steps>
                {current === 0 && (
                    <GeneralForm
                        formItemLayout={formItemLayout}
                        engin={engin}
                        form={general}
                        type={types}
                        typeValue={typeValues}
                        datePrem={datePremM}
                        datePremValue={datePremValues}
                        dateService={dateService}
                        dateServiceValue={dateServiceValues}
                        finValidite={finValiditeAd}
                        finValiditeValue={finValiditeValues}
                        dateFinAssure={finAssureAd}
                        vie={vies}
                        vieValue={vieValues}
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
                        engin={engin}
                        categories={categories}
                        categorieValue={categorieValues}
                        annee={years}
                        anneeValues={yearsValues}
                        numero={numeros}
                        numeroValue={numeroValues}
                        proprietaires={proprietaires}
                        proprietaireValue={proprietaireValues}
                        classifications={classifications}
                        classificationsValue={classificationValues}
                        gammes={gammes}
                        gammesValue={gammeValues}
                        noDepart={NoDepart}
                        noDepartValue={noDepartValues}
                        compteur1={Compteur1}
                        compteur2={Compteur2}
                        observations={observations}

                    />
                )}
                {current === 2 && (
                    <Etape3Form
                        formItemLayout={formItemLayout}
                        form={etape3}
                        engin={engin}
                        marques={marques}
                        marquesValues={marqueValues}
                        appellations={appellations}
                        appellationvalues={appellationValues}
                        etats={etats}
                        etatsValues={etatValues}
                        typeOps={TypeOps}
                        positions={position}
                        positionValue={positionValues}
                        typeOpsValues={typeOpsValues}
                        typeTech={TypeTech}
                        typeTechValues={typeTechValues}
                        typeServ={TypeServ}
                        typeServValues={typeServValues}
                        dossier={dossiers}
                        dossiersValues={dossierValues}
                        folio={folios}
                        folioValues={folioValues}
                        statutOps={StatutOps}
                        statutOpsValues={statutOpsValues}
                        statutTech={StatutTech}
                        statutTechValues={statutTechValues}
                    />
                )}
                {current === 3 && (
                    <Etape4Form
                        formItemLayout={formItemLayout}
                        form={etape4}
                        engin={engin}
                        physiques={physique}
                        physiqueValues={phyValues}
                        administratives={administrative}
                        administrativeValues={admValues}
                        reference={reference}
                        referenceValues={refValues}
                        villes={ville}
                        villesValues={villeValues}
                        num={num}
                        numValues={numValues}
                        equipeurs={equipeurs}
                        equipeurValues={equipeurValues}
                        serie={series}
                        serieValues={serieValues}
                        bcm={bcms}
                        bcmValues={bcmValues}
                        catAffect={cateAffect}
                        catAffectValues={catAffectValues}
                        attelage={attelages}
                        attelageValues={attelageValues}
                        attributions={attribution}
                        attributionValues={attrValues}
                        dateInventaires={dateInventaire}

                    />
                )}
                {current === 4 && (!engin || !engin.id_engin) && (
                    <Etape5Form
                        formItemLayout={formItemLayout}
                        engin={engin}
                        form={etape5}
                        equipement={equipement}
                        equipementValues={equipements}
                        selectedEquipement={selectedEquipement}
                        montage={montages}
                        montageValues={montageValues}
                    />
                )}
                {((current === 5 && !(engin && engin.id_engin)) || (current === 4 && (engin && engin.id_engin))) && (
                    <Etape6Form
                        formItemLayout={formItemLayout}
                        engin={engin}
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
                {((current === 6 && !(engin && engin.id_engin)) || (current === 5 && (engin && engin.id_engin))) && (
                    <Etape7Form
                        formItemLayout={formItemLayout}
                        engin={engin}
                        form={etape7}
                        cle={cles}
                        cleValues={cleValues}
                        titre={titres}
                        titreValues={titreValues}
                        dateFin={dateValidite}
                        dateFinValues={dateFinValues}
                        file={file}
                        setFile={setFile}
                        fileValues={fileValues}
                        rfgi={rfgis}
                        tag={codeTag}
                        tracteur={tracteurs}

                    />
                )}
            </div>
        </Container>
    )
}

EnginModal.propTypes = {
    engin: PropTypes.object,
    visible: PropTypes.bool,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    okText: PropTypes.string,
    actions: PropTypes.object,
}

EnginModal.defaultProps = {
    okText: 'Ok',
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            ...categoriesActions,
            ...proprietaireActions,
            ...classificationActions,
            ...gammeActions,
            ...marqueActions,
            ...appellationActions,
            ...etatActions,
            ...typeOpsActions,
            ...typeTechActions,
            ...typeServActions,
            ...statutTechActions,
            ...statutOpsActions,
            ...affectationActions,
            ...equipeurActions,
            ...categorieAffactationActions,
            ...attelageActions,
            ...equipementActions


        },
        dispatch
    ),
})

export default connect(null, mapDispatchToProps)(EnginModal)
