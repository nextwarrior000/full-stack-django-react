from core.abstract import AbstractSerializer
from rest_framework import serializers
from core.user.models import User
from django.conf import settings


class UserSerializer(AbstractSerializer):

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation["avatar"]:
            representation["avatar"] = settings.DEFAULT_AVATAR_URL
            return representation
        if settings.DEBUG:  # debug enabled for dev
            request = self.context.get("request")
            representation["avatar"] = request.build_absolute_uri(
                representation["avatar"]
            )
        return representation

    def update(self, instance, validated_data):

        instance = super().update(instance, validated_data)
        return instance

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'bio', 'email', 'avatar',
                  'is_active', 'created', 'updated']
        read_only_field = ['is_active']
