import {Card, Col, Input, message, Row, Table, Typography} from "antd";
import {BarChartOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";

import {baseURL} from "Resources";
import I18n from "I18n";
import {age, classification, gamme, proprietaire} from "Components/Values/DashboardData/DashboardDetailTableData";

const {Title} = Typography;

const DashboardAlertes = () => {
    // États pour stocker les options, les résultats et les colonnes de tableaux pour chaque catégorie de données (classification, gamme, propriétaire, âge)
    const [options, setOptions] = useState([]);
    const [results, setResults] = useState([]);
    const [tables, setTables] = useState(proprietaire);
    const [totalCountProp, setTotalCountProp] = useState(0);

    const [optionsClass, setOptionsClass] = useState([]);
    const [resultsClass, setResultsClass] = useState([]);
    const [tablesClass, setTablesClass] = useState(classification);
    const [totalCountClass, setTotalCountClass] = useState(0);

    const [optionsGamme, setOptionsGamme] = useState([]);
    const [resultsGamme, setResultsGamme] = useState([]);
    const [tablesGamme, setTablesGamme] = useState(gamme);
    const [totalCountGamme, setTotalCountGamme] = useState(0);

    const [optionsAge, setOptionsAge] = useState([]);
    const [resultsAge, setResultsAge] = useState([]);
    const [tablesAge, setTablesAge] = useState(age);
    const [totalCountAge, setTotalCountAge] = useState(0);
    const [averageAge, setAverageAge] = useState(0);

    // Fonction pour récupérer les données de la classification des engins à partir de l'URL baseURL/countClassificationEngin/
    const getClassificationEnginData = async () => {
        try {
            const response = await fetch(`${baseURL}/countClassificationEngin/`);
            const data = await response.json();

            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nbr_engin: item.nbr_engin,
                    libelle: item.libelle_famille,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.nbr_engin, 0);

                // Mettre à jour les états avec les résultats et options appropriés
                const newOptions = results.map((result) => ({
                    value: result.idfamille,
                    label: result.idfamille,
                }));
                setOptionsClass(newOptions);
                setTablesClass(classification);
                setResultsClass(results);
                setTotalCountClass(totalCount);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.classification.fetch`));
        }
    };

    // Fonction pour récupérer les données de la gamme des engins à partir de l'URL baseURL/countGammeEngin/
    const getGammeEnginData = async () => {
        try {
            const response = await fetch(`${baseURL}/countGammeEngin/`);
            const data = await response.json();

            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nbr_engin: item.nbr_engin,
                    nom: item.nom,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.nbr_engin, 0);

                // Mettre à jour les états avec les résultats et options appropriés
                const newOptions = results.map((result) => ({
                    value: result.id_type_gamme,
                    label: result.id_type_gamme,
                }));
                setOptionsGamme(newOptions);
                setTablesGamme(gamme);
                setResultsGamme(results);
                setTotalCountGamme(totalCount);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.gamme.fetch`));
        }
    };

    // Fonction pour récupérer les données des propriétaires d'engins à partir de l'URL baseURL/countProprietaireEngin/
    const getProprietaireEnginData = async () => {
        try {
            const response = await fetch(`${baseURL}/countProprietaireEngin/`);
            const data = await response.json();

            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nbr_engin: item.nbr_engin,
                    libelle: item.libelle,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.nbr_engin, 0);

                // Mettre à jour les états avec les résultats et options appropriés
                const newOptions = results.map((result) => ({
                    value: result.idproprietaire,
                    label: result.idproprietaire,
                }));
                setOptions(newOptions);
                setTables(proprietaire);
                setResults(results);
                setTotalCountProp(totalCount);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.proprietaire.fetch`));
        }
    };

    // Fonction pour récupérer les données de l'âge des engins à partir de l'URL baseURL/countTypeTechAgeEngin/
    const getAgeEnginData = async () => {
        try {
            const response = await fetch(`${baseURL}/countTypeTechAgeEngin/`);
            const data = await response.json();

            if (Array.isArray(data)) {
                // Traiter les données reçues pour obtenir les résultats et le nombre total
                const results = data.map((item) => ({
                    nombreEngin: item.nombreEngin,
                    ageEngin: item.ageEngin,
                    nom: item.nom,
                }));
                const totalCount = results.reduce((sum, item) => sum + item.ageEngin, 0);
                const averageAge = totalCount / results.length;
                const formattedAverageAge = averageAge.toFixed(2); // Formatage avec deux décimales

                // Mettre à jour les états avec les résultats, options et moyenne d'âge appropriés
                const newOptions = results.map((result) => ({
                    value: result.id_type_tech,
                    label: result.id_type_tech,
                }));
                setOptionsAge(newOptions);
                setTablesAge(age);
                setResultsAge(results);
                setTotalCountAge(totalCount);
                setAverageAge(formattedAverageAge);
            } else {
                console.log("Les données renvoyées ne sont pas valides");
            }
        } catch (error) {
            message.error(I18n.t(`errors.typeTech.fetch`));
        }
    };

    // Utilisation du hook useEffect pour effectuer les appels aux fonctions de récupération des données une fois que le composant est monté
    useEffect(() => {
        getClassificationEnginData().then(() => {
        });
        getGammeEnginData().then(() => {
        });
        getProprietaireEnginData().then(() => {
        });
        getAgeEnginData().then(() => {
        });
    }, []);

    // Rendu du composant, affichant différentes colonnes avec des graphiques à barres et des tableaux pour chaque catégorie de données (classification, gamme, propriétaire, âge)
    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3}
                           style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.repartitionClassification`)}</Title>
                    <Row>
                        <Col span={8}/>
                        <Col span={8}> <Input disabled style={{textAlign: "center"}} value={totalCountClass}/></Col>
                        <Col span={8}><BarChartOutlined style={{fontSize: '25px'}}/> </Col>
                    </Row>
                    <Table
                        columns={tablesClass}
                        dataSource={resultsClass}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.repartitionGamme`)}</Title>
                    <Row>
                        <Col span={8}/>
                        <Col span={8}> <Input disabled style={{textAlign: "center", width: "150px"}}
                                              value={totalCountGamme}/></Col>
                        <Col span={8}><BarChartOutlined style={{fontSize: '25px'}}/> </Col>
                    </Row>
                    <Table
                        columns={tablesGamme}
                        dataSource={resultsGamme}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3}
                           style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.repartitionProprietaire`)}</Title>
                    <Row>
                        <Col span={8}/>
                        <Col span={8}> <Input disabled style={{textAlign: "center", width: "150px"}}
                                              value={totalCountProp}/></Col>
                        <Col span={8}><BarChartOutlined style={{fontSize: '25px'}}/> </Col>
                    </Row>
                    <Table
                        columns={tables}
                        dataSource={results}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.ageMoyenEngin`)}</Title>
                    <Row>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}/>
                        <Col xs={20} sm={16} md={12} lg={8} xl={4}><Input disabled
                                                                          style={{textAlign: "center", width: "150px"}}
                                                                          value={averageAge}/><BarChartOutlined
                            style={{fontSize: '25px'}}/> </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}/>
                    </Row>
                    <Table
                        columns={tablesAge}
                        dataSource={resultsAge}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default DashboardAlertes;
