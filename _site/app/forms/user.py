from django.forms import ModelForm
# from ..models.user import User # fields = ['username', 'pw', 'name']
from django.contrib.auth.models import User


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']
