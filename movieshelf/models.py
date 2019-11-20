from django.db import models
# Create your models here.
class MovieGenre(models.Model):
	genre = models.CharField(unique=True, max_length=50)
	def __str__(self):
		return self.genre


class MovieDirector(models.Model):
	name = models.CharField(unique=True, max_length=100)
	def __str__(self):
		return self.name


class Movie(models.Model):
	title = models.CharField(max_length=100)
	dir_name = models.ForeignKey(MovieDirector,
	on_delete=models.PROTECT, to_field='name')
	movie_genre = models.ForeignKey(MovieGenre,
	on_delete=models.PROTECT, to_field='genre')
	def __str__(self):
		return self.title
