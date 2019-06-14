# from django.shortcuts import render, redirect
# from django.utils.deprecation import MiddlewareMixin
#
#
# class LoginRequireMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if not request.user.is_authenticated:
#             if request.path != '/user/signin' and request.path != '/user/signup':
#                 return render(request, '/user/sign.html', {})
