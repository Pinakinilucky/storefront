from django.db import models

# Create your models here.
class Destination(models.Model):
    
    name=models.CharField(max_length=200)
    display_order = models.PositiveIntegerField(default=0)
    price=models.IntegerField()
    desc=models.TextField()
    img=models.ImageField(upload_to='pics')
    population =models.BigIntegerField()
    territory = models.FloatField()
    class Meta:
        ordering = ['display_order']
    def __str__(self):
        return self.name