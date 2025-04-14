from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from AI Code Inspector!"}

@app.get("/scan")
async def scan_code():
    return {"status": "Scan successful", "issues": []}
