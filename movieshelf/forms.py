from django import forms
from .models import MovieGenre, MovieDirector, Movie

class GenreForm(forms.ModelForm):

	class Meta:
		model = MovieGenre
		fields = ('genre',)
		
class DirectorForm(forms.ModelForm):

	class Meta:
		model = MovieDirector
		fields = ('name',)
		
class MovieForm(forms.ModelForm):
	
	class Meta:
		model = Movie
		labels = {
			'title': 'Movie Title',
			'dir_name': 'Name of the Director',
			'movie_genre': 'Genre of the Movie'
		}
		fields = ('title', 'dir_name', 'movie_genre')