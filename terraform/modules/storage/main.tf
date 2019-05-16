# A persistent data disk (SSD) that can be used to store files on for fast access by the cluster.
# By default, can only be used in ReadOnlyMany mode when mounted directly to pods.
# But it can be made ReadWriteMany with a cluster-hosted NFS server.
resource "google_compute_disk" "primary" {
    count = "${var.ssd_name != "" ? 1 : 0}"

    name = "${var.ssd_name}"
    type = "pd-ssd"
    zone = "${var.zone}"
    size = "15"
}

# A Cloud Storage bucket for holding files.
# Can be used as a drop-spot for artifacts from the CI/CD pipeline where they can then be picked
# up and deployed to the persistent storage SSD.
# Or just accessed directly in the storage bucket.
resource "google_storage_bucket" "primary" {
    name = "${var.bucket_name}"
    storage_class = "REGIONAL"
    location = "${var.region}"
}
