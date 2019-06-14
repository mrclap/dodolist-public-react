from django.shortcuts import render, redirect
from ..forms.login import LoginForm
from django.contrib.auth import login, logout, authenticate

import json


def signin(request):
    if request.method == "POST":
        # form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('/')
            # return render(request, 'todo/list.html')
        else:
            return render(request, 'user/signin.html')
    else:
        data_dict = {}
        form = LoginForm()
        data_dict['form'] = form
        return render(request, 'user/signin.html', data_dict)


def logoff(request):
    logout(request)
    return redirect('/')