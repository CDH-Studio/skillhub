.PHONY: start down

#################################################################################
# COMMANDS
#################################################################################

start:
	docker-compose -f ./services/docker-compose.yaml up --build

down:
	docker-compose -f ./services/docker-compose.yaml down -v

lint-backend-locally:
	docker-compose -f ./services/docker-compose.yaml exec backend npm run lint

lint-frontend-locally:
	docker-compose -f ./services/docker-compose.yaml exec frontend npm run lint

lint-scraper-locally:
	docker-compose -f ./services/docker-compose.yaml exec scraper npm run lint

test-backend-locally:
	docker-compose -f ./services/docker-compose.yaml exec backend npm run test

test-frontend-locally:
	docker-compose -f ./services/docker-compose.yaml exec frontend npm run test

test-scraper-locally:
	docker-compose -f ./services/docker-compose.yaml exec scraper npm run test

inspect-database:
	docker-compose -f ./services/docker-compose.yaml exec backend-database psql app-database app-database-user

generate-contributors-model-training-data:
	bash ./scripts/generate_contributors_model_training_data.sh "$(JIRA_AUTH_TOKEN)"

train-contributors-model:
	bash ./scripts/train_contributors_model.sh "$(DATASET_HASH)"

deploy-openshift-manifests:
	bash ./scripts/deploy_openshift_manifests.sh

deploy-openshift-secrets:
	bash ./scripts/deploy_openshift_secrets.sh

start-openshift-builds:
	bash ./scripts/start_openshift_builds.sh

convert-kubails-to-gcp:
	bash ./scripts/convert_kubails_to_gcp.sh

convert-kubails-to-openshift:
	bash ./scripts/convert_kubails_to_openshift.sh

#################################################################################
# SELF DOCUMENTING COMMANDS
#################################################################################

.DEFAULT_GOAL := show-help

# Inspired by <http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html>
# sed script explained:
# /^##/:
# 	* save line in hold space
# 	* purge line
# 	* Loop:
# 		* append newline + line to hold space
# 		* go to next line
# 		* if line starts with doc comment, strip comment character off and loop
# 	* remove target prerequisites
# 	* append hold space (+ newline) to line
# 	* replace newline plus comments by `---`
# 	* print line
# Separate expressions are necessary because labels cannot be delimited by
# semicolon; see <http://stackoverflow.com/a/11799865/1968>
.PHONY: show-help
show-help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)"
	@echo
	@sed -n -e "/^## / { \
		h; \
		s/.*//; \
		:doc" \
		-e "H; \
		n; \
		s/^## //; \
		t doc" \
		-e "s/:.*//; \
		G; \
		s/\\n## /---/; \
		s/\\n/ /g; \
		p; \
	}" ${MAKEFILE_LIST} \
	| LC_ALL='C' sort --ignore-case \
	| awk -F '---' \
		-v ncol=$$(tput cols) \
		-v indent=19 \
		-v col_on="$$(tput setaf 6)" \
		-v col_off="$$(tput sgr0)" \
	'{ \
		printf "%s%*s%s ", col_on, -indent, $$1, col_off; \
		n = split($$2, words, " "); \
		line_length = ncol - indent; \
		for (i = 1; i <= n; i++) { \
			line_length -= length(words[i]) + 1; \
			if (line_length <= 0) { \
				line_length = ncol - indent - length(words[i]) - 1; \
				printf "\n%*s ", -indent, " "; \
			} \
			printf "%s ", words[i]; \
		} \
		printf "\n"; \
	}' \
	| more $(shell test $(shell uname) = Darwin && echo '--no-init --raw-control-chars')
