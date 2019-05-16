# The Kubernetes cluster where all of the application containers will be deployed to.
resource "google_container_cluster" "primary" {
    name = "${var.cluster_name}"
    location = "${var.zone}"
    min_master_version = "${var.cluster_version}"
    remove_default_node_pool = true

    network = "${var.network_link}"
    subnetwork = "${var.subnetwork_link}"

    monitoring_service = "monitoring.googleapis.com/kubernetes"
    logging_service = "logging.googleapis.com/kubernetes"

    # Need to have an IP allocation policy setup so that IP Aliases get enabled.
    # And we need IP Aliases enabled to access a potential Memorystore (Redis) instance.
    # See Step 2 of https://cloud.google.com/memorystore/docs/redis/connecting-redis-instance#connecting-cluster
    ip_allocation_policy = {
        cluster_secondary_range_name = "${var.cluster_secondary_range_name}"
        services_secondary_range_name = "${var.services_secondary_range_name}"
    }

    lifecycle {
        ignore_changes = ["node_pool"]
    }

    node_pool {
        name = "default-pool"
    }
}

# The primary node pool for the Kubernetes cluster.
resource "google_container_node_pool" "primary" {
    name = "${google_container_cluster.primary.name}-node-pool"
    cluster = "${google_container_cluster.primary.name}"
    location = "${var.zone}"
    initial_node_count = "${var.initial_node_count}"

    autoscaling {
        min_node_count = "${var.min_node_count}"
        max_node_count = "${var.max_node_count}"
    }

    node_config {
        preemptible = "${var.preemptible_nodes}"
        disk_size_gb = "${var.node_disk_size}"
        machine_type = "${var.node_machine_type}"
        oauth_scopes = ["compute-rw", "storage-rw", "logging-write", "monitoring", "datastore", "pubsub"]

        tags = ["${var.cluster_name}", "nodes"]
    }
}

