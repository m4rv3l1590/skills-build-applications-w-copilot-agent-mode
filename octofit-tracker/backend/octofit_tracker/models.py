
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    universe = models.CharField(max_length=50)  # Marvel o DC
    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team_name = models.CharField(max_length=100)  # Referencia por nombre
    def __str__(self):
        return self.name

class Activity(models.Model):
    user_email = models.EmailField()  # Referencia por email
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # minutos
    date = models.DateField()
    def __str__(self):
        return f"{self.user_email} - {self.type}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.CharField(max_length=100)  # Marvel, DC, ambos
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    user_email = models.EmailField()  # Referencia por email
    score = models.IntegerField()
    def __str__(self):
        return f"{self.user_email}: {self.score}"