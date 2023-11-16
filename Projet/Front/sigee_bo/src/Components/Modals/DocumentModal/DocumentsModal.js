// Importations des modules nécessaires
import React, {useEffect, useState} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {DatePicker, Form, Input, message, Select} from 'antd';
import I18n from 'I18n';
import {actions as DocumentActions} from 'Resources/DocumentRessources';
import {actions as EnginsActions} from 'Resources/EnginsResource';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import {baseURL} from 'Resources';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/en_US';
import UploadFile from 'Components/Values/UploadFile';
import axios from 'axios';

const {Option} = Select;

// Définition du composant DocumentModal
const DocumentModal = ({
                           visible,
                           loading,
                           headerText,
                           onCancel,
                           document,
                           actions,
                           onOk,
                           engin,
                       }) => {
    // Configuration du layout du formulaire
    const formItemLayout = {
        labelCol: {
            span: 9,
        },
        wrapperCol: {
            span: 19,
        },
    };

    // Initialisation du formulaire
    const [form] = Form.useForm();

    // Utilisation du "watcher" pour obtenir la valeur des champs du formulaire
    const id_engin = Form.useWatch('immatriculation', form);
    const titre = Form.useWatch('titre', form);
    const date_fv = Form.useWatch('date_fv', form);
    const form_file = Form.useWatch('lien', form);

    // État local pour gérer le fichier en cours d'upload
    const [file, setFile] = useState(null);

    // État local pour stocker l'ID de l'engin sélectionné
    const [idEngin, setIdEngin] = useState(
        document?.id_engin?.id_engin || engin?.id_engin
    );

    // État local pour stocker les valeurs des engins disponibles
    const [enginValues, setEnginValues] = useState([]);

    // Effet pour mettre à jour les valeurs locales lorsque la prop "document" change
    useEffect(() => {
        setFile(document?.lien);
        setIdEngin(document?.id_engin?.id_engin || engin?.id_engin);
    }, [document]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        onCancel();
        form.resetFields();
    };

    // Effet pour réinitialiser le formulaire lorsque la prop "document" change
    useEffect(() => {
        form.resetFields();
    }, [document]);

    // Fonction pour gérer la soumission du formulaire                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    const handleOk = () => {
        form.validateFields(['immatriculation', 'titre', 'date_fv', 'lien'])
            .then(() => {
                // Créer un objet FormData pour envoyer les données avec le fichier
                const formData = new FormData();
                formData.append("titre", titre);
                formData.append("id_engin", idEngin !== undefined ? idEngin : (engin && engin.id_engin) || id_engin);
                formData.append("date_fv", moment(date_fv).format('YYYY-MM-DD'));
                formData.append("lien", file);
                // Vérifier si le document existe déjà pour décider de créer ou de mettre à jour
                if (document != null) {
                    if (
                        id_engin !== document.id_engin.id_engin ||
                        titre !== document.titre ||
                        file !== document.lien ||
                        date_fv !== document.date_fv
                    ) {
                        updateDocuments(formData);
                    } else {
                        doCancel();
                    }
                } else {
                    createDocuments(formData);
                }
            })
            .catch((error) => {
                console.log(error);
                message.error(I18n.t('errors.form'));
            });
    };

    // Fonction pour créer un nouveau document dans la base de données
    const createDocuments = (formData) => {
        axios.post(`${baseURL}/documents/`, formData, {
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data',
                app: 'BO',
            },
            withCredentials: true,
        })
            .then(() => {
                message.success(I18n.t(`success.document.create`));
                onOk();
            })
            .then(() => {
                form.resetFields();
            })
            .catch((e) => {
                console.log(e);
                message.error(I18n.t(`errors.document.create`));
            });
    };

    // Fonction pour mettre à jour un document existant dans la base de données
    const updateDocuments = (formData) => {
        axios.put(`${baseURL}/documents/${document.id_document}/`, formData, {
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data',
                app: 'BO',
            },
            withCredentials: true,
        })
            .then(() => {
                message.success(I18n.t(`success.document.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.document.update`));
            });
    };

    // Effet pour récupérer les données des engins depuis la base de données
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/engins/`);
                setEnginValues(response.data.results);
            } catch (error) {
                message.error(I18n.t('errors.engin.fetch'));
            }
        };
        fetchData();
    }, []);

    // Fonction pour filtrer les engins en fonction de la recherche
    const getEnginData = async () => {
        try {
            let response;
            if (engin?.id_engin) {
                response = await actions.getOneEngins({id: engin.id_engin});
            } else {
                response = await actions.getEngins();
            }
            setEnginValues(response.body.results);
        } catch (error) {
            message.error(I18n.t('errors.engin.fetch'));
        }
    };

    // État local pour stocker la valeur de recherche des engins
    const [searchValue, setSearchValue] = useState('');

    // Fonction pour mettre à jour la valeur de recherche des engins
    const handleSearch = (value) => {
        setSearchValue(value);
    };

    // Filtrer les engins en fonction de la valeur de recherche
    const filteredEnginValues = enginValues ? enginValues.filter((engin) =>
        engin.immatriculation.toLowerCase().includes(searchValue.toLowerCase())
    ) : engin.id_engin;

    // Effet pour récupérer les données des engins
    useEffect(() => {
        getEnginData();
    }, []);

    // Fonction pour rendre le sélecteur d'engin ou un champ texte selon le contexte
    const enginSelector = () => {
        if (document?.id_engin?.id_engin || engin?.id_engin) {
            return (
                <Input
                    key={document?.id_engin?.id_engin || engin?.id_engin}
                    value={`${document?.id_engin?.immatriculation || engin?.immatriculation}`}
                    readOnly
                />
            );
        } else {
            return (
                <Select
                    showSearch
                    placeholder={I18n.t('fields.engin.placeholderRegistration')}
                    value={engin?.id_engin ? engin.immatriculation : engin?.id_engin}
                    onSearch={handleSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {filteredEnginValues.map((engin) => (
                        <Option key={engin.immatriculation} value={engin.id_engin}>
                            {I18n.t(`${engin.immatriculation}`)}
                        </Option>
                    ))}
                </Select>
            );
        }
    };

    // Rendu du composant DocumentModal
    return (
        visible && (
            <Container
                visible={visible}
                loading={loading}
                titre={titre}
                headerText={headerText}
                onCancel={doCancel}
                onOk={handleOk}
            >
                <Form
                    encType="multipart/form-data"
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        titre: document?.titre || null,
                        lien: null,
                        date_fv: document?.date_fv ? moment(document.date_fv) : null,
                    }}
                >
                    <Form.Item
                        name={'immatriculation'}
                        label={I18n.t('pages.engin.table.registration')}
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.engin.requiredMessageRegistration'),
                            },
                        ]}
                        initialValue={document?.id_engin?.immatriculation || (engin?.id_engin ? engin.immatriculation : "")}
                    >
                        {enginSelector()}
                    </Form.Item>

                    <Form.Item
                        name={'titre'}
                        label={I18n.t('pages.document.table.title')}
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.document.requiredMessage'),
                            },
                            {
                                pattern: /^[a-zA-Z0-9&$/\-\s()]+$/,
                                message: I18n.t('fields.document.patternTitle'),
                            },
                        ]}
                    >
                        <Input placeholder={I18n.t('fields.document.placeholderTitle')}/>
                    </Form.Item>

                    <Form.Item
                        name={'lien'}
                        label={I18n.t('pages.document.table.file')}
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.document.requiredMessageFile'),
                            },
                        ]}
                        defaultValue={null}
                    >
                        <UploadFile elementName={document?.lien} setFile={setFile} maxCount={1}/>
                    </Form.Item>

                    <Form.Item
                        name={'date_fv'}
                        label={I18n.t('pages.document.table.dateEnd')}
                        valuePropName={'date'}
                    >
                        <DatePicker locale={locale} format="yyyy-MM-DD"/>
                    </Form.Item>
                </Form>
            </Container>
        )
    );
};

// Définition des types des props du composant
DocumentModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    titre: PropTypes.string,
    headerText: PropTypes.string,
    document: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

// Valeurs par défaut des props
DocumentModal.defaultProps = {
    okText: 'Ok',
};

// Connexion du composant au store Redux et mappage des actions
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...DocumentActions, ...EnginsActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(DocumentModal);
