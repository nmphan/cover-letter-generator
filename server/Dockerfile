FROM python:3.12.1-alpine

WORKDIR /app
COPY . .
RUN apk add postgresql-dev
RUN apk add cargo
RUN pip install -r requirements.txt
RUN pip install psycopg2 google-generativeai

EXPOSE 8000
CMD ["python", "main.py"]