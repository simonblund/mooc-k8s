build:
	docker build -t log_output:$(shell date +%H%M%S) .

add_to_k3s:
	k3d image import log_output:163347 