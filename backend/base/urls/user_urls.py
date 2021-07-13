from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('register/', views.registerUser ),
    path('profile/', views.getUserProfile ),
    path('profile/update/', views.updateUserProfile ),
    path('', views.getUsers),
    
]
