from core.abstract import AbstractSerializer
from rest_framework import serializers
from core.user.models import User


class UserSerializer(AbstractSerializer):

    def update(self, instance, validated_data):

        instance = super().update(instance, validated_data)
        return instance

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'bio', 'email',
                  'is_active', 'created', 'updated']
        read_only_field = ['is_active']
