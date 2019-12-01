from django.shortcuts import render, redirect, get_object_or_404
from movieshelf.models import Movie, MovieDirector, MovieGenre
from .forms import GenreForm, DirectorForm, MovieForm
import sys
from django.http import HttpResponse


def home(request):
    return render(request, 'index.html')


def simpleview(request):
    html = "<html><body><h3>Hi from {}</h3></body></html>".format(sys.platform)
    return HttpResponse(html)


def director_list(request):
    directors = MovieDirector.objects.all()
    return render(request, 'movieshelf/director_list.html', {'directors': directors})


def genre_list(request):
    genres = MovieGenre.objects.all()
    return render(request, 'movieshelf/genre_list.html', {'genres': genres})


def movie_list(request):
    movies = Movie.objects.all()
    return render(request, 'movieshelf/movie_list.html', {'movies': movies})


def add_genre(request):
    if request.method == 'POST':
        form = GenreForm(request.POST)
        if form.is_valid():
            genre = form.save()
            genre.save()
        return redirect('genre_list')
    else:
        form = GenreForm()
    return render(request, 'movieshelf/genre_add.html', {'form': form})


def add_director(request):
    if request.method == 'POST':
        form = DirectorForm(request.POST)
        if form.is_valid():
            director = form.save()
            director.save()
        return redirect('director_list')
    else:
        form = DirectorForm()
    return render(request, 'movieshelf/director_add.html', {'form': form})


def add_movie(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            title = form.save()
            title.save()
        return redirect('movie_list')
    else:
        form = MovieForm()
    return render(request, 'movieshelf/movie_add.html', {'form': form})


def edit_movie(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            movie = form.save()
            movie.save()
        return redirect('movie_list')
    else:
        form = MovieForm(instance=movie)
    return render(request, 'movieshelf/movie_edit.html', {'form': form})


def grant_wish(request, name):
    html = "<html><body><h3>Hi Im Genie!<br/> Your wish of {} is granted!<br/>Enjoy!</h3></body></html>".format(name)
    return HttpResponse(html)


def palindrome(request, text):
    html = "<html><body><h3>Palindrome of {} is {}</h3></body></html>".format(text, text[::-1])
    return HttpResponse(html)
