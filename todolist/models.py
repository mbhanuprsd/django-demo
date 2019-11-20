from django.db import models

# Create your models here.
class Task(models.Model):
	name = models.CharField(unique=True, max_length=50)
	status = models.BooleanField(default=False)
	
	def __str__(self):
		if self.status:
			return "{} is completed!".format(self.name)
		else:
			return "{} is not done. Please complete it!".format(self.name)