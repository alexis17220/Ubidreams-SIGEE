// Import des modules et composants nécessaires
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {defaultTo, get} from 'lodash';
import {bindActionCreators} from 'redux';
import {actions as reparationActions} from 'Resources/ReparationRessource';
import {withNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import {Card, Col, message, Row, Tabs, Typography,} from 'antd';
import {FileDoneOutlined} from '@ant-design/icons';
import I18n from 'I18n';
import ReparationData from 'Views/ReparationDetail/ReparationData';
import ReparationRaison from 'Views/ReparationDetail/ReparationRaison';
import ReparationIntervention from 'Views/ReparationDetail/ReparationIntervention';
import ReparationCommande from 'Views/ReparationDetail/ReparationCommande';

const {Title} = Typography;

const ReparationDetailsScreen = ({navigation, actions}) => {
    // Récupère l'ID de la réparation depuis les paramètres de navigation
    const id = navigation.state.params.id;

    // États du composant
    const [activeTab, setActiveTab] = useState('details');
    const [reparation, setReparation] = useState();
    const [fetching, setFetching] = useState(true);
    const [tables, setTables] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    // Effet pour récupérer les détails de la réparation lorsque l'ID change
    useEffect(() => {
        getReparationDetails();
    }, [id]);

    // Fonction pour récupérer les détails de la réparation depuis l'API
    const getReparationDetails = () => {
        setFetching(true);
        actions
            .getOneReparation(id) // récupère les informations de l'reparation (aussi ces warehouses associés)
            .then(({body: value}) => {
                setReparation(value);
                setTables(tables);
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.reparation.fetch`));
            });
    };

    // Fonction pour traiter le succès de la modification de la réparation
    const handleSuccess = () => {
        setShowEditModal(false); //ferme le modal
        getReparationDetails(); // récupère les nouvelles données de la réparation
    };

    return (
        <main className="reparation details screen">
            <header>
                <Row>
                    <Col span={6}>
                        <h1>
                            <FileDoneOutlined/>
                            {reparation?.id_engin?.immatriculation}-{reparation?.id_engin?.carrosserie}
                        </h1>
                    </Col>
                </Row>
            </header>
            <Card loading={fetching}>
                {/* Onglets pour afficher différentes sections des détails de la réparation */}
                <Tabs
                    defaultActiveKey="operationnelle"
                    onChange={(value) => setActiveTab(value)}
                    items={[
                        {
                            key: 'operationnelle',
                            label: I18n.t(`tabs.operation`),
                            children: <ReparationData reparation={reparation}/>,
                        },
                        {
                            key: 'raison',
                            label: I18n.t(`tabs.raison`),
                            children: (
                                <main>
                                    <ReparationRaison loading={fetching} reparation={reparation}/>
                                </main>
                            ),
                        },
                        {
                            key: 'con/lev',
                            label: I18n.t(`tabs.intervention`),
                            children: (
                                <main>
                                    <ReparationIntervention actions={actions} loading={fetching}
                                                            reparation={reparation}/>
                                </main>
                            ),
                        },
                        {
                            key: 'reparation',
                            label: I18n.t(`tabs.commande`),
                            children: (
                                <main>
                                    <ReparationCommande loading={fetching} reparation={reparation}/>
                                </main>
                            ),
                        },
                    ]}
                />

                {/* Bouton pour ouvrir le modal de modification de la réparation */}
                {/* <Button type="primary" onClick={() => setShowEditModal(true)}>
          <EditOutlined />
          {I18n.t(`common.edit`)}
        </Button> */}

                {/* Modal de modification de la réparation */}
                {/* <ReparationModal
          visible={showEditModal}
          reparation={reparation}
          onCancel={() => setShowEditModal(false)}
          onOk={handleSuccess}
          title={I18n.t(`modals.reparation.update`)}
        /> */}
            </Card>
        </main>
    );
};

// Définition des types des props
ReparationDetailsScreen.propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    actionsTest: PropTypes.object,
    roles: PropTypes.array,
    allowSelection: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...reparationActions}, dispatch),
});

// Connexion du composant à Redux et ajout de la navigation
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ReparationDetailsScreen));
