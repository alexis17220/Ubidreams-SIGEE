import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Descriptions, Tag, Popover, Image, Typography, Card} from 'antd'
import I18n from 'I18n'

const EnginData = ({engin}) => {


    return (
        <div>
            <div style={{padding: '0em 3em 3em 0em'}}>
                <Card>
                    <Descriptions bordered column={3}>
                        {/* Libelle Sigle */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.libelleSigle`)}>
                            {engin?.id_type_tech.libelle}

                        </Descriptions.Item>
                        {/* Immatriculation */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.registration`)}>
                            {engin?.immatriculation}

                        </Descriptions.Item>
                        {/*Carrosserie*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.carrosserie`)}>
                            {engin?.carrosserie}

                        </Descriptions.Item>
                        {/* Categorie Affectation */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.catAffect`)}>
                            {engin?.id_categorie.nom}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card>
                    <Descriptions title='OPS' bordered column={3}>
                        {/*Type OPS*/}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.typeOps`)}>
                            {engin?.id_type_ops.nom}

                        </Descriptions.Item>
                        {/* N°Départ OPS */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.depart`)}>
                            {engin?.no_depart}

                        </Descriptions.Item>
                        {/* Statut OPS */}
                        <Descriptions.Item
                            span={2}
                            label={I18n.t(`fields.detailEngin.statutOps`)}
                        >
                            {engin?.id_statut_ops.libelle}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card>
                    {/*Ordonnancement*/}
                    <Descriptions title='Ordonnancement' bordered column={3}>

                        {/* Statut Tech */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.statutTech`)}>
                            {engin?.id_statut_tech.libelle}

                        </Descriptions.Item>
                        {/* Position */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.position`)}>
                            {engin?.id_type_engin?.gisement_reel?.libelle}

                        </Descriptions.Item>

                        {/* Kilomètrage */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.km`)}>
                            {engin?.compteur1}

                        </Descriptions.Item>
                        {/* horamètre */}
                        <Descriptions.Item label={I18n.t(`fields.detailEngin.hr`)}>
                            {engin?.compteur2}

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
