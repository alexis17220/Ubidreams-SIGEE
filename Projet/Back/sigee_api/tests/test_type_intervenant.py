from django.test import TestCase

from api.models import TypeIntervenant


class TypeIntervenantTestCase(TestCase):
    def setUp(self):
        self.type_intervenant = TypeIntervenant.objects.create(
            categorie='Test',
            estexterne='Y',
            temoinauteur='John Doe',
            temoindate='2023-05-04'
        )

    def test_type_intervenant_creation(self):
        self.assertTrue(isinstance(self.type_intervenant, TypeIntervenant))
        self.assertEqual(self.type_intervenant.categorie, 'Test')
        self.assertEqual(self.type_intervenant.estexterne, 'Y')
        self.assertEqual(self.type_intervenant.temoinauteur, 'John Doe')
        self.assertEqual(str(self.type_intervenant.temoindate), '2023-05-04')
