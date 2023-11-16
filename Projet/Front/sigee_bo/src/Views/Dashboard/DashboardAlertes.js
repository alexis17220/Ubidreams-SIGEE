import {Card, Col, Input, message, Row, Table, Typography} from "antd";
import {CalendarOutlined, ToolOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {
    columnsTableAlerteRevision,
    columnsTableAlerteValidite
} from "Components/Values/DashboardData/DashboardAlerteTableData";
import {baseURL} from "Resources";
import I18n from "I18n";

const {Title} = Typography;

const DashboardAlertes = () => {
    const [totalCountRevision, setTotalCountRevision] = useState(0); // État pour stocker le nombre total d'alertes de révision
    const [totalCountValidite, setTotalCountValidite] = useState(0); // État pour stocker le nombre total d'alertes de validité

    const [options, setOptions] = useState([]); // État pour stocker les options (données transformées) des alertes
    const [results, setResults] = useState([]); // État pour stocker les résultats des alertes de révision
    const [resultsValidite, setResultsValidite] = useState([]); // État pour stocker les résultats des alertes de validité
    const [tables, setTables] = useState(columnsTableAlerteRevision); // État pour stocker les colonnes du tableau des alertes de révision
    const [tablesValidite, setTablesValidite] = useState(columnsTableAlerteValidite); // État pour stocker les colonnes du tableau des alertes de validité

    // Fonction pour récupérer les données des alertes de révision à partir de l'URL baseURL/alerteRevisionView/
    const getAlerteRevisionData = async () => {
        try {
            const response = await fetch(`${baseURL}/alerteRevisionView/`);
            const data = await response.json();
            const results = data.results;
            const count = results.length;
            setTotalCountRevision(count);

            const newOptions = results.map((result) => {
                return {
                    value: result.id_alerte,
                    label: result.id_alerte,
                    count: result.count,
                    carrosserie: result.carrosserie,
                    immatriculation: result.immatriculation,
                    libelle: result.libelle_phy,
                };
            });

            setOptions(newOptions);
            setTables(
                columnsTableAlerteRevision.map((column) => {
                    const updatedColumn = {
                        ...column,
                        dataIndex: column.dataIndex,
                        render: (text, record) => record[column.dataIndex],
                    };
                    return updatedColumn;
                })
            );

            setResults(results); // Mettre à jour les résultats des alertes de révision
        } catch (error) {
            message.error(I18n.t(`errors.engin.fetch`));
        }
    };

    // Fonction pour récupérer les données des alertes de validité à partir de l'URL baseURL/alerteValiditeView/
    const getAlerteValiditeData = async () => {
        try {
            const response = await fetch(`${baseURL}/alerteValiditeView/`);
            const data = await response.json();
            const resultsValidite = data.results;
            const count = resultsValidite.length;
            setTotalCountValidite(count);

            const newOptions = resultsValidite.map((result) => {
                return {
                    value: result.id_alerte,
                    label: result.id_alerte,
                    count: result.count,
                    carrosserie: result.carrosserie,
                    immatriculation: result.immatriculation,
                    libelle: result.libelle_phy,
                };
            });

            setOptions(newOptions);
            setTablesValidite(
                columnsTableAlerteValidite.map((column) => {
                    const updatedColumn = {
                        ...column,
                        dataIndex: column.dataIndex,
                        render: (text, record) => record[column.dataIndex],
                    };
                    return updatedColumn;
                })
            );

            setResultsValidite(resultsValidite); // Mettre à jour les résultats des alertes de validité
        } catch (error) {
            message.error(I18n.t(`errors.engin.fetch`));
        }
    };

    // Utilise useEffect pour récupérer les données des alertes de révision et de validité lors du premier rendu du composant
    useEffect(() => {
        getAlerteRevisionData().then(() => {
        });
        getAlerteValiditeData().then(() => {
        });
    }, []);

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.alerteR`)}</Title>
                    <Row>
                        <Col span={8}/>
                        <Col span={8}> <Input disabled style={{textAlign: "center", width: "150px"}}
                                              value={totalCountRevision}/><ToolOutlined
                            style={{fontSize: '25px'}}/></Col>
                        <Col span={8}/>
                    </Row>
                    <Table
                        columns={tables}
                        dataSource={results} // Remplacez "results" par les données que vous souhaitez afficher dans le tableau des alertes de révision
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{marginBottom: '16px'}}>
                    <Title level={3} style={{textAlign: "center"}}>{I18n.t(`pages.dashboard.alerteD`)}</Title>
                    <Row>
                        <Col span={8}/>
                        <Col span={8}> <Input disabled style={{textAlign: "center", width: "150px"}}
                                              value={totalCountValidite}/><CalendarOutlined style={{fontSize: '25px'}}/></Col>
                        <Col span={8}/>
                    </Row>
                    <Table
                        columns={tablesValidite}
                        dataSource={resultsValidite} // Remplacez "resultsValidite" par les données que vous souhaitez afficher dans le tableau des alertes de validité
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default DashboardAlertes;
