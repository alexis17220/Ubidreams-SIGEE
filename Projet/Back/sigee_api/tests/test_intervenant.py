from django.test import TestCase
from api.models import Intervenant, TypeIntervenant
from api.serializers.Intervenant import IntervenantGetSerializer
from api.serializers.TypeIntervenant import TypeIntervenantForIntervenantSerializer


class IntervenantGetSerializerTestCase(TestCase):
    def setUp(self):
        self.type_intervenant = TypeIntervenant.objects.create()
        self.intervenant = Intervenant.objects.create(
            id_type_intervenant=self.type_intervenant,
            nom='John Doe',

        )

    def test_serializer_fields(self):
        serializer = IntervenantGetSerializer(instance=self.intervenant)
        expected_fields = [
            'id_intervenant',
            'id_type_intervenant',
            'nom',
            'particularite',
            'temoinauteur',
            'temoindate',
            'id_categorie'
        ]
        self.assertEqual(set(serializer.data.keys()), set(expected_fields))

    def test_id_type_intervenant_representation(self):
        serializer = IntervenantGetSerializer(instance=self.intervenant)
        self.assertIsInstance(serializer.data['id_type_intervenant'], TypeIntervenantForIntervenantSerializer)
