from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from api.views import EnginViewSet, UsersViewSet, CategorieViewSet, ProprietaireViewSet, EquipementEViewSet, \
    EquipementViewSet, GammeViewSet, ClassificationViewSet, AffectationViewSet, EquipeurViewSet, MarqueViewSet, \
    AppellationViewSet, TypeOPSViewSet, TypeTechViewSet, TypeServitudeViewSet, TypeAttelageViewSet, DocumentsViewSet, \
    ReparationEnginViewSet, InterventionEViewSet, AffectationHistoPhyViewSet, AffectationHistoAdmViewSet, \
    AffectationHistoGisementViewSet, GarageEnginViewSet, IntervenantViewSet, TypeIntervenantViewSet, CommandeViewSet, \
    CommandeEtatViewSet, ReparationViewSet, RequeteGasViewSet, EtatEnginViewSet, StatutTechViewSet, StatutOpsViewSet, \
    CategorieAffectationViewSet

# /!\ write "url('', include('api.urls'))" in the main urls.py /!\
router = DefaultRouter(trailing_slash=True)
router.register(r'engins', EnginViewSet, basename='public_data')
router.register(r'users', UsersViewSet, basename='public_data')
router.register(r'categories', CategorieViewSet, basename='public_data')
router.register(r'proprietaires', ProprietaireViewSet, basename='public_data')
router.register(r'equipements_engin', EquipementEViewSet, basename='public_data')
router.register(r'equipements', EquipementViewSet, basename='public_data')
router.register(r'gammes', GammeViewSet, basename='public_data')
router.register(r'classifications', ClassificationViewSet, basename='public_data')
router.register(r'affectations', AffectationViewSet, basename='public_data')
router.register(r'equipeurs', EquipeurViewSet, basename='public_data')
router.register(r'marques', MarqueViewSet, basename='public_data')
router.register(r'appellationsCommerciales', AppellationViewSet, basename='public_data')
router.register(r'typeOPS', TypeOPSViewSet, basename='public_data')
router.register(r'typeTech', TypeTechViewSet, basename='public_data')
router.register(r'typeServ', TypeServitudeViewSet, basename='public_data')
router.register(r'typeAttelage', TypeAttelageViewSet, basename='public_data')
router.register(r'documents', DocumentsViewSet, basename='public_data')
router.register(r'reparationEngin', ReparationEnginViewSet, basename='public_data')
router.register(r'interventionEngin', InterventionEViewSet, basename='public_data')
router.register(r'affectationHistoPhy', AffectationHistoPhyViewSet, basename='public_data')
router.register(r'affectationHistoAdm', AffectationHistoAdmViewSet, basename='public_data')
router.register(r'affectationHistoGisement', AffectationHistoGisementViewSet, basename='public_data')
router.register(r'garageEngin', GarageEnginViewSet, basename='public_data')
router.register(r'intervenant', IntervenantViewSet, basename='public_data')
router.register(r'typeIntervenant', TypeIntervenantViewSet, basename='public_data')
router.register(r'commande', CommandeViewSet, basename='public_data')
router.register(r'commandeEtat', CommandeEtatViewSet, basename='public_data')
router.register(r'reparation', ReparationViewSet, basename='public_data')
router.register(r'requetegas', RequeteGasViewSet, basename='public_data')
router.register(r'etatengin', EtatEnginViewSet, basename='public_data')
router.register(r'statutTech', StatutTechViewSet, basename='public_data')
router.register(r'statutOps', StatutOpsViewSet, basename='public_data')
router.register(r'categorieAffectation', CategorieAffectationViewSet, basename='public_data')


urlpatterns = [
    url('', include(router.urls)),
]
