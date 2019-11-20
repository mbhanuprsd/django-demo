from django.shortcuts import render, redirect, get_object_or_404
from todolist.models import Task
from .forms import TaskForm

def home(request):
	tasks = Task.objects.all()
	return render(request, 'todolist/home.html', {'tasks':tasks})
	
def add_task(request):
	if request.method=='POST':
		form=TaskForm(request.POST)
		if form.is_valid():
			task = form.save()
			task.save()
		return redirect('home')
	else:
		form=TaskForm()
	return render(request, 'todolist/add_todo.html', {'form':form})

def edit_task(request, pk):
	task = get_object_or_404(Task, pk=pk)
	if request.method=='POST':
		form=TaskForm(request.POST, instance=task)
		if form.is_valid():
			task = form.save()
			task.save()
			return redirect('home')
	else:
		form=TaskForm(instance=task)
	return render(request, 'todolist/add_todo.html', {'form':form})