// Importations nécessaires pour utiliser les fonctionnalités du code
import React, {useEffect, useState} from 'react'; // Bibliothèque de création d'interfaces utilisateur avec gestion des effets
import {Modal, Upload} from 'antd'; // Composants de l'interface utilisateur pour créer une fenêtre modale et gérer les téléchargements
import {PlusOutlined} from '@ant-design/icons'; // Icône d'ajout pour le bouton de téléchargement
import PropTypes from 'prop-types'; // Bibliothèque de validation des types de propriétés
import I18n from 'I18n'; // Bibliothèque de gestion des traductions

// Composant UploadFile
const UploadFile = ({elementName, setFile, onChange, maxCount}) => {
    // Utilisation de useEffect pour mettre à jour les données du fichier lorsqu'un nouvel élémentName est fourni
    useEffect(() => {
        setDataFile(
            elementName
                ? [
                    {
                        name: elementName?.split('/').pop(),
                        url: elementName,
                    },
                ]
                : []
        );
    }, [elementName]);

    // État local pour stocker les données du fichier
    const [dataFile, setDataFile] = useState(
        elementName
            ? [
                {
                    name: elementName?.split('/').pop(),
                    url: elementName,
                },
            ]
            : []
    );

    // Le bouton de téléchargement
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    // États locaux pour gérer la fenêtre modale d'aperçu du fichier
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Fonction pour fermer la fenêtre modale d'aperçu
    const handleCancel = () => {
        setPreviewOpen(false);
    };

    // Fonction pour afficher l'aperçu du fichier sélectionné
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewFile(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1));
    };

    // Fonction pour obtenir une représentation base64 du fichier
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    // Fonction pour gérer le changement de fichier
    const handleChange = (file) => {
        const newDataImage =
            file.file.size > 2 * 1024 * 1024 // Vérification si le fichier est supérieur à 2 Mo
                ? [
                    {
                        name: file.file.name,
                        url: `http://localhost:8000/media/${file.file.name}`,
                        status: 'error', // État d'erreur pour afficher le message d'erreur approprié
                    },
                ]
                : [
                    {
                        name: file.file.name,
                        url: `http://localhost:8000/media/${file.file.name}`,
                    },
                ];

        // Vérification si le fichier a été supprimé
        if (file.file.status === 'removed') {
            setDataFile([]);
            onChange(null); // Appel de la fonction onChange avec la valeur null
        } else {
            setDataFile(newDataImage);
            onChange(newDataImage); // Appel de la fonction onChange avec les nouvelles données du fichier
        }
    };

    // Retourne l'interface utilisateur du composant
    return (
        <>
            <Upload
                fileList={dataFile || null}
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={maxCount || 1}
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleChange}
                onRemove={() => {
                    console.log('remove', dataFile);
                    setDataFile([]);
                    setFile(null);
                    return true;
                }}
                beforeUpload={(file) => {
                    if (file.size <= 2 * 1024 * 1024 * 1024) {
                        setFile(file); // Mise à jour de la propriété setFile avec le fichier sélectionné
                    }
                    return false;
                }}
            >
                {uploadButton}
            </Upload>
            {dataFile.some((file) => file.status === 'error') && (
                <div style={{color: 'red'}}>{I18n.t(`errors.file.maxSize`)}</div>
            )}
            <Modal
                visible={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                {previewFile && <img alt="example" style={{width: '100%'}} src={previewFile}/>}
            </Modal>
        </>
    );
};

// Propriétés attendues par le composant UploadFile avec leurs types respectifs
UploadFile.propTypes = {
    file: PropTypes.object,
    setFile: PropTypes.func.isRequired,
    elementName: PropTypes.string,
    onChange: PropTypes.func,
    maxCount: PropTypes.number,
};

// Valeurs par défaut des propriétés non requises
UploadFile.defaultProps = {
    onChange: (val) => {
    }, // Fonction vide par défaut pour onChange
};

// Exportation du composant UploadFile pour pouvoir l'utiliser ailleurs dans l'application
export default UploadFile;
