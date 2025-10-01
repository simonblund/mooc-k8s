build:
	docker build -t log_reader:$(shell date +%H%M%S) .

add_to_k3s:
	k3d image import log_reader:220947 