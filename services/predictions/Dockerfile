FROM python:3.7.3

ENV PYTHONPATH=./src
ENV MYPYPATH=/app/src

# Install Pipenv
RUN pip install pipenv

# Where the Flask app lives
RUN mkdir /app
WORKDIR /app/

# Install dependencies first
COPY Pipfile Pipfile.lock /app/
RUN pipenv install --dev --system --deploy

# Copy over the rest of the app
ADD . /app

# Where the GCP service account is stored in development
RUN mkdir /gcp

EXPOSE 5000

CMD ["gunicorn", "--config", "gunicorn.conf.py", "main:app"]
