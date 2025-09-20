from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (HeroSlideViewSet,
                    OverviewSectionViewSet,
                    ProductViewSet,
                    SubscribeViewSet,
                    AboutViewSet,
                    AboutMainViewSet,
                    AboutFeatureViewSet,
                    ContactEnquiryViewSet,
                    AuthViewSet,
                    WomenProductViewSet,
                    CartViewSet,
                    MenProductViewSet,
                    MenCartViewSet,
                    KidsProductViewSet,
                    KidsCartViewSet,
                    AllCartViewSet,
                    CheckoutViewSet,OrderViewSet)

router = DefaultRouter()
router.register(r'hero-slides', HeroSlideViewSet, basename='hero-slide')
router.register(r'overview-sections', OverviewSectionViewSet, basename='overview-sections')  # Add this
router.register(r'products', ProductViewSet, basename='products')
router.register(r'subscribe', SubscribeViewSet, basename='subscribe')
router.register(r'about', AboutViewSet, basename='about')
router.register(r'about-main', AboutMainViewSet, basename="about-main")
router.register(r'contact', ContactEnquiryViewSet, basename='contact')

router.register(r'about-features', AboutFeatureViewSet, basename="about-features")
router.register('auth', AuthViewSet, basename='auth')
router.register(r'womenproducts', WomenProductViewSet, basename='womenproducts')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'menproducts', MenProductViewSet, basename='menproducts')
router.register(r'mencart', MenCartViewSet, basename='mencart')
router.register(r'kidsproducts', KidsProductViewSet, basename='kidsproducts')
router.register(r'kidscart', KidsCartViewSet, basename='kidscart')
router.register(r'allcart', AllCartViewSet, basename='allcart')
router.register(r'checkout', CheckoutViewSet, basename='checkout')
router.register(r"orders", OrderViewSet, basename="orders")



urlpatterns = [
    path('', include(router.urls)),
]
