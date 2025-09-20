from django.contrib.auth.models import AbstractUser
from django.db import models

class HeroSlide(models.Model):
    title = models.CharField(max_length=255, default="StepUp.in")  
    image = models.ImageField(upload_to="hero_slides/")
    description = models.TextField(blank=True)
    button_text = models.CharField(max_length=50, default="Shop Now")
    button_link = models.URLField(max_length=200, default="#")
    position = models.CharField(max_length=10, choices=[('right', 'Right'), ('left', 'Left')], default='right')
    order = models.PositiveIntegerField(default=0)
    

    def __str__(self):
        return f"{self.title} - Slide {self.order}"

    class Meta:
        ordering = ['order']

class OverviewSection(models.Model):
    first_title = models.CharField(max_length=255, default="Welcome to StepUp.in")
    overview_content = models.TextField(default="Discover the latest trends in footwear with StepUp.in. Shop now for the best deals!")
    next_title = models.CharField(max_length=255, default="Featured Collection")
    bottom_title = models.CharField(max_length=255, default="Explore Our Best Picks")

    image1 = models.ImageField(upload_to="overview_images/", null=True, blank=True)
    image1_title = models.CharField(max_length=100, default="Mens")

    image2 = models.ImageField(upload_to="overview_images/", null=True, blank=True)
    image2_title = models.CharField(max_length=100, default="Womens")

    image3 = models.ImageField(upload_to="overview_images/", null=True, blank=True)
    image3_title = models.CharField(max_length=100, default="Kids")

    def __str__(self):
        return self.first_title

    class Meta:
        verbose_name = "Overview Section"
        verbose_name_plural = "Overview Sections"

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/")
    category = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class About(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="about/")

    def __str__(self):
        return self.title

