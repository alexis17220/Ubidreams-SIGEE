import React, {useEffect} from 'react';
import {Container} from 'Components/Modals'; // Import du composant Container (probablement une modal)
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd'; // Import des composants de formulaire et de message de la bibliothèque antd (Ant Design)
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {actions as EquipementsActions} from 'Resources/EquipementsRessources'; // Actions liées aux équipements
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const EquipementModal = ({
                             visible,
                             loading,
                             headerText,
                             title,
                             onCancel,
                             equipements,
                             actions,
                             onOk,
                         }) => {
    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 19,
        },
    };

    const [form] = Form.useForm(); // Initialisation du formulaire (avec les valeurs des champs contrôlées par le formulaire)
    const periode_revision = Form.useWatch('periode_revision', form); // Surveillance des changements du champ 'periode_revision'
    const libelle = Form.useWatch('libelle', form); // Surveillance des changements du champ 'libelle'

    useEffect(() => form.resetFields(), [equipements]); // Remise à zéro des champs du formulaire lorsque 'equipements' change

    const doCancel = () => {
        onCancel();
        form.resetFields(); // Annule l'action en cours et remet à zéro les champs du formulaire
    };

    const handleOk = () => {
        form
            .validateFields(['periode_revision', 'libelle']) // Vérification des champs 'periode_revision' et 'libelle'
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    periode_revision: periode_revision,
                    libelle: libelle,
                };

                if (equipements != null) {
                    // Si un équipement est déjà sélectionné pour édition
                    if (periode_revision !== equipements.periode_revision || libelle !== equipements.libelle) {
                        updateEquipements(data); // Met à jour les données de l'équipement
                    } else {
                        doCancel(); // Annule l'action si les valeurs du formulaire n'ont pas changé
                    }
                } else {
                    createEquipements(data); // Crée un nouvel équipement avec les données du formulaire
                    form.resetFields(); // Remet à zéro les champs du formulaire après création
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e)); // Affiche un message d'erreur si la validation échoue
            });
    };

    /*
     * Création d'un équipement en base de données
     */
    const createEquipements = (data) => {
        actions
            .createEquipements(data) // Appelle l'action 'createEquipements' pour créer un nouvel équipement
            .then(() => {
                message.success(I18n.t(`success.equipement.create`)); // Affiche un message de succès après la création de l'équipement
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipement.create`)); // Affiche un message d'erreur en cas d'échec de création de l'équipement
            });
    };

    /*
     * Mise à jour d'un équipement en base de données
     */
    const updateEquipements = (data) => {
        actions
            .updateEquipementEquipements({
                id: equipements.idequipements, // ID de l'équipement à mettre à jour
                periode_revision: data.periode_revision,
                libelle: data.libelle,
            })
            .then(() => {
                message.success(I18n.t(`success.equipement.update`)); // Affiche un message de succès après la mise à jour de l'équipement
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.equipement.update`)); // Affiche un message d'erreur en cas d'échec de mise à jour de l'équipement
            });
    };

    return visible && (
        <Container
            visible={visible}
            loading={loading}
            title={title}
            headerText={headerText}
            onCancel={doCancel}
            onOk={handleOk}
        >
            <Form
                {...formItemLayout}
                form={form}
                initialValues={{
                    ['periode_revision']: equipements?.periode_revision,
                    ['libelle']: equipements?.libelle,
                }}
            >
                {/* Champ de saisie du nom de l'équipement */}
                <Form.Item
                    name={'libelle'}
                    label={I18n.t(`pages.equipement.table.libelle`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipement.requiredMessage`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9\-\s]+$/,
                            message: I18n.t(`fields.equipement.patternLibelle`),
                        },
                    ]}
                >
                    <Input
                        placeholder={I18n.t(`fields.equipement.placeholderLibelle`)}
                    />
                </Form.Item>
                {/* Champ de saisie de la période de révision */}
                <Form.Item
                    name={'periode_revision'}
                    label={I18n.t(`pages.equipement.table.periode`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.equipement.requiredMessagePeriode`),
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: I18n.t(`fields.equipement.patternPeriode`),
                        },
                    ]}
                >
                    <Input placeholder={I18n.t(`fields.equipement.placeholderPeriode`)}/>
                </Form.Item>
            </Form>
        </Container>
    );
};

EquipementModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    equipements: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
};

EquipementModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipementsActions}, dispatch),
});

export default connect(null, mapDispatchToProps)(EquipementModal);
