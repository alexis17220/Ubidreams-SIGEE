import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {defaultTo, get} from 'lodash';
import {bindActionCreators} from 'redux';
import {actions as enginsActions} from 'Resources/EnginsResource';
import {withNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import {Button, Card, Col, message, Row, Tabs, Typography,} from 'antd';
import {EditOutlined, FileDoneOutlined, FilePdfOutlined} from '@ant-design/icons';
import I18n from 'I18n';
import {PDFDownloadLink} from '@react-pdf/renderer';
import EnginData from 'Views/EnginDetails/EnginData';
import {EnginModal} from 'Components/Modals';
import EnginAdministrative from 'Views/EnginDetails/EnginAdministrative';
import EnginEquipement from 'Views/EnginDetails/EnginEquipement';
import EnginReparation from 'Views/EnginDetails/ReparationEngin';
import EnginGarage from 'Views/EnginDetails/EnginGarage';
import EnginAffectationPHY from 'Views/EnginDetails/EnginAffectationPHY';
import InterventionEngin from 'Views/EnginDetails/InterventionEngin';
import EnginAffectationADM from 'Views/EnginDetails/EnginAffectationADM';
import EnginAffectationGIS from 'Views/EnginDetails/EnginAffectationGIS';
import EnginDocument from 'Views/EnginDetails/EnginDocument';
import PrintablePDF from "Components/generatePDF/PrintablePDF";

const {Title} = Typography;

const EnginDetailsScreen = ({navigation, actions}) => {
    // Récupération de l'ID de l'engin depuis la navigation
    const id = navigation.state.params.id;

    // State pour gérer l'onglet actif
    const [activeTab, setActiveTab] = useState('details');

    // State pour stocker les informations de l'engin
    const [engin, setEngin] = useState();

    // State pour indiquer si on est en train de charger les données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les tables de données
    const [tables, setTables] = useState();

    // State pour afficher ou masquer le modal d'édition
    const [showEditModal, setShowEditModal] = useState(false);

    // Effet pour charger les détails de l'engin lorsque l'ID change
    useEffect(() => {
        getEnginDetails();
    }, [id]);

    // Fonction pour récupérer les détails de l'engin
    const getEnginDetails = () => {
        setFetching(true);
        actions.getOneEngins(id)
            .then(({body: value}) => {
                setEngin(value);
                setTables(tables);
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.engin.fetch'));
            });
    };

    // Fonction appelée lorsque l'édition est réussie
    const handleSuccess = () => {
        setShowEditModal(false); // Ferme le modal d'édition
        getEnginDetails(); // Récupère les nouvelles données de l'engin
    };


    // Fonction pour générer le contenu PDF
    const renderPdf = () => (<PrintablePDF engin={engin}/>

    );

    return (<main className="engin details screen">
        <header>
            <Row>
                {/* Affichage des informations principales de l'engin */}
                <Col span={6}>
                    <h1>
                        <FileDoneOutlined/>
                        {`${engin?.idfamille?.code_famille}-${engin?.id_type_engin?.annee % 100}-${engin?.id_type_engin?.numero_engin}-${engin?.idproprietaire?.code_proprietaire}`}
                    </h1>
                    <p>
                        <h2>
                            {`>>>${engin?.carrosserie}-${engin?.immatriculation}`}
                            <PDFDownloadLink document={renderPdf()}
                                             fileName={`engin_details_${engin?.immatriculation}.pdf`}>
                                {({loading}) => (loading ? 'Chargement...' : <FilePdfOutlined style={{width: 50}}/>)}
                            </PDFDownloadLink>
                        </h2>
                    </p>

                </Col>
                <Col span={6}/>
                <Col span={6}/>
                {/* Affichage des documents (carte grise, carte verte, crit'air) a faire */}
                <Col span={6}>
                    <Title level={5}>
                        <FilePdfOutlined/>
                        {' '}
                        Carte grise
                        <br/>
                        <FilePdfOutlined/>
                        {' '}
                        Carte Verte
                        <br/>
                        <FilePdfOutlined/>
                        {' '}
                        Crit'Air
                    </Title>
                </Col>
            </Row>
        </header>
        <Card loading={fetching}>
            {/* Affichage des onglets */}
            <Tabs
                defaultActiveKey="operationnelle"
                // activeKey={activeTab}
                onChange={(value) => setActiveTab(value)}
                items={[{
                    key: 'operationnelle', label: I18n.t('tabs.operation'), children: <EnginData engin={engin}/>, // Composant pour afficher les données de l'engin
                }, {
                    key: 'administrative', label: I18n.t('tabs.administrative'), children: (<main>
                        <EnginAdministrative loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'con/lev', label: I18n.t('tabs.conformite'), children: (<main>
                        {/* Affichage des équipements */}
                        {/* <Button type="primary">Ajouter un équipement</Button> */}
                        <EnginEquipement actions={actions} loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'reparation', label: I18n.t('tabs.reparationEngin'), children: (<main>
                        <EnginReparation loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'intervention', label: I18n.t('tabs.interventionEngin'), children: (<main>
                        <InterventionEngin loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'affectation', label: I18n.t('tabs.affectation'), children: (<main>
                        <Row>
                            <Col span={11}>
                                <Title level={4} style={{textAlign: 'center'}}> Affectation ADM</Title>
                                <EnginAffectationADM loading={fetching} engin={engin}/>
                            </Col>
                            <Col span={2}/>
                            <Col span={11}>
                                <Title level={4} style={{textAlign: 'center'}}> Attribution</Title>
                                <EnginAffectationGIS loading={fetching} engin={engin}/>
                            </Col>
                        </Row>
                        <hr/>
                        <Title level={4} style={{textAlign: 'center'}}> Affectation PHY</Title>
                        <EnginAffectationPHY loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'garage', label: I18n.t('tabs.garage'), children: (<main>
                        <EnginGarage loading={fetching} engin={engin}/>
                    </main>),
                }, {
                    key: 'document', label: I18n.t('tabs.file'), children: (<main>
                        <EnginDocument loading={fetching} engin={engin}/>
                    </main>),
                },]}
            />
            {/* Bouton pour ouvrir le modal d'édition */}
            <Button type="primary" onClick={() => setShowEditModal(true)}>
                <EditOutlined/>
                {I18n.t('common.edit')}
            </Button>

            {/* Modal d'édition */}
            <EnginModal
                visible={showEditModal}
                engin={engin}
                onCancel={() => setShowEditModal(false)}
                onOk={handleSuccess}
                title={I18n.t('modals.engin.update')}
            />
        </Card>
    </main>);
};

EnginDetailsScreen.propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    actionsTest: PropTypes.object,
    roles: PropTypes.array,
    allowSelection: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...enginsActions}, dispatch),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EnginDetailsScreen));
