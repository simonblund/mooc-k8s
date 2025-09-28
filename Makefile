TSSTRING=$(shell date +%H%M%S)
build_log_project:
	docker build -t log_reader:${TSSTRING} log_reader/.
	docker build -t log_writer:${TSSTRING} log_writer/.
	docker build -t pingpong:${TSSTRING} ping-pong/.
	k3d image import log_reader:${TSSTRING}
	k3d image import log_writer:${TSSTRING}
	k3d image import pingpong:${TSSTRING}