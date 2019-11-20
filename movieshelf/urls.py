from django.urls import path
from . import views
urlpatterns = [
	path("", views.home, name='home'),
	path("director/", views.director_list, name="director_list"),
	path("simple/", views.simpleview, name="simple view"),
	path("genre/", views.genre_list, name="genre_list"),
	path("movies/", views.movie_list, name="movie_list"),
	path("add_genre/", views.add_genre, name='add_genre'),
	path("add_director/", views.add_director, name='add_director'),
	path("add_movie/", views.add_movie, name='add_movie'),
	path("movies/edit_movie/<int:pk>", views.edit_movie, name='edit_movie'),
	path("grant_wish/<str:name>", views.grant_wish, name='grant_wish'),
	path("palindrome/<str:text>", views.palindrome, name='palindrome'),
]
