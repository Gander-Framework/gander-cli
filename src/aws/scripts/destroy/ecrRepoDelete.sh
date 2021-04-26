#!/bin/bash
aws ecr delete-repository --repository-name $REPO_NAME --force