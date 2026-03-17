mode: 'agent'
model: GPT-4.1

# Actualizaciones de la aplicación Django

- Todos los archivos del proyecto Django se encuentran en el directorio `octofit-tracker/backend/octofit_tracker`.

1. Actualizar `settings.py` para la conexión a MongoDB y CORS.

2. Actualizar `models.py`, `serializers.py`, `urls.py`, `views.py`, `tests.py` y `admin.py` para admitir colecciones de usuarios, equipos, actividades, clasificación y entrenamientos.

3. Asegurarse de que `/` apunte a la API y que `api_root` esté presente en `urls.py`.
