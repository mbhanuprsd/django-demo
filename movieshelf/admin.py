from django.contrib import admin

# Register your models here.
from .models import Movie, MovieDirector, MovieGenre

admin.site.register(Movie)
admin.site.register(MovieDirector)
admin.site.register(MovieGenre)

from todolist.models import Task

admin.site.register(Task)