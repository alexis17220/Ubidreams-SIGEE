import React from 'react'
import PropTypes from 'prop-types'
import {Card, Descriptions} from 'antd'
import I18n from 'I18n'
import TextArea from "antd/es/input/TextArea";

const ReparationData = ({reparation}) => {

    console.log('reparation', reparation)
    return (
        <div>
            <div style={{padding: '0em 3em 3em 0em'}}>
                <Card>
                    <Descriptions bordered column={3}>

                        {/* Observation */}
                        <Descriptions.Item label={I18n.t(`fields.detailReparation.raison`)}>
                            <TextArea disabled rows={4} value={reparation?.desc_raison_entree}/>
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