class AboutFeature(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class AboutMain(models.Model):
    image = models.ImageField(upload_to="about/")

    def __str__(self):
        return f"About Section - {self.id}"

class ContactEnquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # change from default 'user_set'
        related_query_name='customuser',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # change from default 'user_set'
        related_query_name='customuser',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class WomenProduct(models.Model):
    STYLE_CHOICES = [
        ("Sandals", "Sandals"),
        ("Trainers", "Trainers"),
        ("Boots", "Boots"),
        ("Slippers", "Slippers"),
        ("Canvas", "Canvas"),
        ("Summer Shop", "Summer Shop"),
    ]

    BRAND_CHOICES = [
        ("Skechers", "Skechers"),
        ("Kickers", "Kickers"),
        ("Marvel", "Marvel"),
        ("Totes", "Totes"),
        ("Comfy Steps", "Comfy Steps"),
        ("Becket", "Becket"),
        ("Lambretta", "Lambretta"),
    ]

    COLORS = [
        ("Black", "Black"),
        ("White", "White"),
        ("Blue", "Blue"),
        ("Red", "Red"),
        ("Brown", "Brown"),
        ("Green", "Green"),
        ("Yellow", "Yellow"),
        ("Orange", "Orange"),
        ("Grey", "Grey"),
    ]

    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    style = models.CharField(max_length=30, choices=STYLE_CHOICES, blank=True)
    brand = models.CharField(max_length=50, choices=BRAND_CHOICES, blank=True)
    size = models.CharField(max_length=20, blank=True)   # e.g. UK(5)
    colors = models.JSONField(default=list)              # e.g. ["Black","White"]
    image = models.ImageField(upload_to="womenproducts/")

    def __str__(self):
        return self.title


class Cart(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    product = models.ForeignKey(WomenProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.title}"

class MenProduct(models.Model):
    STYLE_CHOICES = [
        ("Sandals", "Sandals"),
        ("Trainers", "Trainers"),
        ("Boots", "Boots"),
        ("Slippers", "Slippers"),
        ("Canvas", "Canvas"),
        ("Formal Shoes", "Formal Shoes"),
    ]

    BRAND_CHOICES = [
        ("Skechers", "Skechers"),
        ("Kickers", "Kickers"),
        ("Marvel", "Marvel"),
        ("Totes", "Totes"),
        ("Comfy Steps", "Comfy Steps"),
        ("Becket", "Becket"),
        ("Lambretta", "Lambretta"),
    ]

    COLORS = [
        ("Black", "Black"),
        ("White", "White"),
        ("Blue", "Blue"),
        ("Red", "Red"),
        ("Brown", "Brown"),
        ("Green", "Green"),
        ("Yellow", "Yellow"),
        ("Orange", "Orange"),
        ("Grey", "Grey"),
    ]

    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    style = models.CharField(max_length=30, choices=STYLE_CHOICES, blank=True)
    brand = models.CharField(max_length=50, choices=BRAND_CHOICES, blank=True)
    size = models.CharField(max_length=20, blank=True)   # e.g. UK(9)
    colors = models.JSONField(default=list)              # e.g. ["Black","White"]
    image = models.ImageField(upload_to="menproducts/")

    def __str__(self):
        return self.title


class MenCart(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    product = models.ForeignKey(MenProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.title}"
class KidsProduct(models.Model):
    STYLE_CHOICES = [
        ("Sandals", "Sandals"),
        ("Trainers", "Trainers"),
        ("Boots", "Boots"),
        ("Slippers", "Slippers"),
        ("Canvas", "Canvas"),
        ("School Shoes", "School Shoes"),
    ]

    BRAND_CHOICES = [
        ("Skechers", "Skechers"),
        ("Kickers", "Kickers"),
        ("Marvel", "Marvel"),
        ("Totes", "Totes"),
        ("Comfy Steps", "Comfy Steps"),
        ("Becket", "Becket"),
        ("Lambretta", "Lambretta"),
    ]

    COLORS = [
        ("Black", "Black"),
        ("White", "White"),
        ("Blue", "Blue"),
        ("Red", "Red"),
        ("Brown", "Brown"),
        ("Green", "Green"),
        ("Yellow", "Yellow"),
        ("Orange", "Orange"),
        ("Grey", "Grey"),
    ]

    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    style = models.CharField(max_length=30, choices=STYLE_CHOICES, blank=True)
    brand = models.CharField(max_length=50, choices=BRAND_CHOICES, blank=True)
    size = models.CharField(max_length=20, blank=True)   # e.g. UK(3)
    colors = models.JSONField(default=list)              # e.g. ["Red", "Blue"]
    image = models.ImageField(upload_to="kidsproducts/")

    def __str__(self):
        return self.title


class KidsCart(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    product = models.ForeignKey(KidsProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.title}"
from django.db import models
from django.contrib.auth.models import User
from products.models import WomenProduct  # assuming products app

class AllCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="allcart")
    product = models.ForeignKey(WomenProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")  # avoid duplicate entries

    def __str__(self):
        return f"{self.user.username} - {self.product.title} ({self.quantity})"

    @property
    def total_price(self):
        return self.product.price * self.quantity

from django.db import models
from django.contrib.auth.models import User
from products.models import Product  # your existing product model

class Checkout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="checkouts")
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    # Banking / payment info (store only minimal info)
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Checkout: {self.user.username} ({self.id})"

class CheckoutItem(models.Model):
    checkout = models.ForeignKey(Checkout, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # store price at checkout time

    def total_price(self):
        return self.price * self.quantity

import random
import string
from django.db import models
from django.contrib.auth.models import User
from products.models import Product  # assuming Product model exists

def generate_order_number():
    return ''.join(random.choices(string.digits, k=12))

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    bank_name = models.CharField(max_length=100, default="NA")
    account_number = models.CharField(max_length=50, default="NA")
    ifsc_code = models.CharField(max_length=20, default="NA")

    order_number = models.CharField(max_length=12, unique=True, default=generate_order_number)
    status = models.CharField(max_length=50, default="PLACED")  # For tracking
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_number}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.title}"


