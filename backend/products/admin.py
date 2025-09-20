from django.contrib import admin
from .models import HeroSlide,OverviewSection,Product,Subscriber,ContactEnquiry,CustomUser,AllCart
from django.contrib.auth.admin import UserAdmin
admin.site.register(HeroSlide)

@admin.register(OverviewSection)
class OverviewSectionAdmin(admin.ModelAdmin):
    list_display = ('first_title', 'next_title', 'bottom_title')  # Fields to display in the list view
    search_fields = ('first_title', 'overview_content', 'next_title', 'bottom_title')  # Searchable fields
    fields = ('first_title', 'overview_content', 'next_title', 'bottom_title', 'image1', 'image2', 'image3')

from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'category', 'image')
    list_filter = ('category',)
    search_fields = ('name', 'category')

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")   # shows email + date in list
    search_fields = ("email",)               # search by email
    ordering = ("-created_at",)  

from django.contrib import admin
from .models import About

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "short_description", "image_preview")
    search_fields = ("title", "description")

    def short_description(self, obj):
        return obj.description[:75] + "..." if obj.description else ""
    short_description.short_description = "Description"

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' style='border-radius:8px;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"
from django.contrib import admin
from .models import AboutFeature, AboutMain

@admin.register(AboutMain)
class AboutMainAdmin(admin.ModelAdmin):
    list_display = ("id", "image")

@admin.register(AboutFeature)
class AboutFeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "description")

@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    list_filter = ('created_at',)
    ordering = ('-created_at',)



class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'username', 'is_staff']

admin.site.register(CustomUser, CustomUserAdmin)
from .models import WomenProduct

from django.contrib import admin
from .models import WomenProduct, Cart
from django import forms

class WomenProductForm(forms.ModelForm):
    colors = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4}),
        help_text='Enter one color per line.'
    )

    class Meta:
        model = WomenProduct
        fields = '__all__'

    def clean_colors(self):
        data = self.cleaned_data['colors']
        return [{"color": c.strip()} for c in data.splitlines() if c.strip()]

    def initial_colors(self):
        if self.instance and self.instance.colors:
            return "\n".join([c["color"] for c in self.instance.colors])
        return ""

@admin.register(WomenProduct)
class WomenProductAdmin(admin.ModelAdmin):
    list_display = ("title", "brand", "style", "size", "display_colors", "price")
    search_fields = ("title", "brand", "style")
    list_filter = ("brand", "style", "size")

    def display_colors(self, obj):
        return ", ".join(obj.colors)
    display_colors.short_description = "Colors"

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'added_at')

from django.contrib import admin
from .models import MenProduct, MenCart

@admin.register(MenProduct)
class MenProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'brand', 'style', 'price']
    list_filter = ['brand', 'style']
    search_fields = ['title', 'brand']

@admin.register(MenCart)
class MenCartAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'quantity', 'added_at']
    search_fields = ['user__email', 'product__title']

from django.contrib import admin
from .models import KidsProduct, KidsCart

@admin.register(KidsProduct)
class KidsProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'brand', 'style', 'price']
    list_filter = ['brand', 'style']
    search_fields = ['title', 'brand']

@admin.register(KidsCart)
class KidsCartAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'quantity', 'added_at']
    search_fields = ['user__email', 'product__title']

@admin.register(AllCart)
class AllCartAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity", "total_price", "added_at")
    list_filter = ("user", "product")

from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "full_name", "status", "created_at")
    inlines = [OrderItemInline]