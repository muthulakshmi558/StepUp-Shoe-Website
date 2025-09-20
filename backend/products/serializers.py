from rest_framework import serializers
from .models import HeroSlide,OverviewSection,Product,Subscriber,ContactEnquiry,WomenProduct,WomenProduct, Cart
from rest_framework import serializers
from .models import CustomUser
from django.core.mail import send_mail
from django.conf import settings
class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")
        if instance.image:
            representation["image"] = request.build_absolute_uri(instance.image.url)
        return representation
    

class OverviewSectionSerializer(serializers.ModelSerializer):
    image1 = serializers.ImageField(use_url=True)
    image2 = serializers.ImageField(use_url=True)
    image3 = serializers.ImageField(use_url=True)

    class Meta:
        model = OverviewSection
        fields = ['id', 'first_title', 'overview_content', 'next_title', 'bottom_title', 'image1', 'image2', 'image3', 'image1_title', 'image2_title', 'image3_title']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'subscribed_at']

from rest_framework import serializers
from .models import About

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ["id", "title", "description", "image"]
from rest_framework import serializers
from .models import AboutMain, AboutFeature

class AboutFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFeature
        fields = "__all__"

class AboutMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMain
        fields = "__all__"



class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = "__all__"



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)

        # Email to new user
        send_mail(
            subject="Welcome!",
            message="Thanks for registering.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email]
        )

        # Email to admin
        send_mail(
            subject="New User Registered",
            message=f"New user: {user.email}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL]
        )

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class WomenProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = WomenProduct
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

from rest_framework import serializers
from .models import MenProduct, MenCart

class MenProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenProduct
        fields = ['id', 'title', 'subtitle', 'price', 'style', 'brand', 'size', 'colors', 'image']

class MenCartSerializer(serializers.ModelSerializer):
    product = MenProductSerializer(read_only=True)

    class Meta:
        model = MenCart
        fields = ['id', 'user', 'product', 'quantity', 'added_at']

from rest_framework import serializers
from .models import KidsProduct, KidsCart

class KidsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = KidsProduct
        fields = ['id', 'title', 'subtitle', 'price', 'style', 'brand', 'size', 'colors', 'image']

class KidsCartSerializer(serializers.ModelSerializer):
    product = KidsProductSerializer(read_only=True)

    class Meta:
        model = KidsCart
        fields = ['id', 'user', 'product', 'quantity', 'added_at']

from rest_framework import serializers
from .models import AllCart
from products.serializers import WomenProductSerializer

class AllCartSerializer(serializers.ModelSerializer):
    product = WomenProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Cart._meta.get_field("product").related_model.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = AllCart
        fields = ["id", "user", "product", "product_id", "quantity", "total_price"]
        read_only_fields = ["user", "total_price"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)
    
from rest_framework import serializers
from .models import Checkout, CheckoutItem

class CheckoutItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)

    class Meta:
        model = CheckoutItem
        fields = ['id', 'product', 'product_title', 'product_image', 'quantity', 'price']

class CheckoutSerializer(serializers.ModelSerializer):
    items = CheckoutItemSerializer(many=True)

    class Meta:
        model = Checkout
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        checkout = Checkout.objects.create(**validated_data)
        for item_data in items_data:
            CheckoutItem.objects.create(checkout=checkout, **item_data)
        return checkout

from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("product", "quantity", "price")

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ("order_number", "status", "created_at", "user")

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user if self.context["request"].user.is_authenticated else None
        order = Order.objects.create(user=user, **validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order

