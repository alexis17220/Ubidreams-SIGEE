import React from 'react'
import PropTypes from 'prop-types'
import {Card, Descriptions} from 'antd'
import I18n from 'I18n'

const ReparationData = ({reparation}) => {
    return (
        <div>
            <div style={{padding: '0em 3em 3em 0em'}}>
                <Card>
                    <Descriptions bordered column={3}>
                        {/* Immatriculation */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.registration`)}>
                            {reparation?.id_engin?.immatriculation}

                        </Descriptions.Item>
                        {/*Carrosserie*/}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.carrosserie`)}>
                            {reparation?.id_engin?.carrosserie}

                        </Descriptions.Item>
                        {/* Affectation */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.affectAdm`)}>
                            {reparation?.id_engin?.id_affectation_administrative.id_affec_adm.libelle}
                        </Descriptions.Item>
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.affectPhy`)}>
                            {reparation?.id_engin?.id_affectation_physique.id_affec_phy.libelle}
                        </Descriptions.Item>
                        {/* d_entree */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.dateE`)}>
                            {reparation?.d_entree}
                        </Descriptions.Item>
                        {/* statutTech */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.statutTech`)}>
                            {reparation?.id_engin?.id_statut_tech?.libelle}
                        </Descriptions.Item>
                        {/* Kilomètrage */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.km`)}>
                            {reparation?.km_reception}
                        </Descriptions.Item>
                        {/* horamètre */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.hr`)}>
                            {reparation?.hdm_moteur_reception}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

            </div>
        </div>
    )
}

ReparationData.propTypes = {
    reparation: PropTypes.object,
}

export default ReparationData
