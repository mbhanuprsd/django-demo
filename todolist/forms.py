from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
	
	class Meta:
		model = Task
		labels = {
			'name': 'Task',
			'status': 'Status'
		}
		fields = ('name', 'status',)

