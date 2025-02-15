
## Getting Started

First, clone this repo and install requirements (preferably in venv)

```bash
pip install -r requirements.txt
```
Get Free Gemini [API Key](https://aistudio.google.com/app/apikey)

Place api key in .env file (ex GEMINI_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx')


Run the development server:

```bash
uvicorn main:app --reload
# or
fastapi dev main.py
```

Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser to see the documentations and test api endpoints

You can start by looking at main.py to see all the api routes

## Notes

Sometimes live reload stops working and you have to restart server

Depending on what ide you use server might not fully shutdown after closing program and you have to manually close all python processes in task manager
