TSSTRING=$(shell date +%H%M%S)
build_log_project:
	docker build -t log_reader:${TSSTRING} log_reader/.
	docker build -t log_writer:${TSSTRING} log_writer/.
	k3d image import log_reader:${TSSTRING}
	k3d image import log_writer:${TSSTRING}