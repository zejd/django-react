from rest_framework import views, status, response, exceptions, permissions, filters
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from . import serializer as user_serializer
from . import services
from rest_framework.permissions import AllowAny

class RegisterApi(views.APIView):
    permission_classes = [AllowAny]
    authentication_classes=()
    def post(self, request):
        serializer = user_serializer.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        user = services.user_email_selector(email=data.email)
        if user is not None:
            return Response(data="User With That Email Already Exists", status=status.HTTP_400_BAD_REQUEST)
        serializer.instance = services.create_user(user=data)

        return response.Response(data=serializer.data, status=status.HTTP_201_CREATED)


class UserDetailApi(views.APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        authenticator = JWTAuthentication()
        try:
            email, token = authenticator.authenticate(request)
            user_id_from_token = token.payload['user_id']
            user_id = kwargs.get('id')
            if user_id_from_token != user_id and not services.is_admin_user(user_id_from_token):
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            user = services.get_user_by_id(user_id)
            return response.Response(user)

        except AuthenticationFailed:
            return response.Response(status=status.HTTP_403_FORBIDDEN)



