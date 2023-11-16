import React from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import moment from 'moment';
import I18n from 'I18n';

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        paddingBottom: 5,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: '48%', // Pour afficher deux cartes par ligne avec un espace entre elles, vous pouvez utiliser 48%
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333333',
    },
    cardText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666666',
    },
});


const getAgeString = (date) => {
    const today = moment();
    const diff = today.diff(date, 'days');
    const years = Math.floor(diff / 365);
    const months = Math.floor((diff % 365) / 30);
    const days = diff % 30;

    const ageString = [];
    if (days > 0) {
        ageString.push(`${days} jour${days > 1 ? 's' : ''}`);
    }

    if (months > 0) {
        ageString.push(`${months} mois`);
    }
    if (years > 0) {
        ageString.push(`${years} ans`);
    }
    return ageString.join(' ');
};
const PrintablePDF = ({engin}) => {
    return (
        <Document>
            <Page size="A4" style={styles.pageContainer}>
                <View>
                    {/* Titre du document */}
                    <Text style={styles.pageTitle}>
                        {`${engin?.idfamille?.code_famille}-${engin?.id_type_engin?.annee % 100}-${engin?.id_type_engin?.numero_engin}-${engin?.idproprietaire?.code_proprietaire}`}
                    </Text>
                    <Text style={styles.subTitle}>{`>>>${engin?.carrosserie}-${engin?.immatriculation}`}</Text>
                </View>
                <View style={styles.contentContainer}>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.libelleSigle`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_tech.libelle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.registration`)}</Text>
                            <Text style={styles.cardText}>{engin?.immatriculation}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.carrosserie`)}</Text>
                            <Text style={styles.cardText}>{engin?.carrosserie}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.catAffect`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_categorie.nom}</Text>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.typeOps`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_ops.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.depart`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_depart}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.statutOps`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_statut_ops.libelle}</Text>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.statutTech`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_statut_tech.libelle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.position`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_engin?.gisement_reel?.libelle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.km`)}</Text>
                            <Text style={styles.cardText}>{engin?.compteur1}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.hr`)}</Text>
                            <Text style={styles.cardText}>{engin?.compteur2}</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.affectAdm`)}</Text>
                            <Text
                                style={styles.cardText}>{engin?.id_affectation_administrative.id_affec_adm.libelle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.ref`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_affectation_administrative.reference}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.attribution`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_histo_gisement?.id_affec.libelle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.affectPhy`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_affectation_physique?.id_affec_phy.libelle}</Text>
                        </View>
                        <View>

                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.marque`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_marque.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.appelcom`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_appellation.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.equipeur`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_equipeur.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.typeTech`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_tech.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.attelage`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_attelage.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.classification`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_ops.id_type_genre.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.gamme`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_engin?.id_type_gamme.nom}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.place`)}</Text>
                            <Text style={styles.cardText}>{engin?.nb_places_assurance}</Text>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.ville`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_inventaire_ville}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.bcm`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_bcm}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.sortie`)}</Text>
                            <Text style={styles.cardText}>{engin?.d_sortie_inventaire_ville}</Text>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.puissance`)}</Text>
                            <Text style={styles.cardText}>{engin?.p_fiscale}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.achat`)}</Text>
                            <Text style={styles.cardText}>{engin?.p_achat_chassis}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.dossier`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_dossier}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.folio`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_folio}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.prem`)}</Text>
                            <Text style={styles.cardText}>{engin?.d_mise_circulation}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.entre`)}</Text>
                            <Text style={styles.cardText}>{engin?.d_entree_service}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.fin`)}</Text>
                            <Text style={styles.cardText}>{engin?.d_fvadministrative}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.vie`)}</Text>
                            <Text style={styles.cardText}>{engin?.duree_vie_theorique}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.validite`)}</Text>
                            <Text style={styles.cardText}>{engin?.d_fvassurance}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.age`)}</Text>
                            {engin?.d_mise_circulation && (
                                <Text style={styles.cardText}>

                                    ({getAgeString(engin.d_mise_circulation)})

                                </Text>
                            )}
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.serie`)}</Text>
                            <Text style={styles.cardText}>{engin?.no_mine}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.obs`)}</Text>
                            <Text style={styles.cardText}>{engin?.observations}</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.rfgi`)}</Text>
                            <Text
                                style={styles.cardText}>{engin?.id_radio ? engin.id_radio?.rfgi : "Pas de radio"}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.tagh`)}</Text>
                            <Text style={styles.cardText}>{engin?.tag ? engin.tag : "Pas de Tag H"}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.tag`)}</Text>
                            <Text style={styles.cardText}>{engin?.code_tag}</Text>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.num`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_engin?.numero_engin}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.proprietaire`)}</Text>
                            <Text style={styles.cardText}>{engin?.idproprietaire?.code_proprietaire}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.cate`)}</Text>
                            <Text style={styles.cardText}>{engin?.idfamille?.code_famille}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.years`)}</Text>
                            <Text style={styles.cardText}>{engin?.id_type_engin?.annee}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t(`fields.detailEngin.type`)}</Text>
                            <View>
                                <Text style={styles.cardTitle}>Attelage</Text>
                                <Text style={styles.cardText}>
                                    {engin?.tracteur ? 'Oui' : 'Non'}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.cardTitle}>Radio</Text>
                                <Text style={styles.cardText}>
                                    {engin?.id_radio ? 'Oui' : 'Non'}
                                </Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        {/* Double Clef */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.cle')}</Text>
                            <Text style={styles.cardText}>
                                {engin?.double_clef ? 'CIS/GST' : 'Non'}
                            </Text>
                        </View>
                        {/* Longueur (cm) */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.longueur')}</Text>
                            <Text style={styles.cardText}>{engin?.longueur}</Text>
                        </View>
                        {/* Largeur (cm) */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.largeur')}</Text>
                            <Text style={styles.cardText}>{engin?.largeur}</Text>
                        </View>
                        {/* Hauteur (cm) */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.hauteur')}</Text>
                            <Text style={styles.cardText}>{engin?.hauteur}</Text>
                        </View>
                        {/* Vitesse (km/h) */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.vitesse')}</Text>
                            <Text style={styles.cardText}>{engin?.vitesse_max}</Text>
                        </View>
                        {/* PTAC (kg) */}
                        <View>
                            <Text style={styles.cardTitle}>{I18n.t('pages.engin.table.ptac')}</Text>
                            <Text style={styles.cardText}>{engin?.ptac}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PrintablePDF;
