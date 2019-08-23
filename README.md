# Skillhub

A platform for discovering skills.

![Skillhub Screenshot](Wiki%20Images/SkillhubHomePage.png?raw=true)

Skillhub can be accessed [here](https://skillhub.apps.ic.gc.ca).

**NOTE**: Skillhub can only be accessed while logged onto the Government of Canada network.

# Table of Contents

- [What is Skillhub?](#what-is-skillhub)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Repo Structure](#repo-structure)
- [Local Development](#local-development)
  * [Web App Development Prerequisites](#web-app-development-prerequisites)
  * [Running the Entire Application](#running-the-entire-application)
  * [Running the Linter/Tests Locally](#running-the-lintertests-locally)
- [OpenShift](#openshift)
  * [Deploying to OpenShift](#deploying-to-openshift)
    + [Overview](#overview)
    + [Prerequisites](#prerequisites)
    + [Deployment Steps](#deployment-steps)
      - [Login to the Cluster](#login-to-the-cluster)
      - [Get a copy of the Repo](#get-a-copy-of-the-repo)
      - [Deploy the Secrets](#deploy-the-secrets)
      - [Deploy the Manifests](#deploy-the-manifests)
      - [Start the Image Builds](#start-the-image-builds)
    + [Regenerating the Manifests](#regenerating-the-manifests)
- [Running the Scraper (OpenShift)](#running-the-scraper-openshift)
  * [Checking on Progress](#checking-on-progress)
- [Wiki](#wiki)
- [License](#license)
- [Contact](#contact)

# What is Skillhub?

Skillhub is a skills discovery platform to enable managers and developers to find other developers that have the skills that they're looking for. Whether that be for provisioning a new project, or just to find someone to help out in a pinch, Skillhub is the place to go.

In particular for Innovation Canada, this solves an ongoing problem that has had several attempts at fixing. These attempts have mainly focused around getting developers to fill out questionnaires and surveys to compile a profile of skills.

However, these attemps have, for the most part, all failed due to two primary reasons: people don't like filling out these surveys (because it takes time), and the information becomes out of date very quickly (because people don't want to constantly be filling out surveys). 

As such, Skillhub tries to fill both of these gaps by introducing an automated process for building an individual's skills profile. It uses various forms of data analysis and machine learning to look at different data sources (primarily, issue tracking in Jira and code repositories in Bitbucket) to build a profile of what technology-related skills an individual has, as well as what projects they have worked on.

These profiles are then exposed in an intuitive web interface where other users can go search for other people.

We think that Skillhub can be the bridge to close the gap for skills tracking and discovery.

For more background information on what Skillhub is and why it exists, check out [our wiki](https://github.com/CDH-Studio/skillhub/wiki).

# Contributors

- [Devin Sit](https://devinsit.com)
    * Team Lead, Software Architect, Infrastructure Architect, Full Stack Developer
- [Joshua Gorman](https://github.com/Liannus)
    * Full Stack Developer
- [Bhalachandra Malghan](https://www.linkedin.com/in/bmalghan)
    * Full Stack Developer

# Tech Stack

- Services Framework: [Kubails](https://github.com/DevinSit/kubails)
- Frontend Service Framework: React + Redux + Redux-Saga
- Backend Service Framework: Node + Express + Feathers
- Predictions Service Framework: Python + Flask + Scikit-Learn
- Scraper Service Framework: Node + Express
- Database: Postgres
- Testing Framework: Jest
- Hosting: Docker/Kubernetes + OpenShift/GCP

# Repo Structure

Here we'll go through the top-level structure of the Skillhub repository, explaining what each folder and file is used for. For any sub-folder (like individual services), you can check out their co-located READMEs for more in-depth explanations of their structure.

```
├── cloudbuild.yaml                 # Cloud Build (CI/CD) pipeline for GCP
├── helm                            # Helm templates used to generate the Kubernetes manifests
├── kubails.json                    # Kubails configuration file GCP
├── kubails.openshift.json          # Kubails configurataion file for OpenShift
├── LICENSE                         # MIT License file
├── Makefile                        # Makefile that contains the primary commands for controlling the repo
├── manifests                       # Where the Kubernetes manifests are stored/generated to
├── README.md                       # This file :)
├── scripts                         # Other scripts that enable operation of the repo
├── services                        # Where all the application code is stored; each service is one container = one microservice
├── service-secrets.zip             # The password-protected zip containing the secrets used in production; Mena, Ali, and Devin have the password
├── terraform                       # The Terraform configuration files for creating the necessary infrastructure to deploy Skillhub to GCP
└── Wiki Images                     # The images used in the Github wiki
```

# Architecture Overview

Skillhub is broken down into four different services: Frontend, Backend, Predictions, Scraper.

* Frontend: Serves the React app that is the web interface for Skillhub.
* Backend: Manages data coming into and out of the database.
* Predictions: Makes predictions relating to project contributors and profile skills.
* Scraper: Scrapes Jira/Bitbucket for data and sends it to the Backend for persistence.

The interactions between all of these services can be roughly described using the following diagram:

![Architecture](Wiki%20Images/Skillhub_Architecture.png?raw=true)

# Local Development

The following is a guide on how to bring up the pieces of the application for development.

## Web App Development Prerequisites

You must have the following already installed:

- docker
- docker-compose

## Running the Entire Application

To run the entire application locally, run the following:

```
make start
```

You can then access the frontend at `localhost:3000`.

Checkout the `services/docker-compose.yaml` file for information on which ports to use to access all of the other services.

For information on how to use/run each of the other services, check out the READMEs found in each of their folders under the `services/` folder.

## Running the Linter/Tests Locally

In order to maintain parity between the CI/CD pipeline and local development, all of the linting/testing is executed inside each services' Docker container.

To run the linter or tests locally, do the following:

1. Make sure the services are running (i.e. `make start`).
2. Run the corresponding Make command(s) depending on what you want linted/tested, e.g. `make lint-frontend-locally`.

# OpenShift

While the application was deployed to GCP during development, Skillhub's 'production' deployment consists of hosting on the SSC (Shared Services Canada) OpenShift cluster. The reasons for this are primarily threefold:

1. The Scraper _needs_ to be in-network in order to access the in-network Jira/Bitbucket instances. The OpenShift cluster is in-network; therefore, it is the logical place to put the Scraper.
2. Since Skillhub holds the names/emails/skills/etc of employees, it is more secure to only allow access to it from people that are in-network (i.e. employees). Therefore, it is logical to also host the rest of Skillhub on the OpenShift cluster.
3. The OpenShift cluster is, effectively, an already-setup Kubernetes cluster. This means that we don't have to bother standing up a Kubernetes of our own in AWS, or paying the exhorbitant monthly fee to use EKS. Therefore, it is logical to host all of Skillhub on the OpenShift cluster.

Additionally, we are following the precedent set by Jarvis to use the OpenShift cluster for hosting.

## Deploying to OpenShift

Since the OpenShift cluster _is_ in-network, that means our options for deployment are limited -- in fact, they are _highly_ limited.

### Overview

Because the cluster is in-network, and our code repo is on Github (i.e. out-of-network), that means that we can't (easily) setup a traditional CI/CD pipeline -- there's no (easy) way to get the Github webhook to access the OpenShift cluster for automated builds (or anything else in-network, for that matter).

Additionally, deployment to the cluster has to be done from a Windows machine, if only because there are no networked Linux development machines (that we're aware of). As such, the deployment process is... janky, to say the least.

### Prerequisites

The following are the prerequisites to deploying Skillhub to the OpenShift cluster.

1. You have an imaged (i.e. in-network) Windows laptop and AD (Active Directory) account.
2. Your AD account has access to the OpenShift cluster (ask Mena; she knows who to ask for access).
3. You have access to the Skillhub project on the OpenShift cluster (ask Mena or Ali).
4. You have installed the OpenShift CLI (`oc`); google for instructions on where to find it.

You'll probably need to use something like [Git for Windows](https://gitforwindows.org/) or [Cmder](https://cmder.net/) to get a basic `bash` shell -- you're gonna need a proper shell for this stuff (including `make`).

### Deployment Steps

The following are the steps for deploying the entirety of Skillhub to OpenShift.

#### Login to the Cluster

Login to the cluster using `oc`. You can find the command (and token) to login in the web interface for the cluster: [https://ocp.ic.gc.ca:8443](https://ocp.ic.gc.ca:8443).

#### Get a copy of the Repo

Get a copy of this code repository (on the `master` branch) onto your machine.

While you might think that you can just clone it from Github, we have found that `git clone` to external repos doesn't work by default; you have to setup a proxy server with:

```
git config --global http.proxy http://cdhwg01.prod.prv:80
```

**NOTE**: This proxy server might not be correct.

You can also just download a zip of the `master` branch and that should be fine.

#### Deploy the Secrets

Decrypt the zip of service secrets found in `service-secrets.zip`. Ask Mena/Ali for the password. Then, run:

```
make deploy-openshift-secrets
```

Delete the secrets files and forget that you ever knew the password.

**NOTE**: Make sure that the raw, unencrypted secrets files never get committed to the repo. Otherwise, you'll have to rotate them.

#### Deploy the Manifests

From the root of the repo, deploy all of the pre-generated OpenShift manifests:

```
make deploy-openshift-manifests
```

**NOTE**: If you want to re-generate the OpenShift manifests from the templates in `helm/templates`, see the below section [Regenerating the Manifests](#regenerating-the-manifests).


#### Start the Image Builds

Manually start up all of the image builds:

```
make start-openshift-builds
```

Once the builds finish, the `DeploymentConfigs` for each service will pick up the new images and deploy them.

At this point, you should be able to access the frontend at `https://skillhub.apps.ic.gc.ca`.

### Regenerating the Manifests

If for some reason a Kubails-related configuration changes (i.e. almost anything in `kubails.openshift.json`), you'll probably need to regenerate the OpenShift manifests.

Regenerating the OpenShift manifests requires the Kubails CLI; installation instructions can be found [here](https://github.com/DevinSit/kubails).

Once you have the Kubails CLI, you'll need to switch the active `kubails.json` config to the OpenShift one. This can be done with `make convert-kubails-to-openshift`.

Then, you can run `kubails cluster manifests generate --namespace=master --tag=master`. This will put the generated manifests in `manifests/generated`.

These manifests won't be committed to the repo; if you want them to be, put them into the `manifests/openshift` folder to replace the existing pre-generated ones.

Note that the `--namespace` option doesn't do anything for OpenShift manifests, but it _must_ be specified as `master` (or whatever `__production_namespace` is in `kubails.openshift.json`); otherwise, the manifests will be generated as if they were a Kubails branch deployment and the image tags would be wrong.

Additionally, note that the `--tag` option is used to specify the branch that the image builds will pull from. It is `master` by default, but it can be changed here.

If you want to switch the Kubails config back to GCP, just run `make convert-kubails-to-gcp`. Make sure you only run this _after_ running `make convert-kubails-to-openshift`, otherwise the files will be named weirdly.

# Running the Scraper (OpenShift)

To manually run the Scraper deployed on OpenShift, run the following commands:

```
curl https://skillhub.apps.ic.gc.ca/scraper/contributors
curl https://skillhub.apps.ic.gc.ca/scraper/skills
```

Alternatively, visit those links in a web browser. They should each only take a few seconds to complete; however, the actual scraping happens in the background, which can take up to a couple of hours to finish.

## Checking on Progress

To check on the progress of each scraping process, you can run these commands:

```
curl https://skillhub.apps.ic.gc.ca/scraper/contributors/size
curl https://skillhub.apps.ic.gc.ca/scraper/skills/size
```

The responses you get back will contain the number of jobs that are left in each queue (the contributors and skills processes use separate job queues).

For contributors, each job is equal to one project that still needs to be scraped/processed from Jira.

For skills, each job is equal to one repo that still needs to be scraped/processed from Bitbucket.

# Wiki

You can find more information about the project and our processes in our [Github Wiki](https://github.com/CDH-Studio/skillhub/wiki).

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Contact 

* [CDH Studio Website](https://cdhstudio.ca/)
