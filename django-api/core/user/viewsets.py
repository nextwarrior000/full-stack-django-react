from core.abstract import AbstractViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from core.user.serializers import UserSerializer
from core.user.models import User
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(AbstractViewSet):
    http_method_names = ('patch', 'get', 'post', 'delete')
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            # Include any other context if needed
        }

    def perform_create(self, serializer):

        serializer.save()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
