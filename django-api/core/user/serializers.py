from core.abstract import AbstractSerializer
from rest_framework import serializers
from core.user.models import User
from django.conf import settings


class UserSerializer(AbstractSerializer):

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "avatar" not in representation or not representation["avatar"]:

            representation["avatar"] = settings.DEFAULT_AVATAR_URL
        else:
            request = self.context.get('request')
            if request:
                avatar_url = instance.avatar.url
                print("avatar_url", avatar_url)
                representation["avatar"] = request.build_absolute_uri(
                    avatar_url)

        return representation

    def update(self, instance, validated_data):

        instance = super().update(instance, validated_data)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'bio', 'email', 'avatar',
                  'is_active', 'created', 'updated']
        read_only_field = ['is_active']
