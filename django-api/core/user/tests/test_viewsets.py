from rest_framework import status
from core.fixtures.user import user
from core.fixtures.post import post


class TestUserViewSet:
    endpoint = '/api/user/'

    def test_list(self, client, user):

        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint +
                              str(user.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == user.public_id.hex
        assert response.data['email'] == user.email
        assert response.data['username'] == user.username

    def test_create(self, client, user):
        client.force_authenticate(user=user)
        data = {
            "username": "bilelfdssalem",
            "first_name": "bilfsel",
            "last_name": "salemfsd",
            "email": "bilelsalem20456199@gmail.com",
            "password": "AZEwxc1234"
        }
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['username'] == data['username']
        assert response.data['first_name'] == data['first_name']
        assert response.data['last_name'] == data['last_name']
        assert response.data['email'] == data['email']

    def test_update(self, client, user):
        client.force_authenticate(user=user)
        data = {
            "username": "bilelddddddsalem",
            "first_name": "bigdsfgflel",
            "last_name": "sagsdfgdflem",
            "email": "bilelsalem2410199@gmail.com",
            "password": "AZEwxc1234"
        }
        response = client.patch(self.endpoint +
                                str(user.public_id) + "/", data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['username'] == data['username']
        assert response.data['first_name'] == data['first_name']
        assert response.data['last_name'] == data['last_name']
        assert response.data['email'] == data['email']
