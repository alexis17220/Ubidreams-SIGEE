// Importations des modules nécessaires
import React, {useEffect} from 'react';
import {Container} from 'Components/Modals';
import PropTypes from 'prop-types';
import {Form, Input, message} from 'antd';
import I18n from 'I18n';
import {actions as categoriesActions} from 'Resources/CategoriesResource';
import {bindActionCreators} from '@reduxjs/toolkit';
import {connect} from 'react-redux';

// Définition du composant CategoriesModal
const CategoriesModal = ({
                             visible,
                             loading,
                             headerText,
                             title,
                             onCancel,
                             categories,
                             onOk,
                             actions,
                         }) => {
    // Configuration du layout du formulaire
    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 19,
        },
    }

    // Initialisation du formulaire
    const [form] = Form.useForm();

    // Utilisation des "watchers" pour obtenir les valeurs de certains champs du formulaire
    const code_famille = Form.useWatch('code_famille', form);
    const libelle_famille = Form.useWatch('libelle_famille', form);

    // Effet pour réinitialiser le formulaire lorsque la prop "categories" change
    useEffect(() => {
        form.resetFields();
    }, [categories]);

    // Fonction pour annuler et réinitialiser le formulaire
    const doCancel = () => {
        onCancel();
        form.resetFields();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleOk = () => {
        form.validateFields(['code_famille', 'libelle_famille'])
            .then(() => {
                // Création du formulaire à envoyer
                const data = {
                    code_famille: code_famille,
                    libelle_famille: libelle_famille,
                }

                if (categories != null) {
                    if (code_famille !== categories.code_famille || libelle_famille !== categories.libelle_famille) {
                        updateCategories(data);
                    } else {
                        doCancel();
                    }
                } else {
                    createCategories(data);
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.error(I18n.t(`errors.form`), console.log(e));
            });
    }

    /*
     * Création d'une catégorie en base de données
     */
    const createCategories = (data) => {
        actions.createCategories(data)
            .then(() => {
                message.success(I18n.t(`success.categories.create`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.categories.create`));
            });
    }

    /*
     * Mise à jour d'une catégorie en base de données
     */
    const updateCategories = (data) => {
        actions.updateCategorieCategories({
            id: categories.idfamille,
            code_famille: data.code_famille,
            libelle_famille: data.libelle_famille,
        })
            .then(() => {
                message.success(I18n.t(`success.categories.update`));
                onOk();
            })
            .catch(() => {
                message.error(I18n.t(`errors.categories.update`));
            });
    }

    // Rendu du composant
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
                    ['code_famille']: categories?.code_famille,
                    ['libelle_famille']: categories?.libelle_famille,
                }}
            >
                {/* Nom */}
                <Form.Item
                    name={'code_famille'}
                    label={I18n.t(`pages.category.table.code`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.category.requiredMessageCode`),
                        },
                        {
                            max: 10,
                            message: I18n.t(`fields.category.patternMaxLength`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9]+$/,
                            message: I18n.t(`fields.category.patternCode`),
                        },
                    ]}
                >
                    <Input placeholder={I18n.t(`fields.category.placeholderCode`)}/>
                </Form.Item>
                {/* Symbole */}
                <Form.Item
                    name={'libelle_famille'}
                    label={I18n.t(`pages.category.table.libelle`)}
                    rules={[
                        {
                            required: true,
                            message: I18n.t(`fields.category.requiredMessageLibelle`),
                        },
                        {
                            pattern: /^[a-zA-Z0-9&$/\-\s]+$/,
                            message: I18n.t(`fields.category.patternLibelle`),
                        },
                    ]}
                >
                    <Input
                        placeholder={I18n.t(`fields.category.placeholderLibelle`)}
                    />
                </Form.Item>
            </Form>
        </Container>
    )
}

// Propriétés attendues du composant
CategoriesModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    headerText: PropTypes.string,
    categories: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    actions: PropTypes.object,
}

// Valeurs par défaut pour les props du composant
CategoriesModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
}

// Connexion du composant au store Redux
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...categoriesActions}, dispatch),
})

export default connect(null, mapDispatchToProps)(CategoriesModal)
