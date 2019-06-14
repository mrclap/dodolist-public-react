from .models.category import Category
from .models.order import Order
from .models.todo import Todo
# from .models.user import User
from django.contrib.auth.models import User

from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('user_id', 'name', 'cdate', 'udate')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user_id', 'category_id', 'order_json', 'cdate')


class TodoSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all())
    category = serializers.PrimaryKeyRelatedField(many=False, queryset=Category.objects.all())

    class Meta:
        model = Todo
        # fields = ('id', 'user', 'category', 'title', 'detail', 'due_date', 'priority', 'completed', 'cdate', 'udate')
        fields = ('id', 'category', 'title', 'detail', 'due_date', 'priority', 'completed', 'cdate', 'udate')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('email', 'name', 'cdate', 'udate')
        fields = ('username', 'last_login', 'date_joined')
