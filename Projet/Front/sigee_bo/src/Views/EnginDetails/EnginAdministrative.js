import React from 'react'
import PropTypes from 'prop-types'
import {Card, Checkbox, Descriptions} from 'antd'
import I18n from 'I18n'
import TextArea from "antd/es/input/TextArea";
import moment from 'moment';

const EnginData = ({engin}) => {
    // Fonction pour calculer l'âge en jours, mois et années
    const getAgeString = (date) => {
        const today = moment();
        const diff = today.diff(date, 'days');
        const years = Math.floor(diff / 365);
        const months = Math.floor((diff % 365) / 30);
        const days = diff % 30;

        const ageString = [];
        if (days > 0) {
            ageString.push(`${days} jour${days > 1 ? 's' : ''}`);
        }

        if (months > 0) {
            ageString.push(`${months} mois`);
        }
        if (years > 0) {
            ageString.push(`${years} ans`);
        }
        return ageString.join(' ');
    };
    return (
        <div>
            <div style={{padding: '0em 3em 3em 0em'}}>
                <Card>
                    <Descriptions bordered column={3}>
                        {/* Affectation Administrative */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.affectAdm`)}>
                            {engin?.id_affectation_administrative.id_affec_adm.libelle}
                        </Descriptions.Item>
                        {/* Référence */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.ref`)}>
                            {engin?.id_affectation_administrative.reference}
                        </Descriptions.Item>
                        {/*Attribution*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.attribution`)}>
                            {engin?.id_histo_gisement?.id_affec.libelle}

                        </Descriptions.Item>
                        {/* Affectation Physique*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.affectPhy`)}>
                            {engin?.id_affectation_physique?.id_affec_phy.libelle}

                        </Descriptions.Item>
                        {/* Marque*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.marque`)}>
                            {engin?.id_marque.nom}

                        </Descriptions.Item>
                        {/* Appellation Commerciale*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.appelcom`)}>
                            {engin?.id_appellation.nom}

                        </Descriptions.Item>
                        {/* Equipeur*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.equipeur`)}>
                            {engin?.id_equipeur.nom}

                        </Descriptions.Item>
                        {/* Type technique*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.typeTech`)}>
                            {engin?.id_type_tech.nom}

                        </Descriptions.Item>
                        {/* Type Attelage*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.attelage`)}>
                            {engin?.id_type_attelage.nom}
                        </Descriptions.Item>
                        {/* Type Classification*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.classification`)}>
                            {engin?.id_type_ops.id_type_genre.nom}

                        </Descriptions.Item>
                        {/* Type Gamme*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.gamme`)}>
                            {engin?.id_type_engin?.id_type_gamme.nom}

                        </Descriptions.Item>
                        {/* Places Assurées*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.place`)}>
                            {engin?.nb_places_assurance}

                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card>
                    <Descriptions title='Comptabilité' bordered column={3}>
                        {/*N°Inventaire Ville*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.ville`)}>
                            {engin?.no_inventaire_ville}
                        </Descriptions.Item>
                        {/* N°BCM */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.bcm`)}>
                            {engin?.no_bcm}
                        </Descriptions.Item>
                        {/* Date de sortie inventaire ville */}

                        <Descriptions.Item label={I18n.t(`fields.detailEngin.sortie`)}>
                            {engin?.d_sortie_inventaire_ville}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card>
                    <Descriptions bordered column={3}>
                        {/* Puissance Fiscale */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.puissance`)}>
                            {engin?.p_fiscale}

                        </Descriptions.Item>
                        {/* Prix Achat */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.achat`)}>
                            {engin?.p_achat_chassis}

                        </Descriptions.Item>
                        {/* N°Dossier */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.dossier`)}>
                            {engin?.no_dossier}

                        </Descriptions.Item>
                        {/* N°Folio */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.folio`)}>
                            {engin?.no_folio}

                        </Descriptions.Item>
                        {/* Date 1er mise circulation */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.prem`)}>
                            {engin?.d_mise_circulation}

                        </Descriptions.Item>
                        {/* Date d'entree en service */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.entre`)}>
                            {engin?.d_entree_service}

                        </Descriptions.Item>
                        {/* Date fin de validité Admin */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.fin`)}>
                            {engin?.d_fvadministrative}

                        </Descriptions.Item>
                        {/* Durée de Vie théorique */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.vie`)}>
                            {engin?.duree_vie_theorique}

                        </Descriptions.Item>
                        {/* Date de fin de validite assurées */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.validite`)}>
                            {engin?.d_fvassurance}

                        </Descriptions.Item>
                        {/* Age engin */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.age`)}>
                            {engin?.d_mise_circulation && (
                                <>
                                    ({getAgeString(engin.d_mise_circulation)})

                                </>
                            )}
                        </Descriptions.Item>
                        {/* N°Série */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.serie`)}>
                            {engin?.no_mine}

                        </Descriptions.Item>
                        {/* Observation */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.obs`)}>
                            <TextArea disabled rows={4} value={engin?.observations}/>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                {/*SIC*/}
                <Card>

                    <Descriptions title='SIC' bordered column={3}>

                        {/* RFGI */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.rfgi`)}>

                            {engin?.id_radio ? engin.id_radio?.rfgi : "Pas de radio"}


                        </Descriptions.Item>
                        {/* TAG h */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.tagh`)}>
                            {engin?.tag ? engin.tag : "Pas de Tag H"}

                        </Descriptions.Item>

                        {/* TAG */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.tag`)}>
                            {engin?.code_tag}

                        </Descriptions.Item>

                    </Descriptions>
                </Card>
                {/*Catalogue*/}
                <Card>
                    <Descriptions title='Catalogue' bordered column={3}>

                        {/* Numéro */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.num`)}>
                            {engin?.id_type_engin?.numero_engin}
                        </Descriptions.Item>
                        {/* Propriétaire Engin */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.proprietaire`)}>
                            {engin?.idproprietaire?.code_proprietaire}

                        </Descriptions.Item>

                        {/* Catégorisation engin */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.cate`)}>
                            {engin?.idfamille?.code_famille}

                        </Descriptions.Item>
                        {/* Année */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.years`)}>
                            {engin?.id_type_engin?.annee}

                        </Descriptions.Item>
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.type`)}>
                            <Checkbox disabled checked={engin?.tracteur}>Attelage</Checkbox>
                            <Checkbox disabled checked={engin?.id_radio}>Radio</Checkbox>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    )
}

EnginData.propTypes = {
    engin: PropTypes.object,
}

export default EnginData
