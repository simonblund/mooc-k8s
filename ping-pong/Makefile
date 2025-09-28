build:
	docker build -t pingpong:$(shell date +%H%M%S) .

add_to_k3s:
	k3d image import pingpong:002536 