FROM python:3.10-slim

WORKDIR /app

# Damit Python main.py als Modul findet
ENV PYTHONPATH="/app:${PYTHONPATH}"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# kopiert alles aus app/backend → /app
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
