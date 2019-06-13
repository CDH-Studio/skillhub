variable "__project_name" {
    type = "string"
}

variable "__gcp_project_id" {
    type = "string"
}

variable "__gcp_project_region" {
    type = "string"
}

variable "__gcp_project_zone" {
    type = "string"
}

variable "__domain" {
    type = "string"
}

variable "__remote_repo_host" {
    type = "string"
}

variable "__remote_repo_owner" {
    type = "string"
}

variable "cluster_initial_node_count" {
    type = "string"
    default = "3"
}

variable "cluster_machine_type" {
    type = "string"
    default = "n1-standard-1"
}

variable "cluster_disk_size" {
    type = "string"
    default = "30"
}

variable "cluster_preemptible" {
    type = "string"
    default = "true"
}
