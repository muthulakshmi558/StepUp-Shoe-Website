
from .models import HeroSlide,OverviewSection,Product,ContactEnquiry,WomenProduct,Cart
from .serializers import HeroSlideSerializer,OverviewSectionSerializer,ProductSerializer,SubscriberSerializer,ContactEnquirySerializer,WomenProductSerializer,CartSerializer
from rest_framework import viewsets
from .models import Subscriber
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response

class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer
    permission_classes = [AllowAny]

class OverviewSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OverviewSection.objects.all()
    serializer_class = OverviewSectionSerializer
    permission_classes = [AllowAny]  # 👈 allow public access


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  # 👈 allow public access


class SubscribeViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [AllowAny]  # 👈 allow public access


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subscriber = serializer.save()

        # Send email
        send_mail(
            subject="Thanks for Subscribing!",
            message="You have successfully subscribed to our website 🎉",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[subscriber.email],
            fail_silently=False,
        )

        return Response(
            {"message": "Successfully Subscribed!"}, 
            status=status.HTTP_201_CREATED
        )
    
from rest_framework import viewsets
from .models import About
from .serializers import AboutSerializer

class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [AllowAny]  # 👈 allow public access



from rest_framework import viewsets
from .models import AboutMain, AboutFeature
from .serializers import AboutMainSerializer, AboutFeatureSerializer

class AboutMainViewSet(viewsets.ModelViewSet):
    queryset = AboutMain.objects.all()
    serializer_class = AboutMainSerializer
    permission_classes = [AllowAny]  # 👈 allow public access


class AboutFeatureViewSet(viewsets.ModelViewSet):
    queryset = AboutFeature.objects.all()
    serializer_class = AboutFeatureSerializer
    permission_classes = [AllowAny]  # 👈 allow public access





from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer

class ContactEnquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()

        # Send mail to user
        send_mail(
            subject="Thank you for contacting StepUp!",
            message=f"Hi {enquiry.name},\n\nWe received your enquiry:\n{enquiry.message}\n\nWe will reply soon.\n\n- StepUp Team",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[enquiry.email],
        )

        # Send mail to admin
        send_mail(
            subject="New Enquiry Received",
            message=f"Name: {enquiry.name}\nEmail: {enquiry.email}\nPhone: {enquiry.phone}\n\nMessage:\n{enquiry.message}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.ADMIN_EMAIL],
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if not user:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class WomenProductViewSet(viewsets.ModelViewSet):
    queryset = WomenProduct.objects.all()
    serializer_class = WomenProductSerializer
    permission_classes = [AllowAny]  # Public access

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import viewsets, permissions
from .models import MenProduct, MenCart
from .serializers import MenProductSerializer, MenCartSerializer

# Products API
class MenProductViewSet(viewsets.ModelViewSet):
    queryset = MenProduct.objects.all()
    serializer_class = MenProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Cart API
class MenCartViewSet(viewsets.ModelViewSet):
    serializer_class = MenCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MenCart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import viewsets, permissions
from .models import KidsProduct, KidsCart
from .serializers import KidsProductSerializer, KidsCartSerializer

class KidsProductViewSet(viewsets.ModelViewSet):
    queryset = KidsProduct.objects.all()
    serializer_class = KidsProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class KidsCartViewSet(viewsets.ModelViewSet):
    serializer_class = KidsCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return KidsCart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AllCart, Product
from .serializers import AllCartSerializer

class AllCartViewSet(viewsets.ModelViewSet):
    serializer_class = AllCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only show cart items for the logged-in user
        return AllCart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Assign the current user when creating a cart item
        serializer.save(user=self.request.user)
    
from rest_framework import viewsets, permissions
from .models import Checkout
from .serializers import CheckoutSerializer

class CheckoutViewSet(viewsets.ModelViewSet):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import viewsets, permissions
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Users only see their orders
        user = self.request.user
        if user.is_authenticated:
            return Order.objects.filter(user=user).order_by("-created_at")
        return Order.objects.none()
