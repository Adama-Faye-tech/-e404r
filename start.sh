docker stop e404r
docker rm e404r
docker build -t e404r .
docker run -d --name e404r -p 20128:20128 --env-file .env -v e404r-data:/app/data e404r