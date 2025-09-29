build:
	docker build -t webserver:$(shell date +%H%M%S) .

add_to_k3s:
	k3d image import webserver:225946