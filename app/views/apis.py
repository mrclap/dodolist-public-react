from rest_framework import viewsets
from rest_framework import permissions

from ..serializers import CategorySerializer
from ..serializers import OrderSerializer
from ..serializers import TodoSerializer
from ..serializers import UserSerializer

from ..models.category import Category
from ..models.order import Order
from ..models.todo import Todo
# from ..models.user import User
from django.contrib.auth.models import User

import json

from datetime import datetime


# DRF
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # def perform_update(self, serializer):
    #     user_id = self.request.user.id
    #     serializer.save()


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_object(self):
        pk = self.kwargs['pk']
        todo = Todo.get_todo(pk)
        return todo

    def get_queryset(self):
        try:
            user_id = self.request.user.id

            # get default category
            qs_category = Category.get_category_by_user_id(user_id)

            # get order
            qs_order = Order.get_order_by_user_id_and_category_id(user_id, qs_category.id)
            order_arr = []

            if qs_order:
                order = json.loads(qs_order.order_json)
                order_arr = order.get('order', [])
            todo_list = Todo.get_todos_and_dones(order_arr, user_id, qs_category.id)
        except Exception:
            todo_list = Todo.objects.none()

        return todo_list

    def perform_create(self, serializer):
        new_todo = serializer.save(user_id=self.request.user.id)
        order = Order.get_order_by_user_id_and_category_id(user_id=new_todo.user.id,category_id=new_todo.category.id)

        # 마지막에 추가된 todo 삽입
        if len(order.order_json) > 12:
            new_order_json = order.order_json[:-2] + ',' + str(new_todo.id) + ']}'
        else: # 최초 추가의 경우 ', ' 를 넣으면 안됨
            new_order_json = order.order_json[:-2] + str(new_todo.id) + ']}'
        order.order_json = new_order_json
        order.save()


    # def perform_update(self, serializer):
    #     serializer.save()
    #
    # def partial_update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     return self.update(request, *args, **kwargs)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
