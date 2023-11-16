import {Card, Col, Input, message, Row, Table, Typography} from "antd";
import {ToolOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";

import {baseURL} from "Resources";
import I18n from "I18n";
import {
    DashboardReparationInterventionTableData,
    DashboardReparationTableData,
    DashboardReparationTechTableData
} from "Components/Values/DashboardData/DashboardReparationTableData";

const {Title} = Typography;

const DashboardReparation = () => {
    // États pour stocker les options, les résultats et les colonnes de tableaux pour chaque type de données
    const [options, setOptions] = useState([]);
    const [results, setResults] = useState([]);
    const [tables, setTables] = useState(DashboardReparationTableData);
    const [totalCountTech, setTotalCountTech] = useState(0);

    const [optionsTech, setOptionsTech] = useState([]);
    const [resultsTech, setResultsTech] = useState([]);
    const [tablesTech, setTablesTech] = useState(DashboardReparationTechTableData);

    const [optionsIntervention, setOptionsIntervention] = useState([]);
    const [resultsIntervention, setResultsIntervention] = useState([]);
    const [tablesIntervention, setTablesIntervention] = useState(DashboardReparationInterventionTableData);
    const [totalCountIntervention, setTotalCountIntervention] = useState(0);

    // Fonction pour récupérer les données relatives aux alertes de réparation à partir de l'URL baseURL/alerteReparation/
    const getAlerteReparationData = async () => {
        try {
            const response = await fetch(`${baseURL}/alerteReparation/`);
            const data = await response.json();

            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats
                const results = data.map((item) => ({
                    desc_raison_entree: item[0],
                    total_reparationsN: item[1],
                    total_reparationsN1: item[2],
                    total_reparationsN2: item[3],
                }));

                // Mettre à jour les états avec les résultats et options appropriés
                const newOptions = results.map((result) => ({
                    value: result.desc_raison_entree,
                    label: result.desc_raison_entree,
                }));
                setOptions(newOptions);
                setTables(DashboardReparationTableData);
                setResults(results);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.reparation.fetch`));
        }
    };

    // Fonction pour récupérer les données relatives aux alertes de type technique de réparation à partir de l'URL baseURL/alerteTypeTechReparation/
    const getAlerteTypeTechReparationData = async () => {
        try {
            const response = await fetch(`${baseURL}/alerteTypeTechReparation/`);
            const data = await response.json();
            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nom: item.nom,
                    nbr_reparation: item.nbr_reparation,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.nbr_reparation, 0);

                // Mettre à jour les états avec les résultats, options et nombre total appropriés
                const newOptions = results.map((result) => ({
                    value: result.nom,
                    label: result.nom,
                }));
                setOptionsTech(newOptions);
                setTablesTech(DashboardReparationTechTableData);
                setResultsTech(results);
                setTotalCountTech(totalCount);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.reparation.fetch`));
        }
    };

    // Fonction pour récupérer les données relatives aux alertes d'interventions de réparation à partir de l'URL baseURL/alerteIntervenant/
    const getAlerteInterventionReparationData = async () => {
        try {
            const response = await fetch(`${baseURL}/alerteIntervenant/`);
            const data = await response.json();
            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nom: item.nom,
                    nbre_inter: item.nbre_inter,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.nbre_inter, 0);

                // Mettre à jour les états avec les résultats, options et nombre total appropriés
                const newOptions = results.map((result) => ({
                    value: result.nom,
                    label: result.nom,
                }));
                setOptionsIntervention(newOptions);
                setTablesIntervention(DashboardReparationInterventionTableData);
                setResultsIntervention(results);
                setTotalCountIntervention(totalCount);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.intervention.fetch`));
        }
    };

    // Utilisation du hook useEffect pour effectuer les appels aux fonctions de récupération des données une fois que le composant est monté
    useEffect(() => {
        getAlerteReparationData().then(() => {
        });
        getAlerteTypeTechReparationData().then(() => {
        });
        getAlerteInterventionReparationData().then(() => {
        });

    }, []);

    // Rendu du composant, affichant trois parties :
    // 1. Un tableau des alertes de réparation
    // 2. Deux colonnes affichant les nombres de réparations et d'interventions par type technique
    // 3. Un tableau des alertes d'interventions de réparation
    return (
        <>
            <Card style={{marginBottom: '16px'}}>
                <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.reparationType`)}</Title>
                <Table
                    columns={tables}
                    dataSource={results}
                />
            </Card>
            <Row gutter={16}>
                <Col span={12}>
                    <Card style={{marginBottom: '16px'}}>
                        <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.nbReparation`)}
                            <Input
                                disabled
                                style={{textAlign: "center", width: "150px", marginLeft: "10px"}}
                                value={totalCountTech}/>
                            <ToolOutlined style={{fontSize: '25px'}}/></Title>
                        <Table
                            columns={tablesTech}
                            dataSource={resultsTech}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{marginBottom: '16px'}}>
                        <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.nbIntervention`)}
                            <Input
                                disabled
                                style={{textAlign: "center", width: "150px", marginLeft: "10px"}}
                                value={totalCountIntervention}/>
                            <ToolOutlined style={{fontSize: '25px'}}/></Title>
                        <Table

                            columns={tablesIntervention}
                            dataSource={resultsIntervention}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DashboardReparation;
