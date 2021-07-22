from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems ),
    path('myorders/', views.getMyOrders ),
    path('', views.getOrders),
    path('<str:pk>/', views.getOrderById),
    path('<str:pk>/deliver/', views.updateOrderToPaid),
    path('<str:pk>/pay/', views.updateOrderToDelivered),
    
]         