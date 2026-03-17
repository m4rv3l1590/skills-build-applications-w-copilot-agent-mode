from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Borrar datos existentes
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        Team.objects.create(name='Marvel', universe='Marvel')
        Team.objects.create(name='DC', universe='DC')

        User.objects.create(name='Tony Stark', email='tony@marvel.com', team_name='Marvel')
        User.objects.create(name='Peter Parker', email='peter@marvel.com', team_name='Marvel')
        User.objects.create(name='Clark Kent', email='clark@dc.com', team_name='DC')
        User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team_name='DC')

        Activity.objects.create(user_email='tony@marvel.com', type='Run', duration=30, date=timezone.now())
        Activity.objects.create(user_email='peter@marvel.com', type='Swim', duration=45, date=timezone.now())
        Activity.objects.create(user_email='clark@dc.com', type='Fly', duration=60, date=timezone.now())
        Activity.objects.create(user_email='bruce@dc.com', type='Cycle', duration=50, date=timezone.now())

        Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='Marvel')
        Workout.objects.create(name='Situps', description='Do 30 situps', suggested_for='DC')
        Workout.objects.create(name='Plank', description='Hold for 1 min', suggested_for='Ambos')

        Leaderboard.objects.create(user_email='tony@marvel.com', score=120)
        Leaderboard.objects.create(user_email='peter@marvel.com', score=110)
        Leaderboard.objects.create(user_email='clark@dc.com', score=130)
        Leaderboard.objects.create(user_email='bruce@dc.com', score=125)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
