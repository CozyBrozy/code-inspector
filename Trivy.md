1. Trivy lokal installieren
brew install aquasecurity/trivy/trivy

2. Docker-Image bauen (auch in der CI vorhanden)
docker build -t codeinspector:latest .

3. Container lokal starten (optional zum Testen)
docker run -p 8000:8000 codeinspector-backend:latest

4. mage auf Schwachstellen scannen (Standardausgabe)
trivy image codeinspector:latest

5. Image aus der Registry scannen & Output speichern (auch in der CI vorhanden, zum lokal testen)
trivy image --format json --output trivy_output.json ghcr.io/aiboosts/codeinspector-backend:latest