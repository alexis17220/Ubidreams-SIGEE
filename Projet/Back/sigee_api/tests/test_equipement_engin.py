from django.test import TestCase
from api.models import Engin, EnginsEquipements, Equipements
from api.serializers import EquipementESerializer


class EquipementESerializerTestCase(TestCase):

    def setUp(self):
        # Créer un engin pour le test
        self.engin = Engin.objects.create(immatriculation='AB-123-JA')

        # Créer un équipement pour le test
        self.equipement = Equipements.objects.create(nom='Test équipement')

        # Créer un engin équipement pour le test
        self.engins_equipements = EnginsEquipements.objects.create(
            id_engin=self.engin,
            id_equipement=self.equipement,
            temoindate='2021-03-26',
            action='test',
            temoinauteur='phoebe.kimper'
        )

        # Créer un serializer pour le test
        self.serializer = EquipementESerializer(instance=self.engins_equipements)

    def test_serializer(self):
        data = {
            "idengins_equipements": 1.0,
            "id_engin": {
                "immatriculation": "AB-123-JA"
            },
            "id_equipement": {
                "nom": "Test équipement"
            },
            "temoindate": "2021-03-26",
            "action": "test",
            "temoinauteur": "phoebe.kimper",
            "d_limite_utilisation": None,
            "date_montage": None,
            "date_verification": None
        }

        # Vérifier que le serializer retourne les données attendues
        self.assertEqual(self.serializer.data, data)

        def test_partial_update_engins_equipements(self):
            # Création des données de la modification partielle
            data = {
                'action': 'test modifié',
                'temoindate': '2023-06-01'
            }

            # Modification partielle de l'objet EnginsEquipements
            serializer = EquipementESerializer(instance=self.engin_equipement, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Récupération de l'objet modifié depuis la base de données
            engin_equipement_modified = EnginsEquipements.objects.get(
                idengins_equipements=self.engin_equipement.idengins_equipements)

            # Vérification de la modification des champs action et temoindate
            self.assertEqual(engin_equipement_modified.action, 'test modifié')
            self.assertEqual(str(engin_equipement_modified.temoindate), '2023-06-01')

            # Vérification que les autres champs n'ont pas été modifiés
            self.assertEqual(engin_equipement_modified.id_engin, self.engin)
            self.assertEqual(engin_equipement_modified.id_equipement, self.equipement)
            self.assertEqual(engin_equipement_modified.temoinauteur, 'phoebe.kimper')
            self.assertIsNone(engin_equipement_modified.d_limite_utilisation)
            self.assertIsNone(engin_equipement_modified.date_montage)
            self.assertIsNone(engin_equipement_modified.date_verification)
