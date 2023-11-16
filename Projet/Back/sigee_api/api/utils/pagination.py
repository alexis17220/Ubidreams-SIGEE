import re
from json import loads

from django.db.models import Q
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import _positive_int
from django.utils.translation import gettext_lazy as _


class DefaultViewSet(ModelViewSet):

    # le serializer de retour
    output_serializer = None

    # si la supression est autorisée
    can_delete = True



    # retourne la class du output_serializer
    def get_output_serializer_class(self):
        return self.output_serializer if self.output_serializer else self.serializer_class

    # appel le output_serializer
    def get_output_serializer(self, *args, **kwargs):
        return self.get_output_serializer_class()(*args, **kwargs)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for base in self.__class__.__bases__:
            # fusion des action_serializers avec la classe fille
            if hasattr(self, 'action_serializers') and hasattr(base, 'action_serializers'):
                for key, value in base.action_serializers.items():
                    if not self.action_serializers.get(key):
                        self.action_serializers[key] = value

            # fusion des action_permissions avec la classe fille
            if hasattr(self, 'action_permissions') and hasattr(base, 'action_permissions'):
                for key, value in base.action_permissions.items():
                    if not self.action_permissions.get(key):
                        self.action_permissions[key] = value

            # fusion des action_applications avec la classe fille
            if hasattr(self, 'action_applications') and hasattr(base, 'action_applications'):
                for key, value in base.action_applications.items():
                    if not self.action_applications.get(key):
                        self.action_applications[key] = value


        # les nom des viewsets pour
        if self.queryset:
            if kwargs.get('suffix') == 'Instance':
                self.name = _(self.queryset.model.__name__.capitalize())
            elif kwargs.get('name') == 'List archive':
                self.name = _('Archived' + self.queryset.model.__name__.lower() + (
                    'ies' if self.queryset.model.__name__.endswith('y') else 's'))
            elif kwargs.get('name') == 'Retrieve archive':
                self.name = _('Archived' + self.queryset.model.__name__.lower())
            else:
                self.name = _(self.queryset.model.__name__.capitalize() + (
                    'ies' if self.queryset.model.__name__.endswith('y') else 's'))

    def get_permissions(self):
        if hasattr(self, 'action_permissions'):
            if self.action in self.action_permissions:
                return self.action_permissions[self.action]
        return super(DefaultViewSet, self).get_permissions()

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                try:
                    # Parcours des objets définis pour l'action (service) dans le 'action_serializers'
                    for obj in self.action_serializers[self.action]:

                        # Si restriction sur APP non respectée : on passe au suivant
                        if obj.get('app') and obj.get('app').name != self.request.META.get('HTTP_APP'):
                            continue

                        # Si restriction sur ROLE non respectée : on passe au suivant
                        if obj.get('role') and obj.get('role') not in self.request.user.roles.all():
                            continue

                        # Modification du serializer de sortie si existant
                        if self.request.method != 'DELETE' and obj.get('output_serializer_class'):
                            self.output_serializer = obj.get('output_serializer_class')

                        # Recherche du serializer d'entré en fonction de la méthode HTTP
                        if obj.get('input_serializer_class') or obj.get('serializer_class'):
                            return obj.get('input_serializer_class') if obj.get('input_serializer_class') else obj.get(
                                'serializer_class')

                # Si l'action n'est pas défini comme une liste d'Objet
                except:
                    return self.action_serializers[self.action]

        # Renvoi le serializer par défaut de la View si aucun trouvé précédemment
        return super(DefaultViewSet, self).get_serializer_class()

    def list(self, request, *args, **kwargs):
        response = super(DefaultViewSet, self).list(self, request, *args, **kwargs)

        if self.single:
            if response.data:
                return Response(response.data[-1])
            else:
                return Response({}, status=status.HTTP_204_NO_CONTENT)
        else:
            return response

    def retrieve(self, request, *args, **kwargs):
        return super(DefaultViewSet, self).retrieve(self, request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        model = self.get_queryset().model
        try:
            output = self.output_serializer(instance, context={"request": request})
        except:
            output = serializer
        return Response(output.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        output_instance = self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        model = self.get_queryset().model
        try:
            output = self.output_serializer(output_instance, context={"request": request})
        except:
            output = serializer
        return Response(output.data)

    def perform_update(self, serializer):
        return serializer.save()

    def parse_id(self, item):
        # If the item is a digit string
        if isinstance(item, str) and item.isdigit():
            return int(item)
        # If item object has an id
        elif isinstance(item, dict) and item.get('id'):
            return item.get('id')
        # If item is an int
        elif isinstance(item, int):
            return item
        return None

    def parse_id_list(self, list):
        # Map the list to parse id and return them
        # return [x for x in map(self.parse_id, list) if x]
        return filter(lambda x: x is not None, map(self.parse_id, list))


class PaginationViewSet(LimitOffsetPagination, DefaultViewSet):
    # pagination_class = LimitOffsetPagination
    pagination_default_limit = 10
    search_fields = None
    sort_fields = None
    default_filter_set = None
    search_method = 'icontains'
    _applications_names = None
    offset = 0
    limit = 0
    count = 0
    default_limit = 0

    def get_limit(self, request):
        if self.limit_query_param:
            try:
                return _positive_int(
                    request.query_params[self.limit_query_param],
                    strict=True,
                    cutoff=self.max_limit
                )
            except (KeyError, ValueError):
                pass

        return self.count

    def normalize_query(self, query_string,
                        findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                        normspace=re.compile(r'\s{2,}').sub):
        """
        Splits the query string in invidual keywords, getting rid of unecessary spaces
            and grouping quoted words together.
            Example:

            >>> normalize_query('  some random  words "with   quotes  " and   spaces')
            ['some', 'random', 'words', 'with quotes', 'and', 'spaces']

        """
        return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]

    def get_query(self, query_string, search_fields):
        """
        Returns a query, that is a combination of Q objects. That combination
        aims to search keywords within a model by testing the given search fields.
        """
        query = None  # Query to search for every search term
        terms = self.normalize_query(query_string)
        for term in terms:
            or_query = None  # Query to search for a given term in each field
            for field_name in search_fields:
                q = Q(**{"%s__icontains" % field_name: term})
                if or_query is None:
                    or_query = q
                else:
                    or_query = or_query | q
            if query is None:
                query = or_query
            else:
                query = query & or_query
        return query

    def search_sort_queryset(self, queryset, request):
        search_value = request.GET.get('search', default=None)
        if not self.search_fields:
            fields = [f.name for f in queryset.model._meta.fields]
        else:
            fields = self.search_fields
        # Récupération globale
        if search_value:
            entry_query = self.get_query(search_value, fields)
            searched_queryset = queryset.filter(entry_query)
        else:
            searched_queryset = queryset

        if not self.sort_fields:
            sort_fields = [f.name for f in queryset.model._meta.fields]
        else:
            sort_fields = self.sort_fields
        sort_field = request.GET.get('sortField', default=None)
        sort_order = request.GET.get('sortOrder', default='asc')
        descend_values = ["desc", "descend", "-"]
        if sort_field and sort_field in sort_fields:
            searched_queryset = searched_queryset.order_by(
                ('-' if sort_order in descend_values else '') + sort_field
            ).distinct()
        return searched_queryset

    def list(self, request, *args, **kwargs):
        sorted_queryset = self.search_sort_queryset(self.get_queryset(), request)

        model = self.serializer_class.Meta.model

        # Gestion des Filtres
        if self.default_filter_set:
            filter = self.default_filter_set(request.GET, queryset=sorted_queryset)
            sorted_queryset = filter.qs

        elif request.GET.get('filters'):
            request_filters = loads(request.GET.get('filters'))
            filters = {}
            for key, value in request_filters.items():
                try:
                    field_type = model._meta.get_field(key.split('__')[0]).get_internal_type()
                except:
                    return Response("Annex has no field named '{}'".format(key.split('__')[0]), status=400)
                filters[key] = value

            sorted_queryset = sorted_queryset.filter(**filters)

        # Serialisation
        paginated_queryset = self.paginate_queryset(sorted_queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True, context={'request': request})

        # Réponse paginée
        paginated_response = self.get_paginated_response(serializer.data)

        # Réponse
        response = Response(
            paginated_response.data,
            status=status.HTTP_206_PARTIAL_CONTENT
        )

        # Surchage des Headers
        offset = self.get_offset(request)
        limit = self.get_limit(request)
        count = self.get_count(sorted_queryset)
        response["Content-Range"] = f"{self.get_queryset().model.__name__} {offset}-{offset + limit}/{count}"
        return response