import dataclasses
from . import models
from . import serializer as user_serializer
from .models import User


@dataclasses.dataclass
class UserDataClass:
    first_name: str
    last_name: str
    email: str
    password: str = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "User") -> "UserDataClass":
        return cls(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            id=user.id
        )



def create_user(user: "UserDataClass") -> "UserDataClass":
    instance = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
    )
    if user.password is not None:
        instance.set_password(user.password)

    instance.save()

    return UserDataClass.from_instance(instance)

def create_super_user(user: "UserDataClass") -> "UserDataClass":
    instance = models.User.objects.create_superuser(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password
    )

    return UserDataClass.from_instance(instance)

def update_user(user: User, user_id: int) -> "UserDataClass":
    models.User.objects.filter(id=user_id).update(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
    )

    return UserDataClass.from_instance(user)

def user_email_selector(email: str) -> User:
    user = models.User.objects.filter(email=email).first()

    return user


def get_user_by_id(user_id: str) -> User:
    user = models.User.objects.get(pk=user_id)

    serializer = user_serializer.UserSerializer(user)
    return serializer.data

def is_admin_user(user_id: str) -> bool:
    user = models.User.objects.get(pk=user_id)
    return user.is_superuser
