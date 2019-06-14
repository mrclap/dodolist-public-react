from django.shortcuts import render, redirect
from ..forms.user import UserForm
from django.contrib.auth.models import User
from django.contrib.auth import login

from ..models.category import Category
from ..models.order import Order

import json


def signup(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            new_user = User.objects.create_user(**form.cleaned_data)

            # default category생성
            new_category = Category.objects.create(user_id=new_user.id, name='default', is_default=1)
            # order 생성
            new_order = Order.objects.create(user_id=new_user.id, category_id=new_category.id, order_json='{"order":[]}')

            login(request, new_user)
            return redirect('index')
        else:
            return render(request, 'user/signup.html')
    else:
        data_dict = {}
        form = UserForm()
        data_dict['form'] = form
        return render(request, 'user/signup.html', data_dict)
