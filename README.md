Django REST Framework - ReactJS application.

If you are using Docker, it is enough to run:

docker-compose up -d

Steps to run the backend app (without docker):

1. Clone the repository

git clone: https://github.com/zejd/django-react

2. Create your own virtual environment

virtualenv venv
source venv/Scripts/activate

3. Install your requirements

pip install -r requirements.txt

4. Make your migrations

python manage.py makemigrations
python manage.py migrate

5.Create a new superuser

python manage.py createsuperuser

6. Run the app

python manage.py runserver

Steps for frontend:

1. Go under what-ui folder

2. run npm install

3. run npm start

That’s it!
